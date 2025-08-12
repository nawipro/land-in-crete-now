import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = getSupabaseClient();
    if (!supabase) {
      toast({ title: 'Supabase לא מוגדר', description: 'חבר את הפרויקט ל‑Supabase ורענן.' });
      return;
    }
    if (!password || password.length < 6) {
      toast({ title: 'סיסמה קצרה מדי', description: 'הזן סיסמה של 6 תווים לפחות.' });
      return;
    }
    if (password !== confirm) {
      toast({ title: 'אי התאמה', description: 'הסיסמאות אינן תואמות.' });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast({ title: 'הסיסמה עודכנה' });
      // לאחר עדכון סיסמה נכנסים לחשבון ומופנים לאדמין
      window.location.href = '/admin/content';
    } catch (err: any) {
      toast({ title: 'שגיאה', description: err?.message || 'עדכון הסיסמה נכשל. ודא שנכנסת דרך הקישור במייל.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <header className="space-y-1">
            <h1 className="text-2xl font-semibold">איפוס סיסמה</h1>
            <p className="text-sm text-muted-foreground">הזן סיסמה חדשה לאחר הקלקה על הקישור מהמייל.</p>
          </header>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">סיסמה חדשה</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">אימות סיסמה</Label>
              <Input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'מעדכן…' : 'עדכן סיסמה'}
            </Button>
          </form>

          <div className="text-center text-sm">
            <Link to="/admin/login" className="underline">חזרה למסך התחברות</Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default ResetPassword;
