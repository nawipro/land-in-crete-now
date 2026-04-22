import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Users, Heart, Briefcase, CalendarDays } from 'lucide-react';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';

const LuxuryVillaCrete: React.FC = () => {
  useEffect(() => {
    document.title = 'Luxury Villa in Crete with Private Pool – Now We Land';
    window.scrollTo(0, 0);

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'Private luxury villa in Crete near Chania. Walking distance to the sea, private pool, sunset views. Book your stay at Now We Land.');

    return () => {
      document.title = 'Now We Land - Boutique Villa in Crete | Private Vacation Rental';
    };
  }, []);

  return (
    <div className="bg-[#FAF8F5] min-h-screen">

      {/* Header */}
      <header className="bg-[#0f172a] text-white">
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
      <section className="relative">
        <div className="absolute inset-0">
          <img
            src="/lovable-uploads/9242131d-5b6c-48ae-a974-6a6844d4332a.png"
            alt="Now We Land villa at sunset with private pool and sea views"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.15) 100%)' }} />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-44">
          <p className="text-[13px] font-inter font-semibold uppercase tracking-[0.25em] text-[#c5a059] mb-6">
            Akrotiri, Chania, Crete
          </p>
          <h1 className="text-[42px] lg:text-[72px] font-cormorant font-medium text-white leading-[1.05] mb-6 max-w-3xl">
            Luxury Villa in Crete
          </h1>
          <p className="text-[22px] lg:text-[28px] font-cormorant italic text-white/80 font-light mb-8">
            Private. Quiet. Designed for Slow Living.
          </p>
          <p className="text-[17px] lg:text-[19px] font-inter text-white/55 font-light max-w-2xl leading-[1.8]">
            If you are searching for a luxury villa in Crete that offers privacy, location, and experience — this is it.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          <p className="text-[18px] lg:text-[20px] font-inter text-[#3D352F] font-light leading-[2]">
            <Link to="/" className="text-[#c5a059] hover:underline">Now We Land</Link> is a private villa in Akrotiri, just minutes from Chania, designed for guests who want more than just a place to stay.
          </p>
          <p className="text-[18px] lg:text-[20px] font-inter text-[#3D352F] font-light leading-[2] mt-8">
            No reception desk. No shared pool. No noise from the room next door. Just a house that feels like yours, on a hillside overlooking the Aegean, with a trail to a hidden cove 90 metres below.
          </p>
        </div>
      </section>

      {/* Why different */}
      <section className="py-20 lg:py-28 bg-[#0f172a] text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-[36px] lg:text-[48px] font-cormorant font-medium mb-16 leading-[1.1]">
            Why This Villa Is Different
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { stat: '90 m', label: 'from a hidden cove' },
              { stat: 'Private', label: 'pool with sunset views' },
              { stat: 'Akrotiri', label: 'the quiet side of Crete' },
              { stat: '14 min', label: 'from Chania Airport' },
              { stat: '20 min', label: 'from Chania Old Town' },
            ].map((item, i) => (
              <div key={i} className="border border-white/10 rounded-xl p-7 text-center">
                <p className="text-[28px] lg:text-[32px] font-cormorant font-semibold text-[#c5a059] mb-2">{item.stat}</p>
                <p className="text-[14px] font-inter text-white/50 font-light">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Designed for real stays */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-[36px] lg:text-[48px] font-cormorant font-medium text-[#1A1714] mb-8 leading-[1.1]">
            Designed for Real Stays
          </h2>
          <p className="text-[18px] lg:text-[20px] font-inter text-[#3D352F] font-light leading-[2] mb-4">
            This is not a hotel.
          </p>
          <p className="text-[18px] lg:text-[20px] font-inter text-[#3D352F] font-light leading-[2]">
            It's a home built for families, couples, and small groups who value space, privacy, and a calm atmosphere. Three bedrooms, two full bathrooms, a kitchen stocked for real cooking, and enough outdoor space to spend an entire day without repeating a spot.
          </p>
        </div>
      </section>

      {/* Inside the Villa */}
      <section className="py-20 lg:py-28 bg-[#f0ebe5]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-[36px] lg:text-[48px] font-cormorant font-medium text-[#1A1714] mb-16 leading-[1.1]">
            Inside the Villa
          </h2>
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <img
                src="/lovable-uploads/5b7d6b86-1d7e-446d-b3f6-350f7e087144.png"
                alt="Villa living room with sea view"
                className="w-full aspect-[4/3] object-cover rounded-xl mb-8"
                loading="lazy"
              />
              <h3 className="text-[24px] font-cormorant font-medium text-[#1A1714] mb-4">Living Spaces</h3>
              <p className="text-[16px] font-inter text-[#6B6560] font-light leading-[1.9]">
                Open-plan living with stone walls, wooden beams, and windows that frame the sea. The kind of room where afternoon light does all the decorating. A stone fireplace for cooler evenings. Comfortable furniture that invites you to stay.
              </p>
            </div>
            <div>
              <img
                src="/lovable-uploads/ee91f65f-0775-46b4-94a8-be2a27122aae.png"
                alt="Bright bedroom with balcony and sea view"
                className="w-full aspect-[4/3] object-cover rounded-xl mb-8"
                loading="lazy"
              />
              <h3 className="text-[24px] font-cormorant font-medium text-[#1A1714] mb-4">Bedrooms</h3>
              <p className="text-[16px] font-inter text-[#6B6560] font-light leading-[1.9]">
                Three bedrooms, each with its own character. One with a private balcony suite overlooking the garden. Two more with sea-facing windows. All air-conditioned, all quiet, all designed for deep sleep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Outside */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-[36px] lg:text-[48px] font-cormorant font-medium text-[#1A1714] mb-16 leading-[1.1]">
            Outside
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { image: '/lovable-uploads/c6a0949b-ccd7-42e3-a208-1684ee5d242b.png', title: 'Private Pool', desc: '43 sqm pool with sun loungers. Uninterrupted views of the Aegean.' },
              { image: '/lovable-uploads/9a3bf05d-7192-4fd0-8ed4-74dc0fc0fe0a.png', title: 'Sunset Terrace', desc: 'Dining table for eight. The best seat in the house at golden hour.' },
              { image: '/lovable-uploads/497058df-0eee-470e-aa25-8152dec11164.png', title: 'Garden', desc: 'Olive trees, herbs, and a shaded BBQ patio for long evenings.' },
              { image: '/lovable-uploads/fe62f0b0-bf9b-4e12-8493-636dc8d90a3b.png', title: 'Sea Access', desc: '90 metres to a hidden cove via a short trail from the garden.' },
            ].map((item, i) => (
              <div key={i} className="group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-square object-cover rounded-xl mb-5 transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <h3 className="text-[20px] font-cormorant font-semibold text-[#1A1714] mb-2">{item.title}</h3>
                <p className="text-[14px] font-inter text-[#6B6560] font-light leading-[1.8]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 lg:py-28 bg-[#f0ebe5]">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          <h2 className="text-[36px] lg:text-[48px] font-cormorant font-medium text-[#1A1714] mb-8 leading-[1.1]">
            The Akrotiri Advantage
          </h2>
          <p className="text-[18px] lg:text-[20px] font-inter text-[#3D352F] font-light leading-[2] mb-8">
            Akrotiri is a peninsula north of Chania. No resort strips, no tourist crowds. Just olive groves, quiet villages, and a coastline of small bays that most visitors never find.
          </p>
          <p className="text-[18px] lg:text-[20px] font-inter text-[#3D352F] font-light leading-[2]">
            The villa sits between Tersanas and Stavros, two of the peninsula's best beaches. Chania Old Town is 20 minutes south. The airport is 14 minutes east. You're connected to everything, surrounded by nothing.
          </p>
          <p className="mt-8">
            <Link to="/things-to-do-chania" className="text-[16px] font-inter text-[#c5a059] font-medium hover:underline">
              See our full guide: Things to Do in Chania &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-[36px] lg:text-[48px] font-cormorant font-medium text-[#1A1714] mb-14 leading-[1.1] text-center">
            Who This Villa Is Perfect For
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: 'Families', desc: 'Shallow beaches nearby, safe garden, space for kids to run. Three bedrooms sleep up to eight.' },
              { icon: Heart, title: 'Couples', desc: 'Sunset terrace, hidden cove, total privacy. The kind of place where you leave your phone inside.' },
              { icon: Briefcase, title: 'Remote Workers', desc: 'Fast WiFi, quiet mornings, a desk with a sea view. Work until noon, swim until sunset.' },
              { icon: CalendarDays, title: 'Long Stays', desc: 'Full kitchen, washing machine, local shops nearby. Designed to feel like home, not a hotel.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-[#f0ebe5] rounded-xl p-8 text-center">
                  <Icon className="w-7 h-7 text-[#c5a059] mx-auto mb-5" strokeWidth={1.5} />
                  <h3 className="text-[20px] font-cormorant font-semibold text-[#1A1714] mb-3">{item.title}</h3>
                  <p className="text-[14px] font-inter text-[#6B6560] font-light leading-[1.8]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-[#0f172a] text-white text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-[32px] lg:text-[42px] font-cormorant font-medium mb-6 leading-[1.15]">
            Your Private Villa in Crete Awaits
          </h2>
          <p className="text-[16px] font-inter text-white/50 font-light leading-[1.8] mb-10">
            Private pool. Sunset terrace. Walking distance to the sea. No crowds, no compromises.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 px-12 py-5 bg-[#c5a059] text-white text-[14px] font-inter font-bold uppercase tracking-[0.18em] hover:bg-[#d4af6a] transition-colors duration-300"
          >
            Check Availability
          </Link>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-14 bg-[#f8f5f2]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <p className="text-[14px] font-inter text-[#8a8580]">
            <Link to="/" className="text-[#c5a059] hover:underline">Now We Land Villa</Link>
            {' '}&middot;{' '}
            <Link to="/things-to-do-chania" className="text-[#c5a059] hover:underline">Things to Do in Chania</Link>
            {' '}&middot;{' '}
            <Link to="/booking" className="text-[#c5a059] hover:underline">Book Your Stay</Link>
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
