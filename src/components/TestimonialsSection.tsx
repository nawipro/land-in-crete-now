import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Michal Ben Loulou',
      location: 'Google Maps',
      text: 'Two families, one full week in April — simply perfect. The house is spacious, the location excellent, a beautiful bay only 10 minutes on foot. The private pool is a real treat, and the house feels like your own private sanctuary.',
    },
    {
      name: 'Jakob',
      location: 'Google Maps',
      text: 'Amazing view, beautiful pool — we enjoyed every moment. The experience was unforgettable. Exactly what we needed.',
    },
    {
      name: 'Yael & Oren',
      location: 'Google Maps',
      text: 'We have traveled all over Greece, but nothing compares to this. The hidden bay, the sunsets from the pool — it felt like our own private paradise. We did not want to leave.',
    },
  ];

  return (
    <section className="py-28 bg-[#F0EBE3]">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-inter font-semibold uppercase tracking-[0.2em] text-[#C4A882] mb-4">
            Guest Stories
          </p>
          <h2 className="text-4xl lg:text-5xl font-cormorant font-medium text-[#1A1714] mb-4">
            They Came. They Stayed. They Returned.
          </h2>
        </div>

        {/* Reviews */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 flex flex-col justify-between shadow-sm">
              {/* Stars */}
              <div>
                <div className="flex gap-0.5 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-[#C4A882] text-[#C4A882]" />
                  ))}
                </div>
                <p className="text-[15px] font-inter text-[#6B6560] leading-relaxed">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>
              {/* Attribution */}
              <div className="mt-8 pt-6 border-t border-[#F0EBE3]">
                <p className="text-sm font-inter font-semibold text-[#1A1714]">{r.name}</p>
                <p className="text-xs font-inter text-[#C4A882] mt-0.5">{r.location} · ★ 5.0</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust line */}
        <p className="text-center text-sm font-inter text-[#6B6560] mt-10 font-light">
          All reviews are verified guests on Google Maps
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;
