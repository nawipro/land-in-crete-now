import React, { useRef, useEffect, useState } from 'react';

interface AboutSectionProps {
  translations: any;
  content?: any;
}

const features = [
  { title: 'Sleeps up to 8 guests', description: '3 bedrooms\nPrivate balcony suite\n2 extra foldable beds' },
  { title: 'Bathrooms & Amenities', description: '2 full bathrooms\n2 guest WCs\nFully air conditioned' },
  { title: 'Private Pool & Patio', description: '43 sqm private pool\nSun loungers\nShaded BBQ patio' },
  { title: 'Coastal Serenity', description: 'Secret trail to a cove\nCrystal clear water\n2 min walk from the villa' },
];

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, style: {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
  } as React.CSSProperties };
}

const AboutSection: React.FC<AboutSectionProps> = () => {
  const heroFade = useFadeIn();
  const gridFade = useFadeIn();
  const advisorFade = useFadeIn();

  return (
    <section id="about" className="py-20 md:py-24 lg:py-32 bg-[#f4f1ea]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-[72px]">

        {/* Two-column: Text + Image */}
        <div
          ref={heroFade.ref}
          style={heroFade.style}
          className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-10 lg:gap-16 items-center mb-20 lg:mb-28"
        >
          {/* Image */}
          <div className="order-1 lg:order-2">
            <img
              src="/lovable-uploads/9f1780d8-e629-494b-8240-9ce6a67b17ee.png"
              alt="Villa and pool illuminated at night"
              className="w-full aspect-[4/5] object-cover"
              loading="eager"
            />
          </div>

          {/* Text */}
          <div className="order-2 lg:order-1">
            <p className="text-[10px] font-sans font-medium uppercase tracking-[.32em] text-[#7a6f62] opacity-55 mb-6">
              — Why This Villa?
            </p>
            <h2 className="font-serif font-light text-[#2a251f] text-[40px] lg:text-[60px] tracking-[-.015em] leading-[1.1] mb-8">
              Space, Privacy, and <em className="not-italic italic">Authentic</em> Charm
            </h2>
            <p className="font-sans text-[15px] leading-[1.7] text-[#2a251f] opacity-75 max-w-[620px]">
              "Now We Land" is a charming, spacious sanctuary perched above the Aegean. Surrounded by olive trees, fragrant herbs, and a garden of fruit trees, the villa combines rustic warmth with modern comfort. Located just minutes from the famous Zorba's Beach and 90 metres from a hidden cove, it's the perfect escape for those seeking peace and nature without compromising on luxury.
            </p>
          </div>
        </div>

        {/* Features — flat grid with hairline dividers, no cards */}
        <div ref={gridFade.ref} style={gridFade.style} className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 lg:gap-16 mb-16 lg:mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border-t border-[#2a251f]/20 pt-5"
            >
              <h4 className="font-serif font-light text-[#2a251f] text-[20px] lg:text-[22px] mb-3">
                {feature.title}
              </h4>
              <p
                className="font-sans text-[13px] lg:text-[14px] leading-[1.8] text-[#7a6f62] whitespace-pre-line"
                style={{ hyphens: 'none' } as React.CSSProperties}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Single CTA */}
        <div className="text-center mb-20 lg:mb-28">
          <button
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-[16px] bg-[#2a251f] text-[#f4f1ea] text-[11px] font-sans font-medium uppercase tracking-[.24em] hover:bg-[#8a6d4f] transition-colors duration-300"
          >
            Check Availability&nbsp;&nbsp;→
          </button>
        </div>

        {/* Advisor — clean band, no card */}
        <div
          ref={advisorFade.ref}
          style={advisorFade.style}
          className="bg-[#ece7dc] py-14 lg:py-16 px-8 lg:px-12 text-center max-w-[760px] mx-auto"
        >
          <p className="text-[10px] font-sans font-medium uppercase tracking-[.32em] text-[#7a6f62] opacity-55 mb-4">
            — Now We Land Team
          </p>
          <h3 className="font-serif font-light text-[#2a251f] text-[32px] lg:text-[42px] mb-5">
            Your personal <em className="not-italic italic">advisor</em>
          </h3>
          <p className="font-sans text-[14px] lg:text-[15px] leading-[1.7] text-[#2a251f] opacity-75 max-w-[560px] mx-auto mb-4">
            From airport shuttles and private chefs to tailor made boat trips and cooking classes. Our team is here to curate your Cretan experience. Arrive. Disappear. We'll handle the rest
          </p>
          <p className="text-[10px] font-sans font-medium uppercase tracking-[.24em] text-[#7a6f62] opacity-55">
            Reply within hours
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
