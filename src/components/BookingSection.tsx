import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { eachDayOfInterval, format, addDays, differenceInCalendarDays, startOfDay, isAfter, isBefore } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';


interface BookingSectionProps {
  translations: any;
  content?: any;
}

type DateRange = { from?: Date; to?: Date };

const toISO = (d: Date) => format(d, 'yyyy-MM-dd');

/** Underline-only input styling */
const underlineInput = 'h-12 w-full text-[17px] font-inter text-[#1A1714] border-0 border-b border-[#e9e4df] rounded-none bg-transparent px-0 placeholder:text-[#B8B2AC] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#c5a059] transition-colors';

const BookingSection: React.FC<BookingSectionProps> = ({ translations, content }) => {
  const [range, setRange] = useState<DateRange>({});
  const [guests, setGuests] = useState(2);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [isNarrow, setIsNarrow] = React.useState(window.innerWidth < 1024);
  React.useEffect(() => {
    const check = () => setIsNarrow(window.innerWidth < 1024);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const lang = document.documentElement.lang === 'he' ? 'he' : 'en';
  const today = startOfDay(new Date());

  /* ── Supabase queries (unchanged) ───────────────────────────── */

  const { data: seasons, isLoading: seasonsLoading } = useQuery({
    queryKey: ['price_seasons'],
    queryFn: async () => {
      const { data } = await supabase
        .from('price_seasons')
        .select('*')
        .eq('status', 'published')
        .order('start_date', { ascending: true });
      return data || [];
    }
  });

  const { data: taxSeasons } = useQuery({
    queryKey: ['tax_seasons'],
    queryFn: async () => {
      const { data } = await supabase
        .from('tax_seasons')
        .select('*')
        .eq('status', 'published')
        .order('start_date', { ascending: true });
      return data || [];
    }
  });

  const { data: settings } = useQuery({
    queryKey: ['booking_settings'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('settings')
        .select('key, value');
      if (error) {
        console.error('Error fetching settings:', error);
        return {} as any;
      }
      const obj: any = {};
      (data || []).forEach((row: any) => { obj[row.key] = row.value; });
      return obj;
    }
  });

  const { data: blocked, isLoading: blockedLoading } = useQuery({
    queryKey: ['availability'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('availability')
        .select('date, status');
      if (error) {
        console.error('Error fetching availability:', error);
        return [];
      }
      return (data || []).filter((d: any) => d.status === 'blocked' || d.status === 'booked');
    }
  });

  /* ── CMS / translation data ────────────────────────────────── */

  const bookingData = {
    title: content?.title || translations.booking.title,
    subtitle: content?.subtitle || translations.booking.subtitle,
    form: {
      title: content?.form?.title || translations.booking.form.title,
      guests: content?.form?.guests || translations.booking.form.guests,
    },
    pricing: {
      pernight: content?.pricing?.pernight || translations.booking.pricing.pernight,
    },
    includes: {
      title: content?.includes?.title || translations.booking.includes.title,
      wifi: content?.includes?.wifi || translations.booking.includes.wifi,
      pool: content?.includes?.pool || translations.booking.includes.pool,
      parking: content?.includes?.parking || translations.booking.includes.parking,
      garden: content?.includes?.garden || translations.booking.includes.garden,
      seaview: content?.includes?.seaview || translations.booking.includes.seaview,
      hidden_bay: content?.includes?.hidden_bay || (lang === 'he' ? 'גישה למפרץ הנסתר' : 'Hidden Bay Access'),
    }
  };

  /* ── Pricing / availability logic (unchanged) ───────────────── */

  const blockedSet = useMemo(() => new Set((blocked || []).map((d: any) => d.date)), [blocked]);

  const availableDateRange = useMemo(() => {
    if (!seasons || seasons.length === 0) return { start: null, end: null };
    const futureSeasons = seasons.filter((s: any) => new Date(s.end_date) >= today);
    if (futureSeasons.length === 0) return { start: null, end: null };
    const earliestStart = futureSeasons.reduce((earliest: any, season: any) => {
      const seasonStart = new Date(season.start_date);
      const effectiveStart = isAfter(seasonStart, today) ? seasonStart : today;
      return !earliest || isBefore(effectiveStart, earliest) ? effectiveStart : earliest;
    }, null);
    const latestEnd = futureSeasons.reduce((latest: any, season: any) => {
      const seasonEnd = new Date(season.end_date);
      return !latest || isAfter(seasonEnd, latest) ? seasonEnd : latest;
    }, null);
    return { start: earliestStart, end: latestEnd };
  }, [seasons, today]);

  const getSeasonForDate = (date: Date) => {
    if (!seasons || seasons.length === 0) return null;
    const iso = toISO(date);
    return seasons.find((s: any) => iso >= s.start_date && iso <= s.end_date) || null;
  };

  const getTaxSeasonForDate = (date: Date) => {
    if (!taxSeasons || taxSeasons.length === 0) return null;
    const iso = toISO(date);
    return taxSeasons.find((s: any) => iso >= s.start_date && iso <= s.end_date) || null;
  };

  const nights = useMemo(() => {
    if (!range.from || !range.to) return 0;
    return Math.max(0, differenceInCalendarDays(range.to, range.from));
  }, [range]);

  const minStay = useMemo(() => {
    const d = range.from || today;
    const s = getSeasonForDate(d);
    return s?.min_stay_nights ?? 1;
  }, [range.from, seasons, today]);

  const nightlyRate = useMemo(() => {
    const d = range.from || today;
    const s = getSeasonForDate(d);
    return s?.price_per_night ?? 0;
  }, [range.from, seasons, today]);

  const currency = useMemo(() => {
    const d = range.from || today;
    const s = getSeasonForDate(d);
    return s?.currency_symbol ?? '€';
  }, [range.from, seasons, today]);

  const rangeHasBlocked = useMemo(() => {
    if (!range.from || !range.to || blockedLoading) return false;
    const days = eachDayOfInterval({ start: range.from, end: addDays(range.to, -1) });
    return days.some((d) => blockedSet.has(toISO(d)));
  }, [range, blockedSet, blockedLoading]);

  const perNightBreakdown = useMemo(() => {
    if (!range.from || !range.to) return { nights: 0, subtotal: 0 };
    const days = eachDayOfInterval({ start: range.from, end: addDays(range.to, -1) });
    let sum = 0;
    for (const d of days) {
      const s = getSeasonForDate(d);
      sum += s?.price_per_night ?? 0;
    }
    return { nights: days.length, subtotal: sum };
  }, [range, seasons]);

  const cleaningFreeNights = parseInt(settings?.cleaning_free_nights || '5') || 5;

  const cleaningTotal = useMemo(() => {
    const base = parseFloat(settings?.cleaning_fee || '0') || 0;
    const freeNights = parseInt(settings?.cleaning_free_nights || '5') || 5;
    return nights > 0 && base > 0 ? base * Math.ceil(nights / freeNights) : 0;
  }, [settings, nights]);

  const touristTaxTotal = useMemo(() => {
    if (!range.from || !range.to) return 0;
    const days = eachDayOfInterval({ start: range.from, end: addDays(range.to, -1) });
    let sum = 0;
    for (const d of days) {
      const s = getTaxSeasonForDate(d);
      const perGuest = s?.tax_per_guest_per_night ?? 0;
      sum += perGuest * guests;
    }
    return sum;
  }, [range, guests, taxSeasons]);

  const total = useMemo(() => {
    return perNightBreakdown.subtotal + cleaningTotal + touristTaxTotal;
  }, [perNightBreakdown, cleaningTotal, touristTaxTotal]);

  const validRange = !!(range.from && range.to && nights >= minStay && !rangeHasBlocked);

  const handleSelect = (next: any) => {
    if (next?.from && next?.to) {
      const len = Math.max(0, differenceInCalendarDays(next.to, next.from));
      if (len < minStay) {
        setRange({ from: next.from, to: undefined });
        return;
      }
    }
    setRange(next);
  };

  const inquiryEmail = settings?.inquiry_email || 'info@nowweland.com';

  const subject = encodeURIComponent('Now We Land – Booking inquiry');
  const body = encodeURIComponent([
    lang === 'he' ? 'פרטי פנייה:' : 'Inquiry details:',
    range.from && range.to ? `${lang === 'he' ? 'תאריכים' : 'Dates'}: ${format(range.from, 'dd MMM yyyy')} → ${format(range.to, 'dd MMM yyyy')} (${nights} ${lang === 'he' ? 'לילות' : 'nights'})` : '',
    `${lang === 'he' ? 'אורחים' : 'Guests'}: ${guests}`,
    `${lang === 'he' ? 'סיכום מחיר' : 'Price total'}: ${currency}${total.toFixed(2)}`,
    firstName ? `${lang === 'he' ? 'שם מלא' : 'Full Name'}: ${firstName}` : '',
    email ? `${lang === 'he' ? 'אימייל' : 'Email'}: ${email}` : '',
    phone ? `${lang === 'he' ? 'טלפון' : 'Phone'}: ${phone}` : '',
    message ? `${lang === 'he' ? 'הודעה' : 'Message'}: ${message}` : ''
  ].filter(Boolean).join('\n'));
  const mailto = `mailto:${inquiryEmail}?subject=${subject}&body=${body}`;

  /* ── Loading state ──────────────────────────────────────────── */
  if (blockedLoading || seasonsLoading) {
    return (
      <section id="booking" className="py-28 lg:py-36 bg-[#f8f5f2]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C4A882] mx-auto"></div>
            <p className="mt-3 text-[15px] font-inter text-[#6B6560]">{lang === 'he' ? 'טוען...' : 'Loading...'}</p>
          </div>
        </div>
      </section>
    );
  }

  /* ── No seasons fallback ────────────────────────────────────── */
  if (!availableDateRange.start || !availableDateRange.end) {
    return (
      <section id="booking" className="py-28 lg:py-36 bg-[#f8f5f2]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <p className="text-[13px] font-inter font-semibold uppercase tracking-[0.25em] text-[#C4A882] mb-5">
              {lang === 'he' ? 'הזמנה' : 'Reserve'}
            </p>
            <h2 className="text-[48px] lg:text-[60px] font-cormorant font-medium text-[#1A1714] mb-4 leading-[1.1]">
              {bookingData.title}
            </h2>
          </div>
          <div className="max-w-lg mx-auto text-center">
            <div className="bg-[#0f172a] rounded-2xl p-10 lg:p-12">
              <CalendarIcon className="h-12 w-12 mx-auto text-[#C4A882] mb-6" />
              <h3 className="text-[24px] font-cormorant font-medium text-white mb-3">
                {lang === 'he' ? 'אין תאריכים זמינים כרגע' : 'No dates currently available'}
              </h3>
              <p className="text-[15px] font-inter text-white/60 font-light mb-8">
                {lang === 'he'
                  ? 'אנא צרו קשר ישירות לקבלת מידע על זמינות עתידית'
                  : 'Please contact us directly for information about future availability'}
              </p>
              <a
                href={`mailto:${inquiryEmail}`}
                className="inline-block px-10 py-4 bg-[#C4A882] text-[#0f172a] text-[13px] font-inter font-bold uppercase tracking-[0.15em] hover:bg-[#d4b892] transition-colors"
              >
                {lang === 'he' ? 'צרו קשר' : 'Contact Us'}
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ── Custom calendar class overrides for larger, airier grid ── */
  const calendarClassNames = {
    months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-6 sm:space-y-0',
    month: 'space-y-5',
    caption: 'flex justify-center pt-1 relative items-center',
    caption_label: 'text-[20px] lg:text-[22px] font-cormorant font-medium text-[#1A1714]',
    nav: 'space-x-1 flex items-center',
    nav_button: 'h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md border border-[#e5e0da] hover:bg-[#f0ebe5] transition-colors',
    nav_button_previous: 'absolute left-1',
    nav_button_next: 'absolute right-1',
    table: 'w-full border-collapse',
    head_row: 'flex',
    head_cell: 'text-[#9B9590] rounded-md w-11 lg:w-12 font-inter font-medium text-[12px] uppercase tracking-wider',
    row: 'flex w-full mt-1',
    cell: 'h-11 w-11 lg:h-12 lg:w-12 text-center text-[15px] p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-[#c5a059]/10 [&:has([aria-selected])]:bg-[#c5a059]/15 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
    day: 'h-11 w-11 lg:h-12 lg:w-12 p-0 font-inter font-normal text-[15px] inline-flex items-center justify-center rounded-md hover:bg-[#f0ebe5] transition-colors aria-selected:opacity-100',
    day_range_end: 'day-range-end',
    day_selected: 'bg-[#c5a059] text-white hover:bg-[#c5a059] hover:text-white focus:bg-[#c5a059] focus:text-white',
    day_today: 'bg-[#f0ebe5] text-[#1A1714] font-semibold',
    day_outside: 'day-outside text-[#D4CFC9] opacity-50 aria-selected:bg-[#c5a059]/10 aria-selected:text-[#9B9590] aria-selected:opacity-40',
    day_disabled: 'text-[#D4CFC9] opacity-40',
    day_range_middle: 'aria-selected:bg-[#c5a059]/15 aria-selected:text-[#1A1714]',
    day_hidden: 'invisible',
  };

  /* ── Main booking view ──────────────────────────────────────── */
  return (
    <section id="booking" className="py-28 lg:py-40 bg-[#f8f5f2]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* ── Section header ────────────────────────────────── */}
        <div className="mb-16 lg:mb-20">
          <p className="text-[14px] font-inter font-semibold uppercase tracking-[0.25em] text-[#c5a059] mb-6">
            {lang === 'he' ? 'הזמנה' : 'Reserve'}
          </p>
          <h2 className="text-[52px] lg:text-[68px] font-cormorant font-medium text-[#1A1714] mb-7 leading-[1.02]">
            {bookingData.title}
          </h2>
          <p className="text-[18px] lg:text-[20px] font-inter text-[#8a8580] font-light italic max-w-4xl leading-[1.7]">
            {bookingData.subtitle}{' '}
            {lang === 'he'
              ? '14 דקות משדה התעופה. אפשר להיות בבריכה לפני השקיעה ביום ההגעה.'
              : '14 minutes from the airport. You could be in the pool before sunset on arrival day.'}
          </p>
        </div>

        {/* ── Two-column layout ─────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr,420px] gap-10 lg:gap-14 items-start">

          {/* ═══ LEFT COLUMN ═══ */}
          <div>

            {/* Calendar card */}
            <div className="bg-white border border-[#e9e4df] rounded-xl p-7 lg:p-10">
              <h3 className="text-[28px] lg:text-[32px] font-cormorant font-medium text-[#1A1714] mb-7">
                {bookingData.form.title}
              </h3>

              <Calendar
                mode="range"
                numberOfMonths={isNarrow ? 1 : 2}
                selected={range as any}
                onSelect={handleSelect}
                disabled={[
                  { before: today },
                  { before: availableDateRange.start },
                  { after: availableDateRange.end },
                  ...Array.from(blockedSet).map((d) => new Date(d))
                ]}
                defaultMonth={availableDateRange.start}
                className="p-0 pointer-events-auto"
                classNames={calendarClassNames}
              />

              {/* Calendar legend */}
              <div className="flex items-center gap-7 mt-7 pt-6 border-t border-[#f0ebe5]">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#e9e4df]" />
                  <span className="text-[12px] font-inter uppercase tracking-[0.12em] text-[#9B9590]">
                    {lang === 'he' ? 'זמין' : 'Available'}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#c5a059]" />
                  <span className="text-[12px] font-inter uppercase tracking-[0.12em] text-[#9B9590]">
                    {lang === 'he' ? 'נבחר' : 'Selected'}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-white border-2 border-[#D4CFC9]" />
                  <span className="text-[12px] font-inter uppercase tracking-[0.12em] text-[#9B9590]">
                    {lang === 'he' ? 'תפוס' : 'Booked'}
                  </span>
                </div>
              </div>

              {/* Availability range note */}
              {availableDateRange.start && availableDateRange.end && (
                <p className="text-[13px] font-inter text-green-600 mt-4">
                  {lang === 'he'
                    ? `זמין מ-${format(availableDateRange.start, 'dd/MM/yyyy')} עד ${format(availableDateRange.end, 'dd/MM/yyyy')}`
                    : `Available from ${format(availableDateRange.start, 'dd/MM/yyyy')} to ${format(availableDateRange.end, 'dd/MM/yyyy')}`}
                </p>
              )}
              {rangeHasBlocked && (
                <p className="text-[13px] font-inter text-red-600 mt-2">
                  {lang === 'he' ? 'התאריכים הנבחרים כוללים ימים חסומים/תפוסים' : 'The selected range includes blocked/booked days'}
                </p>
              )}
            </div>

            {/* ── Personal Details ───────────────────────────── */}
            <div className="mt-16 lg:mt-20">
              <h3 className="text-[28px] lg:text-[32px] font-cormorant font-medium text-[#1A1714] mb-12">
                {lang === 'he' ? 'פרטים אישיים' : 'Personal Details'}
              </h3>

              <div className="grid md:grid-cols-2 gap-x-14 gap-y-12">
                {/* Guests */}
                <div>
                  <label className="block text-[11px] font-inter font-bold uppercase tracking-[0.16em] text-[#c5a059] mb-4">
                    {bookingData.form.guests}
                  </label>
                  <Input
                    type="number" min={1} max={8}
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value || '0') || 1)}
                    className={underlineInput}
                  />
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-inter font-bold uppercase tracking-[0.16em] text-[#c5a059] mb-4">
                    {lang === 'he' ? 'שם מלא' : 'Full Name'}
                  </label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={lang === 'he' ? 'השם שלך' : 'Your name'}
                    className={underlineInput}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-inter font-bold uppercase tracking-[0.16em] text-[#c5a059] mb-4">
                    {lang === 'he' ? 'כתובת אימייל' : 'Email Address'}
                  </label>
                  <Input
                    type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@example.com"
                    className={underlineInput}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-inter font-bold uppercase tracking-[0.16em] text-[#c5a059] mb-4">
                    {lang === 'he' ? 'מספר טלפון' : 'Phone Number'}
                  </label>
                  <Input
                    type="tel" value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000 0000"
                    className={underlineInput}
                  />
                </div>
              </div>

              {/* Message — full width */}
              <div className="mt-12">
                <label className="block text-[11px] font-inter font-bold uppercase tracking-[0.16em] text-[#c5a059] mb-4">
                  {lang === 'he' ? 'בקשות נוספות' : 'Additional Requests'}
                </label>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={lang === 'he' ? 'העברה משדה תעופה, שף פרטי, עריסה...' : 'Airport transfer, private chef, baby cot...'}
                  className={underlineInput}
                />
              </div>
            </div>
          </div>

          {/* ═══ RIGHT COLUMN — Sticky sidebar ═══ */}
          <div className="lg:sticky lg:top-28 space-y-7 self-start">

            {/* ── Dark Summary Card ──────────────────────────── */}
            <div className="bg-[#0f172a] rounded-xl p-9 lg:p-12 text-white shadow-2xl">

              {/* Price — centered, large, elegant */}
              <div className="text-center mb-4 pt-2">
                <span className="text-[68px] lg:text-[80px] font-cormorant font-medium leading-none tracking-tight">
                  {currency}{nightlyRate?.toFixed(0) || '—'}
                </span>
              </div>
              <div className="flex items-center justify-between px-1 mb-8">
                <span className="text-[12px] font-inter font-semibold uppercase tracking-[0.18em] text-white/45">
                  {lang === 'he' ? 'מחיר בסיס' : 'Base Price'}
                </span>
                <span className="text-[15px] font-inter text-white/35">
                  / {bookingData.pricing.pernight}
                </span>
              </div>

              <div className="h-px bg-white/10 mb-8" />

              {/* Breakdown — when dates selected */}
              {nights > 0 ? (
                <div className="space-y-5 text-[16px] font-inter mb-10">
                  <div className="flex justify-between">
                    <span className="text-white/55">{lang === 'he' ? 'שהייה נבחרת' : 'Selected Stay'}</span>
                    <span className="text-white font-semibold">{nights} {lang === 'he' ? 'לילות' : 'Nights'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/55">{lang === 'he' ? 'תאריכים' : 'Dates'}</span>
                    <span className="text-white font-semibold">
                      {range.from && range.to
                        ? `${format(range.from, 'MMM d')} - ${format(range.to, 'MMM d')}`
                        : '—'}
                    </span>
                  </div>

                  {/* Detailed breakdown */}
                  <div className="h-px bg-white/[0.06] my-2" />
                  <div className="flex justify-between text-white/40 text-[14px]">
                    <span>{nights} x {currency}{nightlyRate ? nightlyRate.toFixed(0) : '0'}</span>
                    <span>{currency}{perNightBreakdown.subtotal.toFixed(0)}</span>
                  </div>

                  <div className="h-px bg-white/10 my-2" />
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="text-[16px] text-white font-semibold">{lang === 'he' ? 'סה"כ' : 'Total'}</span>
                    <span className="text-[30px] font-inter font-semibold text-[#c5a059]">
                      {currency}{perNightBreakdown.subtotal.toFixed(0)}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-[16px] font-inter text-white/25 text-center mb-10 py-6">
                  {lang === 'he' ? 'בחרו תאריכים לצפייה בסיכום' : 'Select dates to see total'}
                </p>
              )}

              {nightlyRate === 0 && range.from && (
                <p className="text-[13px] font-inter text-orange-400 text-center mb-5">
                  {lang === 'he' ? 'אין מחיר מוגדר לתאריכים אלה' : 'No price defined for these dates'}
                </p>
              )}

              {/* CTA Button — gold with white bold text */}
              <button
                disabled={!validRange}
                onClick={() => { if (validRange) window.location.href = mailto; }}
                className="w-full py-6 bg-[#c5a059] text-white text-[15px] font-inter font-bold uppercase tracking-[0.2em] hover:bg-[#d4af6a] transition-all hover:shadow-lg disabled:opacity-20 disabled:cursor-not-allowed"
              >
                {lang === 'he' ? 'שליחת פניה' : 'Send Inquiry'}
              </button>

              <p className="text-[12px] font-inter font-semibold uppercase tracking-[0.18em] text-white/25 text-center mt-7">
                {lang === 'he' ? `שהייה מינימלית של ${minStay} לילות` : `Minimum ${minStay} nights stay required`}
              </p>
              <p className="text-[11px] font-inter text-white/20 text-center mt-4 pb-1 leading-relaxed">
                * {lang === 'he'
                  ? 'המחיר אינו כולל מס תיירות ותוספות נוספות'
                  : 'Price does not include tourist tax and additional extras'}
              </p>
            </div>

            {/* ── What's Included ────────────────────────────── */}
            <div className="bg-white border border-[#e9e4df] rounded-xl p-9 lg:p-10">
              <p className="text-[13px] font-inter font-bold uppercase tracking-[0.22em] text-[#1A1714] mb-8 text-center">
                {bookingData.includes.title}
              </p>
              <ul className="space-y-5">
                {[
                  bookingData.includes.wifi,
                  bookingData.includes.pool,
                  bookingData.includes.parking,
                  bookingData.includes.garden,
                  bookingData.includes.seaview,
                  bookingData.includes.hidden_bay,
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3.5 text-[16px] font-inter text-[#4A4540]">
                    <span className="text-[#c5a059] text-[16px] font-semibold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Best Price Guaranteed ──────────────────────── */}
            <div className="bg-white border border-[#e9e4df] rounded-xl p-9 lg:p-10 text-center">
              <p className="text-[13px] font-inter font-bold uppercase tracking-[0.2em] text-[#c5a059] mb-5">
                {lang === 'he' ? 'הבטחת מחיר מיטבי' : 'Best Price Guaranteed'}
              </p>
              <p className="text-[15px] font-inter text-[#6B6560] font-light leading-relaxed">
                {lang === 'he'
                  ? 'הזמינו ישירות דרכנו כדי להימנע מעמלות פלטפורמה ולקבל סל אירוח מתנה.'
                  : 'Book directly with us to avoid platform fees and receive a complimentary welcome basket.'}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
