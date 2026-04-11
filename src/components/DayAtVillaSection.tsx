import React from 'react';

const moments = [
  {
    num: '01',
    time: 'Morning',
    headline: 'Slow mornings\nwere made for this.',
    body: 'Birds before alarms. Coffee on the terrace while the garden is still cool. The Cretan light arriving soft, unhurried — the same way you will.',
    image: '/lovable-uploads/b3adb8c1-e7a0-4048-b109-fbd0d574d7e8.png',
    imageAlt: 'Morning on the villa terrace with pool and sea view',
    reverse: false,
  },
  {
    num: '02',
    time: 'Midday',
    headline: 'The pool or\nthe bay. Both.',
    body: 'Two minutes on foot and you are standing at the hidden cove — clear water, no crowds, no sound except the sea. Come back when you are ready. The pool will be waiting.',
    image: '/lovable-uploads/1ea14e94-47b6-40de-8917-733a37785a6b.png',
    imageAlt: 'Hidden bay with turquoise water and rocky shore',
    reverse: true,
  },
  {
    num: '03',
    time: 'Afternoon',
    headline: 'Nowhere to be.\nNothing to decide.',
    body: 'A book under the olive trees. A long lunch in the shade. A kitchen stocked for the nights you decide not to leave. Time moves differently here.',
    image: '/lovable-uploads/849c94d6-f867-443b-95a8-586894e93925.png',
    imageAlt: 'Villa garden and pool in afternoon light',
    reverse: false,
  },
  {
    num: '04',
    time: 'Evening',
    headline: 'The sky earns\nits reputation.',
    body: 'Gold, then pink, then something you cannot name. The sun drops into the Aegean and everyone stops talking. This is the moment you booked the trip for.',
    image: '/lovable-uploads/b746bc1b-01b0-42d2-ad3d-28f7d70e9ca3.png',
    imageAlt: 'Sunset over the Aegean from the villa pool',
    reverse: true,
  },
];

const DayAtVillaSection: React.FC = () => {
  return (
    <section className="bg-[#1A1714]">

      {/* Section intro */}
      <div className="px-6 lg:px-16 pt-24 pb-16">
        <p className="text-[10px] font-inter font-semibold uppercase tracking-[0.25em] text-[#C4A882] mb-6">
          The Experience
        </p>
        <h2 className="text-4xl lg:text-6xl font-cormorant font-light text-white leading-[1.1] max-w-lg">
          A Day at<br />Now We Land
        </h2>
      </div>

      {/* Moments */}
      <div>
        {moments.map((m) => (
          <div
            key={m.num}
            className={`grid lg:grid-cols-5 items-stretch border-t border-white/8 ${m.reverse ? '' : ''}`}
          >
            {/* Image */}
            <div className={`lg:col-span-3 overflow-hidden ${m.reverse ? 'lg:order-2' : 'lg:order-1'}`}>
              <img
                src={m.image}
                alt={m.imageAlt}
                loading="lazy"
                className="w-full h-[56vw] lg:h-[52vh] object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>

            {/* Text */}
            <div
              className={`lg:col-span-2 flex flex-col justify-center px-8 lg:px-14 py-14 lg:py-0 relative overflow-hidden ${
                m.reverse ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              {/* Ghost number */}
              <span className="absolute -top-4 -right-2 text-[140px] lg:text-[180px] font-cormorant font-bold text-white/[0.03] leading-none select-none pointer-events-none">
                {m.num}
              </span>

              <div className="relative z-10 space-y-5">
                <p className="text-[10px] font-inter font-semibold uppercase tracking-[0.25em] text-[#C4A882]">
                  {m.num} — {m.time}
                </p>
                <h3 className="text-3xl lg:text-4xl font-cormorant font-light text-white leading-[1.15] whitespace-pre-line">
                  {m.headline}
                </h3>
                <p className="text-[15px] font-inter text-white/50 leading-relaxed font-light max-w-xs">
                  {m.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Closing line */}
      <div className="px-6 lg:px-16 py-16 border-t border-white/8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <p className="text-sm font-inter text-white/30 font-light tracking-wide">
          Akrotiri, Chania — Crete
        </p>
        <p className="text-[11px] font-inter text-white/20 uppercase tracking-[0.18em] sm:text-right">
          14 min · Chania Airport &nbsp;·&nbsp; 20 min · Old Town
        </p>
      </div>
    </section>
  );
};

export default DayAtVillaSection;
