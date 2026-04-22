import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://hscafycmozoismieksqc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzY2FmeWNtb3pvaXNtaWVrc3FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NzU1MzAsImV4cCI6MjA3MDI1MTUzMH0.Lpy8ypP8wh0dhYLmbv5q_uglohPPozfINGxb_7NS0tc";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- Content to update ---

const UPDATES = [
  {
    page: 'home',
    lang: 'en',
    data: {
      hero_title: 'Now We Land',
      hero_subtitle: 'A private villa on the Akrotiri Peninsula — 90 metres from a secret cove, a lifetime from ordinary',
      chips: ['Private Pool', 'Sea Views', '90m to the Bay'],
    }
  },
  {
    page: 'home',
    lang: 'he',
    data: {
      hero_title: 'Now We Land',
      hero_subtitle: 'וילה פרטית בחצי האי אקרוטירי — 90 מטרים ממפרץ נסתר, רחוק מהרגיל',
      chips: ['בריכה פרטית', 'נוף לים', '90 מ׳ למפרץ'],
    }
  },
  {
    page: 'about',
    lang: 'en',
    data: {
      headline: 'The Villa',
      intro: "Akrotiri is Crete's best-kept secret — a peninsula of wild coastline, ancient monasteries, and impossibly blue water. From the villa, the sea is 90 metres away. Everything else worth seeing is within 20 minutes.",
    }
  },
  {
    page: 'about',
    lang: 'he',
    data: {
      headline: 'הוילה',
      intro: 'אקרוטירי הוא כרתים של המקומיים — חצי אי של חופים פראיים, מנזרים עתיקים ומים בגוון שלא ראיתם מחוץ לתמונה. מהווילה לים — 90 מטרים. מכל השאר ששווה לראות — עשרים דקות.',
    }
  }
];

async function getPageId(slug) {
  const { data, error } = await supabase.from('pages').select('id').eq('slug', slug).maybeSingle();
  if (error || !data) {
    console.error(`Page not found: ${slug}`, error?.message);
    return null;
  }
  return data.id;
}

async function upsertContent(page, lang, data) {
  const pageId = await getPageId(page);
  if (!pageId) return;

  // Demote existing published
  await supabase
    .from('page_content')
    .update({ status: 'draft' })
    .eq('page_id', pageId)
    .eq('lang', lang)
    .eq('status', 'published');

  // Get latest published to merge (don't overwrite all fields)
  const { data: existing } = await supabase
    .from('page_content')
    .select('data')
    .eq('page_id', pageId)
    .eq('lang', lang)
    .order('updated_at', { ascending: false })
    .limit(1);

  const merged = { ...(existing?.[0]?.data ?? {}), ...data };

  // Insert new published row
  const { error } = await supabase.from('page_content').insert({
    page_id: pageId,
    lang,
    status: 'published',
    data: merged,
  });

  if (error) {
    console.error(`❌ Failed ${page}/${lang}:`, error.message);
  } else {
    console.log(`✅ Updated ${page}/${lang}`);
  }
}

for (const u of UPDATES) {
  await upsertContent(u.page, u.lang, u.data);
}

console.log('\nDone. Refresh the site to see changes.');
