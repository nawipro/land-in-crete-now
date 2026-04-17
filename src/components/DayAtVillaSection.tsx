import React, { useRef, useEffect, useState } from 'react';

const momentsData = {
  en: [
    {
      num: '01',
      time: 'Morning',
      headline: 'Slow mornings\nwere made for this.',
      body: 'Birds before alarms. Coffee on the terrace while the garden is still cool. The Cretan light arriving soft, unhurried. The same way you will.',
    },
    {
      num: '02',
      time: 'Midday',
      headline: 'The pool or\nthe bay. Both.',
      body: 'Two minutes on foot and you are standing at the hidden cove. Clear water, no crowds, no sound except the sea. Come back when you are ready. The pool will be waiting.',
    },
    {
      num: '03',
      time: 'Afternoon',
      headline: 'Nowhere to be.\nNothing to decide.',
      body: 'A book under the olive trees. A long lunch in the shade. A kitchen stocked for the nights you decide not to leave. Time moves differently here.',
    },
    {
      num: '04',
      time: 'Evening',
      headline: 'The sky earns\nits reputation.',
      body: 'Gold, then pink, then something you cannot name. The sun drops into the Aegean and everyone stops talking. This is the moment you booked the trip for.',
    },
  ],
  he: [
    {
      num: '01',
      time: 'בוקר',
      headline: 'בקרים איטיים\nנוצרו בשביל זה.',
      body: 'ציוץ ציפורים במקום שעון מעורר. קפה במרפסת כשהגינה עוד קרירה. האור הכרתי מגיע רך, בלי למהר. בדיוק כמוכם.',
    },
    {
      num: '02',
      time: 'צהריים',
      headline: 'הבריכה או\nהמפרץ. שניהם.',
      body: 'שתי דקות הליכה ואתם במפרץ הנסתר. מים צלולים, בלי עומס, בלי רעש. רק הים. תחזרו רק כשמתחשק, הבריכה תמיד מחכה.',
    },
    {
      num: '03',
      time: 'אחה"צ',
      headline: 'אין לאן ללכת.\nאין מה להחליט.',
      body: 'ספר מתחת לעצי הזית, ארוחת צהריים ארוכה בצל, או מטבח מאובזר לערבים שפשוט לא תרצו לצאת מהם. כאן, הזמן זז אחרת.',
    },
    {
      num: '04',
      time: 'ערב',
      headline: 'השמיים עומדים\nבהבטחה.',
      body: 'זהב, אחר כך ורוד, ואז צבע שאין לו שם. השמש שוקעת לתוך הים האגאי וכולם פשוט מפסיקים לדבר. זה הרגע שבגללו הזמנתם את הטיסה.',
    },
  ],
};

const images = [
  { src: '/lovable-uploads/b3adb8c1-e7a0-4048-b109-fbd0d574d7e8.png', alt: 'Morning on the villa terrace with pool and sea view', reverse: false },
  { src: '/lovable-uploads/1ea14e94-47b6-40de-8917-733a37785a6b.png', alt: 'Hidden bay with turquoise water and rocky shore', reverse: true },
  { src: '/lovable-uploads/849c94d6-f867-443b-95a8-586894e93925.png', alt: 'Villa garden and pool in afternoon light', reverse: false },
  { src: '/lovable-uploads/b746bc1b-01b0-42d2-ad3d-28f7d70e9ca3.png', alt: 'Sunset over the Aegean from the villa pool', reverse: true },
];

function useFadeIn(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, style: {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
  } as React.CSSProperties };
}

