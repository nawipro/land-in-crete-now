import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronLeft, Anchor, Wine, CookingPot, Compass, Car, UtensilsCrossed } from 'lucide-react';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';

const destinations = [
  {
    id: 'hidden-cove',
    category: 'Secret Spot',
    name: 'The Hidden Cove',
    distance: '2 min walk',
    image: '/lovable-uploads/hidden-cove.jpeg',
    text: 'A private, quiet bay below the villa with crystal-clear water. No crowds, no noise. Just warm stone, gentle waves, and the kind of silence that makes you forget your phone exists. Most mornings you\'ll have it entirely to yourself.',
  },
  {
    id: 'tersanas-beach',
    category: 'Local Beach',
    name: 'Tersanas Beach',
    distance: '5 min walk',
    image: '/lovable-uploads/tersanas-sunset.webp',
    text: 'Safe, shallow, ideal for families. The sand slopes gently into turquoise water. A handful of local tavernas line the shore. Order grilled octopus, watch the sun set behind the headland, and walk home barefoot. Five minutes from the villa gate.',
  },
  {
    id: 'stavros-beach',
    category: 'Iconic',
    name: 'Stavros Beach',
    distance: '5 min drive',
    image: '/lovable-uploads/stavros-beach.jpeg',
    text: 'Calm lagoon, famous filming location of Zorba the Greek. The bay is sheltered, the water impossibly still. Great for couples and families alike. A five-minute drive, or a scenic twenty-minute walk along the coastal path.',
  },
  {
    id: 'chania-old-town',
    category: 'City Life',
    name: 'Chania Old Town',
    distance: '20 min drive',
    image: '/lovable-uploads/chania-old-town.jpeg',
    text: 'Venetian harbor, restaurants, shops, and evening atmosphere. Walk the harbour wall to the Egyptian lighthouse. Browse the covered market for mountain herbs and local honey. Stay for dinner as the buildings glow amber against the night sky.',
  },
  {
    id: 'agia-triada',
    category: 'Culture',
    name: 'Agia Triada Monastery',
    distance: '10 min drive',
    image: '/lovable-uploads/agia-triada.jpeg',
    text: 'Historic monastery with beautiful Renaissance architecture, peaceful gardens, and its own wine and olive oil production. Visit early in the morning when the light is soft and the courtyards are empty.',
  },
  {
    id: 'seitan-limania',
    category: 'Adventure',
    name: 'Seitan Limania',
    distance: '25 min drive',
    image: '/lovable-uploads/seitan-limania.jpeg',
    text: 'Dramatic beach between cliffs. Wild and unique. A narrow slash of sand with water so turquoise it looks artificial. The descent is steep. Bring proper shoes and your own water. This is Crete at its most cinematic.',
  },
];

