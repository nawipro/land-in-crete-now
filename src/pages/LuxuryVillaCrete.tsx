import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';

const LuxuryVillaCrete: React.FC = () => {
  useEffect(() => {
    document.title = 'Luxury Villa in Chania, Crete | Private Villa with Pool';
    window.scrollTo(0, 0);

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'Private villa in Akrotiri, near Chania. Pool, sunset views, 90m from the sea. Perfect for families, couples, and remote stays.');

    return () => {
      document.title = 'Now We Land - Boutique Villa in Crete | Private Vacation Rental';
    };
  }, []);

  return (
    <div className="bg-[#FAF8F5] min-h-screen">

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <Link to="/" className="text-[20px] font-playfair-display font-bold tracking-[0.03em] text-white hover:text-[#c5a059] transition-colors">
            Now We Land
          </Link>
          <Link to="/" className="flex items-center gap-2 text-[13px] font-inter text-white/60 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to Villa
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end">
        <img
          src="/lovable-uploads/9242131d-5b6c-48ae-a974-6a6844d4332a.png"
          alt="Luxury villa in Crete with private pool and sea view"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.1) 100%)' }} />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 lg:pb-24 w-full">
          <p className="text-[12px] font-inter font-semibold uppercase tracking-[0.3em] text-[#c5a059] mb-5">
            Akrotiri, Chania, Crete
          </p>
          <h1 className="text-[42px] lg:text-[72px] font-cormorant font-medium text-white leading-[1.05] mb-5 max-w-3xl">
            Luxury Villa in Chania, Crete
          </h1>
          <p className="text-[18px] lg:text-[22px] font-cormorant italic text-white/75 font-light mb-6">
            Private pool &middot; Hidden cove &middot; Sunset views
          </p>
          <p className="text-[16px] lg:text-[17px] font-inter text-white/50 font-light max-w-2xl leading-[1.8]">
            A private villa in Akrotiri, just 14 minutes from Chania Airport and 90 metres from the sea. Designed for guests who want space, privacy, and a slower pace of life.
          </p>
        </div>
      </section>

      {/* Benefits strip */}
      <section className="py-14 lg:py-16 bg-[#0f172a]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 text-center">
            {[
              { stat: '90 m', label: 'to hidden cove' },
              { stat: 'Private', label: 'pool & garden' },
              { stat: '3', label: 'bedrooms, sleeps 8' },
              { stat: '14 min', label: 'from airport' },
              { stat: '20 min', label: 'from Chania' },
            ].map((item, i) => (
              <div key={i} className="text-white">
                <p className="text-[28px] lg:text-[32px] font-cormorant font-semibold text-[#c5a059]">{item.stat}</p>
                <p className="text-[13px] font-inter text-white/45 font-light mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-[32px] lg:text-[42px] font-cormorant font-medium text-[#1A1714] mb-8 leading-[1.1]">
                A Private Villa Near Chania — Not a Hotel
              </h2>
              <p className="text-[17px] font-inter text-[#3D352F] font-light leading-[1.9] mb-6">
                Now We Land is a luxury villa in Akrotiri, Crete, offering a rare combination of privacy and location. Close enough to Chania for restaurants, markets, and nightlife — yet far from crowds and resort noise.
              </p>
              <p className="text-[17px] font-inter text-[#3D352F] font-light leading-[1.9]">
                Set on a hillside overlooking the Aegean, the villa features a private pool, sunset terrace, and direct access to a hidden cove just 90 metres away.
              </p>
              <div className="mt-10">
                <Link to="/things-to-do-chania" className="text-[15px] font-inter text-[#c5a059] font-medium hover:underline">
                  Things to do nearby &rarr;
                </Link>
              </div>
            </div>
            <div>
              <img
                src="/lovable-uploads/9f1780d8-e629-494b-8240-9ce6a67b17ee.png"
                alt="Luxury villa in Crete with private pool and sea view"
                className="w-full aspect-[4/3] object-cover rounded-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 lg:py-20 bg-[#f0ebe5]">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-[28px] lg:text-[36px] font-cormorant font-medium text-[#1A1714] mb-6 leading-[1.15]">
            Perfect for Families, Couples, and Remote Work
          </h2>
          <p className="text-[17px] font-inter text-[#3D352F] font-light leading-[1.9] mb-4">
            Whether you're looking for a family villa in Crete, a romantic escape near Chania, or a quiet place to work remotely, the villa is designed for real stays — not short hotel visits.
          </p>
          <p className="text-[17px] font-inter text-[#3D352F] font-light leading-[1.9]">
            Fast WiFi, full kitchen, outdoor living, and complete privacy.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-[#0f172a] text-white text-center">
        <div className="max-w-[600px] mx-auto px-6">
          <h2 className="text-[32px] lg:text-[42px] font-cormorant font-medium mb-5 leading-[1.15]">
            Your Private Villa in Crete Awaits
          </h2>
          <p className="text-[16px] font-inter text-white/45 font-light leading-[1.7] mb-10">
            Book direct for the best rate
          </p>
          <Link
            to="/"
            className="inline-flex px-14 py-5 bg-[#c5a059] text-white text-[14px] font-inter font-bold uppercase tracking-[0.2em] hover:bg-[#d4af6a] transition-colors duration-300"
          >
            Check Availability
          </Link>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-10 bg-[#f8f5f2]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <p className="text-[13px] font-inter text-[#8a8580]">
            <Link to="/" className="text-[#c5a059] hover:underline">Now We Land</Link>
            {' '}&middot;{' '}
            <Link to="/things-to-do-chania" className="text-[#c5a059] hover:underline">Things to Do in Chania</Link>
            {' '}&middot;{' '}
            Akrotiri, Chania, Crete
          </p>
        </div>
      </section>

      <Footer translations={translations.en} />
    </div>
  );
};

export default LuxuryVillaCrete;
