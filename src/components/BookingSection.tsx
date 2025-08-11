
import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { eachDayOfInterval, format, addDays, differenceInCalendarDays } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface BookingSectionProps {
  translations: any;
}

type DateRange = { from?: Date; to?: Date };

const toISO = (d: Date) => format(d, 'yyyy-MM-dd');

const BookingSection: React.FC<BookingSectionProps> = ({ translations }) => {
  const [range, setRange] = useState<DateRange>({});
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const lang = document.documentElement.lang === 'he' ? 'he' : 'en';

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

  // Tax seasons are managed separately from pricing seasons
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
      if (error) return {} as any;
      const obj: any = {};
      (data || []).forEach((row: any) => { obj[row.key] = row.value; });
      return obj;
    }
  });

  const { data: blocked } = useQuery({
    queryKey: ['availability'],
    queryFn: async () => {
      const { data } = await supabase
        .from('availability')
        .select('date, status');
      return (data || []).filter((d: any) => d.status === 'blocked' || d.status === 'booked');
    }
  });

  const blockedSet = useMemo(() => new Set((blocked || []).map((d: any) => d.date)), [blocked]);

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
    const d = range.from || new Date();
    const s = getSeasonForDate(d);
    return s?.min_stay_nights ?? 4;
  }, [range.from, seasons]);

  const nightlyRate = useMemo(() => {
    const d = range.from || new Date();
    const s = getSeasonForDate(d);
    return s?.price_per_night ?? 0;
  }, [range.from, seasons]);

  const currency = useMemo(() => {
    const d = range.from || new Date();
    const s = getSeasonForDate(d);
    return s?.currency_symbol ?? '€';
  }, [range.from, seasons]);

  const rangeHasBlocked = useMemo(() => {
    if (!range.from || !range.to) return false;
    const days = eachDayOfInterval({ start: range.from, end: addDays(range.to, -1) });
    return days.some((d) => blockedSet.has(toISO(d)));
  }, [range, blockedSet]);

  const perNightBreakdown = useMemo(() => {
    if (!range.from || !range.to || !seasons) return { nights: 0, subtotal: 0 };
    const days = eachDayOfInterval({ start: range.from, end: addDays(range.to, -1) });
    let sum = 0;
    for (const d of days) {
      const s = getSeasonForDate(d);
      sum += s?.price_per_night ?? 0;
    }
    return { nights: days.length, subtotal: sum };
  }, [range, seasons]);

