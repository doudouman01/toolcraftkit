import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

const TOOL_SLUG = 'background-remover';
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
    const formData = await req.formData();
    const image = formData.get('image') as File | null;
    const userId = formData.get('userId') as string | null;

    if (!image) return NextResponse.json({ error: 'no_image' }, { status: 400 });
    if (!userId) return NextResponse.json({ error: 'login_required' }, { status: 401 });

    const usage = await checkUsage(userId);
    if (!usage.allowed) return NextResponse.json({ error: 'limit_reached', usage: usage.usage, limit: usage.limit }, { status: 429 });

    const apiKey = process.env.REMOVEBG_API_KEY;
    if (!apiKey) return NextResponse.json({ error: 'server_error', message: 'API key not configured.' }, { status: 500 });

    const rbFormData = new FormData();
    rbFormData.append('image_file', image);
    rbFormData.append('size', 'auto');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: { 'X-Api-Key': apiKey },
      body: rbFormData,
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('remove.bg error:', response.status, errText);
      return NextResponse.json({ error: 'api_error', message: 'Background removal failed. Please try again.' }, { status: 502 });
    }

    await recordUsage(userId);

    const resultBuffer = await response.arrayBuffer();
    return new Response(new Uint8Array(resultBuffer), {
      status: 200,
      headers: { 'Content-Type': 'image/png', 'Content-Length': String(resultBuffer.byteLength) },
    });
  } catch (err: any) {
    console.error('Background remover error:', err);
    return NextResponse.json({ error: 'server_error', message: err.message || 'An unexpected error occurred.' }, { status: 500 });
  }
}
