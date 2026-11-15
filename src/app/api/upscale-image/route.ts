import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

const TOOL_SLUG = 'image-upscaler';
const FREE_LIMIT = 3;

async function checkUsage(userId: string) {
  const supabase = createServiceClient();
  const { data: profile } = await supabase.from('profiles').select('subscription_status').eq('id', userId).single();
  if (profile?.subscription_status === 'active') return { allowed: true, isPro: true, usage: 0, limit: 999 };
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const { count } = await supabase.from('usage_logs').select('*', { count: 'exact', head: true }).eq('user_id', userId).eq('tool_slug', TOOL_SLUG).gte('used_at', startDate);
  const currentUsage = count || 0;
  return { allowed: currentUsage < FREE_LIMIT, isPro: false, usage: currentUsage, limit: FREE_LIMIT };
}

async function recordUsage(userId: string) {
  const supabase = createServiceClient();
  await supabase.from('usage_logs').insert({ user_id: userId, tool_slug: TOOL_SLUG });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Status polling
    if (body.action === 'status' && body.predictionId) {
      const apiToken = process.env.REPLICATE_API_TOKEN;
      if (!apiToken) return NextResponse.json({ error: 'server_error' }, { status: 500 });
      const res = await fetch(`https://api.replicate.com/v1/predictions/${body.predictionId}`, {
        headers: { 'Authorization': `Bearer ${apiToken}` },
      });
      const data = await res.json();
      if (data.status === 'failed') {
        return NextResponse.json({ status: 'failed', message: data.error || 'Processing failed', logs: data.logs });
      }
      return NextResponse.json({ status: data.status, output: data.output });
    }

    // New upscale request
    const { image, scale, userId } = body;
    if (!image) return NextResponse.json({ error: 'no_image' }, { status: 400 });
    if (!userId) return NextResponse.json({ error: 'login_required' }, { status: 401 });

    const usage = await checkUsage(userId);
    if (!usage.allowed) return NextResponse.json({ error: 'limit_reached', usage: usage.usage, limit: usage.limit }, { status: 429 });

    const apiToken = process.env.REPLICATE_API_TOKEN;
    if (!apiToken) return NextResponse.json({ error: 'server_error', message: 'API key not configured.' }, { status: 500 });

    // Create prediction using official model endpoint
    const response = await fetch('https://api.replicate.com/v1/models/nightmareai/real-esrgan/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: {
          image,
          scale: scale || 2,
          face_enhance: false,
        },
      }),
    });

    const prediction = await response.json();

    if (!response.ok) {
      console.error('Replicate create error:', response.status, JSON.stringify(prediction));
      return NextResponse.json({
        error: 'api_error',
        message: prediction.detail || prediction.title || `Replicate API error (${response.status})`,
        debug: JSON.stringify(prediction),
      }, { status: 502 });
    }

    // If prediction completed immediately
    if (prediction.status === 'succeeded') {
      await recordUsage(userId);
      return NextResponse.json({ status: 'succeeded', output: prediction.output });
    }

    if (prediction.status === 'failed') {
      return NextResponse.json({
        error: 'api_error',
        message: prediction.error || 'Model failed to process image.',
        debug: prediction.logs,
      }, { status: 502 });
    }

    // Still processing - return prediction ID for polling
    await recordUsage(userId);
    return NextResponse.json({ status: 'processing', predictionId: prediction.id });
  } catch (err: any) {
    console.error('Image upscaler error:', err);
    return NextResponse.json({ error: 'server_error', message: err.message || 'An unexpected error occurred.' }, { status: 500 });
  }
}
