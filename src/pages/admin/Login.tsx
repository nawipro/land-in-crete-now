import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { cleanupAuthState } from '@/lib/auth';

const Login: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [mode, setMode] = React.useState<'signin' | 'signup'>('signin');

  React.useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    // Listen first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        // Redirect authenticated users directly to Content Manager
        window.location.href = '/admin/content';
      }
    });

    // Then check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        window.location.href = '/admin/content';
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = getSupabaseClient();
    if (!supabase) {
      toast({ title: 'Supabase not configured', description: 'Connect your project to Supabase (green button top-right) and refresh.' });
      return;
    }
    setLoading(true);

    try {
      // Ensure clean state before auth
      cleanupAuthState();
      try { await supabase.auth.signOut({ scope: 'global' } as any); } catch {}

      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: 'ברוך הבא' });
        // Force reload + redirect handled in listener
        window.location.href = '/admin/content';
      } else {
        const redirectUrl = `${window.location.origin}/admin/content`;
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectUrl }
        });
        if (error) throw error;
        if (data.session) {
          toast({ title: 'נרשמת והתחברת בהצלחה' });
          window.location.href = '/admin/content';
        } else {
          toast({
            title: 'כמעט סיימנו',
            description: 'נשלח מייל אישור. אחרי אישור תופנה אוטומטית לאדמין.'
          });
        }
      }
    } catch (err: any) {
      toast({ title: 'שגיאה', description: err?.message || 'הפעולה נכשלה' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <header className="space-y-1">
            <h1 className="text-2xl font-semibold">{mode === 'signin' ? 'התחברות אדמין' : 'הרשמת אדמין'}</h1>
            <p className="text-sm text-muted-foreground">
              {mode === 'signin' ? 'היכנס עם אימייל וסיסמה' : 'צור משתמש עם אימייל וסיסמה'}
            </p>
          </header>

          <div className="flex gap-2">
            <Button variant={mode === 'signin' ? 'default' : 'outline'} size="sm" onClick={() => setMode('signin')}>
              התחברות
            </Button>
            <Button variant={mode === 'signup' ? 'default' : 'outline'} size="sm" onClick={() => setMode('signup')}>
              הרשמה
            </Button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">אימייל</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">סיסמה</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (mode === 'signin' ? 'מתחבר…' : 'נרשם…') : (mode === 'signin' ? 'התחבר' : 'הרשם')}
            </Button>
          </form>

          <section className="pt-2 border-t space-y-1">
            <h2 className="text-sm font-medium">הגדרה ראשונית</h2>
            <p className="text-xs text-muted-foreground">
              ודא שהגדרת ב‑Supabase את Site URL ו‑Redirect URLs תחת Authentication ▶ URL Configuration. לבדיקות אפשר לשקול לבטל Confirm email.
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
};

export default Login;
