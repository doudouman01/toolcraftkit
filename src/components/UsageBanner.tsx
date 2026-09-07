'use client';

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
      border: `1px solid ${isAtLimit ? '#fecaca' : '#bae6fd'}`,
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
          <>You\u2019ve reached your free limit {periodLabel}.</>
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
