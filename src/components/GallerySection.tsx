import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GallerySectionProps {
  translations: any;
  content?: { categories?: { id: string; title: string; order: number }[]; images?: { url: string; alt: string; categoryId: string; order: number }[] };
}

const GallerySection: React.FC<GallerySectionProps> = ({ translations, content }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Normalize asset paths so they work both on subpaths and root
  const withBase = (p: string) => (p?.startsWith('http') ? p : p?.replace(/^\/+/, ''));


  // Build categories and images from CMS if provided, otherwise fallback to translations/static
  const cmsCategories = (content?.categories ?? []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const defaultCategories = [
    { id: 'outdoor', name: 'OUTDOOR VILLA' },
    { id: 'garden-day-light', name: 'GARDEN DAY LIGHT' },
    { id: 'garden-night', name: 'GARDEN NIGHT' },
    { id: 'secret-bay', name: 'SECRET BAY' },
    { id: 'sunset', name: 'SUNSET' },
    { id: 'balconies', name: 'BALCONIES' },
    { id: 'living-room', name: 'LIVING ROOM' },
    { id: 'bed-room-1', name: 'BED ROOM 1' },
    { id: 'bed-room-2', name: 'BED ROOM 2' },
  ];
  // Merge CMS categories with defaults (avoid duplicates)
  const mergedCategoryList = [
    ...(cmsCategories.length ? cmsCategories.map((c) => ({ id: c.id, name: c.title || 'Untitled' })) : []),
    ...defaultCategories,
  ].filter((cat, idx, arr) => arr.findIndex((c) => c.id === cat.id) === idx);
  const galleryCategories = [
    { id: 'all', name: translations?.gallery?.categories?.all ?? 'All' },
    ...mergedCategoryList,
  ];

  const cmsImages = (content?.images ?? []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const defaultImages = [
    { id: 1, category: 'outdoor', src: '/lovable-uploads/b03503c6-c5da-4a36-b32d-5da4c87923b1.png', alt: 'Outdoor villa – front garden' },
    { id: 2, category: 'outdoor', src: '/lovable-uploads/0cf91a09-cb3b-4953-a757-513680d5bd34.png', alt: 'Outdoor villa – entrance gate' },
    { id: 3, category: 'outdoor', src: '/lovable-uploads/6d2acc7b-041d-4587-b32c-a11b99b4d4c7.png', alt: 'Outdoor villa – side view' },
    { id: 4, category: 'outdoor', src: '/lovable-uploads/146cd19f-7a25-46e8-9f7a-837f8f30a160.png', alt: 'Outdoor villa – garden and facade' },
    // Garden Night defaults (visible if not present in CMS yet)
    { id: 5, category: 'garden-night', src: '/lovable-uploads/66d41bb2-c918-4f2e-b49f-5404d5685356.png', alt: 'Garden night – villa exterior lights' },
    { id: 6, category: 'garden-night', src: '/lovable-uploads/4c4a02ce-70d2-4065-925a-70d8f9bf5d9f.png', alt: 'Garden night – pool view from terrace' },
    { id: 7, category: 'garden-night', src: '/lovable-uploads/923fb47c-f2d2-4712-8807-1f726abfb743.png', alt: 'Garden night – BBQ and pool' },
    { id: 8, category: 'garden-night', src: '/lovable-uploads/9f1780d8-e629-494b-8240-9ce6a67b17ee.png', alt: 'Garden night – villa and lit pool' },
    { id: 9, category: 'garden-night', src: '/lovable-uploads/5afaa76f-fe29-4fb9-8d4f-b9f00925bddd.png', alt: 'Garden night – garden and terrace' },
    // Garden Day Light defaults (REPLACED)
    { id: 10, category: 'garden-day-light', src: '/lovable-uploads/b3adb8c1-e7a0-4048-b109-fbd0d574d7e8.png', alt: 'Garden day – patio with table and pool view' },
    { id: 11, category: 'garden-day-light', src: '/lovable-uploads/849c94d6-f867-443b-95a8-586894e93925.png', alt: 'Garden day – villa and pool with wine on table' },
    { id: 12, category: 'garden-day-light', src: '/lovable-uploads/c6a0949b-ccd7-42e3-a208-1684ee5d242b.png', alt: 'Garden day – pool and sea view from above' },
    { id: 13, category: 'garden-day-light', src: '/lovable-uploads/497058df-0eee-470e-aa25-8152dec11164.png', alt: 'Garden day – lawn seating area and pool' },
    { id: 14, category: 'garden-day-light', src: '/lovable-uploads/34f209d0-6644-43a2-b4bc-8b3f22ccedeb.png', alt: 'Garden day – outdoor shower with sea backdrop' },
    { id: 15, category: 'garden-day-light', src: '/lovable-uploads/0cf5d84e-6414-4b56-bf41-8f4c6326d299.png', alt: 'Garden day – sun loungers and umbrella by pool' },
    // Secret Bay defaults
    { id: 16, category: 'secret-bay', src: '/lovable-uploads/fe62f0b0-bf9b-4e12-8493-636dc8d90a3b.png', alt: 'Secret Bay – cove and villa view' },
    { id: 17, category: 'secret-bay', src: '/lovable-uploads/1ea14e94-47b6-40de-8917-733a37785a6b.png', alt: 'Secret Bay – turquoise water by rocky shore' },
    { id: 18, category: 'secret-bay', src: '/lovable-uploads/8e80ccdd-fe8d-4766-adda-ec5c847d68d8.png', alt: 'Secret Bay – stone steps path' },
    { id: 19, category: 'secret-bay', src: '/lovable-uploads/56bdb900-04bd-4ddf-8cc6-f667096f9a1a.png', alt: 'Secret Bay – path up to the house' },
    { id: 20, category: 'secret-bay', src: '/lovable-uploads/7f16ca73-ff74-4efc-a9e0-d712ab162e24.png', alt: 'Secret Bay – clear water and cliffs' },
    { id: 21, category: 'secret-bay', src: '/lovable-uploads/d6a759c2-d3d6-4075-86d1-1fb91bb11102.png', alt: 'Secret Bay – narrow bay opening to sea' },
    // Sunset defaults (updated)
    { id: 22, category: 'sunset', src: '/lovable-uploads/6be09474-ca9b-4709-a76d-69549d31243a.png', alt: '' },
    { id: 23, category: 'sunset', src: '/lovable-uploads/70addbb5-bbb4-47a6-92ef-3d0c69b55d5d.png', alt: '' },
    { id: 24, category: 'sunset', src: '/lovable-uploads/8573aa1d-be2b-4739-8999-05a16fb24a34.png', alt: '' },
    { id: 25, category: 'sunset', src: '/lovable-uploads/6c68c096-2633-442e-adb6-5631763becfb.png', alt: '' },
    { id: 26, category: 'sunset', src: '/lovable-uploads/5508ca10-156e-4cce-ad38-6888235e9ef0.png', alt: '' },
    { id: 27, category: 'sunset', src: '/lovable-uploads/e0402a06-027d-4914-a14a-e6baeec25255.png', alt: 'Sunset – sun rays over sea and pool' },
    { id: 28, category: 'sunset', src: '/lovable-uploads/b746bc1b-01b0-42d2-ad3d-28f7d70e9ca3.png', alt: 'Sunset – golden horizon over village and pool' },
    { id: 29, category: 'living-room', src: '/lovable-uploads/5b7d6b86-1d7e-446d-b3f6-350f7e087144.png', alt: 'Living room – sea view window and sofas' },
    { id: 30, category: 'living-room', src: '/lovable-uploads/98e27587-c03d-4938-92e4-c997f60ca03d.png', alt: 'Living room – leather sofa and coffee table' },
    { id: 31, category: 'living-room', src: '/lovable-uploads/0ed3769e-ddea-4f5f-8657-8888643a909b.png', alt: 'Living room – archway view to kitchen' },
    { id: 32, category: 'living-room', src: '/lovable-uploads/6668c6f2-b4f5-4b23-ab06-d536f9fcb36e.png', alt: 'Living room – armchair by window with sea view' },
    { id: 33, category: 'living-room', src: '/lovable-uploads/61dc4378-4d22-4b4d-b534-4acb8d083a59.png', alt: 'Living room – entryway and window with natural light' },
    // Balconies defaults
    { id: 34, category: 'balconies', src: '/lovable-uploads/7171ad66-0628-4615-93c0-8f63cb57530b.png', alt: 'Balcony – sea view over pool and hillside' },
    { id: 35, category: 'balconies', src: '/lovable-uploads/d444242b-16ec-4051-9a27-c42daaac757b.png', alt: 'Balcony – rustic bench with shutters and decor' },
    { id: 36, category: 'balconies', src: '/lovable-uploads/fc5b6502-8bb3-49dc-9387-e7b494783222.png', alt: 'Balcony – wine bottle and glasses with pool and sea view' },
    { id: 37, category: 'balconies', src: '/lovable-uploads/9a3bf05d-7192-4fd0-8ed4-74dc0fc0fe0a.png', alt: 'Balcony – dining table set with panoramic sea view' },
    { id: 38, category: 'balconies', src: '/lovable-uploads/87de0f88-1982-4cea-9c90-5693f4c7d935.png', alt: 'Balcony – pool and sea view from upper terrace' },
    { id: 39, category: 'balconies', src: '/lovable-uploads/4580ac6e-c8b0-4bc9-b68b-173838cf0060.png', alt: 'Balcony – cozy corner with bench and macrame wall hanging' },
    // Bedroom 1 defaults
    { id: 40, category: 'bed-room-1', src: '/lovable-uploads/ee91f65f-0775-46b4-94a8-be2a27122aae.png', alt: 'Bedroom 1 – bright room with balcony doors and window' },
    { id: 41, category: 'bed-room-1', src: '/lovable-uploads/eca4d710-7fee-4d01-a099-177b0960e6c6.png', alt: 'Bedroom 1 – sea view from window above bed' },
    { id: 42, category: 'bed-room-1', src: '/lovable-uploads/5567f900-8d91-4231-978b-a8754c577779.png', alt: 'Bedroom 1 – view to pool and sea from window' },
    { id: 43, category: 'bed-room-1', src: '/lovable-uploads/70c8831a-de26-43b6-a47a-3bc2ca306524.png', alt: 'Bedroom 1 – wardrobe and balcony doors' },
    { id: 44, category: 'bed-room-1', src: '/lovable-uploads/e92f3097-8ebf-47c3-b94f-48816a3afaa1.png', alt: 'Bedroom 1 – side view of bed and window' },
    // Bedroom 2 defaults
    { id: 45, category: 'bed-room-2', src: '/lovable-uploads/ddf17b2e-03d7-4b73-b263-2045f07b067b.png', alt: 'Bedroom 2 – wardrobe and balcony doors with AC' },
    { id: 46, category: 'bed-room-2', src: '/lovable-uploads/34b34cf9-3d63-4d99-9bf9-b9955337cdb9.png', alt: 'Bedroom 2 – bed with woven decor between two windows' },
    { id: 47, category: 'bed-room-2', src: '/lovable-uploads/e5393da9-7f8e-45d3-8406-e3bd950943d3.png', alt: 'Bedroom 2 – bed facing en-suite bathroom' },
    { id: 48, category: 'bed-room-2', src: '/lovable-uploads/df2e670f-cd51-4ea0-87c9-82c2dcf2b251.png', alt: 'Bedroom 2 – balcony view to sea and pool' },
    { id: 49, category: 'bed-room-2', src: '/lovable-uploads/e039fbf6-1a84-4ae8-98b5-5f6d92373551.png', alt: 'Bedroom 2 – bathroom vanity and mirror' },
    { id: 50, category: 'bed-room-2', src: '/lovable-uploads/4b24e34d-8d7b-4093-bd82-1b66c7178621.png', alt: 'Bedroom 2 – bathroom shower' },
    { id: 51, category: 'bed-room-2', src: '/lovable-uploads/d9d44efd-5443-48bd-95b8-398af1a8b763.png', alt: 'Bedroom 2 – bathroom with tub and shower' },
    { id: 52, category: 'bed-room-2', src: '/lovable-uploads/8b0207a4-cde8-4c7b-8386-fd8835ebc3d8.png', alt: 'Bedroom 2 – vanity and toilet' },
  ];

  let galleryImages = [] as { id: number; category: string; src: string; alt: string }[];
  if (cmsImages.length) {
    const cmsMapped = cmsImages.map((img, idx) => ({ id: idx + 1, category: img.categoryId || '', src: img.url, alt: img.alt || '' }));
    // Force-replace Garden Day Light with our new defaults
    const cmsWithoutDay = cmsMapped.filter((img) => img.category !== 'garden-day-light');
    const cmsImageCategories = new Set(cmsImages.map((img) => img.categoryId || ''));
    const extras = defaultImages.filter((img) => !cmsImageCategories.has(img.category) && img.category !== 'garden-day-light');
    const dayDefaults = defaultImages.filter((img) => img.category === 'garden-day-light');
    galleryImages = [...cmsWithoutDay, ...dayDefaults, ...extras];
  } else {
    galleryImages = defaultImages;
  }

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const getCategoryDescription = (categoryId: string) => {
    const descriptions = translations.gallery.descriptions || {};
    return descriptions[categoryId] || '';
  };

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-20 animate-soft-slide-up">
          <h2 className="text-5xl lg:text-6xl font-cormorant font-medium text-mediterranean-deep-navy mb-8">
            {translations.gallery.title}
          </h2>
          <p className="text-xl lg:text-2xl font-inter text-mediterranean-stone-gray max-w-3xl mx-auto font-light">
            {translations.gallery.subtitle}
          </p>
        </div>

        {/* Category Filter - Refined */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {galleryCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className={`rounded-full px-6 py-3 font-inter transition-all duration-300 ${
                selectedCategory === category.id 
                  ? 'bg-mediterranean-blue text-white shadow-lg' 
                  : 'border-mediterranean-blue/30 text-mediterranean-blue hover:bg-mediterranean-blue/10'
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Category Description removed per request */}

        {/* Enhanced Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <Card 
              key={image.id} 
              className="overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-none"
              onClick={() => setSelectedImage(withBase(image.src))}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={withBase(image.src)}
                    alt={image.alt}
                    className="w-full h-64 object-cover transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = 'placeholder.svg'; }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-[90vh]">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </Button>
              <img
                src={selectedImage}
                alt=""
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
