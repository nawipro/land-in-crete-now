import React, { useRef, useEffect, useState } from 'react';
import { Users, Droplets, Sun, MapPin } from 'lucide-react';

interface AboutSectionProps {
  translations: any;
  content?: any;
}

const features = [
  { icon: Users, title: 'Up to 8 Guests', description: '3 bedrooms\nPrivate balcony suite\n2 extra foldable beds' },
  { icon: Droplets, title: 'Bathrooms & Amenities', description: '2 full bathrooms\n2 guest WCs\nFully air conditioned' },
  { icon: Sun, title: 'Private Pool & Patio', description: '43 sqm private pool\nSun loungers\nShaded BBQ patio' },
  { icon: MapPin, title: 'Coastal Serenity', description: 'Secret trail to a cove\nCrystal clear water\n2 min walk from the villa' },
];

const textContent = {
  en: {
    eyebrow: 'Akrotiri, Crete',
    title: <>The Villa: Space, Privacy,{' '}<span className="block sm:inline">and Authentic Charm</span></>,
    description: '"Now We Land" is a charming, spacious sanctuary perched above the Aegean. Surrounded by olive trees, fragrant herbs, and a garden of fruit trees, the villa combines rustic warmth with modern comfort. Located just minutes from the famous Zorba\'s Beach and 90 metres from a hidden cove, it\'s the perfect escape for those seeking peace and nature without compromising on luxury.',
    advisorEyebrow: 'Aegean Team',
    advisorTitle: 'Your Personal Advisor',
    advisorText: 'From airport shuttles and private chefs to tailor made boat trips and cooking classes. Our team is here to curate your Cretan experience. Arrive. Disappear. We\'ll handle the rest',
  },
  he: {
    eyebrow: 'אקרוטירי, כרתים',
    title: <>הווילה: מרחב. פרטיות. קסם אותנטי.</>,
    description: '"Now We Land" היא פינה של שקט, מרחב מלא אופי הצופה אל הים האגאי. מוקפת עצי זית, צמחי תבלין ובוסתן פרי, הווילה משלבת חמימות כפרית עם נוחות מודרנית ומוקפדת. הווילה ממוקמת דקות ספורות מחוף "זורבה" המפורסם ורק 90 מטרים ממפרץ נסתר, והיא המקום המושלם למי שמחפש שקט וטבע מבלי להתפשר על יוקרה. כל מה ששווה לראות באזור נמצא במרחק של עד 20 דקות נסיעה.',
    advisorEyebrow: 'צוות Now We Land',
    advisorTitle: 'הייעוץ האישי שלכם',
    advisorText: 'מהסעה משדה התעופה ועד שיעורי בישול פרטיים, הצוות שלנו כאן כדי לתפור עבורכם את החוויה הכרתית המושלמת. פשוט להגיע, להתנתק, ואנחנו נדאג לשאר.',
  },
};

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

const AboutSection: React.FC<AboutSectionProps> = ({ translations, content }) => {
  const heroFade = useFadeIn();
  const gridFade = useFadeIn();
  const advisorFade = useFadeIn();
  const t = textContent.en;

  return (
    <section id="about" className="py-28 lg:py-36 bg-[#FDFCF9]">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Two-column: Text (55%) + Image (45%) */}
        <div
          ref={heroFade.ref}
          style={heroFade.style}
          className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-10 lg:gap-16 items-center mb-24"
        >
          {/* Image — shows first on mobile */}
          <div className="order-1 lg:order-2">
            <img
              src="/lovable-uploads/9f1780d8-e629-494b-8240-9ce6a67b17ee.png"
              alt="Villa and pool illuminated at night"
              className="w-full h-auto"
              style={{ borderRadius: '12px' }}
              loading="lazy"
            />
          </div>

          {/* Text column */}
          <div className="order-2 lg:order-1">
            <p
              className="font-inter font-semibold uppercase text-[#C4A882] mb-5"
              style={{ fontSize: '15px', letterSpacing: '0.1em' }}
            >
              {t.eyebrow}
            </p>
            <h2
              className="font-cormorant font-light text-[#1A1714] mb-8"
              style={{ fontSize: 'clamp(33px, 4.5vw, 48px)', lineHeight: '1.15' }}
            >
              {t.title}
            </h2>
            <p
              className="font-inter text-[#1A1714] font-light max-w-xl"
              style={{ fontSize: '19px', lineHeight: '1.8' }}
            >
              {t.description}
            </p>
          </div>
        </div>

        {/* Features Grid — 4 cards */}
        <div ref={gridFade.ref} style={gridFade.style} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#F0EBE3] p-8 lg:p-9 text-center transition-colors duration-300 hover:bg-[#E8E0D5]"
              style={{ borderRadius: '10px' }}
            >
              <feature.icon
                className="mx-auto mb-4 text-[#C4A882]"
                size={24}
                strokeWidth={1.5}
              />
              <h4 className="font-cormorant font-medium text-[#1A1714] text-[23px] mb-3">
                {feature.title}
              </h4>
              <p
                className="font-inter text-[#3D352F] font-light whitespace-pre-line"
                style={{ fontSize: '16px', lineHeight: '2', hyphens: 'none' }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Advisor Callout Box */}
        <div
          ref={advisorFade.ref}
          style={{ ...advisorFade.style, background: '#F0EBE3', border: '1px solid #C4A882', borderRadius: '12px', padding: '44px 40px', maxWidth: '760px' }}
          className="mx-auto text-center"
        >
          <p className="font-inter font-semibold uppercase text-[#C4A882] mb-3" style={{ fontSize: '13px', letterSpacing: '0.15em' }}>
            {t.advisorEyebrow}
          </p>
          <h3 className="font-cormorant font-medium text-[#1A1714] mb-4" style={{ fontSize: '28px' }}>
            {t.advisorTitle}
          </h3>
          <p
            className="font-inter text-[#3D352F] font-light"
            style={{ fontSize: '18px', lineHeight: '1.8' }}
          >
            {t.advisorText}
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
