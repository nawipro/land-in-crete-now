import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { PageSlug } from '@/lib/cms';

const PreviewPane: React.FC<{ slug: PageSlug; data: any }> = ({ slug, data }) => {
  const render = () => {
    switch (slug) {
      case 'home':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Home preview</h3>
            <div className="aspect-[16/9] rounded-lg overflow-hidden bg-muted">
              {data.hero_image?.url ? (
                <img src={data.hero_image.url} alt={data.hero_image.alt||'Hero image'} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full grid place-items-center text-muted-foreground">No hero image</div>
              )}
            </div>
            <div>
              <h4 className="text-xl font-medium">{data.hero_title}</h4>
              <p className="text-muted-foreground">{data.hero_subtitle}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {(data.chips||[]).map((c: string, i: number) => (
                  <span key={i} className="px-2 py-1 rounded-md border text-xs">{c}</span>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <h3 className="text-2xl font-semibold capitalize">{slug} preview</h3>
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
