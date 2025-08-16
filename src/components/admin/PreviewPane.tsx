
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { PageSlug } from '@/lib/cms';

const PreviewPane: React.FC<{ slug: PageSlug; data: any; lang?: 'en' | 'he' }> = ({ slug, data, lang = 'he' }) => {
  const texts = lang === 'he'
    ? { 
        home: 'תצוגת בית', 
        noImage: 'אין תמונת הירו', 
        generic: 'תצוגה מקדימה', 
        heroAlt: 'תמונת הירו',
        booking: 'תצוגת הזמנות',
        contact: 'תצוגת צור קשר'
      }
    : { 
        home: 'Home preview', 
        noImage: 'No hero image', 
        generic: 'Preview', 
        heroAlt: 'Hero image',
        booking: 'Booking preview',
        contact: 'Contact preview'
      };

  const render = () => {
    switch (slug) {
      case 'home':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">{texts.home}</h3>
            <div className="aspect-[16/9] rounded-lg overflow-hidden bg-muted">
              {data.hero_image?.url ? (
                <img src={data.hero_image.url} alt={data.hero_image.alt||texts.heroAlt} className="w-full h-full" style={{ objectFit: data.hero_image?.fit || 'cover', objectPosition: `${data.hero_image?.position?.x ?? 50}% ${data.hero_image?.position?.y ?? 50}%` }} />
              ) : (
                <div className="w-full h-full grid place-items-center text-muted-foreground">{texts.noImage}</div>
              )}
            </div>
            <div>
              <h4 className="text-xl font-medium whitespace-pre-line">{data.hero_title}</h4>
              <p className="text-muted-foreground whitespace-pre-line">{data.hero_subtitle}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {(data.chips||[]).map((c: string, i: number) => (
                  <span key={i} className="px-2 py-1 rounded-md border text-xs">{c}</span>
                ))}
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">About preview</h3>
            <div className="aspect-[16/9] rounded-lg overflow-hidden bg-muted">
              {data.image?.url ? (
                <img src={data.image.url} alt={data.image.alt||'About image'} className="w-full h-full" style={{ objectFit: data.image?.fit || 'contain', objectPosition: `${data.image?.position?.x ?? 50}% ${data.image?.position?.y ?? 50}%` }} />
              ) : (
                <div className="w-full h-full grid place-items-center text-muted-foreground">No image</div>
              )}
            </div>
          </div>
        );
      case 'booking':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">{texts.booking}</h3>
            <div className="space-y-2">
              <h4 className="text-lg font-medium">{data.title}</h4>
              <p className="text-muted-foreground">{data.subtitle}</p>
            </div>
            <div className="border rounded-lg p-4 space-y-2">
              <h5 className="font-medium">{data.form?.title}</h5>
              <p className="text-sm text-muted-foreground">{data.form?.guests}</p>
            </div>
            <div className="border rounded-lg p-4">
              <h5 className="font-medium mb-2">{data.includes?.title}</h5>
              <ul className="text-sm space-y-1">
                <li>• {data.includes?.wifi}</li>
                <li>• {data.includes?.pool}</li>
                <li>• {data.includes?.parking}</li>
                <li>• {data.includes?.garden}</li>
                <li>• {data.includes?.seaview}</li>
                <li>• {data.includes?.hidden_bay}</li>
              </ul>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">{texts.contact}</h3>
            <div className="space-y-2">
              <h4 className="text-lg font-medium">{data.title}</h4>
              <p className="text-muted-foreground">{data.subtitle}</p>
            </div>
            <div className="border rounded-lg p-4 space-y-2">
              <h5 className="font-medium">{data.info?.title}</h5>
              <div className="text-sm space-y-1">
                <p><strong>{data.info?.phone}:</strong> {data.phone}</p>
                <p><strong>{data.info?.email}:</strong> {data.email}</p>
                <p><strong>{data.info?.location}:</strong> {data.address}</p>
              </div>
            </div>
            <div className="border rounded-lg p-4 space-y-2">
              <h5 className="font-medium">{data.form?.title}</h5>
              <div className="text-sm space-y-1">
                <p>{data.form?.name}</p>
                <p>{data.form?.email}</p>
                <p>{data.form?.phone}</p>
                <p>{data.form?.message}</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <h3 className="text-2xl font-semibold capitalize">{texts.generic}</h3>
            <pre className="mt-3 text-xs bg-muted p-3 rounded-md overflow-auto max-h-[50vh]">{JSON.stringify(data, null, 2)}</pre>
          </div>
        );
    }
  };

  return (
    <Card className="min-h-[60vh]"><CardContent className="p-6">
      {render()}
    </CardContent></Card>
  );
};

export default PreviewPane;
