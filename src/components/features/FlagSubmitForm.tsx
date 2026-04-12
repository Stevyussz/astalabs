'use client';
// src/components/features/FlagSubmitForm.tsx
import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface FlagSubmitFormProps {
  challengeId: string;
  isSolved: boolean;
  onSolved?: (points: number) => void;
}

type SubmitState = 'idle' | 'loading' | 'correct' | 'incorrect' | 'error';

export function FlagSubmitForm({ challengeId, isSolved, onSolved }: FlagSubmitFormProps) {
  const [flag, setFlag] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [message, setMessage] = useState('');
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  const startCooldownTimer = useCallback((ms: number) => {
    let remaining = Math.ceil(ms / 1000);
    setCooldownSeconds(remaining);
    const interval = setInterval(() => {
      remaining -= 1;
      setCooldownSeconds(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        setCooldownSeconds(0);
        setSubmitState('idle');
      }
    }, 1000);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flag.trim() || submitState === 'loading' || cooldownSeconds > 0) return;

    setSubmitState('loading');
    setMessage('');

    try {
      const res = await fetch('/api/submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeId, flag }),
      });

      const json = await res.json();

      if (res.status === 429) {
        const retryMs = parseInt(res.headers.get('Retry-After') ?? '5', 10) * 1000;
        setSubmitState('error');
        setMessage(json.error ?? 'Terlalu banyak permintaan. Harap tunggu.');
        startCooldownTimer(retryMs);
        return;
      }

      if (!res.ok || !json.success) {
        setSubmitState('error');
        setMessage(json.error ?? 'Terjadi kesalahan. Silakan coba lagi.');
        return;
      }

      const result = json.data;
      if (result.isCorrect) {
        setSubmitState('correct');
        setMessage(result.message);
        setFlag('');
        onSolved?.(result.pointsAwarded ?? 0);
      } else {
        setSubmitState('incorrect');
        setMessage(result.message ?? 'Flag salah. Coba lagi!');
        startCooldownTimer(5000);
      }
    } catch {
      setSubmitState('error');
      setMessage('Kesalahan jaringan. Silakan coba lagi.');
    }
  };

  if (isSolved) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        borderRadius: 12, border: '1px solid rgba(16,185,129,0.3)',
        background: 'rgba(16,185,129,0.1)', padding: '16px 20px',
      }}>
        <svg style={{ width: 20, height: 20, color: '#34d399', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <p style={{ color: '#34d399', fontWeight: 500, margin: 0, fontSize: 14 }}>Target Dieliminasi. Flag Diamankan!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <Input
            id="flag-input"
            type="text"
            placeholder="CTF{your_flag_here}"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            disabled={submitState === 'loading' || cooldownSeconds > 0}
            aria-label="Flag input"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
            leftIcon={
              <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
            }
          />
        </div>
        <Button
          id="submit-flag-button"
          type="submit"
          variant="primary"
          isLoading={submitState === 'loading'}
          disabled={cooldownSeconds > 0 || !flag.trim()}
          style={{ height: 48, borderRadius: 12, padding: '0 24px' }}
        >
          {cooldownSeconds > 0 ? `Tunggu ${cooldownSeconds}dtk` : 'Kirim'}
        </Button>
      </div>

      {/* Feedback message */}
      {message && (
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            borderRadius: 8, padding: '12px 16px', fontSize: 14, fontWeight: 500,
            ...(submitState === 'correct' 
              ? { background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399' }
              : submitState === 'incorrect' || submitState === 'error'
              ? { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }
              : {})
          }}
          role="alert"
        >
          {submitState === 'correct' && (
            <svg style={{ width: 16, height: 16, flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          {(submitState === 'incorrect' || submitState === 'error') && (
            <svg style={{ width: 16, height: 16, flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
          {message}
        </div>
      )}
    </form>
  );
}
