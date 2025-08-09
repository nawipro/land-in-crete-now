import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { translations as i18n } from '@/utils/translations';
import { useCms } from '@/hooks/use-cms';

const About: React.FC = () => {
  // English-only page (keeps header switcher functional without changing nav)
  const [currentLang, setCurrentLang] = useState<'en' | 'he'>('en');
  const { data: cms } = useCms<any>('about', 'en');

  useEffect(() => {
    // SEO basics
    const title = 'About | Now We Land – Your Private Horizon';
    const desc = 'Boutique villa in Akrotiri, Crete — 90 m from a hidden cove, 43 m² private pool, sunsets, and space for up to 8 guests. Book your stay at Now We Land.';
    const ogImage = (cms?.image?.url as string | undefined) || '/lovable-uploads/b1acf90b-76c1-4e7f-9bf7-7cefd9365f6a.png';
    document.title = title;

    const ensureMeta = (name: string, attr: 'name' | 'property' = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
      return el;
    };

    ensureMeta('description').setAttribute('content', desc);
    ensureMeta('og:title', 'property').setAttribute('content', title);
    ensureMeta('og:description', 'property').setAttribute('content', desc);
    ensureMeta('og:type', 'property').setAttribute('content', 'website');
    ensureMeta('og:image', 'property').setAttribute('content', ogImage);
    ensureMeta('og:url', 'property').setAttribute('content', window.location.href);

    // Canonical tag
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = window.location.href;

    // Language & direction
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }, [cms]);

  return (
    <div className="min-h-screen">
      <Header currentLang={currentLang} onLanguageChange={setCurrentLang} translations={i18n.en} />

      <main className="pt-24 lg:pt-32">
        {/* Hero */}
        <section id="about" className="container mx-auto px-6 lg:px-12 text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-medium text-foreground">
            Now We Land – Your Private Horizon
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-snug">
            Boutique stone villa in Akrotiri, Crete — 90 m from a hidden cove, 43 m² private pool, and uninterrupted sunset views. 14 min to CHQ airport.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="px-8">
              <a href="/booking">Book Your Stay</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <a href="/gallery">View Gallery</a>
            </Button>
          </div>
        </section>

        {/* Intro block */}
        <section className="container mx-auto px-6 lg:px-12 mb-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-cormorant font-medium text-foreground mb-4">
                A Slice of Paradise
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-snug">
                Our villa sits just 90 meters from the sea, in a peaceful area with open views and spectacular sunsets. Designed for slow mornings and golden evenings, it blends authentic Cretan character with modern comfort.
              </p>
              <ul className="mt-6 space-y-2 text-foreground/90">
                <li>• 43 m² private pool set among fragrant gardens</li>
                <li>• 3 bedrooms + large sunroom with two fold-out beds (sleeps up to 8)</li>
                <li>• Fully equipped kitchen and generous living room with multiple balconies</li>
                <li>• Fast Wi-Fi and A/C in all rooms</li>
              </ul>
            </div>
            <div>
              <div className="rounded-xl overflow-hidden shadow-xl">
                <div className="aspect-[16/9] bg-muted">
                  <img
                    src={cms?.image?.url || '/lovable-uploads/b1acf90b-76c1-4e7f-9bf7-7cefd9365f6a.png'}
                    alt={cms?.image?.alt || 'Villa and garden view with private pool during the day'}
                    className="w-full h-full"
                    style={{
                      objectFit: (cms?.image?.fit as 'cover' | 'contain') || 'contain',
                      objectPosition: `${cms?.image?.position?.x ?? 50}% ${cms?.image?.position?.y ?? 50}%`
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Highlights grid */}
        <section className="container mx-auto px-6 lg:px-12 mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Private Pool (43 m²)', desc: 'Crystal-clear and family-friendly.' },
              { title: 'Garden & BBQ', desc: 'Fruit trees and shaded dining.' },
              { title: 'Hidden Bay Access (90 m)', desc: 'Turquoise, quiet swimming spot.' },
              { title: 'Sunset Views', desc: 'Night after night over the Aegean.' },
            ].map((item, i) => (
              <Card key={i} className="shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium text-foreground">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sleeping Arrangements */}
        <section className="container mx-auto px-6 lg:px-12 mb-10">
          <Card className="bg-muted/50">
            <CardContent className="p-6 md:p-8">
              <p className="text-foreground text-lg md:text-xl">
                3 bedrooms + large sunroom (2 fold-out beds) → up to 8 guests.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Amenities */}
        <section className="container mx-auto px-6 lg:px-12 mb-12">
          <p className="text-center text-muted-foreground">
            A/C in all rooms · Fast Wi-Fi · Full kitchen · Parking · Travel cot/high chair on request.
          </p>
        </section>

        {/* Location teaser */}
        <section className="container mx-auto px-6 lg:px-12 mb-14 text-center">
          <p className="text-foreground">
            Curious about nearby beaches and tavernas?{' '}
            <a href="/explore-area" className="underline underline-offset-4 hover:opacity-80">Explore the Area</a>
          </p>
        </section>

        {/* Closing CTA */}
        <section className="container mx-auto px-6 lg:px-12 mb-24 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="px-8">
              <a href="/booking">Check Dates &amp; Send Inquiry</a>
            </Button>
            <a href="https://wa.me/30" className="text-foreground hover:opacity-80 text-lg" aria-label="WhatsApp us">
              WhatsApp us
            </a>
          </div>
        </section>
      </main>

      <Footer translations={i18n.en} />
    </div>
  );
};

export default About;
