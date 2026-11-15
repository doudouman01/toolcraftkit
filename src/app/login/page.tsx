'use client';

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
