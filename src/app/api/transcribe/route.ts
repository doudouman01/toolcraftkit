import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

const ASSEMBLYAI_KEY = process.env.ASSEMBLYAI_API_KEY!;
const ASSEMBLYAI_BASE = 'https://api.assemblyai.com/v2';

const TOOL_SLUG = 'video-transcription';
const FREE_LIMIT = 3;
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

// ─── AssemblyAI ───────────────────────────────────────────
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

    // ── JSON requests (status, check) ──
    if (contentType.includes('application/json')) {
      const body = await req.json();
      const { action, id, userId } = body;

      if (action === 'check' && userId) {
        const usage = await checkUsage(userId);
        return NextResponse.json({ ...usage, period: PERIOD });
      }

      if (action === 'youtube') {
        return NextResponse.json({
          error: 'no_captions',
          message: 'YouTube transcription coming soon. Please upload the audio file instead.',
        });
      }

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

      if (file.size > 25 * 1024 * 1024) {
        return NextResponse.json({ error: 'file_too_large', message: 'Maximum file size is 25MB' }, { status: 400 });
      }

      if (!userId) {
        return NextResponse.json({ error: 'login_required' }, { status: 401 });
      }

      const usage = await checkUsage(userId);
      if (!usage.allowed) {
        return NextResponse.json({ error: 'limit_reached', usage: usage.usage, limit: usage.limit });
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
      });
    }

    return NextResponse.json({ error: 'unsupported_content_type' }, { status: 400 });
  } catch (err: any) {
    console.error('Transcribe API error:', err);
    return NextResponse.json({ error: 'server_error', message: err.message || 'Internal error' }, { status: 500 });
  }
}
