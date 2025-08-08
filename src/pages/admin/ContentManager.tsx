import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { ensurePagesSeeded, getPageContent, publish, saveDraft, type PageSlug } from '@/lib/cms';
import PagePicker from '@/components/admin/PagePicker';
import FieldText from '@/components/admin/FieldText';
import FieldArray from '@/components/admin/FieldArray';
import ImageUploader from '@/components/admin/ImageUploader';
import GalleryEditor from '@/components/admin/GalleryEditor';
import PublishBar from '@/components/admin/PublishBar';
import PreviewPane from '@/components/admin/PreviewPane';

const DEFAULTS: Record<PageSlug, any> = {
  home: {
    hero_title: 'Now We Land',
    hero_subtitle: '',
    chips: ['Family Friendly', 'Private Pool', '14 min to CHQ Airport'],
    primary_cta: { text: 'Book Your Stay', href: '/booking' },
    secondary_cta: { text: 'Explore More', href: '/about' },
    hero_image: { url: '', alt: 'Sunset over the bay' },
    notes: ''
  },
  about: {
    headline: 'Now We Land – Your Private Horizon',
    intro: 'Short, sales-oriented paragraph...',
    features: ['Private Pool', 'Garden & BBQ', 'Hidden Bay Access', 'Sunset Views'],
    stats: { distance_to_bay: '90 m', max_guests: '8', bedrooms: '3.5' },
    image: { url: '', alt: 'Villa and garden view during the day' }
  },
  gallery: { images: [] },
  explore: { hero_title: 'Explore the Area', attractions: [], hero_image: { url: '', alt: '' } },
  booking: { intro: 'Simple instructions text…', mailto: 'bookings@nowweland.com', whatsapp: '+30…', cta: { text: 'Send inquiry', href: 'mailto:…' } },
  contact: { address: '…', phone: '+30…', email: '…', map_embed_url: '…' }
};

