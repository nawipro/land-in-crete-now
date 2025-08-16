
import React from 'react';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import { Facebook, Instagram } from 'lucide-react';

interface FooterProps {
  translations: any;
}

const Footer: React.FC<FooterProps> = ({ translations }) => {
  return (
    <footer className="bg-mediterranean-blue text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-playfair font-bold mb-4">Now We Land</h3>
            <p className="text-blue-100 mb-4 leading-relaxed">
              {translations.footer.description}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/nowweland"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/nowweland"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{translations.footer.quickLinks}</h4>
            <ul className="space-y-2 text-blue-100">
              <li><a href="#home" className="hover:text-white transition-colors">{translations.nav.home}</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">{translations.nav.about}</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">{translations.nav.gallery}</a></li>
              <li><a href="#booking" className="hover:text-white transition-colors">{translations.nav.booking}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">{translations.nav.contact}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{translations.footer.contact}</h4>
            <div className="space-y-3 text-blue-100">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                <span>+30 123 456 789</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                <span>info@nowweland.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-3 flex-shrink-0 mt-1" />
                <span>Akrotiri, Chania<br />Crete, Greece</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-400 mt-8 pt-8 text-center text-blue-100">
          <p className="flex items-center justify-center">
            {translations.footer.copyright} 
            <Heart className="h-4 w-4 mx-2 text-red-400 fill-current" />
            {translations.footer.madeWith}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
