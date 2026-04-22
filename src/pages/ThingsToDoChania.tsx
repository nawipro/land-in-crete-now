import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Car, UtensilsCrossed, MessageCircle, ChevronLeft } from 'lucide-react';
import NavigateButton from '@/components/NavigateButton';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';

const destinations = [
  {
    id: 'hidden-cove',
    category: 'Secret Spot',
    name: 'The Hidden Cove',
    distance: '2 min walk',
    image: '/lovable-uploads/hidden-cove.jpeg',
    summary: 'Just 90 meters from our villa. A secret swimming spot accessible by foot, perfect for quiet morning dips and sunset walks.',
    extended: 'Tucked below the villa at the foot of a rocky trail, the Hidden Cove is the kind of place that doesn\'t appear on maps. The water is impossibly clear. There are no sunbeds, no vendors, no crowds. Just the sound of small waves meeting warm stone. Most mornings you\'ll have it entirely to yourself. Bring a towel, a book, and nothing else.',
  },
  {
    id: 'tersanas-beach',
    category: 'Local Beach',
    name: 'Tersanas Beach',
    distance: '5 min walk',
    image: '/lovable-uploads/tersanas-sunset.webp',
    summary: 'Crystal clear, shallow waters. Ideal for families. The most beautiful sunsets right in our neighborhood.',
    extended: 'Tersanas is the neighborhood beach. The sand slopes gently into shallow turquoise water, making it one of the safest swimming spots on the peninsula for children. A handful of tavernas line the shore. Order grilled octopus, watch the sun drop behind the headland, and walk home barefoot. It\'s five minutes from the villa gate.',
  },
  {
    id: 'stavros-beach',
    category: 'Iconic',
    name: 'Stavros Beach',
    distance: '5 min drive',
    image: '/lovable-uploads/stavros-beach.jpeg',
    summary: 'Famous lagoon-like beach with crystal clear waters. The filming location of Zorba the Greek.',
    extended: 'Stavros sits at the tip of a sheltered bay, backed by a dramatic mountain that fans of cinema will recognise instantly. This is where Anthony Quinn danced in Zorba the Greek. The lagoon is shallow and warm, the water impossibly still. It\'s a five-minute drive from the villa, or a scenic twenty-minute walk along the coastal path.',
  },
  {
    id: 'chania-old-town',
    category: 'City Life',
    name: 'Chania Old Town',
    distance: '20 min drive',
    image: '/lovable-uploads/chania-old-town.jpeg',
    summary: 'Venetian harbor with charming streets, restaurants, and the iconic lighthouse.',
    extended: 'Chania\'s old town is one of the Mediterranean\'s best-preserved harbour cities. Venetian and Ottoman architecture lines narrow streets that open onto waterfront tavernas, leather workshops, and tiny galleries. Walk the harbour wall to the Egyptian lighthouse. Browse the covered market for mountain herbs and local honey. Stay for dinner as the buildings glow amber against the night sky. Twenty minutes by car, a world away in atmosphere.',
  },
  {
    id: 'agia-triada',
    category: 'Culture',
    name: 'Agia Triada Monastery',
    distance: '10 min drive',
    image: '/lovable-uploads/agia-triada.jpeg',
    summary: 'Historic monastery with beautiful architecture and peaceful gardens.',
    extended: 'Founded in the 17th century by Venetian monks, Agia Triada Tzagarolon is one of the most important monasteries in Crete. The Renaissance facade gives way to quiet courtyards planted with citrus and olive trees. The monks produce their own wine and olive oil, both available to taste and buy. Visit early in the morning when the light is soft and the gardens are empty.',
  },
  {
    id: 'seitan-limania',
    category: 'Adventure',
    name: 'Seitan Limania',
    distance: '25 min drive',
    image: '/lovable-uploads/seitan-limania.jpeg',
    summary: 'A stunning, narrow beach tucked between cliffs with crystal clear turquoise waters.',
    extended: 'Seitan Limania is not a beach for everyone. The descent is steep, the path is rocky, and there are no facilities. But the reward is extraordinary: a narrow slash of sand wedged between vertical cliffs, with water so turquoise it looks artificial. Arrive early, wear proper shoes for the hike down, and bring your own water. This is Crete at its most wild and cinematic.',
  },
];

