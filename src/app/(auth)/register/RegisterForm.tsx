'use client';
// src/app/(auth)/register/RegisterForm.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { registerSchema } from '@/validations/auth';
import { ZodError } from 'zod';

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGlobalError('');

    try {
      registerSchema.parse(form);
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          if (issue.path[0]) fieldErrors[issue.path[0] as string] = issue.message;
        });
        setErrors(fieldErrors);
        return;
      }
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setGlobalError(json.error ?? 'Daftar gagal nih. Coba lagi ya.');
        return;
      }

      // Auto-login after successful registration
      const loginResult = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (loginResult?.error) {
        router.push('/login');
        return;
      }

      router.push('/challenges');
      router.refresh();
    } catch {
      setGlobalError('Terjadi kesalahan yang tidak terduga. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {globalError && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400" role="alert">
          {globalError}
        </div>
      )}

      <Input
        id="register-username"
        label="Username"
        type="text"
        placeholder="h4ck3r"
        value={form.username}
        onChange={update('username')}
        error={errors.username}
        hint="3-20 karakter, huruf/angka/underskor/tanda hubung"
        autoComplete="username"
        leftIcon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
      />

      <Input
        id="register-email"
        label="Email"
        type="email"
        placeholder="hacker@example.com"
        value={form.email}
        onChange={update('email')}
        error={errors.email}
        autoComplete="email"
        leftIcon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        }
      />

      <Input
        id="register-password"
        label="Password"
        type="password"
        placeholder="••••••••"
        value={form.password}
        onChange={update('password')}
        error={errors.password}
        hint="Minimal 8 karakter, wajib ada huruf kapital + angka"
        autoComplete="new-password"
        leftIcon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        }
      />

      <Button
        id="register-submit"
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full"
      >
        Daftar Sekarang
      </Button>

      <p className="text-center text-sm text-foreground/50">
        Udah punya akses?{' '}
        <Link href="/login" className="text-cyber-green hover:text-cyber-green/80 font-medium transition-colors">
          Login di sini
        </Link>
      </p>
    </form>
  );
}
