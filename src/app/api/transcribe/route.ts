import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

const ASSEMBLYAI_KEY = process.env.ASSEMBLYAI_API_KEY!;
const ASSEMBLYAI_BASE = 'https://api.assemblyai.com/v2';

const TOOL_SLUG = 'video-transcription';
const FREE_LIMIT = 3; // 3 transcriptions/month for free users
const PERIOD = 'month';

// ─── helpers ───────────────────────────────────────────────
async function checkUsage(userId: string) {
  const supabase = createServiceClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', userId)
    .single();

  if (profile?.subscription_status === 'active') {
    return { allowed: true, isPro: true, usage: 0, limit: 999 };
  }

  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const { count } = await supabase
    .from('usage_logs')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('tool_slug', TOOL_SLUG)
    .gte('used_at', startDate);

  const currentUsage = count || 0;
  return { allowed: currentUsage < FREE_LIMIT, isPro: false, usage: currentUsage, limit: FREE_LIMIT };
}

async function recordUsage(userId: string) {
  const supabase = createServiceClient();
  await supabase.from('usage_logs').insert({ user_id: userId, tool_slug: TOOL_SLUG });
}

// ─── YouTube caption fetcher ──────────────────────────────
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

async function fetchYouTubeCaptions(videoId: string, preferLang?: string): Promise<{ text: string; language: string } | null> {
  try {
    // Fetch the YouTube page to find caption tracks
    const pageRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    });
    const html = await pageRes.text();

    // Extract captions JSON from the page
    const captionMatch = html.match(/"captions":\s*(\{[\s\S]*?"playerCaptionsTracklistRenderer"[\s\S]*?\})\s*,\s*"videoDetails"/);
    if (!captionMatch) return null;

    let captionsData;
    try {
      captionsData = JSON.parse(captionMatch[1]);
    } catch {
      return null;
    }

    const tracks = captionsData?.playerCaptionsTracklistRenderer?.captionTracks;
    if (!tracks || tracks.length === 0) return null;

    // Pick the best track: prefer user-specified language, then manual, then first auto
    let track = tracks[0];
    if (preferLang) {
      const preferred = tracks.find((t: any) => t.languageCode === preferLang);
      if (preferred) track = preferred;
    }
    // Prefer manual captions over auto-generated
    const manual = tracks.find((t: any) => t.kind !== 'asr' && (!preferLang || t.languageCode === preferLang));
    if (manual) track = manual;

    const captionUrl = track.baseUrl + '&fmt=json3';
    const captionRes = await fetch(captionUrl);
    const captionJson = await captionRes.json();

    if (!captionJson.events) return null;

    // Build clean text from caption events
    const lines: string[] = [];
    for (const event of captionJson.events) {
      if (!event.segs) continue;
      const text = event.segs.map((s: any) => s.utf8 || '').join('').trim();
      if (text && text !== '\n') lines.push(text);
    }

    return {
      text: lines.join(' ').replace(/\s+/g, ' ').trim(),
      language: track.languageCode || 'unknown',
    };
  } catch {
    return null;
  }
}

// ─── AssemblyAI: upload file ──────────────────────────────
async function uploadToAssemblyAI(fileBuffer: Buffer): Promise<string> {
  const res = await fetch(`${ASSEMBLYAI_BASE}/upload`, {
    method: 'POST',
    headers: {
      authorization: ASSEMBLYAI_KEY,
      'content-type': 'application/octet-stream',
    },
    body: new Uint8Array(fileBuffer),
  });
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
  const data = await res.json();
  return data.upload_url;
}

