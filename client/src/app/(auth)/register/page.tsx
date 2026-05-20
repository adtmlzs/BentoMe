'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    startTransition(async () => {
      try {
        const supabase = createClient();
        const { error: signUpError, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            // Redirect user back to BentoLink production website after verifying email
            emailRedirectTo: 'https://bentolink.vercel.app/login',
          },
        });

        if (signUpError) {
          setError(signUpError.message);
          return;
        }

        if (data.user) {
          // If password sign up succeeded, check if session is active (auto-login enabled in Supabase default settings)
          const { data: sessionData } = await supabase.auth.getSession();
          if (sessionData.session) {
            // Force sign-out to prevent auto-login, so the user MUST verify and sign in manually!
            await supabase.auth.signOut();
          }
          setSuccess(true);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      }
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative">
      {/* Decorative gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[128px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/[0.02] border border-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold mb-3">
            <span>🍱</span>
            <span className="text-white">Bento<span className="text-violet-400">Link</span></span>
          </Link>
          <h2 className="text-xl font-semibold text-white/90">Create an account</h2>
          <p className="text-sm text-white/40 mt-1">Start building your aesthetic profile</p>
        </div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="text-4xl mb-4 animate-pulse">✉️</div>
            <h3 className="text-lg font-bold text-white mb-2">Verification Email Sent</h3>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              We have sent a verification link to <span className="text-violet-400 font-semibold">{email}</span>.<br />
              Please check your email inbox and click the verification link to activate your account.
            </p>
            <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs mb-6 text-left flex items-start gap-2">
              <span className="text-sm">💡</span>
              <p>
                <strong>Next Steps:</strong> Check your inbox (and spam folder). Once you click the link, you will be redirected to verify, and then you can return here to sign in.
              </p>
            </div>
            <Link
              href="/login"
              className="inline-block w-full py-3 px-4 rounded-xl bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white font-semibold text-sm transition-all shadow-lg shadow-violet-500/20 hover:scale-[1.01] text-center"
            >
              Proceed to Sign In
            </Link>
          </motion.div>
        ) : (
          <>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/45 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field"
                  disabled={isPending}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/45 mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field"
                  disabled={isPending}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/45 mb-1.5">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field"
                  disabled={isPending}
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 px-4 rounded-xl bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white font-semibold text-sm transition-all duration-250 shadow-lg shadow-violet-500/20 hover:scale-[1.01] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>

            <p className="text-center text-xs text-white/35 mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
