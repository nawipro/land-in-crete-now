import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = getSupabaseClient();
    if (!supabase) {
      toast({ title: 'Supabase not configured', description: 'Connect your project to Supabase (green button top-right) and refresh.' });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: 'Login failed', description: error.message });
    } else {
      toast({ title: 'Welcome back' });
      navigate('/admin/content');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <header>
            <h1 className="text-2xl font-semibold">Admin Login</h1>
            <p className="text-sm text-muted-foreground">Sign in with your email and password</p>
          </header>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing in…' : 'Sign In'}</Button>
          </form>
          <section className="pt-2 border-t">
            <h2 className="text-sm font-medium mb-1">First-time setup</h2>
            <p className="text-xs text-muted-foreground">Ensure Supabase is connected. After login, open Content Manager to see the SQL needed for schema setup.</p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
};

export default Login;
