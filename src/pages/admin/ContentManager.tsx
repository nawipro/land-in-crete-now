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
  gallery: {
    categories: [
      { id: 'outdoor', title: 'OUTDOOR VILLA', order: 1 },
      { id: 'garden-day-light', title: 'GARDEN DAY LIGHT', order: 2 },
      { id: 'garden-night', title: 'GARDEN NIGHT', order: 3 },
      { id: 'secret-bay', title: 'SECRET BAY', order: 4 },
      { id: 'sunset', title: 'SUNSET', order: 5 },
      { id: 'living-room', title: 'LIVING ROOM', order: 6 },
      { id: 'balconies', title: 'BALCONIES', order: 7 },
      { id: 'bed-room-1', title: 'BED ROOM 1', order: 8 },
      { id: 'bed-room-2', title: 'BED ROOM 2', order: 9 }
    ],
      images: [
        { url: '/lovable-uploads/b03503c6-c5da-4a36-b32d-5da4c87923b1.png', alt: 'Outdoor villa – front garden', categoryId: 'outdoor', order: 1 },
        { url: '/lovable-uploads/0cf91a09-cb3b-4953-a757-513680d5bd34.png', alt: 'Outdoor villa – entrance gate', categoryId: 'outdoor', order: 2 },
        { url: '/lovable-uploads/6d2acc7b-041d-4587-b32c-a11b99b4d4c7.png', alt: 'Outdoor villa – side view', categoryId: 'outdoor', order: 3 },
        { url: '/lovable-uploads/146cd19f-7a25-46e8-9f7a-837f8f30a160.png', alt: 'Outdoor villa – garden and facade', categoryId: 'outdoor', order: 4 },
        { url: '/lovable-uploads/66d41bb2-c918-4f2e-b49f-5404d5685356.png', alt: 'Garden night – villa exterior lights', categoryId: 'garden-night', order: 5 },
        { url: '/lovable-uploads/4c4a02ce-70d2-4065-925a-70d8f9bf5d9f.png', alt: 'Garden night – pool view from terrace', categoryId: 'garden-night', order: 6 },
        { url: '/lovable-uploads/923fb47c-f2d2-4712-8807-1f726abfb743.png', alt: 'Garden night – BBQ and pool', categoryId: 'garden-night', order: 7 },
        { url: '/lovable-uploads/9f1780d8-e629-494b-8240-9ce6a67b17ee.png', alt: 'Garden night – villa and lit pool', categoryId: 'garden-night', order: 8 },
        { url: '/lovable-uploads/5afaa76f-fe29-4fb9-8d4f-b9f00925bddd.png', alt: 'Garden night – garden and terrace', categoryId: 'garden-night', order: 9 },
        { url: '/lovable-uploads/b3adb8c1-e7a0-4048-b109-fbd0d574d7e8.png', alt: 'Garden day – patio with table and pool view', categoryId: 'garden-day-light', order: 10 },
        { url: '/lovable-uploads/849c94d6-f867-443b-95a8-586894e93925.png', alt: 'Garden day – villa and pool with wine on table', categoryId: 'garden-day-light', order: 11 },
        { url: '/lovable-uploads/c6a0949b-ccd7-42e3-a208-1684ee5d242b.png', alt: 'Garden day – pool and sea view from above', categoryId: 'garden-day-light', order: 12 },
        { url: '/lovable-uploads/497058df-0eee-470e-aa25-8152dec11164.png', alt: 'Garden day – lawn seating area and pool', categoryId: 'garden-day-light', order: 13 },
        { url: '/lovable-uploads/34f209d0-6644-43a2-b4bc-8b3f22ccedeb.png', alt: 'Garden day – outdoor shower with sea backdrop', categoryId: 'garden-day-light', order: 14 },
        { url: '/lovable-uploads/0cf5d84e-6414-4b56-bf41-8f4c6326d299.png', alt: 'Garden day – sun loungers and umbrella by pool', categoryId: 'garden-day-light', order: 15 },
        // Secret Bay
        { url: '/lovable-uploads/fe62f0b0-bf9b-4e12-8493-636dc8d90a3b.png', alt: 'Secret Bay – cove and villa view', categoryId: 'secret-bay', order: 16 },
        { url: '/lovable-uploads/1ea14e94-47b6-40de-8917-733a37785a6b.png', alt: 'Secret Bay – turquoise water by rocky shore', categoryId: 'secret-bay', order: 17 },
        { url: '/lovable-uploads/8e80ccdd-fe8d-4766-adda-ec5c847d68d8.png', alt: 'Secret Bay – stone steps path', categoryId: 'secret-bay', order: 18 },
        { url: '/lovable-uploads/56bdb900-04bd-4ddf-8cc6-f667096f9a1a.png', alt: 'Secret Bay – path up to the house', categoryId: 'secret-bay', order: 19 },
        { url: '/lovable-uploads/7f16ca73-ff74-4efc-a9e0-d712ab162e24.png', alt: 'Secret Bay – clear water and cliffs', categoryId: 'secret-bay', order: 20 },
        { url: '/lovable-uploads/d6a759c2-d3d6-4075-86d1-1fb91bb11102.png', alt: 'Secret Bay – narrow bay opening to sea', categoryId: 'secret-bay', order: 21 },
        // Sunset (updated)
        { url: '/lovable-uploads/6be09474-ca9b-4709-a76d-69549d31243a.png', alt: '', categoryId: 'sunset', order: 22 },
        { url: '/lovable-uploads/70addbb5-bbb4-47a6-92ef-3d0c69b55d5d.png', alt: '', categoryId: 'sunset', order: 23 },
        { url: '/lovable-uploads/8573aa1d-be2b-4739-8999-05a16fb24a34.png', alt: '', categoryId: 'sunset', order: 24 },
        { url: '/lovable-uploads/6c68c096-2633-442e-adb6-5631763becfb.png', alt: '', categoryId: 'sunset', order: 25 },
        { url: '/lovable-uploads/5508ca10-156e-4cce-ad38-6888235e9ef0.png', alt: '', categoryId: 'sunset', order: 26 },
        { url: '/lovable-uploads/e0402a06-027d-4914-a14a-e6baeec25255.png', alt: 'Sunset – sun rays over sea and pool', categoryId: 'sunset', order: 27 },
        { url: '/lovable-uploads/b746bc1b-01b0-42d2-ad3d-28f7d70e9ca3.png', alt: 'Sunset – golden horizon over village and pool', categoryId: 'sunset', order: 28 },
        { url: '/lovable-uploads/5b7d6b86-1d7e-446d-b3f6-350f7e087144.png', alt: 'Living room – sea view window and sofas', categoryId: 'living-room', order: 29 },
        { url: '/lovable-uploads/98e27587-c03d-4938-92e4-c997f60ca03d.png', alt: 'Living room – leather sofa and coffee table', categoryId: 'living-room', order: 30 },
        { url: '/lovable-uploads/0ed3769e-ddea-4f5f-8657-8888643a909b.png', alt: 'Living room – archway view to kitchen', categoryId: 'living-room', order: 31 },
        { url: '/lovable-uploads/6668c6f2-b4f5-4b23-ab06-d536f9fcb36e.png', alt: 'Living room – armchair by window with sea view', categoryId: 'living-room', order: 32 },
        { url: '/lovable-uploads/61dc4378-4d22-4b4d-b534-4acb8d083a59.png', alt: 'Living room – entryway and window with natural light', categoryId: 'living-room', order: 33 },
        // Balconies defaults
        { url: '/lovable-uploads/7171ad66-0628-4615-93c0-8f63cb57530b.png', alt: 'Balcony – sea view over pool and hillside', categoryId: 'balconies', order: 34 },
        { url: '/lovable-uploads/d444242b-16ec-4051-9a27-c42daaac757b.png', alt: 'Balcony – rustic bench with shutters and decor', categoryId: 'balconies', order: 35 },
        { url: '/lovable-uploads/fc5b6502-8bb3-49dc-9387-e7b494783222.png', alt: 'Balcony – wine bottle and glasses with pool and sea view', categoryId: 'balconies', order: 36 },
        { url: '/lovable-uploads/9a3bf05d-7192-4fd0-8ed4-74dc0fc0fe0a.png', alt: 'Balcony – dining table set with panoramic sea view', categoryId: 'balconies', order: 37 },
        { url: '/lovable-uploads/87de0f88-1982-4cea-9c90-5693f4c7d935.png', alt: 'Balcony – pool and sea view from upper terrace', categoryId: 'balconies', order: 38 },
        { url: '/lovable-uploads/4580ac6e-c8b0-4bc9-b68b-173838cf0060.png', alt: 'Balcony – cozy corner with bench and macrame wall hanging', categoryId: 'balconies', order: 39 },
        // Bedroom 1 defaults
        { url: '/lovable-uploads/ee91f65f-0775-46b4-94a8-be2a27122aae.png', alt: 'Bedroom 1 – bright room with balcony doors and window', categoryId: 'bed-room-1', order: 40 },
        { url: '/lovable-uploads/eca4d710-7fee-4d01-a099-177b0960e6c6.png', alt: 'Bedroom 1 – sea view from window above bed', categoryId: 'bed-room-1', order: 41 },
        { url: '/lovable-uploads/5567f900-8d91-4231-978b-a8754c577779.png', alt: 'Bedroom 1 – view to pool and sea from window', categoryId: 'bed-room-1', order: 42 },
        { url: '/lovable-uploads/70c8831a-de26-43b6-a47a-3bc2ca306524.png', alt: 'Bedroom 1 – wardrobe and balcony doors', categoryId: 'bed-room-1', order: 43 },
        { url: '/lovable-uploads/e92f3097-8ebf-47c3-b94f-48816a3afaa1.png', alt: 'Bedroom 1 – side view of bed and window', categoryId: 'bed-room-1', order: 44 },
        // Bedroom 2 defaults
        { url: '/lovable-uploads/ddf17b2e-03d7-4b73-b263-2045f07b067b.png', alt: 'Bedroom 2 – wardrobe and balcony doors with AC', categoryId: 'bed-room-2', order: 45 },
        { url: '/lovable-uploads/34b34cf9-3d63-4d99-9bf9-b9955337cdb9.png', alt: 'Bedroom 2 – bed with woven decor between two windows', categoryId: 'bed-room-2', order: 46 },
        { url: '/lovable-uploads/e5393da9-7f8e-45d3-8406-e3bd950943d3.png', alt: 'Bedroom 2 – bed facing en-suite bathroom', categoryId: 'bed-room-2', order: 47 },
        { url: '/lovable-uploads/df2e670f-cd51-4ea0-87c9-82c2dcf2b251.png', alt: 'Bedroom 2 – balcony view to sea and pool', categoryId: 'bed-room-2', order: 48 },
        { url: '/lovable-uploads/e039fbf6-1a84-4ae8-98b5-5f6d92373551.png', alt: 'Bedroom 2 – bathroom vanity and mirror', categoryId: 'bed-room-2', order: 49 },
        { url: '/lovable-uploads/4b24e34d-8d7b-4093-bd82-1b66c7178621.png', alt: 'Bedroom 2 – bathroom shower', categoryId: 'bed-room-2', order: 50 },
        { url: '/lovable-uploads/d9d44efd-5443-48bd-95b8-398af1a8b763.png', alt: 'Bedroom 2 – bathroom with tub and shower', categoryId: 'bed-room-2', order: 51 },
        { url: '/lovable-uploads/8b0207a4-cde8-4c7b-8386-fd8835ebc3d8.png', alt: 'Bedroom 2 – vanity and toilet', categoryId: 'bed-room-2', order: 52 },
       ]
   },
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
      let next: any = content ?? DEFAULTS[page];
      if (page === 'gallery') {
        const defaults = DEFAULTS.gallery;
        const categories = [...(content?.categories || [])];
        const existingCatIds = new Set(categories.map((c: any) => c.id));
        (defaults.categories || []).forEach((dc: any) => { if (!existingCatIds.has(dc.id)) categories.push(dc); });
        categories.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
        const images = [...(content?.images || [])];
        // Replace Garden Day Light images with the new defaults
        const withoutDay = images.filter((im: any) => im.categoryId !== 'garden-day-light');
        const dayDefaults = (defaults.images || []).filter((im: any) => im.categoryId === 'garden-day-light');
        // Add defaults for any missing categories (excluding garden-day-light handled above)
        const imageCats = new Set(withoutDay.map((im: any) => im.categoryId));
        const defaultsToAdd = (defaults.images || [])
          .filter((im: any) => im.categoryId !== 'garden-day-light')
          .filter((im: any) => !imageCats.has(im.categoryId));
        const mergedImages = [...withoutDay, ...dayDefaults, ...defaultsToAdd].sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
        next = { categories, images: mergedImages };
      }
      if (isMounted) setData(next);
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
      if (page === 'gallery') {
        await Promise.all([
          saveDraft(supabase, page, 'he', data),
          saveDraft(supabase, page, 'en', data),
        ]);
      } else {
        await saveDraft(supabase, page, lang, data);
      }
      toast({ title: 'Draft saved' });
    } catch (e: any) {
      toast({ title: 'Save failed', description: e.message });
    }
  };

  const onPublish = async () => {
    try {
      if (page === 'gallery') {
        await Promise.all([
          saveDraft(supabase, page, 'he', data),
          saveDraft(supabase, page, 'en', data),
        ]);
        await Promise.all([
          publish(supabase, page, 'he'),
          publish(supabase, page, 'en'),
        ]);
      } else {
        await saveDraft(supabase, page, lang, data);
        await publish(supabase, page, lang);
      }
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
            <FieldText label="Hero title" value={data.hero_title} onChange={(v) => setData({ ...data, hero_title: v })} required maxLength={80} textarea />
            <FieldText label="Hero subtitle" value={data.hero_subtitle} onChange={(v) => setData({ ...data, hero_subtitle: v })} maxLength={160} textarea />
            <FieldArray label="Chips" values={data.chips || []} onChange={(arr) => setData({ ...data, chips: arr })} />
            <div className="grid md:grid-cols-2 gap-4">
              <FieldText label="Primary CTA text" value={data.primary_cta?.text || ''} onChange={(v) => setData({ ...data, primary_cta: { ...(data.primary_cta||{}), text: v } })} />
              <FieldText label="Primary CTA href" value={data.primary_cta?.href || ''} onChange={(v) => setData({ ...data, primary_cta: { ...(data.primary_cta||{}), href: v } })} />
              <FieldText label="Secondary CTA text" value={data.secondary_cta?.text || ''} onChange={(v) => setData({ ...data, secondary_cta: { ...(data.secondary_cta||{}), text: v } })} />
              <FieldText label="Secondary CTA href" value={data.secondary_cta?.href || ''} onChange={(v) => setData({ ...data, secondary_cta: { ...(data.secondary_cta||{}), href: v } })} />
            </div>
            <ImageUploader slug="home" label="Hero image" value={data.hero_image?.url || ''} alt={data.hero_image?.alt || ''} fit={data.hero_image?.fit} position={data.hero_image?.position}
              onChange={(url, alt, options) => setData({ ...data, hero_image: { url, alt, ...(options || {}) } })} />
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
            <ImageUploader slug="about" label="Main image" value={data.image?.url || ''} alt={data.image?.alt || ''} fit={data.image?.fit} position={data.image?.position}
              onChange={(url, alt, options) => setData({ ...data, image: { url, alt, ...(options || {}) } })} />
          </div>
        );
      case 'gallery':
        return (
          <GalleryEditor value={data} onChange={(next) => setData(next)} />
        );
      case 'explore':
        return (
          <div className="space-y-6">
            <FieldText label="Hero title" value={data.hero_title || ''} onChange={(v) => setData({ ...data, hero_title: v })} />
            <ImageUploader slug="explore" label="Hero image" value={data.hero_image?.url || ''} alt={data.hero_image?.alt || ''} fit={data.hero_image?.fit} position={data.hero_image?.position}
              onChange={(url, alt, options) => setData({ ...data, hero_image: { url, alt, ...(options || {}) } })} />
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
          <PagePicker value={page} onChange={(p) => setPage(p)} lang={lang} />
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
            <PreviewPane slug={page} data={data} lang={lang} />
          </div>
          <PublishBar onSave={onSave} onPublish={onPublish} />
        </section>
      </main>
    </div>
  );
};

export default ContentManager;
