import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';

const PrivateVillaCrete: React.FC = () => {
  useEffect(() => {
    document.title = 'Private Villa in Crete | Near Chania with Pool';
    window.scrollTo(0, 0);

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'Private villa in Crete near Chania. Your own pool, garden, and sea access. 14 min from airport, 20 min to old town. Book direct at Now We Land.');

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
      <section className="relative min-h-[100vh] flex items-end">
        <img
          src="/lovable-uploads/e0402a06-027d-4914-a14a-e6baeec25255.png"
          alt="Private villa in Crete with pool and sunset sea view"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.05) 60%)' }} />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pb-12 lg:pb-20 w-full">
          <p className="text-[12px] font-inter font-semibold uppercase tracking-[0.3em] text-[#c5a059] mb-5">
            Space, privacy, and your own pace
          </p>
          <h1 className="text-[42px] lg:text-[72px] font-cormorant font-medium text-white leading-[1.05] mb-5 max-w-3xl">
            Private Villa in Crete
          </h1>
          <p className="text-[16px] lg:text-[17px] font-inter text-white/50 font-light max-w-2xl leading-[1.8] mb-10">
            Near Chania, 90 metres from the sea, 14 minutes from the airport.
          </p>
          <Link
            to="/"
            className="inline-flex px-10 py-4 bg-[#c5a059] text-white text-[13px] font-inter font-bold uppercase tracking-[0.18em] hover:bg-[#d4af6a] transition-colors duration-300"
          >
            Check Availability
          </Link>
        </div>
      </section>

      {/* Core section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-[32px] lg:text-[42px] font-cormorant font-medium text-[#1A1714] mb-8 leading-[1.1]">
                Not a Hotel. A Private Place to Stay.
              </h2>
              <p className="text-[17px] font-inter text-[#3D352F] font-light leading-[1.9] mb-6">
                No shared spaces. No reception desk. No fixed schedule. Just a house that works on your terms, with a pool, a garden, and the sea close enough to hear.
              </p>
              <p className="text-[17px] font-inter text-[#3D352F] font-light leading-[1.9]">
                Three bedrooms, a full kitchen, and outdoor space designed for staying, not just visiting. Everything you need is here. Everything you don't is somewhere else.
              </p>
              <p className="text-[14px] font-inter text-[#8a8580] mt-8">
                Sleeps up to 8. Three bedrooms, two bathrooms.
              </p>
            </div>
            <div>
              <img
                src="/lovable-uploads/146cd19f-7a25-46e8-9f7a-837f8f30a160.png"
                alt="Private villa exterior with garden in Akrotiri, Crete"
                className="w-full aspect-[4/3] object-cover rounded-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 lg:py-20 bg-[#f0ebe5]">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-[28px] lg:text-[36px] font-cormorant font-medium text-[#1A1714] mb-6 leading-[1.15]">
            Near Chania, Away from the Crowds
          </h2>
          <p className="text-[17px] font-inter text-[#3D352F] font-light leading-[1.9]">
            The Akrotiri Peninsula sits just north of Chania. Twenty minutes to the old town when you want restaurants and harbour walks. The rest of the time, just coastline, olive groves, and quiet.
          </p>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: 'Private Pool', desc: 'Your own pool, open whenever you want it.' },
              { title: 'Space for Families', desc: 'Garden, terrace, and room for everyone to spread out.' },
              { title: 'Quiet Location', desc: 'Olive groves and sea breeze, not traffic and tour buses.' },
              { title: 'Close to Beaches', desc: 'Sandy bays within walking distance or a short drive.' },
            ].map((item, i) => (
              <div key={i} className="bg-[#f0ebe5] rounded-xl p-8">
                <h3 className="text-[20px] font-cormorant font-semibold text-[#1A1714] mb-3">{item.title}</h3>
                <p className="text-[15px] font-inter text-[#6B6560] font-light leading-[1.8]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-[#0f172a] text-white text-center">
        <div className="max-w-[600px] mx-auto px-6">
          <p className="text-[18px] lg:text-[22px] font-cormorant italic text-white/60 font-light mb-10">
            Your private villa in Crete awaits.
          </p>
          <Link
            to="/"
            className="inline-flex px-12 py-5 bg-[#c5a059] text-white text-[14px] font-inter font-bold uppercase tracking-[0.18em] hover:bg-[#d4af6a] transition-colors duration-300"
          >
            Check Availability
          </Link>
        </div>
      </section>

      {/* Footer link */}
      <section className="py-10 bg-[#f8f5f2]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <p className="text-[13px] font-inter text-[#8a8580]">
            <Link to="/" className="text-[#c5a059] hover:underline">Now We Land</Link>
            {' '}&middot;{' '}
            Akrotiri, Chania, Crete
          </p>
        </div>
      </section>

      <Footer translations={translations.en} />
    </div>
  );
};

export default PrivateVillaCrete;
