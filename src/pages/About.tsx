import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { translations as i18n } from '@/utils/translations';
import { useCms } from '@/hooks/use-cms';
import { Waves, Droplets, Bed, Users as UsersIcon, Trees, Plane } from 'lucide-react';

const About: React.FC = () => {
  // English-only page (keeps header switcher functional without changing nav)
  const [currentLang, setCurrentLang] = useState<'en' | 'he'>('en');
  const { data: cms } = useCms<any>('about', 'en');

  useEffect(() => {
    // SEO basics
    const title = 'About | Now We Land – Your Private Horizon';
    const desc = 'Boutique villa in Akrotiri, Crete. 90 m from a hidden cove, 43 m² private pool, sunsets, and space for up to 8 guests. Book your stay at Now We Land.';
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
          <p className="mt-4 text-[18px] md:text-[20px] leading-[1.4] font-medium text-muted-foreground">
            Boutique stone villa in Akrotiri, Crete. 90 m from a hidden cove, 43 m² private pool, and uninterrupted sunset views. 14 min to CHQ airport.
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
        <section className="container mx-auto px-6 lg:px-12 pt-16 pb-14">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
            {/* Image left */}
            <div className="w-full">
              <img
                src={cms?.image?.url || '/lovable-uploads/b1acf90b-76c1-4e7f-9bf7-7cefd9365f6a.png'}
                alt="Villa, pool and garden view during the day"
                className="w-full h-auto rounded-2xl shadow-md"
                style={{ objectPosition: '50% 55%' }}
                loading="lazy"
              />
            </div>
            {/* Text right */}
            <div className="max-w-[65ch]">
              <h2 className="text-3xl md:text-4xl font-cormorant font-medium text-foreground mb-3">
                A Slice of Paradise
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-base md:text-lg leading-relaxed">
                  Our villa sits just 90 meters from the sea, in a peaceful area with open views and spectacular sunsets.
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  The house offers three separate bedrooms and a private suite connected to a sunroom that can host two additional guests.
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  With a private 43 sqm pool, a fruit-tree garden and BBQ, a fully equipped kitchen, a spacious living room, and multiple balconies, the villa comfortably hosts up to 8 guests in luxury and tranquility.
                </p>
              </div>
              {/* Feature list */}
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3">
                  <Waves className="h-5 w-5 text-foreground/80" aria-hidden="true" />
                  <span className="text-foreground">90 m from a hidden bay</span>
                </div>
                <div className="flex items-center gap-3">
                  <Droplets className="h-5 w-5 text-foreground/80" aria-hidden="true" />
                  <span className="text-foreground">43 sqm private pool</span>
                </div>
                <div className="flex items-center gap-3">
                  <Bed className="h-5 w-5 text-foreground/80" aria-hidden="true" />
                  <span className="text-foreground">3 bedrooms + private sunroom suite (sleeps +2)</span>
                </div>
                <div className="flex items-center gap-3">
                  <UsersIcon className="h-5 w-5 text-foreground/80" aria-hidden="true" />
                  <span className="text-foreground">Up to 8 guests</span>
                </div>
                <div className="flex items-center gap-3">
                  <Trees className="h-5 w-5 text-foreground/80" aria-hidden="true" />
                  <span className="text-foreground">Garden &amp; BBQ</span>
                </div>
                <div className="flex items-center gap-3">
                  <Plane className="h-5 w-5 text-foreground/80" aria-hidden="true" />
                  <span className="text-foreground">14 min to CHQ airport</span>
                </div>
              </div>
              {/* CTAs below text */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <a href="/#booking">Book Your Stay</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/#gallery">View Gallery</a>
                </Button>
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
