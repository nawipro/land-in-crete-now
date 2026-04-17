import React from 'react';
import { Star, ExternalLink } from 'lucide-react';

const reviews = [
  {
    name: 'Michal Ben Loulou',
    source: 'Google Maps',
    text: 'Two families, one full week in April. Simply perfect. The house is spacious, the location excellent, a beautiful bay only 10 minutes on foot. The private pool is a real treat, and the house feels like your own private sanctuary.',
  },
  {
    name: 'Jakob',
    source: 'Google Maps',
    text: 'Amazing view, beautiful pool. We enjoyed every moment. The experience was unforgettable. Exactly what we needed.',
  },
  {
    name: 'Isabella Charlotte',
    source: 'Airbnb',
    text: 'We spent almost the entire six weeks of our holiday in the house and had a great time there. It is beautiful, quiet and a little off the beaten track, yet you have everything you need nearby and have several great and not too crowded beaches in the immediate vicinity. The house was clean and well appointed. Stella was very nice and always available.',
  },
  {
    name: 'Ronen',
    source: 'Airbnb',
    text: 'A stunning villa, very luxurious. We were a family with 4 teenagers and there was enough room for everyone. Spacious rooms, a sufficient kitchen, and especially the pool and access to the small and stunning lagoon that can be reached directly from the house. It is important to arrive at the place with a vehicle. There is an excellent taverna and supermarkets within a five minute drive. The landlords were very kind and responded immediately to any need that arose. Really dreamy. In short, highly recommended.',
  },
];

const ReviewCard: React.FC<{ review: typeof reviews[0]; index: number }> = ({ review, index }) => {
  return (
    <div
      className="bg-white border border-[#E8E3DD] p-10 lg:p-12 flex flex-col justify-between transition-shadow duration-300 hover:shadow-md"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Stars */}
      <div>
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, j) => (
            <Star key={j} className="h-4 w-4 fill-[#C4A882] text-[#C4A882]" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-[17px] lg:text-[18px] font-inter text-[#4A4540] leading-[1.8] font-light">
          &ldquo;{review.text}&rdquo;
        </p>
      </div>

      {/* Attribution */}
      <div className="mt-10 pt-7 border-t border-[#EDE9E3] flex items-center justify-between">
        <div>
          <p className="text-[17px] font-inter font-semibold text-[#1A1714]">{review.name}</p>
          <p className="text-[12px] font-inter uppercase tracking-[0.14em] text-[#9B9590] mt-1.5">{review.source}</p>
        </div>
        <ExternalLink className="h-4 w-4 text-[#C4A882] opacity-40" />
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  return (
    <section id="guest-stories" className="py-32 lg:py-40 bg-[#F0EBE3]">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-20 lg:mb-24">
          <p className="text-[13px] font-inter font-semibold uppercase tracking-[0.25em] text-[#C4A882] mb-6">
            Guest Stories
          </p>
          <h2 className="text-[48px] lg:text-[60px] font-cormorant font-medium text-[#1A1714] leading-[1.12] mb-6">
            They Came. They Stayed.
            <br />
            They Returned.
          </h2>
          <p className="text-[18px] lg:text-[19px] font-inter text-[#9B9590] font-light max-w-lg mx-auto">
            Real moments shared by those who called &lsquo;Now We Land&rsquo; home.
          </p>
        </div>

        {/* Reviews Grid — 2 columns */}
        <div className="grid md:grid-cols-2 gap-7 lg:gap-8">
          {reviews.map((review, i) => (
            <ReviewCard key={i} review={review} index={i} />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 lg:mt-20">
          <p className="text-[12px] font-inter uppercase tracking-[0.2em] text-[#B0AAA4]">
            All reviews are verified guests
          </p>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