// ─── AssemblyAI: create transcription ─────────────────────
async function createTranscription(audioUrl: string, languageCode?: string): Promise<string> {
  const body: any = { audio_url: audioUrl };
  if (languageCode && languageCode !== 'auto') {
    body.language_code = languageCode;
  } else {
    body.language_detection = true;
  }

  const res = await fetch(`${ASSEMBLYAI_BASE}/transcript`, {
    method: 'POST',
    headers: {
      authorization: ASSEMBLYAI_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Transcription create failed: ${res.status}`);
  const data = await res.json();
  return data.id;
}

// ─── AssemblyAI: check status ─────────────────────────────
async function getTranscriptionStatus(id: string) {
  const res = await fetch(`${ASSEMBLYAI_BASE}/transcript/${id}`, {
    headers: { authorization: ASSEMBLYAI_KEY },
  });
  if (!res.ok) throw new Error(`Status check failed: ${res.status}`);
  return res.json();
}

// ─── MAIN HANDLER ─────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';

    // ── JSON requests (youtube, status, check) ──
    if (contentType.includes('application/json')) {
      const body = await req.json();
      const { action, url, id, userId, language } = body;

      // Check usage
      if (action === 'check' && userId) {
        const usage = await checkUsage(userId);
        return NextResponse.json({ ...usage, period: PERIOD });
      }

      // YouTube caption fetch
      if (action === 'youtube' && url) {
        if (userId) {
          const usage = await checkUsage(userId);
          if (!usage.allowed) {
            return NextResponse.json({ error: 'limit_reached', usage: usage.usage, limit: usage.limit });
          }
        }

        const videoId = extractVideoId(url);
        if (!videoId) {
          return NextResponse.json({ error: 'invalid_url' }, { status: 400 });
        }

        const captions = await fetchYouTubeCaptions(videoId, language);
        if (!captions) {
          return NextResponse.json({
            error: 'no_captions',
            message: 'No captions found for this video. Try uploading the audio file instead.',
          });
        }

        // Record usage on success
        if (userId) await recordUsage(userId);

        return NextResponse.json({
          text: captions.text,
          language: captions.language,
          source: 'youtube_captions',
          charCount: captions.text.length,
          wordCount: captions.text.split(/\s+/).length,
        });
      }

      // Poll transcription status
      if (action === 'status' && id) {
        const result = await getTranscriptionStatus(id);
        if (result.status === 'completed') {
          return NextResponse.json({
            status: 'completed',
            text: result.text,
            language: result.language_code,
            source: 'assemblyai',
            charCount: (result.text || '').length,
            wordCount: (result.text || '').split(/\s+/).length,
            duration: result.audio_duration,
          });
        } else if (result.status === 'error') {
          return NextResponse.json({ status: 'error', error: result.error || 'Transcription failed' });
        } else {
          return NextResponse.json({ status: result.status });
        }
      }

      return NextResponse.json({ error: 'invalid_action' }, { status: 400 });
    }

    // ── File upload (multipart/form-data) ──
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      const userId = formData.get('userId') as string | null;
      const language = formData.get('language') as string | null;

      if (!file) {
        return NextResponse.json({ error: 'no_file' }, { status: 400 });
      }

      // Check file size (25MB max)
      if (file.size > 25 * 1024 * 1024) {
        return NextResponse.json({ error: 'file_too_large', message: 'Maximum file size is 25MB' }, { status: 400 });
      }

      // Check usage
      if (userId) {
        const usage = await checkUsage(userId);
        if (!usage.allowed) {
          return NextResponse.json({ error: 'limit_reached', usage: usage.usage, limit: usage.limit });
        }
      } else {
        return NextResponse.json({ error: 'login_required' }, { status: 401 });
      }

      // Upload to AssemblyAI
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadUrl = await uploadToAssemblyAI(buffer);

      // Create transcription job
      const transcriptId = await createTranscription(uploadUrl, language || undefined);

      // Record usage
      await recordUsage(userId);

      return NextResponse.json({
        status: 'processing',
        id: transcriptId,
        message: 'Transcription started. Poll with action: status.',
      });
    }

    return NextResponse.json({ error: 'unsupported_content_type' }, { status: 400 });
  } catch (err: any) {
    console.error('Transcribe API error:', err);
    return NextResponse.json({ error: 'server_error', message: err.message || 'Internal error' }, { status: 500 });
  }
}
