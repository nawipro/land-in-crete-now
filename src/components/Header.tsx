
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface HeaderProps {
  currentLang?: 'en' | 'he';
  onLanguageChange?: (lang: 'en' | 'he') => void;
  translations: any;
}

const Header: React.FC<HeaderProps> = ({ translations }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = href;
    }
    setIsMenuOpen(false);
  };

  const navigation = [
    { name: translations.nav.home, href: '#home' },
    { name: translations.nav.about, href: '#about' },
    { name: translations.nav.gallery, href: '#gallery' },
    { name: translations.nav.booking, href: '#booking' },
    { name: 'Explore Area', href: '#explore' },
    { name: translations.nav.contact, href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/85 backdrop-blur-lg shadow-sm border-b border-black/5' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[60px] lg:h-[76px]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick('#home')}
              className={`text-xl lg:text-[23px] font-playfair-display font-bold tracking-[0.03em] hover:opacity-75 transition-all duration-300 active:scale-[0.98] ${isScrolled ? 'text-[#3D2F28]' : 'text-white'}`}
            >
              Now We Land
            </button>
          </div>

          {/* Desktop Navigation - Enhanced hover effects */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`relative transition-all duration-300 font-normal text-[13px] uppercase tracking-[0.1em] group ${isScrolled ? 'text-[#3D2F28] hover:text-[#1A1714]' : 'text-white/72 hover:text-white/95'} after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-[#C4A882] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Social Media & Language Switcher & Contact - Enhanced hover effects */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <a
                href="https://facebook.com/nowweland"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all duration-300 active:scale-[0.98] p-1 rounded-full ${isScrolled ? 'text-[#6B6560] hover:text-[#1A1714]' : 'text-white/55 hover:text-white/90'}`}
              >
                <Facebook className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://instagram.com/nowweland"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all duration-300 active:scale-[0.98] p-1 rounded-full ${isScrolled ? 'text-[#6B6560] hover:text-[#1A1714]' : 'text-white/55 hover:text-white/90'}`}
              >
                <Instagram className="h-[18px] w-[18px]" />
              </a>
            </div>
            <a
              href="https://wa.me/306973693867"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-1.5 text-[14px] font-inter tracking-wide transition-all duration-300 hover:opacity-80 ${isScrolled ? 'text-[#25D366]' : 'text-[#25D366]/90'}`}
            >
              <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="font-medium">WhatsApp</span>
            </a>
          </div>

          {/* Mobile menu button - Enhanced effects */}
          <div className="lg:hidden flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:shadow-lg active:scale-[0.98] transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Enhanced sliding effect */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className={`px-2 pt-2 pb-3 space-y-1 bg-background/80 backdrop-blur-sm rounded-lg mt-2 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-3 py-2 text-base font-medium text-foreground hover:text-mediterranean-blue transition-all duration-300 rounded-md hover:bg-accent/50 active:scale-[0.98]"
              >
                {item.name}
              </button>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex items-center justify-center space-x-4 px-3 py-2">
                <a
                  href="https://facebook.com/nowweland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-mediterranean-blue transition-all duration-300 hover:shadow-lg active:scale-[0.98] p-2 rounded-full"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/nowweland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-mediterranean-blue transition-all duration-300 hover:shadow-lg active:scale-[0.98] p-2 rounded-full"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
              <div className="flex items-center px-3 py-2 text-sm text-muted-foreground hover:text-mediterranean-blue transition-colors duration-300">
                <Phone className="h-4 w-4 mr-2" />
                <span>+30 697 369 3867</span>
              </div>
              <div className="flex items-center px-3 py-2 text-sm text-muted-foreground hover:text-mediterranean-blue transition-colors duration-300">
                <Mail className="h-4 w-4 mr-2" />
                <span>aegeanvillas.adm@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
