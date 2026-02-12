import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Sarah & James',
      location: 'London, UK',
      text: 'We have traveled all over Greece, but nothing compares to this. The hidden bay, the sunsets from the pool \u2014 it felt like our own private paradise. We did not want to leave.',
    },
    {
      name: 'Marco & Elena',
      location: 'Milan, Italy',
      text: 'The villa exceeded every expectation. Waking up to the sea view, cooking dinner with local ingredients, watching the kids play in the garden \u2014 pure magic.',
    },
    {
      name: 'David R.',
      location: 'New York, USA',
      text: 'If you are looking for total peace and beauty, this is it. No crowds, no noise \u2014 just the sound of the waves and the most incredible sunsets I have ever seen.',
    },
  ];

  return (
    <section className="py-24 bg-sky-50/50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-cormorant font-medium text-mediterranean-deep-navy mb-4">
            What Our Guests Say
          </h2>
          <p className="text-lg font-inter text-mediterranean-stone-gray font-light">
            Real stories from real guests who found their place in the sun.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {reviews.map((r, i) => (
            <Card key={i} className="rounded-2xl shadow-sm border-0 bg-white">
              <CardContent className="p-8 space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm font-inter text-mediterranean-stone-gray leading-relaxed italic">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="pt-2">
                  <p className="text-sm font-inter font-semibold text-mediterranean-deep-navy">{r.name}</p>
                  <p className="text-xs font-inter text-mediterranean-stone-gray">{r.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
