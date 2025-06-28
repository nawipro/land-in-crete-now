
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Users, Euro, Star } from 'lucide-react';

interface BookingSectionProps {
  translations: any;
}

const BookingSection: React.FC<BookingSectionProps> = ({ translations }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const alternativeVillas = [
    {
      id: 1,
      name: 'Villa Chryssi',
      location: 'Chania, Crete',
      price: '180',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      name: 'Sea Breeze Villa',
      location: 'Rethymno, Crete',
      price: '220',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      name: 'Sunset Paradise',
      location: 'Heraklion, Crete',
      price: '200',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <section id="booking" className="py-20 bg-mediterranean-stone-gray/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-mediterranean-blue mb-6">
            {translations.booking.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {translations.booking.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-playfair text-mediterranean-blue">
                  {translations.booking.form.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="checkin">{translations.booking.form.checkin}</Label>
                    <Input
                      id="checkin"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkout">{translations.booking.form.checkout}</Label>
                    <Input
                      id="checkout"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="guests">{translations.booking.form.guests}</Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="8"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <Button className="w-full bg-mediterranean-blue hover:bg-aegean-blue text-white py-3 text-lg font-semibold">
                  <Calendar className="h-5 w-5 mr-2" />
                  {translations.booking.form.cta}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Info */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-mediterranean-blue mb-2">€250</div>
                  <div className="text-muted-foreground">{translations.booking.pricing.pernight}</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {translations.booking.pricing.minStay}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4 text-mediterranean-blue">
                  {translations.booking.includes.title}
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• {translations.booking.includes.wifi}</li>
                  <li>• {translations.booking.includes.pool}</li>
                  <li>• {translations.booking.includes.parking}</li>
                  <li>• {translations.booking.includes.garden}</li>
                  <li>• {translations.booking.includes.seaview}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Alternative Villas */}
        <div className="mt-16">
          <h3 className="text-3xl font-playfair font-bold text-mediterranean-blue mb-8 text-center">
            {translations.booking.alternatives.title}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alternativeVillas.map((villa) => (
              <Card key={villa.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={villa.image}
                    alt={villa.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full flex items-center text-sm">
                    <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                    {villa.rating}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-lg mb-1">{villa.name}</h4>
                  <p className="text-muted-foreground text-sm mb-3">{villa.location}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Euro className="h-4 w-4 mr-1" />
                      <span className="font-semibold">{villa.price}</span>
                      <span className="text-sm text-muted-foreground ml-1">/night</span>
                    </div>
                    <Button size="sm" variant="outline">
                      {translations.booking.alternatives.viewDetails}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
