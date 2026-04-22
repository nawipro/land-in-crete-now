import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import NavigateButton from './NavigateButton';

interface ContactSectionProps {
  translations: any;
  content?: any;
}

const ContactSection: React.FC<ContactSectionProps> = ({ content }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const { toast } = useToast();

  const contactEmail = content?.email || 'aegeanvillas.adm@gmail.com';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject || 'Website Inquiry');
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    toast({ title: 'Opening your email client', description: 'Your message is ready to send' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass = 'w-full border-0 border-b border-[#2a251f]/22 bg-transparent px-0 py-2.5 text-[14px] font-sans text-[#2a251f] placeholder:opacity-50 focus:outline-none focus:border-[#2a251f] transition-colors';

  return (
    <section id="contact" className="py-20 md:py-24 lg:py-32 bg-[#f4f1ea]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-[72px]">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Left — contact info */}
          <div>
            <p className="text-[10px] font-sans font-medium uppercase tracking-[.32em] text-[#7a6f62] opacity-55 mb-6">
              — Get in Touch
            </p>
            <h2 className="font-serif font-light text-[#2a251f] text-[40px] lg:text-[52px] tracking-[-.015em] leading-[1.1] mb-6">
              We answer every <em className="not-italic italic">message</em>
            </h2>
            <p className="font-sans text-[14px] lg:text-[15px] leading-[1.7] text-[#2a251f] opacity-75 mb-12 max-w-md">
              Questions about the villa, the area, or availability? We answer every message personally and with care
            </p>

            <div className="space-y-0">
              {[
                { label: 'Phone · WhatsApp', value: '+30 697 369 3867' },
                { label: 'Email', value: contactEmail },
                { label: 'Location', value: 'Akrotiri, Chania, Crete, Greece' },
              ].map((item, i) => (
                <div key={i} className="border-t border-[#2a251f]/20 pt-3 pb-5">
                  <p className="text-[10px] font-sans font-medium uppercase tracking-[.24em] text-[#7a6f62] mb-1.5">{item.label}</p>
                  <p className="font-serif font-light text-[17px] lg:text-[19px] text-[#2a251f]">{item.value}</p>
                </div>
              ))}
              <div className="border-t border-[#2a251f]/20 pt-3 pb-5">
                <p className="text-[10px] font-sans font-medium uppercase tracking-[.24em] text-[#7a6f62] mb-1.5">Follow</p>
                <p className="font-sans text-[14px] text-[#2a251f]">
                  <a href="https://instagram.com/nowweland" target="_blank" rel="noopener noreferrer" className="hover:text-[#8a6d4f] transition-colors">Instagram</a>
                  {' · '}
                  <a href="https://facebook.com/nowweland" target="_blank" rel="noopener noreferrer" className="hover:text-[#8a6d4f] transition-colors">Facebook</a>
                </p>
              </div>
              <div className="pt-3">
                <NavigateButton variant="contact" label="Navigate" />
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-[#f4f1ea] lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-7">
              {[
                { name: 'name', label: 'Full Name', type: 'text', placeholder: 'E.g. Alexander Smith' },
                { name: 'email', label: 'Email Address', type: 'email', placeholder: 'alex@example.com' },
                { name: 'subject', label: 'Subject', type: 'text', placeholder: 'What is your inquiry about?' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-[10px] font-sans font-medium uppercase tracking-[.24em] text-[#7a6f62] mb-1.5">{field.label}</label>
                  <input name={field.name} type={field.type} value={(formData as any)[field.name]} onChange={handleChange} placeholder={field.placeholder} required={field.name !== 'subject'} className={inputClass} />
                </div>
              ))}
              <div>
                <label className="block text-[10px] font-sans font-medium uppercase tracking-[.24em] text-[#7a6f62] mb-1.5">Your Message</label>
                <textarea name="message" rows={3} value={formData.message} onChange={handleChange} placeholder="How can we help you?" required className={`${inputClass} min-h-[80px] resize-y`} />
              </div>
              <button type="submit" className="w-full py-4 bg-[#2a251f] text-[#f4f1ea] text-[11px] font-sans font-medium uppercase tracking-[.24em] hover:bg-[#8a6d4f] transition-colors duration-300">
                Send Message&nbsp;&nbsp;→
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
