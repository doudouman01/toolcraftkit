/**
 * ToolCraftKit Pro — Stripe Freemium Integration
 * Run: node deploy-stripe-freemium.js
 * Then: git add . && git commit -m "feat: add Stripe freemium integration" && git push
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// CONFIG — Update these with your actual values
// ============================================================
const CONFIG = {
  STRIPE_PRICE_MONTHLY: 'price_1UDAZ35cQm71aMnsolHy0jZI',
  STRIPE_PRICE_ANNUAL: 'price_1UDAZ35cQm71aMnsQif2nm1a',
  SITE_URL: 'https://toolcraftkit.com',
};

// ============================================================
// FREEMIUM LIMITS — tools with daily/monthly limits for free users
// ============================================================
const TOOL_LIMITS = {
  'invoice-generator': { free: 3, period: 'month', label: '3 invoices/month' },
  'qr-code-generator': { free: 5, period: 'day', label: '5 QR codes/day' },
  'image-compressor': { free: 5, period: 'day', label: '5 compressions/day' },
  'image-resizer': { free: 5, period: 'day', label: '5 resizes/day' },
  'pdf-merge': { free: 3, period: 'day', label: '3 merges/day' },
  'image-to-pdf': { free: 3, period: 'day', label: '3 conversions/day' },
  'text-to-pdf': { free: 5, period: 'day', label: '5 conversions/day' },
};

const files = {};

// ============================================================
// 1. src/lib/supabase.ts — Supabase client
// ============================================================
files['src/lib/supabase.ts'] = `import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role (for webhooks)
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
`;

// ============================================================
// 2. src/lib/stripe.ts — Stripe client
// ============================================================
files['src/lib/stripe.ts'] = `import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});
`;

// ============================================================
// 3. src/lib/usage.ts — Usage tracking & limits
// ============================================================
files['src/lib/usage.ts'] = `import { supabase } from './supabase';

export const TOOL_LIMITS: Record<string, { free: number; period: 'day' | 'month'; label: string }> = ${JSON.stringify(TOOL_LIMITS, null, 2)};

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
`;

// ============================================================
// 4. src/context/AuthContext.tsx — Auth context provider
// ============================================================
files['src/context/AuthContext.tsx'] = `'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

interface Profile {
  subscription_status: 'free' | 'active' | 'canceled' | 'past_due';
  subscription_plan: 'monthly' | 'annual' | null;
  current_period_end: string | null;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isPro: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('subscription_status, subscription_plan, current_period_end')
      .eq('id', userId)
      .single();
    setProfile(data);
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const isPro = profile?.subscription_status === 'active';

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, isPro, loading, signIn, signUp, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
`;

// ============================================================
// 5. src/app/api/checkout/route.ts — Stripe checkout session
// ============================================================
files['src/app/api/checkout/route.ts'] = `import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServiceClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { priceId, userId, email } = await req.json();

    if (!priceId || !userId || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Get or create Stripe customer
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({ email, metadata: { supabase_user_id: userId } });
      customerId = customer.id;
      await supabase.from('profiles').update({ stripe_customer_id: customerId }).eq('id', userId);
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: \`\${process.env.NEXT_PUBLIC_SITE_URL}/pricing?success=true\`,
      cancel_url: \`\${process.env.NEXT_PUBLIC_SITE_URL}/pricing?canceled=true\`,
      metadata: { supabase_user_id: userId },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
`;

// ============================================================
// 6. src/app/api/webhook/route.ts — Stripe webhook handler
// ============================================================
files['src/app/api/webhook/route.ts'] = `import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServiceClient } from '@/lib/supabase';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = createServiceClient();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.supabase_user_id;
      if (!userId) break;

      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
      const priceId = subscription.items.data[0].price.id;
      const plan = priceId === '${CONFIG.STRIPE_PRICE_MONTHLY}' ? 'monthly' : 'annual';

      await supabase.from('profiles').update({
        subscription_status: 'active',
        subscription_plan: plan,
        subscription_id: subscription.id,
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        stripe_customer_id: session.customer as string,
      }).eq('id', userId);
      break;
    }

    case 'invoice.paid': {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = invoice.customer as string;

      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single();

      if (profile) {
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
        await supabase.from('profiles').update({
          subscription_status: 'active',
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        }).eq('id', profile.id);
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      await supabase.from('profiles').update({
        subscription_status: 'free',
        subscription_plan: null,
        subscription_id: null,
        current_period_end: null,
      }).eq('stripe_customer_id', customerId);
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = invoice.customer as string;

      await supabase.from('profiles').update({
        subscription_status: 'past_due',
      }).eq('stripe_customer_id', customerId);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
`;

// ============================================================
// 7. src/app/api/usage/route.ts — Check & record usage
// ============================================================
files['src/app/api/usage/route.ts'] = `import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

const TOOL_LIMITS: Record<string, { free: number; period: 'day' | 'month' }> = ${JSON.stringify(
  Object.fromEntries(Object.entries(TOOL_LIMITS).map(([k, v]) => [k, { free: v.free, period: v.period }])),
  null, 2
)};

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
`;

// ============================================================
// 8. src/app/api/portal/route.ts — Stripe customer portal
// ============================================================
files['src/app/api/portal/route.ts'] = `import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServiceClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

    const supabase = createServiceClient();
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    if (!profile?.stripe_customer_id) {
      return NextResponse.json({ error: 'No subscription found' }, { status: 404 });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: \`\${process.env.NEXT_PUBLIC_SITE_URL}/pricing\`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Portal error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
`;

// ============================================================
// 9. src/components/UsageBanner.tsx — Shows usage limits
// ============================================================
files['src/components/UsageBanner.tsx'] = `'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

interface UsageBannerProps {
  toolSlug: string;
  usage: number;
  limit: number;
  period: string;
}

export default function UsageBanner({ toolSlug, usage, limit, period }: UsageBannerProps) {
  const { user, isPro } = useAuth();

  if (isPro) return null;

  const remaining = Math.max(0, limit - usage);
  const periodLabel = period === 'day' ? 'today' : 'this month';
  const isAtLimit = remaining === 0;

  return (
    <div style={{
      padding: '12px 16px',
      marginBottom: '16px',
      borderRadius: '8px',
      backgroundColor: isAtLimit ? '#fef2f2' : '#f0f9ff',
      border: \`1px solid \${isAtLimit ? '#fecaca' : '#bae6fd'}\`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '8px',
      fontSize: '14px',
    }}>
      <span style={{ color: isAtLimit ? '#dc2626' : '#0369a1' }}>
        {!user ? (
          <>Sign in to use this tool — <Link href="/login" style={{ textDecoration: 'underline' }}>Log in</Link></>
        ) : isAtLimit ? (
          <>You\\u2019ve reached your free limit {periodLabel}.</>
        ) : (
          <>{remaining} free use{remaining !== 1 ? 's' : ''} remaining {periodLabel}</>
        )}
      </span>
      {user && (
        <Link
          href="/pricing"
          style={{
            padding: '6px 16px',
            backgroundColor: '#2563eb',
            color: 'white',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {isAtLimit ? 'Upgrade to Pro' : 'Go unlimited'}
        </Link>
      )}
    </div>
  );
}
`;

// ============================================================
// 10. src/components/AuthModal.tsx — Login/Signup modal
// ============================================================
files['src/components/AuthModal.tsx'] = `'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [tab, setTab] = useState(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const { signIn, signUp } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (tab === 'login') {
      const { error: err } = await signIn(email, password);
      if (err) setError(err.message);
      else onClose();
    } else {
      const { error: err } = await signUp(email, password);
      if (err) setError(err.message);
      else setSuccess('Check your email to confirm your account.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
    }} onClick={onClose}>
      <div style={{
        backgroundColor: 'white', borderRadius: '12px', padding: '32px',
        maxWidth: '400px', width: '90%', position: 'relative',
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '12px', right: '16px',
          background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer',
        }}>&times;</button>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <button onClick={() => setTab('login')} style={{
            flex: 1, padding: '8px', border: 'none', cursor: 'pointer',
            borderBottom: tab === 'login' ? '2px solid #2563eb' : '2px solid transparent',
            fontWeight: tab === 'login' ? 700 : 400, background: 'none', fontSize: '15px',
          }}>Log In</button>
          <button onClick={() => setTab('signup')} style={{
            flex: 1, padding: '8px', border: 'none', cursor: 'pointer',
            borderBottom: tab === 'signup' ? '2px solid #2563eb' : '2px solid transparent',
            fontWeight: tab === 'signup' ? 700 : 400, background: 'none', fontSize: '15px',
          }}>Sign Up</button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
            required style={{
              width: '100%', padding: '10px 12px', marginBottom: '12px', borderRadius: '6px',
              border: '1px solid #d1d5db', fontSize: '14px', boxSizing: 'border-box',
            }}
          />
          <input
            type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
            required minLength={6} style={{
              width: '100%', padding: '10px 12px', marginBottom: '16px', borderRadius: '6px',
              border: '1px solid #d1d5db', fontSize: '14px', boxSizing: 'border-box',
            }}
          />
          {error && <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}
          {success && <p style={{ color: '#16a34a', fontSize: '13px', marginBottom: '12px' }}>{success}</p>}
          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '10px', backgroundColor: '#2563eb', color: 'white',
            border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: 600,
            cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1,
          }}>
            {loading ? '...' : tab === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
`;

// ============================================================
// 11. src/app/pricing/page.tsx — Pricing page
// ============================================================
files['src/app/pricing/page.tsx'] = `'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSearchParams } from 'next/navigation';
import AuthModal from '@/components/AuthModal';

const PRICE_MONTHLY = '${CONFIG.STRIPE_PRICE_MONTHLY}';
const PRICE_ANNUAL = '${CONFIG.STRIPE_PRICE_ANNUAL}';

export default function PricingPage() {
  const { user, isPro, loading, profile } = useAuth();
  const searchParams = useSearchParams();
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (searchParams.get('success')) setMessage('Welcome to ToolCraftKit Pro! Your subscription is active.');
    if (searchParams.get('canceled')) setMessage('Checkout was canceled. No charges were made.');
  }, [searchParams]);

  const handleCheckout = async (priceId: string) => {
    if (!user) { setShowAuth(true); return; }
    setCheckoutLoading(priceId);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, userId: user.id, email: user.email }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setMessage(data.error || 'Something went wrong');
    } catch {
      setMessage('Connection error. Please try again.');
    }
    setCheckoutLoading(null);
  };

  const handlePortal = async () => {
    if (!user) return;
    try {
      const res = await fetch('/api/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setMessage('Connection error.');
    }
  };

  const cardStyle = (highlight: boolean) => ({
    border: highlight ? '2px solid #2563eb' : '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '32px 24px',
    flex: '1',
    minWidth: '260px',
    maxWidth: '360px',
    backgroundColor: highlight ? '#eff6ff' : 'white',
    position: 'relative' as const,
  });

  return (
    <div style={{ maxWidth: '900px', margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>
        ToolCraftKit Pro
      </h1>
      <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '40px', fontSize: '16px' }}>
        Unlock unlimited access to all tools — no daily limits, no watermarks.
      </p>

      {message && (
        <div style={{
          padding: '12px 16px', marginBottom: '24px', borderRadius: '8px', textAlign: 'center',
          backgroundColor: message.includes('active') ? '#f0fdf4' : '#fef3c7',
          border: message.includes('active') ? '1px solid #bbf7d0' : '1px solid #fde68a',
        }}>{message}</div>
      )}

      {isPro ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            padding: '24px', backgroundColor: '#f0fdf4', borderRadius: '12px',
            border: '1px solid #bbf7d0', marginBottom: '24px',
          }}>
            <p style={{ fontSize: '18px', fontWeight: 700, color: '#16a34a' }}>\\u2713 You are a Pro member</p>
            <p style={{ color: '#6b7280', marginTop: '8px' }}>
              Plan: {profile?.subscription_plan === 'annual' ? 'Annual' : 'Monthly'}
            </p>
          </div>
          <button onClick={handlePortal} style={{
            padding: '10px 24px', backgroundColor: '#374151', color: 'white',
            border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px',
          }}>Manage Subscription</button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* FREE */}
          <div style={cardStyle(false)}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>Free</h2>
            <p style={{ fontSize: '32px', fontWeight: 800 }}>$0</p>
            <p style={{ color: '#6b7280', marginBottom: '24px', fontSize: '14px' }}>Limited daily usage</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', fontSize: '14px', lineHeight: '2' }}>
              <li>\\u2713 Access to all tools</li>
              <li>\\u2713 Daily usage limits</li>
              <li>\\u2717 Watermark on exports</li>
              <li>\\u2717 Priority processing</li>
            </ul>
            <button disabled style={{
              width: '100%', padding: '10px', backgroundColor: '#e5e7eb', color: '#6b7280',
              border: 'none', borderRadius: '8px', fontSize: '14px',
            }}>Current Plan</button>
          </div>

          {/* MONTHLY */}
          <div style={cardStyle(false)}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>Monthly</h2>
            <p style={{ fontSize: '32px', fontWeight: 800 }}>$4.99<span style={{ fontSize: '14px', fontWeight: 400, color: '#6b7280' }}>/mo</span></p>
            <p style={{ color: '#6b7280', marginBottom: '24px', fontSize: '14px' }}>Cancel anytime</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', fontSize: '14px', lineHeight: '2' }}>
              <li>\\u2713 Unlimited usage</li>
              <li>\\u2713 No watermarks</li>
              <li>\\u2713 Priority processing</li>
              <li>\\u2713 All future tools</li>
            </ul>
            <button onClick={() => handleCheckout(PRICE_MONTHLY)} disabled={!!checkoutLoading} style={{
              width: '100%', padding: '10px', backgroundColor: '#2563eb', color: 'white',
              border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
              cursor: checkoutLoading ? 'wait' : 'pointer', opacity: checkoutLoading === PRICE_MONTHLY ? 0.7 : 1,
            }}>{checkoutLoading === PRICE_MONTHLY ? 'Redirecting...' : 'Get Monthly'}</button>
          </div>

          {/* ANNUAL */}
          <div style={cardStyle(true)}>
            <div style={{
              position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
              backgroundColor: '#2563eb', color: 'white', padding: '4px 16px', borderRadius: '20px',
              fontSize: '12px', fontWeight: 700,
            }}>BEST VALUE</div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>Annual</h2>
            <p style={{ fontSize: '32px', fontWeight: 800 }}>$29.99<span style={{ fontSize: '14px', fontWeight: 400, color: '#6b7280' }}>/yr</span></p>
            <p style={{ color: '#16a34a', marginBottom: '24px', fontSize: '14px', fontWeight: 600 }}>Save 50% — 2 months free</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', fontSize: '14px', lineHeight: '2' }}>
              <li>\\u2713 Everything in Monthly</li>
              <li>\\u2713 Best price per month</li>
              <li>\\u2713 Priority support</li>
              <li>\\u2713 Early access to new tools</li>
            </ul>
            <button onClick={() => handleCheckout(PRICE_ANNUAL)} disabled={!!checkoutLoading} style={{
              width: '100%', padding: '10px', backgroundColor: '#2563eb', color: 'white',
              border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
              cursor: checkoutLoading ? 'wait' : 'pointer', opacity: checkoutLoading === PRICE_ANNUAL ? 0.7 : 1,
            }}>{checkoutLoading === PRICE_ANNUAL ? 'Redirecting...' : 'Get Annual'}</button>
          </div>
        </div>
      )}

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} defaultTab="signup" />
    </div>
  );
}
`;

// ============================================================
// 12. src/app/login/page.tsx — Login page
// ============================================================
files['src/app/login/page.tsx'] = `'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (tab === 'login') {
      const { error: err } = await signIn(email, password);
      if (err) setError(err.message);
      else router.push('/');
    } else {
      const { error: err } = await signUp(email, password);
      if (err) setError(err.message);
      else setSuccess('Check your email to confirm your account.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>
        {tab === 'login' ? 'Log In' : 'Create Account'}
      </h1>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button onClick={() => setTab('login')} style={{
          flex: 1, padding: '8px', border: 'none', cursor: 'pointer',
          borderBottom: tab === 'login' ? '2px solid #2563eb' : '2px solid #e5e7eb',
          fontWeight: tab === 'login' ? 700 : 400, background: 'none',
        }}>Log In</button>
        <button onClick={() => setTab('signup')} style={{
          flex: 1, padding: '8px', border: 'none', cursor: 'pointer',
          borderBottom: tab === 'signup' ? '2px solid #2563eb' : '2px solid #e5e7eb',
          fontWeight: tab === 'signup' ? 700 : 400, background: 'none',
        }}>Sign Up</button>
      </div>

      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
          required style={{ width: '100%', padding: '10px 12px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', boxSizing: 'border-box' }} />
        <input type="password" placeholder="Password (min 6 characters)" value={password} onChange={e => setPassword(e.target.value)}
          required minLength={6} style={{ width: '100%', padding: '10px 12px', marginBottom: '16px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', boxSizing: 'border-box' }} />
        {error && <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}
        {success && <p style={{ color: '#16a34a', fontSize: '13px', marginBottom: '12px' }}>{success}</p>}
        <button type="submit" disabled={loading} style={{
          width: '100%', padding: '10px', backgroundColor: '#2563eb', color: 'white',
          border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 600,
          cursor: loading ? 'wait' : 'pointer',
        }}>{loading ? '...' : tab === 'login' ? 'Log In' : 'Create Account'}</button>
      </form>
    </div>
  );
}
`;

// ============================================================
// WRITE ALL FILES
// ============================================================
const BASE_DIR = process.argv[2] || '.';

let created = 0;
for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(BASE_DIR, filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf-8');
  console.log(`✅ ${filePath}`);
  created++;
}

console.log(`\\n🎉 ${created} files created!`);
console.log(`\\n📋 NEXT STEPS:`);
console.log(`1. Install dependencies: npm install stripe @supabase/supabase-js`);
console.log(`2. Run SQL in Supabase SQL Editor (see supabase-setup.sql)`);
console.log(`3. Add env vars in Vercel:`);
console.log(`   NEXT_PUBLIC_SUPABASE_URL=https://lbsoqxzvtgakorogzloz.supabase.co`);
console.log(`   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your anon key>`);
console.log(`   SUPABASE_SERVICE_ROLE_KEY=<your service_role key>`);
console.log(`   STRIPE_SECRET_KEY=<your sk_live_ key>`);
console.log(`   STRIPE_WEBHOOK_SECRET=<from Stripe webhook setup>`);
console.log(`   NEXT_PUBLIC_SITE_URL=${CONFIG.SITE_URL}`);
console.log(`4. Wrap your layout.tsx with <AuthProvider>`);
console.log(`5. Set up Stripe webhook endpoint: ${CONFIG.SITE_URL}/api/webhook`);
console.log(`6. git add . && git commit -m "feat: Stripe freemium" && git push`);