const cleaningTotal = useMemo(() => {
    const base = parseFloat(settings?.cleaning_fee || '0') || 0;
    const freeNights = parseInt(settings?.cleaning_free_nights || '5') || 5;
    return nights > 0 ? base * Math.ceil(nights / freeNights) : 0;
  }, [settings, nights]);

  const touristTaxTotal = useMemo(() => {
    if (!range.from || !range.to || !taxSeasons) return 0;
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

  const validRange = range.from && range.to && nights >= minStay && !rangeHasBlocked;

  const minStayText = lang === 'he'
    ? `שהייה מינימלית של ${minStay} לילות`
    : `Minimum ${minStay} nights stay`;

  const handleSelect = (next: any) => {
    // Prevent selecting invalid range shorter than minStay by just not setting 'to'
    if (next?.from && next?.to) {
      const len = Math.max(0, differenceInCalendarDays(next.to, next.from));
      if (len < minStay) {
        setRange({ from: next.from, to: undefined });
        return;
      }
    }
    setRange(next);
  };

  const subject = encodeURIComponent('Now We Land – Booking inquiry');
  const body = encodeURIComponent([
    lang === 'he' ? 'פרטי פנייה:' : 'Inquiry details:',
    range.from && range.to ? `${lang==='he'?'תאריכים':'Dates'}: ${format(range.from, 'dd MMM yyyy')} → ${format(range.to, 'dd MMM yyyy')} (${nights} ${lang==='he'?'לילות':'nights'})` : '',
    `${lang==='he'?'אורחים':'Guests'}: ${guests}`,
    `${lang==='he'?'סיכום מחיר':'Price total'}: ${currency}${total.toFixed(2)}`,
    name ? `${lang==='he'?'שם':'Name'}: ${name}` : '',
    message ? `${lang==='he'?'הודעה':'Message'}: ${message}` : ''
  ].filter(Boolean).join('\n'));
  const mailto = `mailto:${settings?.inquiry_email || ''}?subject=${subject}&body=${body}`;

  return (
    <section id="booking" className="py-20 bg-mediterranean-stone-gray/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-mediterranean-blue mb-3">
            {translations.booking.title}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {translations.booking.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Left: Calendar + form */}
          <div className="lg:col-span-2">
            <Card className="rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl">{translations.booking.form.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-[1fr,280px] gap-6">
                  <div className="border rounded-xl p-3">
                    <Calendar
                      mode="range"
                      numberOfMonths={2}
                      selected={range as any}
                      onSelect={handleSelect}
                      disabled={[
                        { before: new Date() },
                        ...Array.from(blockedSet).map((d) => new Date(d))
                      ]}
                      className="p-3 pointer-events-auto"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>{lang==='he'?'טווח תאריכים':'Date range'}</Label>
                      <Input readOnly value={range.from && range.to ? `${format(range.from,'dd/MM/yyyy')} → ${format(range.to,'dd/MM/yyyy')}` : ''} placeholder={lang==='he'?'בחרו תאריכים':'Select dates'} />
                      <p className="text-xs text-muted-foreground">{minStayText}</p>
                      {rangeHasBlocked && (
                        <p className="text-xs text-destructive">{lang==='he'?'התאריכים הנבחרים כוללים ימים חסומים/תפוסים':'The selected range includes blocked/booked days'}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guests">{translations.booking.form.guests}</Label>
                      <Input id="guests" type="number" min={1} max={8} value={guests} onChange={(e) => setGuests(parseInt(e.target.value||'0')||1)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">{lang==='he'?'שם מלא':'Full Name'}</Label>
                      <Input id="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder={lang==='he'?'שם מלא':'Full Name'} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{lang==='he'?'הודעה':'Message'}</Label>
                      <Input id="message" className="text-base" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder={lang==='he'?'פרטים נוספים/בקשות':'Additional details/requests'} />
                    </div>
                    <Button className="w-full" asChild disabled={!validRange}>
                      <a href={mailto}>
                        <CalendarIcon className="h-5 w-5 mr-2" />
                        {lang==='he'?'שליחת פניה':'Send Inquiry'}
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Price summary */}
          <div className="space-y-6">
            <Card className="rounded-2xl shadow">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-mediterranean-blue mb-2">{currency}{nightlyRate?.toFixed(0) || 0}</div>
                  <div className="text-muted-foreground">{translations.booking.pricing.pernight}</div>
                  <div className="text-sm text-muted-foreground mt-2">{minStayText}</div>
                </div>
                <div className="mt-6 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>{lang==='he'?'לילות':'Nights'} × {nightlyRate ? nightlyRate.toFixed(0) : '-'}</span>
                    <span>{currency}{perNightBreakdown.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{lang==='he'?'דמי ניקיון (כל 5 לילות)':'Cleaning fee (per 5 nights)'}</span>
                    <span>{currency}{cleaningTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{lang==='he'?'מס תיירות':'Tourist tax'}</span>
                    <span>{currency}{touristTaxTotal.toFixed(2)}</span>
                  </div>
                  <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
                    <span>{lang==='he'?'סה"כ':'Total'}</span>
                    <span>{currency}{total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4 text-mediterranean-blue">{translations.booking.includes.title}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• {translations.booking.includes.wifi}</li>
                  <li>• {translations.booking.includes.pool}</li>
                  <li>• {translations.booking.includes.parking}</li>
                  <li>• {translations.booking.includes.garden}</li>
                  <li>• {translations.booking.includes.seaview}</li>
                  <li>• {lang==='he'?'גישה למפרץ הנסתר':'Hidden Bay Access'}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
