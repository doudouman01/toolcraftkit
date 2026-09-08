'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSearchParams } from 'next/navigation';
import AuthModal from '@/components/AuthModal';

export const dynamic = 'force-dynamic';

const PRICE_MONTHLY = 'price_1UDAZ35cQm71aMnsolHy0jZI';
const PRICE_ANNUAL = 'price_1UDAZ35cQm71aMnsQif2nm1a';

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
            <p style={{ fontSize: '18px', fontWeight: 700, color: '#16a34a' }}>\u2713 You are a Pro member</p>
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
              <li>\u2713 Access to all tools</li>
              <li>\u2713 Daily usage limits</li>
              <li>\u2717 Watermark on exports</li>
              <li>\u2717 Priority processing</li>
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
              <li>\u2713 Unlimited usage</li>
              <li>\u2713 No watermarks</li>
              <li>\u2713 Priority processing</li>
              <li>\u2713 All future tools</li>
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
              <li>\u2713 Everything in Monthly</li>
              <li>\u2713 Best price per month</li>
              <li>\u2713 Priority support</li>
              <li>\u2713 Early access to new tools</li>
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
