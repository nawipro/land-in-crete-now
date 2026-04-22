import React, { useRef, useEffect, useState } from 'react';

const moments = [
  {
    num: '01', time: 'Morning',
    headline: 'Slow mornings were\nmade for this',
    body: 'Birds before alarms. Coffee on the terrace while the garden is still cool. The Cretan light arriving soft, unhurried. The same way you will.',
  },
  {
    num: '02', time: 'Midday',
    headline: 'The pool or\nthe bay. Both',
    body: 'Two minutes on foot and you are standing at the hidden cove. Clear water, no crowds, no sound except the sea. Come back when you are ready. The pool will be waiting.',
  },
  {
    num: '03', time: 'Afternoon',
    headline: 'Nowhere to be.\nNothing to decide',
    body: 'A book under the olive trees. A long lunch in the shade. A kitchen stocked for the nights you decide not to leave. Time moves differently here.',
  },
  {
    num: '04', time: 'Evening',
    headline: 'The sky earns\nits reputation',
    body: 'Gold, then pink, then something you cannot name. The sun drops into the Aegean and everyone stops talking. This is the moment you booked the trip for.',
  },
];

const images = [
  { src: '/lovable-uploads/b3adb8c1-e7a0-4048-b109-fbd0d574d7e8.png', alt: 'Morning on the villa terrace', reverse: false },
  { src: '/lovable-uploads/1ea14e94-47b6-40de-8917-733a37785a6b.png', alt: 'Hidden bay with turquoise water', reverse: true },
  { src: '/lovable-uploads/849c94d6-f867-443b-95a8-586894e93925.png', alt: 'Villa garden and pool', reverse: false },
  { src: '/lovable-uploads/b746bc1b-01b0-42d2-ad3d-28f7d70e9ca3.png', alt: 'Sunset over the Aegean', reverse: true },
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

const MomentRow: React.FC<{ m: typeof moments[0]; img: typeof images[0] }> = ({ m, img }) => {
  const fade = useFadeIn();
  return (
    <div ref={fade.ref} style={fade.style} className="grid lg:grid-cols-2 items-stretch border-t border-[#f4f1ea]/[0.06]">
      <div className={`overflow-hidden ${img.reverse ? 'lg:order-2' : 'lg:order-1'}`}>
        <img src={img.src} alt={img.alt} loading="eager" className="w-full aspect-[3/2] lg:aspect-[4/5] object-cover transition-transform duration-700 hover:scale-[1.03]" />
      </div>
      <div className={`flex flex-col justify-center px-5 md:px-10 lg:px-16 py-14 lg:py-0 relative overflow-hidden ${img.reverse ? 'lg:order-1' : 'lg:order-2'}`}>
        <span className="absolute -top-4 -right-2 text-[160px] lg:text-[220px] font-serif font-light text-[#f4f1ea]/[0.04] leading-none select-none pointer-events-none">
          {m.num}
        </span>
        <div className="relative z-10 space-y-5">
          <p className="text-[10px] font-sans font-medium uppercase tracking-[.32em] text-[#f4f1ea] opacity-55">
            {m.num} · {m.time}
          </p>
          <h3 className="text-[34px] lg:text-[44px] font-serif font-light text-[#f4f1ea] leading-[1.15] whitespace-pre-line tracking-[-.015em]">
            {m.headline}
          </h3>
          <p className="text-[15px] font-sans text-[#f4f1ea]/80 font-normal max-w-[440px] leading-[1.7]">
            {m.body}
          </p>
        </div>
      </div>
    </div>
  );
};

const DayAtVillaSection: React.FC = () => {
  const introFade = useFadeIn();
  return (
    <section className="bg-[#1e1814]">
      <div ref={introFade.ref} style={introFade.style} className="px-5 md:px-10 lg:px-[72px] pt-20 md:pt-24 lg:pt-32 pb-14">
        <p className="text-[10px] font-sans font-medium uppercase tracking-[.32em] text-[#f4f1ea] opacity-55 mb-6">
          — The Experience
        </p>
        <h2 className="text-[44px] lg:text-[62px] font-serif font-light text-[#f4f1ea] leading-[1.1] max-w-lg tracking-[-.015em]">
          A <em className="not-italic italic">Day</em> at Now We Land
        </h2>
      </div>
      <div>
        {moments.map((m, i) => (
          <MomentRow key={m.num} m={m} img={images[i]} />
        ))}
      </div>
      <div className="px-5 md:px-10 lg:px-[72px] py-16 border-t border-[#f4f1ea]/[0.06] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <p className="text-[13px] font-sans text-[#f4f1ea]/30 tracking-wide">Akrotiri, Chania, Crete</p>
        <p className="text-[10px] font-sans text-[#f4f1ea]/20 uppercase tracking-[.18em]">14 min · Chania Airport · 20 min · Old Town</p>
      </div>
    </section>
  );
};

export default DayAtVillaSection;
