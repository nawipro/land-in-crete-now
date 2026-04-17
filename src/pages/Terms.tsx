import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';

const Terms = () => {
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
            Terms & Conditions and House Rules
          </h1>
          <p className="text-[14px] font-inter text-[#9B9590] mb-14">
            Last Updated: April 16, 2026
          </p>

          <div className="prose-legal space-y-12 text-[16px] font-inter text-[#4A4540] leading-[1.85]">

            <p>
              By booking a stay at <strong>Now We Land Villa</strong>, you agree to the following terms and conditions
              on behalf of yourself and all persons in your group.
            </p>

            {/* 1. Booking & Payment */}
            <section>
              <h2 className="text-[28px] lg:text-[32px] font-cormorant font-medium text-[#1A1714] mb-6">1. Booking & Payment Policy</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Inquiry & Confirmation:</strong> Bookings made through this website are considered "Inquiries" until explicitly confirmed by the Villa management and a deposit is received.</li>
                <li><strong>Deposit:</strong> A <strong>30% non refundable deposit</strong> is required to secure your reservation. The remaining balance is due <strong>30 days prior to arrival</strong>.</li>
                <li><strong>Payment Methods:</strong> We accept bank transfers and credit card payments (Visa/Mastercard).</li>
                <li><strong>AMA Registration:</strong> In accordance with Greek law, all short term rentals must be registered with the Independent Authority for Public Revenue (IAPR). Our <strong>AMA Registration Number is 00003309394</strong>.</li>
              </ul>
            </section>

            {/* 2. Cancellation */}
            <section>
              <h2 className="text-[28px] lg:text-[32px] font-cormorant font-medium text-[#1A1714] mb-6">2. Cancellation & Refund Policy</h2>

              <div className="overflow-hidden rounded-xl border border-[#e5e0da] mb-6">
                <table className="w-full text-[15px]">
                  <thead>
                    <tr className="bg-[#eae5df]">
                      <th className="text-left px-6 py-4 font-semibold text-[#1A1714]">Timing</th>
                      <th className="text-left px-6 py-4 font-semibold text-[#1A1714]">Refund</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#e5e0da]">
                      <td className="px-6 py-4">60+ days before arrival</td>
                      <td className="px-6 py-4">Full refund of balance (excluding 30% deposit)</td>
                    </tr>
                    <tr className="border-t border-[#e5e0da] bg-[#f8f5f2]">
                      <td className="px-6 py-4">30 to 60 days before arrival</td>
                      <td className="px-6 py-4">50% refund of total booking</td>
                    </tr>
                    <tr className="border-t border-[#e5e0da]">
                      <td className="px-6 py-4">Less than 30 days before arrival</td>
                      <td className="px-6 py-4">No refund</td>
                    </tr>
                    <tr className="border-t border-[#e5e0da] bg-[#f8f5f2]">
                      <td className="px-6 py-4">No show</td>
                      <td className="px-6 py-4">No refund</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3. Check-In */}
            <section>
              <h2 className="text-[28px] lg:text-[32px] font-cormorant font-medium text-[#1A1714] mb-6">3. Check In & Check Out</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Check In:</strong> From <strong>16:00 (4:00 PM)</strong>.</li>
                <li><strong>Check Out:</strong> By <strong>11:00 AM</strong>.</li>
                <li><strong>Early Check In / Late Check Out:</strong> Subject to availability and prior arrangement. Please contact us in advance.</li>
              </ul>
            </section>

            {/* 4. House Rules — styled as welcome guide */}
            <section>
              <h2 className="text-[28px] lg:text-[32px] font-cormorant font-medium text-[#1A1714] mb-4">4. Welcome Guide</h2>
              <p className="text-[#8a8580] italic mb-8">To ensure a comfortable and peaceful stay for all our guests and neighbors.</p>

              <div className="grid gap-6">
                {[
                  { title: 'Quiet Hours', text: 'Between 23:00 (11:00 PM) and 08:00 AM. Please respect our neighbors\' peace.' },
                  { title: 'Maximum Occupancy', text: 'The number of guests must not exceed the maximum capacity stated in your booking confirmation.' },
                  { title: 'Parties & Events', text: 'Strictly prohibited unless explicitly authorized in writing by the owner.' },
                  { title: 'Smoking', text: 'Smoking is strictly forbidden inside the villa. You may smoke in outdoor areas; please use the provided ashtrays.' },
                  { title: 'Pets', text: 'No pets are allowed unless previously agreed upon in writing.' },
                  { title: 'Trash Disposal', text: 'Please dispose of your trash in the designated outdoor bins regularly.' },
                  { title: 'Safety', text: 'Ensure all doors and windows are locked when leaving the villa. The management is not responsible for any lost or stolen items.' },
                  { title: 'Energy Conservation', text: 'Please turn off the air conditioning and lights when you are not in the villa.' },
                ].map((rule, i) => (
                  <div key={i} className="flex gap-4 items-start p-5 bg-white rounded-lg border border-[#e9e4df]">
                    <span className="text-[#c5a059] font-semibold text-[14px] mt-0.5 flex-shrink-0">0{i + 1}</span>
                    <div>
                      <h4 className="text-[16px] font-semibold text-[#1A1714] mb-1">{rule.title}</h4>
                      <p className="text-[15px] text-[#6B6560] leading-[1.7]">{rule.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Liability */}
            <section>
              <h2 className="text-[28px] lg:text-[32px] font-cormorant font-medium text-[#1A1714] mb-6">5. Liability & Damages</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Guest Responsibility:</strong> Guests are responsible for any damages caused to the property or its contents during their stay.</li>
                <li><strong>Security Deposit:</strong> We reserve the right to request a refundable security deposit upon arrival. This will be returned in full after inspection, provided no damages are found.</li>
                <li><strong>Liability:</strong> Now We Land Villa and its owners are not liable for any personal injury, illness, or death occurring on the property, nor for any loss or damage to guests' personal property.</li>
              </ul>
            </section>

            {/* 6. Maintenance */}
            <section>
              <h2 className="text-[28px] lg:text-[32px] font-cormorant font-medium text-[#1A1714] mb-6">6. Maintenance & Access</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Pool & Garden:</strong> Regular maintenance of the pool and garden is required. Our staff will access these areas at scheduled times (usually early morning) to minimize disturbance.</li>
                <li><strong>Housekeeping:</strong> For stays longer than 7 days, a mid stay cleaning and linen change will be provided.</li>
              </ul>
            </section>

            {/* 7. Governing Law */}
            <section>
              <h2 className="text-[28px] lg:text-[32px] font-cormorant font-medium text-[#1A1714] mb-6">7. Governing Law</h2>
              <p>These terms are governed by the laws of Greece. Any disputes shall be subject to the exclusive jurisdiction of the courts in Chania, Crete.</p>
            </section>

            {/* Contact */}
            <section className="pt-8 border-t border-[#e5e0da]">
              <h2 className="text-[28px] lg:text-[32px] font-cormorant font-medium text-[#1A1714] mb-6">Contact Us</h2>
              <p className="mb-4">For any questions regarding these terms, please reach out to us:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Email:</strong> aegeanvillas.adm@gmail.com</li>
                <li><strong>Phone:</strong> +30 697 369 3867</li>
                <li><strong>Location:</strong> Akrotiri, Chania, Crete, Greece (AMA: 00003309394)</li>
              </ul>
            </section>

          </div>
        </div>
      </main>

      <Footer translations={t} />
    </div>
  );
};

export default Terms;