const ContentManager: React.FC = () => {
  const navigate = useNavigate();
  const supabase = getSupabaseClient();
  const { toast } = useToast();
  const [authed, setAuthed] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<PageSlug>('home');
  const [status, setStatus] = React.useState<'draft' | 'published'>('draft');
  const [lang, setLang] = React.useState<'en' | 'he'>('he');
  const [data, setData] = React.useState<any>(DEFAULTS['home']);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate('/admin/login');
      } else {
        setAuthed(true);
      }
    });
  }, [supabase, navigate]);

  React.useEffect(() => {
    let isMounted = true;
    async function load() {
      if (!supabase) return;
      setLoading(true);
      try {
        // Ensure pages table seeded (requires auth)
        await ensurePagesSeeded(supabase);
      } catch {}
      const content = await getPageContent(supabase, page, lang, status);
      if (isMounted) setData(content ?? DEFAULTS[page]);
      setLoading(false);
    }
    load();
    return () => { isMounted = false; };
  }, [page, status, lang, supabase]);

  if (!supabase) {
    return (
      <main className="min-h-screen p-6 container">
        <Card>
          <CardContent className="p-6 space-y-3">
            <h1 className="text-2xl font-semibold">Content Manager</h1>
            <p className="text-muted-foreground">Supabase is not configured. Connect your project to Supabase (green button top-right) and refresh.</p>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (!authed) return null;

  const onSave = async () => {
    try {
      await saveDraft(supabase, page, lang, data);
      toast({ title: 'Draft saved' });
    } catch (e: any) {
      toast({ title: 'Save failed', description: e.message });
    }
  };

  const onPublish = async () => {
    try {
      await saveDraft(supabase, page, lang, data);
      await publish(supabase, page, lang);
      setStatus('published');
      toast({ title: 'Published' });
    } catch (e: any) {
      toast({ title: 'Publish failed', description: e.message });
    }
  };

  const logout = async () => {
    try {
      const { cleanupAuthState } = await import('@/lib/auth');
      cleanupAuthState();
      try { await supabase.auth.signOut({ scope: 'global' } as any); } catch {}
    } finally {
      window.location.href = '/admin/login';
    }
  };

  const renderEditor = () => {
    switch (page) {
      case 'home':
        return (
          <div className="space-y-6">
            <FieldText label="Hero title" value={data.hero_title} onChange={(v) => setData({ ...data, hero_title: v })} required maxLength={80} />
            <FieldText label="Hero subtitle" value={data.hero_subtitle} onChange={(v) => setData({ ...data, hero_subtitle: v })} maxLength={160} />
            <FieldArray label="Chips" values={data.chips || []} onChange={(arr) => setData({ ...data, chips: arr })} />
            <div className="grid md:grid-cols-2 gap-4">
              <FieldText label="Primary CTA text" value={data.primary_cta?.text || ''} onChange={(v) => setData({ ...data, primary_cta: { ...(data.primary_cta||{}), text: v } })} />
              <FieldText label="Primary CTA href" value={data.primary_cta?.href || ''} onChange={(v) => setData({ ...data, primary_cta: { ...(data.primary_cta||{}), href: v } })} />
              <FieldText label="Secondary CTA text" value={data.secondary_cta?.text || ''} onChange={(v) => setData({ ...data, secondary_cta: { ...(data.secondary_cta||{}), text: v } })} />
              <FieldText label="Secondary CTA href" value={data.secondary_cta?.href || ''} onChange={(v) => setData({ ...data, secondary_cta: { ...(data.secondary_cta||{}), href: v } })} />
            </div>
            <ImageUploader slug="home" label="Hero image" value={data.hero_image?.url || ''} alt={data.hero_image?.alt || ''}
              onChange={(url, alt) => setData({ ...data, hero_image: { url, alt } })} />
            <FieldText label="Notes" value={data.notes || ''} onChange={(v) => setData({ ...data, notes: v })} textarea />
          </div>
        );
      case 'about':
        return (
          <div className="space-y-6">
            <FieldText label="Headline" value={data.headline} onChange={(v) => setData({ ...data, headline: v })} required />
            <FieldText label="Intro" value={data.intro} onChange={(v) => setData({ ...data, intro: v })} textarea />
            <FieldArray label="Features" values={data.features || []} onChange={(arr) => setData({ ...data, features: arr })} />
            <div className="grid md:grid-cols-3 gap-4">
              <FieldText label="Distance to bay" value={data.stats?.distance_to_bay || ''} onChange={(v) => setData({ ...data, stats: { ...(data.stats||{}), distance_to_bay: v } })} />
              <FieldText label="Max guests" value={data.stats?.max_guests || ''} onChange={(v) => setData({ ...data, stats: { ...(data.stats||{}), max_guests: v } })} />
              <FieldText label="Bedrooms" value={data.stats?.bedrooms || ''} onChange={(v) => setData({ ...data, stats: { ...(data.stats||{}), bedrooms: v } })} />
            </div>
            <ImageUploader slug="about" label="Main image" value={data.image?.url || ''} alt={data.image?.alt || ''}
              onChange={(url, alt) => setData({ ...data, image: { url, alt } })} />
          </div>
        );
      case 'gallery':
        return (
          <GalleryEditor value={data.images || []} onChange={(images) => setData({ ...data, images })} />
        );
      case 'explore':
        return (
          <div className="space-y-6">
            <FieldText label="Hero title" value={data.hero_title || ''} onChange={(v) => setData({ ...data, hero_title: v })} />
            <ImageUploader slug="explore" label="Hero image" value={data.hero_image?.url || ''} alt={data.hero_image?.alt || ''}
              onChange={(url, alt) => setData({ ...data, hero_image: { url, alt } })} />
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Attractions</h4>
              <Button variant="outline" size="sm" onClick={() => setData({ ...data, attractions: [...(data.attractions||[]), { name: '', distance: '', why: '' }] })}>Add</Button>
              <div className="space-y-3">
                {(data.attractions||[]).map((item: any, idx: number) => (
                  <Card key={idx}><CardContent className="p-4 grid md:grid-cols-3 gap-3">
                    <FieldText label="Name" value={item.name} onChange={(v) => {
                      const arr = [...data.attractions]; arr[idx] = { ...arr[idx], name: v }; setData({ ...data, attractions: arr });
                    }} />
                    <FieldText label="Distance" value={item.distance} onChange={(v) => {
                      const arr = [...data.attractions]; arr[idx] = { ...arr[idx], distance: v }; setData({ ...data, attractions: arr });
                    }} />
                    <FieldText label="Why" value={item.why} onChange={(v) => {
                      const arr = [...data.attractions]; arr[idx] = { ...arr[idx], why: v }; setData({ ...data, attractions: arr });
                    }} />
                    <div className="md:col-span-3 flex justify-end"><Button variant="ghost" size="sm" onClick={() => {
                      const arr = [...data.attractions]; arr.splice(idx,1); setData({ ...data, attractions: arr });
                    }}>Remove</Button></div>
                  </CardContent></Card>
                ))}
              </div>
            </div>
          </div>
        );
      case 'booking':
        return (
          <div className="space-y-6">
            <FieldText label="Intro" value={data.intro || ''} onChange={(v) => setData({ ...data, intro: v })} textarea />
            <div className="grid md:grid-cols-3 gap-4">
              <FieldText label="Email (mailto)" value={data.mailto || ''} onChange={(v) => setData({ ...data, mailto: v })} />
              <FieldText label="WhatsApp" value={data.whatsapp || ''} onChange={(v) => setData({ ...data, whatsapp: v })} />
              <>
                <FieldText label="CTA text" value={data.cta?.text || ''} onChange={(v) => setData({ ...data, cta: { ...(data.cta||{}), text: v } })} />
                <FieldText label="CTA href" value={data.cta?.href || ''} onChange={(v) => setData({ ...data, cta: { ...(data.cta||{}), href: v } })} />
              </>
            </div>
          </div>
        );
      case 'contact':
      default:
        return (
          <div className="space-y-6">
            <FieldText label="Address" value={data.address || ''} onChange={(v) => setData({ ...data, address: v })} />
            <div className="grid md:grid-cols-2 gap-4">
              <FieldText label="Phone" value={data.phone || ''} onChange={(v) => setData({ ...data, phone: v })} />
              <FieldText label="Email" value={data.email || ''} onChange={(v) => setData({ ...data, email: v })} />
            </div>
            <FieldText label="Map embed URL" value={data.map_embed_url || ''} onChange={(v) => setData({ ...data, map_embed_url: v })} textarea />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr]">
      <header className="border-b py-3">
        <div className="container flex items-center justify-between">
          <h1 className="text-xl font-semibold">Content Manager</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate('/')}>View site</Button>
            <Button variant="secondary" onClick={logout}>Log out</Button>
          </div>
        </div>
      </header>
      <main className="grid md:grid-cols-[280px,1fr]">
        <aside className="border-r p-4">
          <PagePicker value={page} onChange={(p) => setPage(p)} />
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Language</h3>
            <Tabs value={lang} onValueChange={(v) => setLang(v as any)}>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="he">עברית</TabsTrigger>
                <TabsTrigger value="en">English</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="mt-6">
            <Tabs value={status} onValueChange={(v) => setStatus(v as any)}>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="mt-6">
            <Card>
              <CardContent className="p-4 space-y-2">
                <h3 className="text-sm font-medium">Setup</h3>
                <p className="text-xs text-muted-foreground">If you haven't created the DB schema yet, open SQL in Supabase and paste the setup script from the repository at supabase/setup.sql</p>
              </CardContent>
            </Card>
          </div>
        </aside>
        <section className="p-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="min-h-[60vh]"><CardContent className="p-6">
              {loading ? <p>Loading…</p> : (
                <ScrollArea className="h-[70vh] pr-4">
                  {renderEditor()}
                </ScrollArea>
              )}
            </CardContent></Card>
            <PreviewPane slug={page} data={data} />
          </div>
          <PublishBar onSave={onSave} onPublish={onPublish} />
        </section>
      </main>
    </div>
  );
};

export default ContentManager;
