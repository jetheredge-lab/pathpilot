import React, { useState } from 'react';
import { GraduationCap, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// The gate shown to signed-out visitors. This is a buying surface, so the copy
// addresses the parent; the app itself addresses the student.
export const AuthScreen: React.FC = () => {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isSignup = mode === 'signup';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Enter your email.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setSubmitting(true);
    const { error: err } = isSignup
      ? await signup(email, password)
      : await login(email, password);
    setSubmitting(false);
    if (err) setError(err);
    // On success, AuthProvider sets the user and the app renders.
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 font-sans text-slate-900">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/20 mb-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div className="text-2xl font-black tracking-tight">
            Rounds<span className="text-brand-600">Ahead</span>
          </div>
          <p className="text-sm text-slate-500 mt-1">The road to medicine starts in high school.</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h1 className="text-lg font-bold mb-1">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-sm text-slate-500 mb-5">
            {isSignup
              ? 'Set up your family account to start planning.'
              : 'Sign in to your family account.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
              <input
                type="password"
                autoComplete={isSignup ? 'new-password' : 'current-password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                placeholder={isSignup ? 'At least 8 characters' : 'Your password'}
              />
            </div>

            {error && (
              <p className="text-sm text-rose-600 font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSignup ? 'Create account' : 'Sign in'}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-slate-500">
            {isSignup ? 'Already have an account?' : 'New to RoundsAhead?'}{' '}
            <button
              onClick={() => {
                setMode(isSignup ? 'login' : 'signup');
                setError(null);
              }}
              className="font-semibold text-brand-600 hover:text-brand-700"
            >
              {isSignup ? 'Sign in' : 'Create an account'}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Pre-health pathway planning for high school students and their families.
        </p>
      </div>
    </div>
  );
};
