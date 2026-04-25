import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';

const VillasNearChania: React.FC = () => {
  useEffect(() => {
    document.title = 'Villas Near Chania, Crete | Private Villa with Pool';
    window.scrollTo(0, 0);

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'Private villa near Chania, Crete. 20 minutes from old town, private pool, sunset views. Book direct at Now We Land.');

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
          src="/lovable-uploads/b746bc1b-01b0-42d2-ad3d-28f7d70e9ca3.png"
          alt="Private villa near Chania with pool and Aegean sunset"
          className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.05) 60%)' }} />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pb-12 lg:pb-20 w-full">
          <p className="text-[12px] font-inter font-semibold uppercase tracking-[0.3em] text-[#c5a059] mb-5">
            Close to Chania. Far from everything else.
          </p>
          <h1 className="text-[42px] lg:text-[72px] font-cormorant font-medium text-white leading-[1.05] mb-5 max-w-3xl">
            Villas Near Chania, Crete
          </h1>
          <p className="text-[16px] lg:text-[17px] font-inter text-white/50 font-light max-w-2xl leading-[1.8] mb-10">
            A private villa on the Akrotiri Peninsula, 20 minutes from the old town.
          </p>
          <Link
            to="/"
            className="inline-flex px-10 py-4 bg-[#c5a059] text-white text-[13px] font-inter font-bold uppercase tracking-[0.18em] hover:bg-[#d4af6a] transition-colors duration-300"
          >
            Check Availability
          </Link>
        </div>
      </section>

      {/* Core value section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-[32px] lg:text-[42px] font-cormorant font-medium text-[#1A1714] mb-8 leading-[1.1]">
                The Best of Both: City Access, Coastal Calm
              </h2>
              <p className="text-[17px] font-inter text-[#3D352F] font-light leading-[1.9] mb-6">
                Stay in Chania and you trade peace for convenience. Stay too far and you spend half the day driving. Akrotiri sits in between, where the peninsula meets the sea.
              </p>
              <p className="text-[17px] font-inter text-[#3D352F] font-light leading-[1.9] mb-6">
                Now We Land is a private home on that hillside. Three bedrooms, a pool, and a stone trail to a cove 90 metres below. The Venetian harbour is a 20-minute drive when you want it.
              </p>
              <p className="text-[14px] font-inter text-[#8a8580] mt-8">
                Sleeps up to 8 guests. Ideal for families or small groups.
              </p>
            </div>
            <div>
              <img
                src="/lovable-uploads/9a3bf05d-7192-4fd0-8ed4-74dc0fc0fe0a.png"
                alt="Terrace dining with panoramic sea view near Chania"
                className="w-full aspect-[4/3] object-cover rounded-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="py-16 lg:py-20 bg-[#f0ebe5]">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: '20 Min to Chania Old Town', desc: 'Restaurants, harbour, and nightlife, whenever you want them.' },
              { title: 'Private Pool and Garden', desc: 'No shared spaces, no schedules, no crowds.' },
              { title: 'Coastal Location', desc: '90 metres to a cove, walking distance to sandy beaches.' },
              { title: '14 Min from the Airport', desc: 'From plane to pool in under an hour.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-8">
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
            The kind of place you stop looking for, because you've found it.
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

export default VillasNearChania;
