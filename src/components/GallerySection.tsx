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

  // Build categories and images from CMS if provided, otherwise fallback to translations/static
  const cmsCategories = (content?.categories ?? []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const defaultCategories = [
    { id: 'outdoor', name: 'OUTDOOR VILLA' },
    { id: 'garden-day-light', name: 'GARDEN DAY LIGHT' },
    { id: 'garden-night', name: 'GARDEN NIGHT' },
    { id: 'secret-bay', name: 'SECRET BAY' },
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

        {/* Category Description */}
        {selectedCategory !== 'all' && getCategoryDescription(selectedCategory) && (
          <div className="text-center mb-12 animate-gentle-fade">
            <p className="text-lg font-inter text-mediterranean-stone-gray max-w-4xl mx-auto leading-relaxed">
              {getCategoryDescription(selectedCategory)}
            </p>
          </div>
        )}

        {/* Enhanced Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <Card 
              key={image.id} 
              className="overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-none"
              onClick={() => setSelectedImage(image.src)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover transition-transform duration-500"
                    loading="lazy"
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
