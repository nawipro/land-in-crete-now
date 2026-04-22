import React from 'react';
import NavigateButton from './NavigateButton';

const destinations = [
  { id: 'hidden-cove', category: 'Secret Spot', name: 'The Hidden Cove', description: 'Just 90 meters from our villa. A secret swimming spot accessible by foot, perfect for quiet morning dips and sunset walks.', distance: '2 min walk', image: '/lovable-uploads/hidden-cove.jpeg' },
  { id: 'tersanas', category: 'Local Beach', name: 'Tersanas Beach', description: 'Crystal clear, shallow waters. Ideal for families. Witness the most beautiful sunsets right in our neighborhood.', distance: '5 min walk', image: '/lovable-uploads/tersanas-sunset.webp' },
  { id: 'stavros', category: 'Iconic', name: 'Stavros Beach', description: 'Famous lagoon like beach with crystal clear waters, perfect for families. The filming location of Zorba the Greek.', distance: '5 min drive', image: '/lovable-uploads/stavros-beach.jpeg' },
  { id: 'chania', category: 'City Life', name: 'Chania Old Town', description: 'Venetian harbor with charming streets, restaurants, and historic lighthouse. A must visit.', distance: '20 min', image: '/lovable-uploads/chania-old-town.jpeg' },
  { id: 'agia-triada', category: 'Culture', name: 'Agia Triada', description: 'Historic monastery with beautiful architecture and peaceful gardens. Known for its wine and oil.', distance: '10 min', image: '/lovable-uploads/agia-triada.jpeg' },
  { id: 'seitan-limania', category: 'Adventure', name: 'Seitan Limania', description: 'A stunning, narrow beach tucked between cliffs. Famous for its crystal clear turquoise waters and dramatic scenery.', distance: '25 min', image: '/lovable-uploads/seitan-limania.jpeg' },
];

const tips = [
  { num: '01', title: 'Getting Around', text: 'Car rental is highly recommended for exploring Akrotiri. Chania Airport is just a 15 to 20 minute drive away.' },
  { num: '02', title: 'Local Flavors', text: 'Try Taverna Irene for authentic Cretan cuisine or Almyriki in Stavros for fresh seafood and local specialties.' },
  { num: '03', title: 'Personal Guide', text: 'We are constantly updating our local recommendations. Feel free to contact us for more tips.' },
];

const ExploreSection: React.FC = () => {
  return (
    <section id="explore" className="py-20 md:py-24 lg:py-32 bg-[#ece7dc]">
      <div className="max-w-[1296px] mx-auto px-5 md:px-10 lg:px-[72px]">

        <div className="mb-14 lg:mb-18">
          <p className="text-[10px] font-sans font-medium uppercase tracking-[.32em] text-[#7a6f62] opacity-55 mb-6">
            — The Guide
          </p>
          <h2 className="font-serif font-light text-[#2a251f] text-[40px] lg:text-[56px] tracking-[-.015em] leading-[1.1] mb-4">
            Beyond the Villa: Your <em className="not-italic italic">Cretan Escape</em>
          </h2>
          <p className="font-sans text-[14px] lg:text-[15px] leading-[1.7] text-[#2a251f] opacity-75 max-w-2xl">
            Tersanas is the "sweet spot" of Akrotiri Peninsula. Close enough to Chania for city life, yet secluded enough to feel the authentic Cretan silence
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {destinations.map((dest) => (
            <div key={dest.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1410]">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="eager" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />

                {/* Category chip */}
                <span className="absolute top-3 left-3 bg-[#f4f1ea]/90 text-[#2a251f] text-[9px] font-sans font-medium tracking-[.26em] uppercase px-2.5 py-1.5">
                  {dest.category}
                </span>

                {/* Bottom — name + distance */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <h3 className="font-serif font-light text-[22px] lg:text-[26px] text-[#f4f1ea] drop-shadow-[0_1px_10px_rgba(0,0,0,0.3)]">
                    {dest.name}
                  </h3>
                  <span className="font-sans text-[9px] tracking-[.22em] uppercase text-[#f4f1ea]/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] flex-shrink-0 ml-3">
                    {dest.distance}
                  </span>
                </div>
              </div>
              <p className="font-sans text-[13px] lg:text-[14px] leading-[1.65] text-[#2a251f] opacity-[0.72] mt-3.5">
                {dest.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tips row */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-10 lg:gap-16 mt-16 lg:mt-24">
          {tips.map((tip) => (
            <div key={tip.num} className="border-t border-[#2a251f]/20 pt-4">
              <p className="text-[10px] font-sans font-medium uppercase tracking-[.28em] text-[#7a6f62] opacity-55 mb-3">Tip {tip.num}</p>
              <h4 className="font-serif font-light text-[20px] text-[#2a251f] mb-2">{tip.title}</h4>
              <p className="font-sans text-[13px] leading-[1.65] text-[#2a251f] opacity-[0.72]">{tip.text}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-14 lg:mt-18 flex flex-col sm:flex-row items-center justify-center gap-4">
          <NavigateButton label="Get Directions to the Villa" />
          <button
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-[16px] bg-[#2a251f] text-[#f4f1ea] text-[11px] font-sans font-medium uppercase tracking-[.24em] hover:bg-[#8a6d4f] transition-colors duration-300"
          >
            Check Availability&nbsp;&nbsp;→
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
