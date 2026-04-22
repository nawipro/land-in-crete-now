import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { cleanupAuthState } from '@/lib/auth';

const Login: React.FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  React.useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        window.location.href = '/admin';
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        window.location.href = '/admin';
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = getSupabaseClient();
    if (!supabase) {
      toast({ title: 'Error', description: 'Supabase not configured' });
      return;
    }
    setLoading(true);

    const ALLOWED_EMAIL = 'nawipro@gmail.com';
    if (email.toLowerCase().trim() !== ALLOWED_EMAIL) {
      toast({ title: 'Access denied', description: 'This email is not authorized' });
      setLoading(false);
      return;
    }

    try {
      cleanupAuthState();

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        },
      });

      if (error) throw error;

      setSent(true);
      toast({ title: 'Magic link sent', description: 'Check your email and click the link to sign in' });
    } catch (err: any) {
      toast({ title: 'Error', description: err?.message || 'Failed to send magic link' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f8f5f2] px-6">
      <div className="w-full max-w-[420px]">

        <div className="text-center mb-10">
          <h1 className="text-[32px] font-cormorant font-medium text-[#1A1714] mb-2">
            Now We Land
          </h1>
          <p className="text-[14px] font-inter text-[#8a8580]">
            Admin Panel
          </p>
        </div>

        <div className="bg-white border border-[#e9e4df] rounded-xl p-8 lg:p-10">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 bg-[#c5a059]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-[#c5a059]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h2 className="text-[22px] font-cormorant font-medium text-[#1A1714]">
                Check your email
              </h2>
              <p className="text-[15px] font-inter text-[#8a8580] font-light leading-relaxed">
                We sent a magic link to <strong className="text-[#1A1714]">{email}</strong>
              </p>
              <p className="text-[13px] font-inter text-[#B8B2AC]">
                Click the link in the email to sign in. It expires in 10 minutes
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-[13px] font-inter text-[#c5a059] hover:text-[#d4af6a] transition-colors mt-4"
              >
                Try a different email
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-[20px] font-cormorant font-medium text-[#1A1714] mb-2">
                Sign in
              </h2>
              <p className="text-[14px] font-inter text-[#8a8580] font-light mb-8">
                Enter your email and we will send you a magic link
              </p>

              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label className="block text-[11px] font-inter font-bold uppercase tracking-[0.16em] text-[#c5a059] mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="h-12 w-full text-[16px] font-inter text-[#1A1714] border-0 border-b border-[#e2e8f0] rounded-none bg-transparent px-0 placeholder:text-[#B8B2AC] focus:ring-0 focus:outline-none focus:border-[#c5a059] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#0f172a] text-white text-[13px] font-inter font-bold uppercase tracking-[0.18em] hover:bg-[#c5a059] transition-colors duration-300 disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Magic Link'}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-[12px] font-inter text-[#B8B2AC] mt-6">
          Access restricted to authorized personnel only
        </p>
      </div>
    </main>
  );
};

export default Login;
