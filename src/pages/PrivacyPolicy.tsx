import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';

const PrivacyPolicy = () => {
  const [currentLang, setCurrentLang] = useState<'en' | 'he'>('en');

  useEffect(() => {
    document.documentElement.dir = currentLang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    window.scrollTo(0, 0);
  }, [currentLang]);

  const t = translations[currentLang];

  return (
    <div className={`min-h-screen ${currentLang === 'he' ? 'rtl' : 'ltr'}`}>
      <Header currentLang={currentLang} onLanguageChange={setCurrentLang} translations={t} />

      <main className="pt-28 pb-28 lg:pb-40 bg-[#f8f5f2]">
        <div className="max-w-[800px] mx-auto px-6 lg:px-8">

          <p className="text-[13px] font-inter font-semibold uppercase tracking-[0.25em] text-[#c5a059] mb-6">
            Legal
          </p>
          <h1 className="text-[42px] lg:text-[56px] font-cormorant font-medium text-[#1A1714] mb-4 leading-[1.1]">
            Privacy and Cookies Policy
          </h1>
          <p className="text-[14px] font-inter text-[#9B9590] mb-14">
            Last Updated: April 16, 2026
          </p>

          <div className="prose-legal space-y-12 text-[16px] font-inter text-[#4A4540] leading-[1.85]">

            <p>
              At <strong>Now We Land Villa</strong>, we are committed to protecting your privacy and ensuring that your
              personal information is handled in a safe and responsible manner. This policy outlines how
              we collect, use, and protect your data in accordance with the <strong>EU General Data Protection
              Regulation (GDPR)</strong> and Greek legislation.
            </p>

            <section>
              <h2 className="text-[28px] lg:text-[32px] font-cormorant font-medium text-[#1A1714] mb-6">1. Information We Collect</h2>
              <p className="mb-4">When you visit our website, make an inquiry, or book a stay, we may collect the following personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Contact Details:</strong> Name, email address, and telephone number.</li>
                <li><strong>Booking Details:</strong> Dates of stay, number of guests, and special requests.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, and navigation patterns (collected via cookies).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[28px] lg:text-[32px] font-cormorant font-medium text-[#1A1714] mb-6">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information collected to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Process Bookings:</strong> Manage your reservation and send confirmation details.</li>
                <li><strong>Customer Support:</strong> Respond to your inquiries and provide assistance during your stay.</li>
                <li><strong>Personalization:</strong> Improve our website experience and tailor our services to your interests.</li>
                <li><strong>Legal Compliance:</strong> Comply with Greek tax and tourism regulations (including AMA registration requirements, Property Registration Number: 00003309394).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[28px] lg:text-[32px] font-cormorant font-medium text-[#1A1714] mb-6">3. Cookies Policy</h2>
              <p className="mb-4">Our website uses cookies to ensure proper functioning and enhance your experience.</p>

              <h3 className="text-[20px] font-cormorant font-semibold text-[#1A1714] mb-3 mt-8">What are Cookies?</h3>
              <p className="mb-4">Cookies are small data files placed on your device. They help the website remember your actions and preferences (such as language or font size) over time.</p>

              <h3 className="text-[20px] font-cormorant font-semibold text-[#1A1714] mb-3 mt-8">How We Use Cookies:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Necessary for the site to operate (e.g., booking calendar).</li>
                <li><strong>Analytical Cookies:</strong> We use <strong>Google Analytics</strong> to gather anonymous statistics about site visits. You can opt out of these cookies via your browser settings.</li>
                <li><strong>Preference Cookies:</strong> To remember your display settings and navigation language.</li>
              </ul>

              <h3 className="text-[20px] font-cormorant font-semibold text-[#1A1714] mb-3 mt-8">Controlling Cookies:</h3>
              <p>You can control or delete cookies through your browser settings. However, disabling cookies may affect the functionality of certain features on our site.</p>
            </section>

            <section>
              <h2 className="text-[28px] lg:text-[32px] font-cormorant font-medium text-[#1A1714] mb-6">4. Data Protection & Security</h2>
              <p className="mb-4">We implement robust security measures to protect your data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Encryption:</strong> Our entire site is protected by SSL (Secure Socket Layer) technology.</li>
                <li><strong>Restricted Access:</strong> Your personal information is only accessible to a limited number of authorized personnel.</li>
                <li><strong>No Third Party Sharing:</strong> We do not sell, trade, or transfer your personal information to third parties, except as required by law or to provide essential services (e.g., payment processing).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[28px] lg:text-[32px] font-cormorant font-medium text-[#1A1714] mb-6">5. Your Rights</h2>
              <p className="mb-4">Under the GDPR, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal data we hold about you.</li>
                <li>Request the correction or deletion of your data.</li>
                <li>Withdraw your consent for marketing communications at any time.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[28px] lg:text-[32px] font-cormorant font-medium text-[#1A1714] mb-6">6. Contact Us</h2>
              <p className="mb-4">If you have any questions regarding this policy or wish to exercise your rights, please contact us at:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Email:</strong> aegeanvillas.adm@gmail.com</li>
                <li><strong>Phone:</strong> +30 697 369 3867</li>
                <li><strong>Location:</strong> Akrotiri, Chania, Crete, Greece (Property Registration Number: 00003309394)</li>
              </ul>
            </section>

          </div>
        </div>
      </main>

      <Footer translations={t} />
    </div>
  );
};

export default PrivacyPolicy;
