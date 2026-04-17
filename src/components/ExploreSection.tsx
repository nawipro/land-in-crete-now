import React from 'react';
import { MapPin, Car, UtensilsCrossed, MessageCircle } from 'lucide-react';
import NavigateButton from './NavigateButton';

const destinations = [
  {
    id: 'hidden-cove',
    category: { en: 'Secret Spot', he: 'מקום סודי' },
    name: { en: 'The Hidden Cove', he: 'המפרץ הנסתר' },
    description: {
      en: 'Just 90 meters from our villa. A secret swimming spot accessible by foot, perfect for quiet morning dips and sunset walks.',
      he: 'רק 90 מטרים מהווילה שלנו. מקום שחייה סודי נגיש ברגל, מושלם לטבילות בוקר שקטות וטיולי שקיעה.'
    },
    distance: { en: '2 min walk', he: '2 דק׳ הליכה' },
    image: '/lovable-uploads/hidden-cove.jpeg',
  },
  {
    id: 'tersanas',
    category: { en: 'Local Beach', he: 'חוף מקומי' },
    name: { en: 'Tersanas Beach', he: 'חוף טרסנאס' },
    description: {
      en: 'Crystal clear, shallow waters. Ideal for families. Witness the most beautiful sunsets right in our neighborhood.',
      he: 'מים צלולים ורדודים. אידיאלי למשפחות. צפו בשקיעות היפות ביותר ממש בשכונה שלנו.'
    },
    distance: { en: '5 min walk', he: '5 דק׳ הליכה' },
    image: '/lovable-uploads/tersanas-sunset.webp',
  },
  {
    id: 'stavros',
    category: { en: 'Iconic', he: 'איקוני' },
    name: { en: 'Stavros Beach', he: 'חוף סטברוס' },
    description: {
      en: 'Famous lagoon like beach with crystal clear waters, perfect for families. The filming location of Zorba the Greek.',
      he: 'חוף לגונה מפורסם עם מים צלולים, מושלם למשפחות. מיקום הצילומים של זורבה היווני.'
    },
    distance: { en: '5 min drive', he: '5 דק׳ נסיעה' },
    image: '/lovable-uploads/stavros-beach.jpeg',
  },
  {
    id: 'chania',
    category: { en: 'City Life', he: 'חיי עיר' },
    name: { en: 'Chania Old Town', he: 'העיר העתיקה חאניה' },
    description: {
      en: 'Venetian harbor with charming streets, restaurants, and historic lighthouse. A must visit.',
      he: 'נמל ונציאני עם רחובות מקסימים, מסעדות ומגדלור היסטורי. חובה לבקר.'
    },
    distance: { en: '20 min drive', he: '20 דק׳ נסיעה' },
    image: '/lovable-uploads/chania-old-town.jpeg',
  },
  {
    id: 'agia-triada',
    category: { en: 'Culture', he: 'תרבות' },
    name: { en: 'Agia Triada', he: 'אגיה טריאדה' },
    description: {
      en: 'Historic monastery with beautiful architecture and peaceful gardens. Known for its wine and oil.',
      he: 'מנזר היסטורי עם אדריכלות יפה וגנים שלווים. ידוע ביין ובשמן שלו.'
    },
    distance: { en: '10 min drive', he: '10 דק׳ נסיעה' },
    image: '/lovable-uploads/agia-triada.jpeg',
  },
  {
    id: 'seitan-limania',
    category: { en: 'Adventure', he: 'הרפתקה' },
    name: { en: 'Seitan Limania', he: 'סיטאן לימניה' },
    description: {
      en: 'A stunning, narrow beach tucked between cliffs. Famous for its crystal clear turquoise waters and dramatic scenery.',
      he: 'חוף צר ומדהים חבוי בין צוקים. מפורסם במים הטורקיז הצלולים והנוף הדרמטי שלו.'
    },
    distance: { en: '25 min drive', he: '25 דק׳ נסיעה' },
    image: '/lovable-uploads/seitan-limania.jpeg',
  },
];

