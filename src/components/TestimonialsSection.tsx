import React from 'react';

const reviews = [
  { name: 'Michal Ben Loulou', source: 'Google Maps', text: 'Two families, one full week in April. Simply perfect. The house is spacious, the location excellent, a beautiful bay only 10 minutes on foot. The private pool is a real treat, and the house feels like your own private sanctuary.' },
  { name: 'Jakob', source: 'Google Maps', text: 'Amazing view, beautiful pool. We enjoyed every moment. The experience was unforgettable. Exactly what we needed.' },
  { name: 'Isabella Charlotte', source: 'Airbnb', text: 'We spent almost the entire six weeks of our holiday in the house and had a great time there. It is beautiful, quiet and a little off the beaten track, yet you have everything you need nearby and have several great and not too crowded beaches in the immediate vicinity. The house was clean and well appointed. Stella was very nice and always available.' },
  { name: 'Ronen', source: 'Airbnb', text: 'A stunning villa, very luxurious. We were a family with 4 teenagers and there was enough room for everyone. Spacious rooms, a sufficient kitchen, and especially the pool and access to the small and stunning lagoon that can be reached directly from the house. The landlords were very kind and responded immediately to any need that arose. Really dreamy. In short, highly recommended.' },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section id="guest-stories" className="py-20 md:py-24 lg:py-32 bg-[#f4f1ea]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-[72px]">

        <div className="mb-14 lg:mb-18">
          <p className="text-[10px] font-sans font-medium uppercase tracking-[.32em] text-[#7a6f62] opacity-55 mb-6">
            — Guest Stories
          </p>
          <h2 className="font-serif font-light text-[#2a251f] text-[40px] lg:text-[56px] tracking-[-.015em] leading-[1.1]">
            They came. They stayed. <em className="not-italic italic">They returned</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-12">
          {reviews.map((review, i) => (
            <div key={i} className="border-t border-[#2a251f]/20 pt-6 lg:pt-7">
              <p className="text-[13px] tracking-[.2em] text-[#8a6d4f] mb-4">★★★★★</p>
              <p className="font-serif italic font-light text-[16px] lg:text-[18px] leading-[1.55] text-[#2a251f] opacity-[0.88] mb-6">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <span className="font-sans font-medium text-[12px] text-[#2a251f]">{review.name}</span>
                <span className="font-sans text-[9px] tracking-[.22em] uppercase text-[#7a6f62] opacity-55">{review.source}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] font-sans tracking-[.28em] uppercase text-[#7a6f62] opacity-55 mt-14">
          All reviews are verified guests
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;