const MomentRow: React.FC<{ m: { num: string; time: string; headline: string; body: string }; img: typeof images[0]; lang: string }> = ({ m, img, lang }) => {
  const fade = useFadeIn();
  const isRtl = lang === 'he';
  return (
    <div
      ref={fade.ref}
      style={fade.style}
      className="grid lg:grid-cols-5 items-stretch border-t border-white/[0.06]"
    >
      {/* Image */}
      <div className={`lg:col-span-3 overflow-hidden ${img.reverse ? 'lg:order-2' : 'lg:order-1'}`}>
        <img
          src={img.src}
          alt={img.alt}
          loading="lazy"
          className="w-full h-[56vw] lg:h-[52vh] object-cover transition-transform duration-700 hover:scale-[1.02]"
        />
      </div>

      {/* Text */}
      <div
        className={`lg:col-span-2 flex flex-col justify-center px-8 lg:px-16 py-14 lg:py-0 relative overflow-hidden ${
          img.reverse ? 'lg:order-1' : 'lg:order-2'
        }`}
        style={isRtl ? { direction: 'rtl', textAlign: 'right' } : undefined}
      >
        <span className={`absolute -top-4 ${isRtl ? '-left-2' : '-right-2'} text-[140px] lg:text-[180px] font-cormorant font-bold text-white/[0.04] leading-none select-none pointer-events-none`}>
          {m.num}
        </span>

        <div className="relative z-10 space-y-5">
          <p className="text-[13px] font-inter font-semibold uppercase tracking-[0.25em] text-[#C4A882]">
            {m.num} · {m.time}
          </p>
          <h3 className="text-[38px] lg:text-[44px] font-cormorant font-light text-white leading-[1.15] whitespace-pre-line">
            {m.headline}
          </h3>
          <p className="text-[17px] lg:text-[18px] font-inter text-[#E0E0E0]/60 font-light max-w-xs" style={{ lineHeight: '1.8' }}>
            {m.body}
          </p>
        </div>
      </div>
    </div>
  );
};

const DayAtVillaSection: React.FC = () => {
  const introFade = useFadeIn();
  const lang = document.documentElement.lang === 'he' ? 'he' : 'en';
  const isRtl = lang === 'he';
  const moments = momentsData[lang];

  return (
    <section className="bg-[#231F1A]">

      {/* Section intro */}
      <div
        ref={introFade.ref}
        style={introFade.style}
        className="px-6 lg:px-16 pt-28 pb-16"
      >
        <div
          className="flex items-start gap-6"
          style={isRtl ? { direction: 'rtl', textAlign: 'right' } : undefined}
        >
          <div className="hidden lg:block w-px h-24 bg-[#C4A882]/30 mt-1 flex-shrink-0" />
          <div>
            <p className="text-[12px] font-inter font-semibold uppercase tracking-[0.25em] text-[#C4A882] mb-6">
              {isRtl ? 'החוויה' : 'The Experience'}
            </p>
            <h2 className="text-[44px] lg:text-[62px] font-cormorant font-light text-white leading-[1.1] max-w-lg">
              {isRtl ? (
                <><span dir="rtl">יום ב-</span>Now We Land</>
              ) : (
                <>A Day at<br />Now We Land</>
              )}
            </h2>
          </div>
        </div>
      </div>

      {/* Moments */}
      <div>
        {moments.map((m, i) => (
          <MomentRow key={m.num} m={m} img={images[i]} lang={lang} />
        ))}
      </div>

      {/* Closing line */}
      <div
        className="px-6 lg:px-16 py-20 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        style={isRtl ? { direction: 'rtl' } : undefined}
      >
        <p className="text-[16px] font-inter text-white/30 font-light tracking-wide">
          {isRtl ? 'אקרוטירי, חאניה, כרתים' : 'Akrotiri, Chania, Crete'}
        </p>
        <p className={`text-[13px] font-inter text-white/20 uppercase tracking-[0.18em] ${isRtl ? 'sm:text-left' : 'sm:text-right'}`}>
          {isRtl
            ? '14 דק׳ משדה התעופה חאניה | 20 דק׳ מהעיר העתיקה'
            : '14 min · Chania Airport \u00A0·\u00A0 20 min · Old Town'}
        </p>
      </div>
    </section>
  );
};

export default DayAtVillaSection;