const ThingsToDoChania: React.FC = () => {
  useEffect(() => {
    document.title = 'Things to Do in Chania, Crete | Now We Land Villa';
    window.scrollTo(0, 0);

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'Discover the best things to do near Chania, Crete. Secret beaches, Venetian old town, monasteries, and dramatic coastal scenery. All within 25 minutes of Now We Land Villa in Akrotiri.');

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
      <section className="py-20 lg:py-28 bg-[#0f172a] text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[13px] font-inter font-semibold uppercase tracking-[0.25em] text-[#c5a059] mb-6">
            From Your Private Villa in Akrotiri
          </p>
          <h1 className="text-[42px] lg:text-[72px] font-cormorant font-medium leading-[1.05] mb-8 max-w-4xl">
            Things to Do in Chania, Crete
          </h1>
          <p className="text-[18px] lg:text-[21px] font-inter text-white/60 font-light max-w-3xl leading-[1.8]">
            The Akrotiri Peninsula is Crete's quieter side — a place where nature, history, and space come together without the noise of mass tourism.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          <p className="text-[18px] lg:text-[20px] font-inter text-[#3D352F] font-light leading-[2]">
            If you're looking for a private villa in Crete, close to Chania but far from crowded resorts, this is exactly where you want to be.
          </p>
          <p className="text-[18px] lg:text-[20px] font-inter text-[#3D352F] font-light leading-[2] mt-8">
            No hotel strips. No tour buses. Just hidden beaches, ancient monasteries, and small local villages where time slows down.
          </p>
          <p className="text-[18px] lg:text-[20px] font-inter text-[#3D352F] font-light leading-[2] mt-8">
            At <Link to="/" className="text-[#c5a059] hover:underline">Now We Land</Link>, everything you see here is within 5 to 25 minutes from your villa, yet it feels like a completely different world.
          </p>
        </div>
      </section>

      {/* Location advantages */}
      <section className="py-20 lg:py-28 bg-[#f0ebe5]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-[36px] lg:text-[48px] font-cormorant font-medium text-[#1A1714] mb-14 leading-[1.1]">
            A Villa Location That Changes Everything
          </h2>
          <p className="text-[18px] font-inter text-[#3D352F] font-light leading-[1.8] mb-12 max-w-2xl">
            Our villa in Akrotiri, Crete is positioned for something rare:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { stat: '90 m', label: 'from a hidden cove' },
              { stat: '5 min', label: 'from family-friendly beaches' },
              { stat: '14 min', label: 'from Chania Airport' },
              { stat: '20 min', label: 'from Chania Old Town' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-8 text-center">
                <p className="text-[36px] font-cormorant font-semibold text-[#c5a059] mb-2">{item.stat}</p>
                <p className="text-[14px] font-inter text-[#6B6560] font-light">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="text-[18px] font-inter text-[#1A1714] font-medium mt-10">
            You get both: privacy and access.
          </p>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-[36px] lg:text-[48px] font-cormorant font-medium text-[#1A1714] mb-16 leading-[1.1]">
            Six Places Worth Leaving the Pool For
          </h2>

          <div className="space-y-20 lg:space-y-28">
            {destinations.map((dest, i) => (
              <article key={dest.id} id={dest.id} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full aspect-[4/3] object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <p className="text-[11px] font-inter font-bold uppercase tracking-[0.2em] text-[#c5a059] mb-4">
                    {dest.category}
                  </p>
                  <h3 className="text-[28px] lg:text-[36px] font-cormorant font-medium text-[#1A1714] mb-4 leading-[1.15]">
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="w-[14px] h-[14px] text-[#c5a059]" strokeWidth={1.5} />
                    <span className="text-[13px] font-inter font-medium text-[#c5a059] uppercase tracking-[0.1em]">
                      {dest.distance}
                    </span>
                  </div>
                  <p className="text-[16px] lg:text-[17px] font-inter text-[#3D352F] font-light leading-[1.9]">
                    {dest.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-20 lg:py-28 bg-[#f0ebe5]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-[36px] lg:text-[48px] font-cormorant font-medium text-[#1A1714] mb-14 leading-[1.1]">
            More Than a Stay — A Complete Experience
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Anchor, label: 'Private boat trips' },
              { icon: Wine, label: 'Wine tastings' },
              { icon: CookingPot, label: 'Cooking experiences' },
              { icon: Compass, label: 'Local guidance' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white rounded-xl p-8 text-center">
                  <Icon className="w-7 h-7 text-[#c5a059] mx-auto mb-4" strokeWidth={1.5} />
                  <p className="text-[16px] font-inter text-[#1A1714] font-medium">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Practical */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-14 lg:gap-20">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <Car className="w-5 h-5 text-[#c5a059]" strokeWidth={1.5} />
                <h2 className="text-[24px] lg:text-[28px] font-cormorant font-semibold text-[#1A1714]">Getting Around</h2>
              </div>
              <p className="text-[16px] font-inter text-[#6B6560] font-light leading-[1.9]">
                Car rental is highly recommended for exploring Akrotiri. We can arrange a rental delivered to the villa on your arrival day. Chania Airport (CHQ) is a 14-minute drive. Parking at the villa is free and private.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <UtensilsCrossed className="w-5 h-5 text-[#c5a059]" strokeWidth={1.5} />
                <h2 className="text-[24px] lg:text-[28px] font-cormorant font-semibold text-[#1A1714]">Where to Eat</h2>
              </div>
              <ul className="space-y-3">
                {[
                  { name: 'Taverna Irene', note: 'Honest Cretan cooking in Tersanas' },
                  { name: 'Almyriki', note: 'Fresh seafood by the water in Stavros' },
                  { name: 'Glossitses', note: 'Modern Greek fine dining in Chania' },
                ].map((r, i) => (
                  <li key={i} className="text-[16px] font-inter text-[#3D352F] font-light leading-[1.8]">
                    <span className="font-medium text-[#1A1714]">{r.name}</span> — {r.note}
                  </li>
                ))}
              </ul>
            </div>
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
            Private pool, sunset terrace, walking distance to the sea. Everything on this page is within a short drive.
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
            <Link to="/about" className="text-[#c5a059] hover:underline">About the Villa</Link>
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

export default ThingsToDoChania;
