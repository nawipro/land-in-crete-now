import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import NavigateButton from './NavigateButton';

interface FooterProps {
  translations: any;
}

const Footer: React.FC<FooterProps> = ({ translations }) => {
  const lang = document.documentElement.lang === 'he' ? 'he' : 'en';

  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-24">
        <div className="grid md:grid-cols-3 gap-14 lg:gap-20">

          {/* Column 1: Brand */}
          <div>
            <h3 className="text-[28px] font-cormorant font-semibold mb-5">Now We Land</h3>
            <p className="text-[15px] font-inter text-white/50 font-light leading-[1.8] mb-8">
              {lang === 'he'
                ? 'וילה פרטית בחצי האי אקרוטירי, חאניה. היכן שהאגאי פוגש את ההרים של כרתים.'
                : 'A private villa on the Akrotiri Peninsula, Chania. Where the Aegean meets the mountains of Crete.'}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com/nowweland"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#c5a059] hover:text-[#c5a059] transition-colors"
              >
                <Facebook className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </a>
              <a
                href="https://instagram.com/nowweland"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#c5a059] hover:text-[#c5a059] transition-colors"
              >
                <Instagram className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-[12px] font-inter font-bold uppercase tracking-[0.22em] text-[#c5a059] mb-8">
              {lang === 'he' ? 'קישורים מהירים' : 'Quick Links'}
            </h4>
            <ul className="space-y-4">
              {[
                { label: lang === 'he' ? 'הווילה' : 'The Villa', href: '#about' },
                { label: lang === 'he' ? 'גלריה' : 'Gallery', href: '#gallery' },
                { label: lang === 'he' ? 'גלו את האזור' : 'Explore Area', href: '#explore' },
                { label: 'Things to Do in Chania', href: '/things-to-do-chania' },
                { label: lang === 'he' ? 'הזמנה' : 'Booking', href: '#booking' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[15px] font-inter text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-[12px] font-inter font-bold uppercase tracking-[0.22em] text-[#c5a059] mb-8">
              {lang === 'he' ? 'פרטי קשר' : 'Contact Info'}
            </h4>
            <div className="space-y-5 text-[15px] font-inter text-white/50">
              <p>+30 697 369 3867</p>
              <p>aegeanvillas.adm@gmail.com</p>
              <p>Akrotiri, Chania, Crete</p>
              <div className="pt-3">
                <NavigateButton variant="footer" label="View Location" />
              </div>
              <p className="text-white/30 text-[13px] mt-4">AMA: 00003309394</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-7 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] font-inter text-white/30">
            &copy; 2026 Now We Land Villa. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="/privacy" className="text-[13px] font-inter text-white/30 hover:text-white/50 transition-colors">
              {lang === 'he' ? 'מדיניות פרטיות' : 'Privacy Policy'}
            </a>
            <a href="/terms" className="text-[13px] font-inter text-white/30 hover:text-white/50 transition-colors">
              {lang === 'he' ? 'תנאי שימוש' : 'Terms'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
