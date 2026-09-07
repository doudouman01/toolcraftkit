import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

const TOOL_LIMITS: Record<string, { free: number; period: 'day' | 'month' }> = {
  "invoice-generator": {
    "free": 3,
    "period": "month"
  },
  "qr-code-generator": {
    "free": 5,
    "period": "day"
  },
  "image-compressor": {
    "free": 5,
    "period": "day"
  },
  "image-resizer": {
    "free": 5,
    "period": "day"
  },
  "pdf-merge": {
    "free": 3,
    "period": "day"
  },
  "image-to-pdf": {
    "free": 3,
    "period": "day"
  },
  "text-to-pdf": {
    "free": 5,
    "period": "day"
  }
};

export async function POST(req: NextRequest) {
  try {
    const { userId, toolSlug, action } = await req.json();

    if (!toolSlug) {
      return NextResponse.json({ allowed: true });
    }

    const limit = TOOL_LIMITS[toolSlug];
    if (!limit) {
      return NextResponse.json({ allowed: true });
    }

    // No user = anonymous, apply limits
    if (!userId) {
      return NextResponse.json({ allowed: false, reason: 'login_required', limit: limit.free, period: limit.period });
    }

    const supabase = createServiceClient();

    // Check if user is pro
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_status')
      .eq('id', userId)
      .single();

    if (profile?.subscription_status === 'active') {
      if (action === 'record') {
        await supabase.from('usage_logs').insert({ user_id: userId, tool_slug: toolSlug });
      }
      return NextResponse.json({ allowed: true, isPro: true });
    }

    // Check usage count for free user
    const now = new Date();
    let startDate: string;
    if (limit.period === 'day') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    } else {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    }

    const { count } = await supabase
      .from('usage_logs')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('tool_slug', toolSlug)
      .gte('used_at', startDate);

    const currentUsage = count || 0;

    if (action === 'record') {
      if (currentUsage >= limit.free) {
        return NextResponse.json({ allowed: false, reason: 'limit_reached', usage: currentUsage, limit: limit.free, period: limit.period });
      }
      await supabase.from('usage_logs').insert({ user_id: userId, tool_slug: toolSlug });
      return NextResponse.json({ allowed: true, usage: currentUsage + 1, limit: limit.free });
    }

    // action === 'check'
    return NextResponse.json({
      allowed: currentUsage < limit.free,
      usage: currentUsage,
      limit: limit.free,
      period: limit.period,
      reason: currentUsage >= limit.free ? 'limit_reached' : undefined,
    });
  } catch (err: any) {
    console.error('Usage API error:', err);
    return NextResponse.json({ allowed: true }); // fail open
  }
}
