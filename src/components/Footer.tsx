import React from 'react';
import NavigateButton from './NavigateButton';

interface FooterProps {
  translations: any;
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-[#1e1814] text-[#f4f1ea]">
      <div className="max-w-[1296px] mx-auto px-5 md:px-10 lg:px-[72px] py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[1.5fr_repeat(3,1fr)] gap-9 lg:gap-12">

          {/* Brand */}
          <div>
            <p className="font-serif italic font-light text-[28px] lg:text-[32px] tracking-[.01em]">Now We Land</p>
            <p className="font-serif italic font-light text-[14px] lg:text-[16px] opacity-[0.78] leading-[1.55] max-w-[320px] mt-4 mb-6">
              A private villa on the Akrotiri Peninsula, Chania. Where the Aegean meets the mountains of Crete
            </p>
            <p className="text-[10px] font-sans font-medium uppercase tracking-[.24em] opacity-50">
              <a href="https://facebook.com/nowweland" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">Facebook</a>
              {' · '}
              <a href="https://instagram.com/nowweland" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">Instagram</a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-sans font-medium uppercase tracking-[.28em] text-[#c9a46a] mb-7">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'The Villa', href: '#about' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'Explore Area', href: '#explore' },
                { label: 'Booking', href: '#booking' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[13px] font-sans opacity-[0.82] hover:opacity-100 transition-opacity">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[10px] font-sans font-medium uppercase tracking-[.28em] text-[#c9a46a] mb-7">Contact Info</h4>
            <div className="space-y-3 text-[13px] font-sans opacity-[0.82]">
              <p>+30 697 369 3867</p>
              <p>aegeanvillas.adm@gmail.com</p>
              <p>Akrotiri, Chania, Crete</p>
              <div className="pt-2">
                <NavigateButton variant="footer" label="View Location" />
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[10px] font-sans font-medium uppercase tracking-[.28em] text-[#c9a46a] mb-7">Legal</h4>
            <ul className="space-y-3">
              <li><a href="/privacy" className="text-[13px] font-sans opacity-[0.82] hover:opacity-100 transition-opacity">Privacy Policy</a></li>
              <li><a href="/terms" className="text-[13px] font-sans opacity-[0.82] hover:opacity-100 transition-opacity">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#f4f1ea]/12">
        <div className="max-w-[1296px] mx-auto px-5 md:px-10 lg:px-[72px] py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[10px] font-sans tracking-[.2em] uppercase opacity-50">
            &copy; 2026 Now We Land Villa · AMA 00003309394
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-[10px] font-sans tracking-[.2em] uppercase opacity-50 hover:opacity-80 transition-opacity">Privacy</a>
            <a href="/terms" className="text-[10px] font-sans tracking-[.2em] uppercase opacity-50 hover:opacity-80 transition-opacity">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
