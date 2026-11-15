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

    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'f121d640bd286e1fdc67f9799164c1d5be36ff74576ee11c803ae5b665dd46aa',
        input: {
          image,
          scale: scale || 2,
          face_enhance: false,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Replicate error:', response.status, errText);
      return NextResponse.json({ error: 'api_error', message: 'Upscaling failed. Please try again.' }, { status: 502 });
    }

    const prediction = await response.json();
    await recordUsage(userId);

    if (prediction.status === 'succeeded') {
      return NextResponse.json({ status: 'succeeded', output: prediction.output });
    }

    return NextResponse.json({ status: 'processing', predictionId: prediction.id });
  } catch (err: any) {
    console.error('Image upscaler error:', err);
    return NextResponse.json({ error: 'server_error', message: err.message || 'An unexpected error occurred.' }, { status: 500 });
  }
}
