import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Star, Camera } from 'lucide-react';
import { translations } from '@/utils/translations';

const ExploreArea = () => {
  const [currentLang, setCurrentLang] = useState<'en' | 'he'>('en');

  useEffect(() => {
    document.documentElement.dir = currentLang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, []);

  const currentTranslations = translations[currentLang];

  const attractions = [
    {
      id: 1,
      category: 'beaches',
      name: currentLang === 'en' ? 'Our Private Hidden Bay' : 'המפרץ הנסתר הפרטי שלנו',
      description: currentLang === 'en' 
        ? 'Just 90 meters from our villa! A secret swimming spot accessible by foot, perfect for quiet morning dips and sunset walks. This is your private access to the sea.'
        : 'רק 90 מטרים מהווילה שלנו! מקום שחייה סודי הנגיש ברגל, מושלם לטבילות בוקר שקטות וטיולי שקיעה. זוהי הגישה הפרטית שלכם לים.',
      distance: '90 m',
      time: '2 min walk',
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      highlight: true
    },
    {
      id: 2,
      category: 'beaches',
      name: currentLang === 'en' ? 'Stavros Beach' : 'חוף סטברוס',
      description: currentLang === 'en' 
        ? 'Famous lagoon-like beach with crystal clear waters, perfect for families'
        : 'חוף מפורסם דמוי אגם עם מים צלולים, מושלם למשפחות',
      distance: '5 km',
      time: '8 min drive',
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      category: 'cultural',
      name: currentLang === 'en' ? 'Chania Old Town' : 'העיר העתיקה חאניה',
      description: currentLang === 'en'
        ? 'Venetian harbor with charming streets, restaurants, and historic lighthouse'
        : 'נמל ונציאני עם רחובות מקסימים, מסעדות ומגדלור היסטורי',
      distance: '15 km',
      time: '20 min drive',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      category: 'nature',
      name: currentLang === 'en' ? 'Agia Triada Monastery' : 'מנזר אגיה טריאדה',
      description: currentLang === 'en'
        ? 'Historic monastery with beautiful architecture and peaceful gardens'
        : 'מנזר היסטורי עם אדריכלות יפה וגנים שלווים',
      distance: '3 km',
      time: '5 min drive',
      image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      category: 'dining',
      name: currentLang === 'en' ? 'Local Tavernas' : 'טברנות מקומיות',
      description: currentLang === 'en'
        ? 'Authentic Cretan cuisine with fresh seafood and local specialties'
        : 'מטבח כרתי אותנטי עם פירות ים טריים ומיוחדויות מקומיות',
      distance: '2-10 km',
      time: '5-15 min',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className={`min-h-screen ${currentLang === 'he' ? 'rtl' : 'ltr'}`}>
      <Header 
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        translations={currentTranslations}
      />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-mediterranean text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
              {currentLang === 'en' ? 'Explore Akrotiri & Chania' : 'גלו את אקרוטירי וחאניה'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {currentLang === 'en' 
                ? 'Discover the hidden gems, pristine beaches, historic sites, and authentic tavernas around our villa'
                : 'גלו את האבני הנסתרות, החופים הבתוליים, האתרים ההיסטוריים והטברנות האותנטיות סביב הווילה שלנו'}
            </p>
          </div>
        </section>

        {/* Attractions Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {attractions.map((attraction) => (
                <Card key={attraction.id} className={`overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
                  attraction.highlight ? 'ring-2 ring-mediterranean-blue' : ''
                }`}>
                  <div className="relative h-64">
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    {attraction.highlight && (
                      <div className="absolute top-4 right-4 bg-mediterranean-blue text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {currentLang === 'en' ? 'Villa Highlight' : 'דגש הווילה'}
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className={`text-xl font-playfair ${
                      attraction.highlight ? 'text-mediterranean-blue' : 'text-mediterranean-blue'
                    }`}>
                      {attraction.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {attraction.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {attraction.distance}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {attraction.time}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <h3 className="text-2xl font-playfair font-bold text-mediterranean-blue mb-4">
                {currentLang === 'en' ? 'More recommendations coming soon!' : 'עוד המלצות בקרוב!'}
              </h3>
              <p className="text-muted-foreground mb-8">
                {currentLang === 'en' 
                  ? 'We are constantly updating our local recommendations to help you make the most of your stay'
                  : 'אנו מעדכנים ללא הרף את ההמלצות המקומיות שלנו כדי לעזור לכם להפיק את המירב מהשהייה שלכם'}
              </p>
              <Button 
                size="lg"
                className="bg-mediterranean-blue hover:bg-aegean-blue text-white px-8 py-3 rounded-full"
                onClick={() => window.location.href = '/#contact'}
              >
                {currentLang === 'en' ? 'Contact Us for More Tips' : 'צרו קשר לעוד טיפים'}
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer translations={currentTranslations} />
    </div>
  );
};

export default ExploreArea;
