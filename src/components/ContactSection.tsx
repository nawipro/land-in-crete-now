import React, { useState } from 'react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Facebook, Instagram } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import NavigateButton from './NavigateButton';

interface ContactSectionProps {
  translations: any;
  content?: any;
}

const underlineInput = 'h-12 w-full text-[16px] font-inter text-[#1A1714] border-0 border-b border-[#e2e8f0] rounded-none bg-transparent px-0 placeholder:text-[#B8B2AC] focus:ring-0 focus:outline-none focus:border-[#c5a059] transition-colors';

const ContactSection: React.FC<ContactSectionProps> = ({ translations, content }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();
  const lang = document.documentElement.lang === 'he' ? 'he' : 'en';

  const contactData = {
    phone: content?.phone || '+30 697 369 3867',
    email: content?.email || 'aegeanvillas.adm@gmail.com',
    address: content?.address || 'Akrotiri, Chania, Crete, Greece',
    facebook_url: content?.facebook_url || 'https://facebook.com/nowweland',
    instagram_url: content?.instagram_url || 'https://instagram.com/nowweland',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject || 'Website Inquiry');
    const body = encodeURIComponent([
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      '',
      formData.message,
    ].join('\n'));
    window.location.href = `mailto:${contactData.email}?subject=${subject}&body=${body}`;
    toast({
      title: lang === 'he' ? 'נפתח לך אימייל' : 'Opening your email client',
      description: lang === 'he' ? 'ההודעה שלך מוכנה לשליחה' : 'Your message is ready to send',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-28 lg:py-40 bg-[#f8f5f2]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: Form */}
          <div>
            <h2 className="text-[48px] lg:text-[64px] font-cormorant font-medium text-[#1A1714] mb-6 leading-[1.05]">
              {lang === 'he' ? 'צרו קשר' : 'Get in Touch'}
            </h2>
            <p className="text-[17px] font-inter text-[#8a8580] font-light leading-[1.7] mb-14 max-w-lg">
              {lang === 'he'
                ? 'שאלות על הווילה, האזור, או זמינות? אנחנו עונים על כל הודעה באופן אישי ובקפידה.'
                : 'Questions about the villa, the area, or availability? We answer every message personally and with care.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                <div>
                  <label className="block text-[11px] font-inter font-bold uppercase tracking-[0.16em] text-[#c5a059] mb-4">
                    {lang === 'he' ? 'שם מלא' : 'Full Name'}
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={lang === 'he' ? 'למשל, אלכסנדר סמית' : 'E.g. Alexander Smith'}
                    required
                    className={underlineInput}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-inter font-bold uppercase tracking-[0.16em] text-[#c5a059] mb-4">
                    {lang === 'he' ? 'כתובת אימייל' : 'Email Address'}
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="alex@example.com"
                    required
                    className={underlineInput}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-inter font-bold uppercase tracking-[0.16em] text-[#c5a059] mb-4">
                  {lang === 'he' ? 'נושא' : 'Subject'}
                </label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={lang === 'he' ? 'במה מדובר הפניה שלך?' : 'What is your inquiry about?'}
                  className={underlineInput}
                />
              </div>

              <div>
                <label className="block text-[11px] font-inter font-bold uppercase tracking-[0.16em] text-[#c5a059] mb-4">
                  {lang === 'he' ? 'ההודעה שלך' : 'Your Message'}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={lang === 'he' ? 'איך נוכל לעזור לך?' : 'How can we help you?'}
                  required
                  className="w-full text-[16px] font-inter text-[#1A1714] border-0 border-b border-[#e2e8f0] rounded-none bg-transparent px-0 placeholder:text-[#B8B2AC] focus:ring-0 focus:outline-none focus:border-[#c5a059] transition-colors resize-y"
                />
              </div>

              <button
                type="submit"
                className="px-12 py-5 bg-[#0f172a] text-white text-[13px] font-inter font-bold uppercase tracking-[0.2em] hover:bg-[#c5a059] transition-all duration-300"
              >
                {lang === 'he' ? 'שליחת הודעה' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Right: Contact Details */}
          <div className="lg:pt-4">
            <h3 className="text-[32px] lg:text-[36px] font-cormorant font-medium text-[#1A1714] italic mb-12">
              {lang === 'he' ? 'פרטי התקשרות' : 'Contact Details'}
            </h3>

            <div className="space-y-10">
              {/* Phone */}
              <div className="flex items-start gap-5">
                <Phone className="w-[22px] h-[22px] text-[#c5a059] mt-1 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-[11px] font-inter font-bold uppercase tracking-[0.16em] text-[#c5a059] mb-2">
                    {lang === 'he' ? 'טלפון ו-WhatsApp' : 'Phone & WhatsApp'}
                  </p>
                  <p className="text-[20px] font-inter font-medium text-[#1A1714]">
                    {contactData.phone}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5">
                <Mail className="w-[22px] h-[22px] text-[#c5a059] mt-1 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-[11px] font-inter font-bold uppercase tracking-[0.16em] text-[#c5a059] mb-2">
                    {lang === 'he' ? 'כתובת אימייל' : 'Email Address'}
                  </p>
                  <p className="text-[20px] font-inter font-medium text-[#1A1714]">
                    {contactData.email}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-5">
                <MapPin className="w-[22px] h-[22px] text-[#c5a059] mt-1 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-[11px] font-inter font-bold uppercase tracking-[0.16em] text-[#c5a059] mb-2">
                    {lang === 'he' ? 'מיקום' : 'Location'}
                  </p>
                  <p className="text-[20px] font-inter font-medium text-[#1A1714] mb-3">
                    {contactData.address}
                  </p>
                  <NavigateButton variant="contact" label="Navigate" />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#e5e0da] my-12" />

            {/* Follow Our Journey */}
            <h3 className="text-[28px] lg:text-[32px] font-cormorant font-medium text-[#1A1714] italic mb-8">
              {lang === 'he' ? 'עקבו אחרינו' : 'Follow Our Journey'}
            </h3>

            <div className="flex items-center gap-10">
              <a
                href={contactData.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-[13px] font-inter font-bold uppercase tracking-[0.18em] text-[#1A1714] hover:text-[#c5a059] transition-colors"
              >
                Instagram
                <ArrowRight className="w-[16px] h-[16px] text-[#c5a059] group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </a>
              <a
                href={contactData.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-[13px] font-inter font-bold uppercase tracking-[0.18em] text-[#1A1714] hover:text-[#c5a059] transition-colors"
              >
                Facebook
                <ArrowRight className="w-[16px] h-[16px] text-[#c5a059] group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