const ThingsToDoChania: React.FC = () => {
  useEffect(() => {
    document.title = 'Things to Do in Chania, Crete | Now We Land Villa';
    window.scrollTo(0, 0);

    // Set meta description
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'Discover the best things to do near Chania, Crete. Secret beaches, historic old town, monasteries, and dramatic coastal scenery. All within 25 minutes of Now We Land Villa in Akrotiri.');

    return () => {
      document.title = 'Now We Land - Boutique Villa in Crete | Private Vacation Rental';
    };
  }, []);

  return (
    <div className="bg-[#FAF8F5] min-h-screen">

      {/* Minimal header */}
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
            Akrotiri Peninsula, Western Crete
          </p>
          <h1 className="text-[42px] lg:text-[72px] font-cormorant font-medium leading-[1.05] mb-8 max-w-4xl">
            Things to Do in Chania, Crete
          </h1>
          <p className="text-[18px] lg:text-[21px] font-inter text-white/60 font-light max-w-3xl leading-[1.8]">
            The Akrotiri Peninsula is Crete's quiet side. No resort strips, no tour buses. Just ancient monasteries, hidden beaches, and villages where the afternoon still belongs to the shade of a plane tree. Everything here is within 25 minutes of the villa.
          </p>
        </div>
      </section>

      {/* Intro paragraph */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          <p className="text-[18px] lg:text-[20px] font-inter text-[#3D352F] font-light leading-[2]">
            Tersanas sits on the western edge of the Akrotiri Peninsula, a stretch of coastline that most visitors to Crete never find. The peninsula curves north from Chania, shielding a chain of small bays, rocky coves, and sandy beaches from the prevailing winds. Olive groves and wild herbs cover the hillsides. The air smells of thyme and salt.
          </p>
          <p className="text-[18px] lg:text-[20px] font-inter text-[#3D352F] font-light leading-[2] mt-8">
            From the villa, the sea is 90 metres away. Chania Airport is a 14-minute drive. The Venetian harbour of Chania Old Town is 20 minutes. And yet, standing on the terrace at sunset, watching the light turn the Aegean from blue to gold, it feels like the rest of the world has been politely asked to wait.
          </p>
        </div>
      </section>

      {/* Destinations */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          <div className="mb-16">
            <h2 className="text-[36px] lg:text-[48px] font-cormorant font-medium text-[#1A1714] leading-[1.1]">
              Six Places Worth Leaving the Pool For
            </h2>
          </div>

          <div className="space-y-20 lg:space-y-28">
            {destinations.map((dest, i) => (
              <article
                key={dest.id}
                id={dest.id}
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? 'lg:direction-rtl' : ''}`}
              >
                {/* Image */}
                <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full aspect-[4/3] object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>

                {/* Text */}
                <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
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
                    {dest.extended}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Practical info */}
      <section className="py-20 lg:py-28 bg-[#f0ebe5]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-[32px] lg:text-[42px] font-cormorant font-medium text-[#1A1714] mb-14 leading-[1.1]">
            Practical Notes
          </h2>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
            {[
              {
                icon: Car,
                title: 'Getting Around',
                text: 'Car rental is highly recommended for exploring Akrotiri. We can arrange a rental delivered to the villa on arrival day. Chania Airport (CHQ) is a 14-minute drive. Parking at the villa is free and private.',
              },
              {
                icon: UtensilsCrossed,
                title: 'Where to Eat',
                text: 'Taverna Irene in Tersanas for honest Cretan cooking. Almyriki in Stavros for seafood by the water. Glossitses in Chania for modern Greek fine dining. We keep a curated list at the villa, updated each season.',
              },
              {
                icon: MessageCircle,
                title: 'Your Personal Guide',
                text: 'Every guest receives our local recommendations. Private boat trips, wine tastings, cooking classes, guided hikes. Ask us anything before or during your stay. We answer every message personally.',
              },
            ].map((col, i) => {
              const Icon = col.icon;
              return (
                <div key={i}>
                  <div className="flex items-center gap-3 mb-5">
                    <Icon className="w-[20px] h-[20px] text-[#c5a059]" strokeWidth={1.5} />
                    <h3 className="text-[18px] lg:text-[20px] font-cormorant font-semibold text-[#1A1714]">
                      {col.title}
                    </h3>
                  </div>
                  <p className="text-[15px] font-inter text-[#6B6560] font-light leading-[1.8]">
                    {col.text}
                  </p>
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
            Ready to Explore Crete?
          </h2>
          <p className="text-[16px] font-inter text-white/50 font-light leading-[1.8] mb-10">
            Now We Land is your base. Private pool, sunset terrace, and a secret cove 90 metres away. Everything on this page is within a short drive.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              to="/#booking"
              className="inline-flex items-center gap-2.5 px-10 py-4 bg-[#c5a059] text-white text-[14px] font-inter font-bold uppercase tracking-[0.18em] hover:bg-[#d4af6a] transition-colors duration-300"
            >
              Check Availability
            </Link>
            <NavigateButton label="Get Directions" />
          </div>
        </div>
      </section>

      {/* Internal links for SEO */}
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
