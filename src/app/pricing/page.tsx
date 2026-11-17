'use client';

import { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/useTranslation';
import AuthModal from '@/components/AuthModal';
import type { LocaleCode } from '@/lib/i18n/locales';

const PRICE_MONTHLY = 'price_1UDAZ35cQm71aMnsolHy0jZI';
const PRICE_ANNUAL = 'price_1UDAZ35cQm71aMnsQif2nm1a';

const PRICE_BY_LOCALE: Record<string, { monthly: string; annual: string; suffix: string }> = {
  en: { monthly: '$4.99', annual: '$29.99', suffix: 'CAD' },
  fr: { monthly: '4,49 €', annual: '26,99 €', suffix: 'EUR' },
  de: { monthly: '4,49 €', annual: '26,99 €', suffix: 'EUR' },
  es: { monthly: '4,49 €', annual: '26,99 €', suffix: 'EUR' },
  it: { monthly: '4,49 €', annual: '26,99 €', suffix: 'EUR' },
  hi: { monthly: '₹399', annual: '₹2,399', suffix: 'INR' },
  ja: { monthly: '¥750', annual: '¥4,500', suffix: 'JPY' },
  da: { monthly: '29 kr', annual: '179 kr', suffix: 'DKK' },
  nl: { monthly: '4,49 €', annual: '26,99 €', suffix: 'EUR' },
  sv: { monthly: '49 kr', annual: '299 kr', suffix: 'SEK' },
  pl: { monthly: '19,99 zł', annual: '119,99 zł', suffix: 'PLN' },
  pt: { monthly: 'R$ 24,99', annual: 'R$ 149,99', suffix: 'BRL' },
  fi: { monthly: '4,49 €', annual: '26,99 €', suffix: 'EUR' },
  id: { monthly: 'Rp 79.000', annual: 'Rp 479.000', suffix: 'IDR' },
  ms: { monthly: 'RM 22,99', annual: 'RM 139,99', suffix: 'MYR' },
  ro: { monthly: '22,99 lei', annual: '139,99 lei', suffix: 'RON' },
  el: { monthly: '4,49 €', annual: '26,99 €', suffix: 'EUR' },
  cs: { monthly: '109 Kč', annual: '659 Kč', suffix: 'CZK' },
  vi: { monthly: '119.000 ₫', annual: '719.000 ₫', suffix: 'VND' },
  is: { monthly: '690 kr', annual: '4.190 kr', suffix: 'ISK' },
  ar: { monthly: '18,99 AED', annual: '114,99 AED', suffix: 'AED' },
  ko: { monthly: '₩6,500', annual: '₩39,000', suffix: 'KRW' },
  tr: { monthly: '149,99 ₺', annual: '899,99 ₺', suffix: 'TRY' },
  th: { monthly: '฿169', annual: '฿999', suffix: 'THB' },
  ru: { monthly: '449 ₽', annual: '2 699 ₽', suffix: 'RUB' },
};

function getLocalePrice(locale: LocaleCode) {
  return PRICE_BY_LOCALE[locale] || PRICE_BY_LOCALE['en'];
}

function PricingContent() {
  const { user, isPro, loading, profile } = useAuth();
  const { locale, t } = useTranslation();
  const searchParams = useSearchParams();
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [message, setMessage] = useState('');

  const prices = getLocalePrice(locale);
  const isLocalCurrency = locale !== 'en';

  useEffect(() => {
    if (searchParams.get('success')) setMessage(t('pricing.successMessage') !== 'pricing.successMessage' ? t('pricing.successMessage') : 'Welcome to ToolCraftKit Pro! Your subscription is active.');
    if (searchParams.get('canceled')) setMessage(t('pricing.canceledMessage') !== 'pricing.canceledMessage' ? t('pricing.canceledMessage') : 'Checkout was canceled. No charges were made.');
  }, [searchParams, t]);

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

  const billedInCAD = isLocalCurrency ? (
    <span style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>
      ≈ {t('pricing.billedInCAD')}
    </span>
  ) : null;

  return (
    <div style={{ maxWidth: '900px', margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>
        {t('pricing.title')}
      </h1>
      <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '40px', fontSize: '16px' }}>
        {t('pricing.subtitle')}
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
            <p style={{ fontSize: '18px', fontWeight: 700, color: '#16a34a' }}>✓ {t('pricing.proMember')}</p>
            <p style={{ color: '#6b7280', marginTop: '8px' }}>
              {t('pricing.plan')}: {profile?.subscription_plan === 'annual' ? t('pricing.annual') : t('pricing.monthly')}
            </p>
          </div>
          <button onClick={handlePortal} style={{
            padding: '10px 24px', backgroundColor: '#374151', color: 'white',
            border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px',
          }}>{t('pricing.manageSubscription')}</button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={cardStyle(false)}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>{t('pricing.free')}</h2>
            <p style={{ fontSize: '32px', fontWeight: 800 }}>$0</p>
            <p style={{ color: '#6b7280', marginBottom: '24px', fontSize: '14px' }}>{t('pricing.freeDesc')}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', fontSize: '14px', lineHeight: '2' }}>
              <li>✓ {t('pricing.features.freeTools')}</li>
              <li>✓ {t('pricing.features.limitedUsage')}</li>
              <li>✗ {t('pricing.features.noWatermark')}</li>
              <li>✗ {t('pricing.features.prioritySupport')}</li>
            </ul>
            <button disabled style={{
              width: '100%', padding: '10px', backgroundColor: '#e5e7eb', color: '#6b7280',
              border: 'none', borderRadius: '8px', fontSize: '14px',
            }}>{t('pricing.currentPlan')}</button>
          </div>

          <div style={cardStyle(false)}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>{t('pricing.monthly')}</h2>
            <p style={{ fontSize: '32px', fontWeight: 800 }}>
              {isLocalCurrency ? '≈ ' : ''}{prices.monthly}
              <span style={{ fontSize: '14px', fontWeight: 400, color: '#6b7280' }}>{t('pricing.perMonth')}</span>
            </p>
            {billedInCAD}
            <p style={{ color: '#6b7280', marginBottom: '24px', fontSize: '14px' }}>{t('pricing.cancelAnytime')}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', fontSize: '14px', lineHeight: '2' }}>
              <li>✓ {t('pricing.features.unlimitedTools')}</li>
              <li>✓ {t('pricing.features.noWatermark')}</li>
              <li>✓ {t('pricing.features.prioritySupport')}</li>
              <li>✓ {t('pricing.features.earlyAccess')}</li>
            </ul>
            <button onClick={() => handleCheckout(PRICE_MONTHLY)} disabled={!!checkoutLoading} style={{
              width: '100%', padding: '10px', backgroundColor: '#2563eb', color: 'white',
              border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
              cursor: checkoutLoading ? 'wait' : 'pointer', opacity: checkoutLoading === PRICE_MONTHLY ? 0.7 : 1,
            }}>{checkoutLoading === PRICE_MONTHLY ? t('pricing.redirecting') : t('pricing.subscribe')}</button>
          </div>

          <div style={cardStyle(true)}>
            <div style={{
              position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
              backgroundColor: '#2563eb', color: 'white', padding: '4px 16px', borderRadius: '20px',
              fontSize: '12px', fontWeight: 700,
            }}>{t('pricing.bestValue')}</div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>{t('pricing.annual')}</h2>
            <p style={{ fontSize: '32px', fontWeight: 800 }}>
              {isLocalCurrency ? '≈ ' : ''}{prices.annual}
              <span style={{ fontSize: '14px', fontWeight: 400, color: '#6b7280' }}>{t('pricing.perYear')}</span>
            </p>
            {billedInCAD}
            <p style={{ color: '#16a34a', marginBottom: '24px', fontSize: '14px', fontWeight: 600 }}>{t('pricing.save')} 50% — {t('pricing.twoMonthsFree')}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', fontSize: '14px', lineHeight: '2' }}>
              <li>✓ {t('pricing.features.unlimitedTools')}</li>
              <li>✓ {t('pricing.features.unlimitedUsage')}</li>
              <li>✓ {t('pricing.features.prioritySupport')}</li>
              <li>✓ {t('pricing.features.earlyAccess')}</li>
            </ul>
            <button onClick={() => handleCheckout(PRICE_ANNUAL)} disabled={!!checkoutLoading} style={{
              width: '100%', padding: '10px', backgroundColor: '#2563eb', color: 'white',
              border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
              cursor: checkoutLoading ? 'wait' : 'pointer', opacity: checkoutLoading === PRICE_ANNUAL ? 0.7 : 1,
            }}>{checkoutLoading === PRICE_ANNUAL ? t('pricing.redirecting') : t('pricing.subscribe')}</button>
          </div>
        </div>
      )}

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} defaultTab="signup" />
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '60px' }}>Loading...</div>}>
      <PricingContent />
    </Suspense>
  );
}