const infoColumns = [
  {
    icon: Car,
    title: { en: 'Getting Around', he: 'איך להסתובב' },
    text: {
      en: 'Car rental is highly recommended for exploring Akrotiri. Chania Airport is just a 15 to 20 minute drive away.',
      he: 'מומלץ מאוד לשכור רכב לטיול באקרוטירי. שדה התעופה של חאניה נמצא במרחק 15 עד 20 דקות נסיעה.'
    },
  },
  {
    icon: UtensilsCrossed,
    title: { en: 'Local Flavors', he: 'טעמים מקומיים' },
    text: {
      en: 'Try Taverna Irene for authentic Cretan cuisine or Almyriki in Stavros for fresh seafood and local specialties.',
      he: 'נסו את טברנת אירנה למטבח כרתי אותנטי או את אלמיריקי בסטברוס לפירות ים טריים ומיוחדויות מקומיות.'
    },
  },
  {
    icon: MessageCircle,
    title: { en: 'Personal Guide', he: 'מדריך אישי' },
    text: {
      en: 'We are constantly updating our local recommendations to help you make the most of your stay. Feel free to contact us for more tips.',
      he: 'אנו מעדכנים ללא הרף את ההמלצות המקומיות שלנו כדי לעזור לכם להפיק את המירב מהשהייה. אל תהססו לפנות אלינו לעוד טיפים.'
    },
  },
];

const ExploreSection: React.FC = () => {
  const lang = document.documentElement.lang === 'he' ? 'he' : 'en';

  return (
    <section id="explore" className="py-28 lg:py-40 bg-[#f8f5f2]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Section header */}
        <div className="mb-16 lg:mb-20">
          <p className="text-[14px] font-inter font-semibold uppercase tracking-[0.25em] text-[#c5a059] mb-6">
            {lang === 'he' ? 'המדריך' : 'The Guide'}
          </p>
          <h2 className="text-[48px] lg:text-[64px] font-cormorant font-medium text-[#1A1714] mb-7 leading-[1.05]">
            {lang === 'he' ? 'מעבר לווילה: הבריחה הכרתית שלכם' : 'Beyond the Villa: Your Cretan Escape'}
          </h2>
          <p className="text-[18px] lg:text-[20px] font-inter text-[#8a8580] font-light max-w-3xl leading-[1.7]">
            {lang === 'he'
              ? 'טרסנאס היא ה"נקודה המתוקה" של חצי האי אקרוטירי. קרוב מספיק לחאניה לחיי עיר, מבודד מספיק להרגיש את השקט הכרתי האותנטי.'
              : 'Tersanas is the "sweet spot" of Akrotiri Peninsula. Close enough to Chania for city life, yet secluded enough to feel the authentic Cretan silence.'}
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden"
            >
              <img
                src={dest.image}
                alt={dest.name[lang]}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-7 lg:p-8">
                <p className="text-[11px] font-inter font-bold uppercase tracking-[0.2em] text-[#c5a059] mb-3">
                  {dest.category[lang]}
                </p>

                <h3 className="text-[24px] lg:text-[28px] font-cormorant font-semibold text-white mb-3 leading-[1.15]">
                  {dest.name[lang]}
                </h3>

                <p className="text-[14px] font-inter text-white/75 font-light leading-relaxed mb-5">
                  {dest.description[lang]}
                </p>

                <div className="flex items-center gap-2">
                  <MapPin className="w-[14px] h-[14px] text-[#c5a059]" strokeWidth={1.5} />
                  <span className="text-[13px] font-inter font-medium text-[#c5a059] uppercase tracking-[0.1em]">
                    {dest.distance[lang]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom info grid */}
        <div className="grid md:grid-cols-3 gap-10 lg:gap-14 mt-20 lg:mt-28 pt-16 border-t border-[#e5e0da]">
          {infoColumns.map((col, i) => {
            const Icon = col.icon;
            return (
              <div key={i}>
                <div className="flex items-center gap-3 mb-5">
                  <Icon className="w-[20px] h-[20px] text-[#c5a059]" strokeWidth={1.5} />
                  <h4 className="text-[18px] lg:text-[20px] font-cormorant font-semibold text-[#1A1714]">
                    {col.title[lang]}
                  </h4>
                </div>
                <p className="text-[15px] font-inter text-[#6B6560] font-light leading-[1.8]">
                  {col.text[lang]}
                </p>
              </div>
            );
          })}
        </div>

        {/* Get Directions */}
        <div className="mt-16 lg:mt-20 text-center">
          <NavigateButton label="Get Directions to the Villa" />
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
