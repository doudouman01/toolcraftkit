'use client';

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
