import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { eachDayOfInterval, format, addDays, differenceInCalendarDays, startOfDay, isAfter, isBefore } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useIsMobile } from '@/hooks/use-mobile';

interface BookingSectionProps {
  translations: any;
  content?: any;
}

type DateRange = { from?: Date; to?: Date };

const toISO = (d: Date) => format(d, 'yyyy-MM-dd');

const BookingSection: React.FC<BookingSectionProps> = ({ translations, content }) => {
  const [range, setRange] = useState<DateRange>({});
  const [guests, setGuests] = useState(2);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const isMobile = useIsMobile();
  const lang = document.documentElement.lang === 'he' ? 'he' : 'en';
  const today = startOfDay(new Date());

  const { data: seasons } = useQuery({
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

  // Use content from CMS if available, otherwise fall back to translations
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
      hidden_bay: content?.includes?.hidden_bay || (lang==='he'?'גישה למפרץ הנסתר':'Hidden Bay Access'),
    }
  };

  const blockedSet = useMemo(() => new Set((blocked || []).map((d: any) => d.date)), [blocked]);

  // Get available date range based on seasons
  const availableDateRange = useMemo(() => {
    if (!seasons || seasons.length === 0) return { start: null, end: null };
    
    // Find the earliest start date and latest end date from all seasons
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

  const minStayText = lang === 'he'
    ? `שהייה מינימלית של ${minStay} לילות`
    : `Minimum ${minStay} nights stay`;

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
    range.from && range.to ? `${lang==='he'?'תאריכים':'Dates'}: ${format(range.from, 'dd MMM yyyy')} → ${format(range.to, 'dd MMM yyyy')} (${nights} ${lang==='he'?'לילות':'nights'})` : '',
    `${lang==='he'?'אורחים':'Guests'}: ${guests}`,
    `${lang==='he'?'סיכום מחיר':'Price total'}: ${currency}${total.toFixed(2)}`,
    firstName ? `${lang==='he'?'שם פרטי':'First Name'}: ${firstName}` : '',
    lastName ? `${lang==='he'?'שם משפחה':'Last Name'}: ${lastName}` : '',
    email ? `${lang==='he'?'אימייל':'Email'}: ${email}` : '',
    phone ? `${lang==='he'?'טלפון':'Phone'}: ${phone}` : '',
    message ? `${lang==='he'?'הודעה':'Message'}: ${message}` : ''
  ].filter(Boolean).join('\n'));
  const mailto = `mailto:${inquiryEmail}?subject=${subject}&body=${body}`;

  if (blockedLoading) {
    return (
      <section id="booking" className="py-20 bg-[#F0EBE3]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3D2F28] mx-auto"></div>
            <p className="mt-2 text-muted-foreground">{lang === 'he' ? 'טוען...' : 'Loading...'}</p>
          </div>
        </div>
      </section>
    );
  }

  // Show message if no seasons available
  if (!availableDateRange.start || !availableDateRange.end) {
    return (
      <section id="booking" className="py-20 bg-[#F0EBE3]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-cormorant font-medium text-[#1A1714] mb-3">
              {bookingData.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {bookingData.subtitle}
            </p>
          </div>
          <div className="max-w-2xl mx-auto text-center">
            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-8">
                <div className="text-orange-600 mb-4">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {lang === 'he' ? 'אין תאריכים זמינים כרגע' : 'No dates currently available'}
                </h3>
                <p className="text-muted-foreground">
                  {lang === 'he' 
                    ? 'אנא צרו קשר ישירות לקבלת מידע על זמינות עתידית' 
                    : 'Please contact us directly for information about future availability'
                  }
                </p>
                <Button className="mt-4" asChild>
                  <a href={`mailto:${inquiryEmail}`}>
                    {lang === 'he' ? 'צרו קשר' : 'Contact Us'}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 bg-[#F0EBE3]">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Section header — left-aligned, editorial */}
        <div className="mb-12">
          <p className="text-[10px] font-inter font-semibold uppercase tracking-[0.25em] text-[#C4A882] mb-4">
            Reserve
          </p>
          <h2 className="text-4xl md:text-5xl font-cormorant font-medium text-[#1A1714] mb-3 leading-tight">
            {bookingData.title}
          </h2>
          <p className="text-[15px] font-inter text-[#6B6560] font-light max-w-lg">
            {bookingData.subtitle}
          </p>
          <p className="mt-5 text-[13px] font-inter text-[#C4A882] font-light italic">
            14 minutes from the airport. You could be in the pool before sunset on arrival day.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          <div className="lg:col-span-2">
            <Card className="rounded-2xl shadow-sm border border-[#E8DDD5]">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-cormorant font-medium text-[#1A1714]">{bookingData.form.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-[1fr,280px] gap-6">
                  <div className="border rounded-xl p-3">
                    <Calendar
                      mode="range"
                      numberOfMonths={isMobile ? 1 : 2}
                      selected={range as any}
                      onSelect={handleSelect}
                      disabled={[
                        // Only block dates before today
                        { before: today },
                        // Block dates outside available seasons
                        { before: availableDateRange.start },
                        { after: availableDateRange.end },
                        // Block specifically blocked dates
                        ...Array.from(blockedSet).map((d) => new Date(d))
                      ]}
                      defaultMonth={availableDateRange.start}
                      className="p-3 pointer-events-auto"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>{lang==='he'?'טווח תאריכים':'Date range'}</Label>
                      <Input 
                        readOnly 
                        value={range.from && range.to ? `${format(range.from,'dd/MM/yyyy')} → ${format(range.to,'dd/MM/yyyy')}` : ''} 
                        placeholder={lang==='he'?'בחרו תאריכים':'Select dates'} 
                      />
                      <p className="text-xs text-muted-foreground">{minStayText}</p>
                      {availableDateRange.start && availableDateRange.end && (
                        <p className="text-xs text-green-600">
                          {lang === 'he' 
                            ? `זמין מ-${format(availableDateRange.start, 'dd/MM/yyyy')} עד ${format(availableDateRange.end, 'dd/MM/yyyy')}`
                            : `Available from ${format(availableDateRange.start, 'dd/MM/yyyy')} to ${format(availableDateRange.end, 'dd/MM/yyyy')}`
                          }
                        </p>
                      )}
                      {rangeHasBlocked && (
                        <p className="text-xs text-destructive">{lang==='he'?'התאריכים הנבחרים כוללים ימים חסומים/תפוסים':'The selected range includes blocked/booked days'}</p>
                      )}
                      {nightlyRate === 0 && range.from && (
                        <p className="text-xs text-orange-600">{lang==='he'?'אין מחיר מוגדר לתאריכים אלה. יש ליצור קשר לקבלת הצעת מחיר.':'No price defined for these dates. Please contact for a quote.'}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guests">{bookingData.form.guests}</Label>
                      <Input id="guests" type="number" min={1} max={8} value={guests} onChange={(e) => setGuests(parseInt(e.target.value||'0')||1)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{lang==='he'?'שם פרטי':'First Name'}</Label>
                      <Input id="firstName" value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder={lang==='he'?'שם פרטי':'First Name'} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{lang==='he'?'שם משפחה':'Last Name'}</Label>
                      <Input id="lastName" value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder={lang==='he'?'שם משפחה':'Last Name'} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{lang==='he'?'אימייל':'Email'}</Label>
                      <Input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder={lang==='he'?'אימייל':'Email'} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{lang==='he'?'טלפון':'Phone'}</Label>
                      <Input id="phone" type="tel" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder={lang==='he'?'טלפון':'Phone'} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{lang==='he'?'הודעה':'Message'}</Label>
                      <Input id="message" className="text-base" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder={lang==='he'?'פרטים נוספים/בקשות':'Additional details/requests'} />
                    </div>
                    <Button className="w-full bg-[#3D2F28] hover:bg-[#2E231E] text-[#FAF8F5] border-0 rounded-none h-11 text-[13px] tracking-wide font-inter" disabled={!validRange} onClick={()=>{if(validRange) window.location.href=mailto;}}>
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {lang==='he'?'שליחת פניה':'Send Inquiry'}
                    </Button>
                    <p className="text-[11px] font-inter text-[#6B6560] text-center leading-snug">
                      {lang==='he'
                        ? 'ללא תשלום היום — נחזור אליכם עם הפרטים תוך מספר שעות'
                        : 'No payment today — we\'ll reply with details within a few hours'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-5">
            {/* Price card */}
            <div className="rounded-2xl bg-white border border-[#E8DDD5] p-6">
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-[42px] font-cormorant font-medium text-[#1A1714] leading-none">{currency}{nightlyRate?.toFixed(0) || '—'}</span>
                <span className="text-[13px] font-inter text-[#6B6560]">/ {bookingData.pricing.pernight}</span>
              </div>
              <p className="text-[11px] font-inter text-[#C4A882] uppercase tracking-[0.14em] mb-5">{minStayText}</p>
              {nightlyRate === 0 && (
                <p className="text-xs text-orange-600 mb-3">{lang==='he'?'ללא מחיר מוגדר':'No price set'}</p>
              )}
              {nights > 0 && (
                <div className="border-t border-[#F0EBE3] pt-4 space-y-2 text-[13px] font-inter">
                  <div className="flex justify-between text-[#6B6560]">
                    <span>{lang==='he'?'לילות':'Nights'} × {currency}{nightlyRate ? nightlyRate.toFixed(0) : '0'}</span>
                    <span>{currency}{perNightBreakdown.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#6B6560]">
                    <span>{lang==='he'?`ניקיון (כל ${cleaningFreeNights} לילות)`:`Cleaning (per ${cleaningFreeNights} nights)`}</span>
                    <span>{currency}{cleaningTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#6B6560]">
                    <span>{lang==='he'?'מס תיירות':'Tourist tax'}</span>
                    <span>{currency}{touristTaxTotal.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-[#F0EBE3] pt-2 flex justify-between font-semibold text-[#1A1714]">
                    <span>{lang==='he'?'סה"כ':'Total'}</span>
                    <span>{currency}{total.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* What's included */}
            <div className="rounded-2xl bg-white border border-[#E8DDD5] p-6">
              <p className="text-[10px] font-inter font-semibold uppercase tracking-[0.2em] text-[#C4A882] mb-4">{bookingData.includes.title}</p>
              <ul className="space-y-2.5">
                {[bookingData.includes.wifi, bookingData.includes.pool, bookingData.includes.parking, bookingData.includes.garden, bookingData.includes.seaview, bookingData.includes.hidden_bay].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-[13px] font-inter text-[#6B6560]">
                    <span className="text-[#C4A882] text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Why Book Direct */}
            <div className="rounded-2xl bg-[#3D2F28] text-white p-6 space-y-4">
              <p className="text-xs font-inter font-semibold uppercase tracking-[0.18em] text-[#C4A882]">
                Why Book Direct
              </p>
              <ul className="space-y-3 text-sm text-white/80 font-inter">
                <li className="flex items-start gap-2">
                  <span className="text-[#C4A882] mt-0.5">✓</span>
                  <span>Best available rate — no platform commission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C4A882] mt-0.5">✓</span>
                  <span>Personal response within a few hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C4A882] mt-0.5">✓</span>
                  <span>Flexible terms when you talk to us directly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C4A882] mt-0.5">✓</span>
                  <span>Local tips, transport help, and area guidance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
