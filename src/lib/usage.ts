import { supabase } from './supabase';

export const TOOL_LIMITS: Record<string, { free: number; period: 'day' | 'month'; label: string }> = {
  "invoice-generator": {
    "free": 3,
    "period": "month",
    "label": "3 invoices/month"
  },
  "qr-code-generator": {
    "free": 5,
    "period": "day",
    "label": "5 QR codes/day"
  },
  "image-compressor": {
    "free": 5,
    "period": "day",
    "label": "5 compressions/day"
  },
  "image-resizer": {
    "free": 5,
    "period": "day",
    "label": "5 resizes/day"
  },
  "pdf-merge": {
    "free": 3,
    "period": "day",
    "label": "3 merges/day"
  },
  "image-to-pdf": {
    "free": 3,
    "period": "day",
    "label": "3 conversions/day"
  },
  "text-to-pdf": {
    "free": 5,
    "period": "day",
    "label": "5 conversions/day"
  }
};

export async function getUsageCount(userId: string, toolSlug: string): Promise<number> {
  const limit = TOOL_LIMITS[toolSlug];
  if (!limit) return 0;

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

  return count || 0;
}

export async function recordUsage(userId: string, toolSlug: string): Promise<void> {
  await supabase.from('usage_logs').insert({ user_id: userId, tool_slug: toolSlug });
}

export function isToolLimited(toolSlug: string): boolean {
  return toolSlug in TOOL_LIMITS;
}
