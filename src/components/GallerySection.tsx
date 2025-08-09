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
  ];
  const galleryCategories = [
    { id: 'all', name: translations?.gallery?.categories?.all ?? 'All' },
    ...(cmsCategories.length ? cmsCategories.map((c) => ({ id: c.id, name: c.title || 'Untitled' })) : defaultCategories)
  ];

  const cmsImages = (content?.images ?? []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const galleryImages = cmsImages.length
    ? cmsImages.map((img, idx) => ({ id: idx + 1, category: img.categoryId || '', src: img.url, alt: img.alt || '' }))
    : [
        { id: 1, category: 'outdoor', src: '/lovable-uploads/b03503c6-c5da-4a36-b32d-5da4c87923b1.png', alt: 'Outdoor villa – front garden' },
        { id: 2, category: 'outdoor', src: '/lovable-uploads/0cf91a09-cb3b-4953-a757-513680d5bd34.png', alt: 'Outdoor villa – entrance gate' },
        { id: 3, category: 'outdoor', src: '/lovable-uploads/6d2acc7b-041d-4587-b32c-a11b99b4d4c7.png', alt: 'Outdoor villa – side view' },
        { id: 4, category: 'outdoor', src: '/lovable-uploads/146cd19f-7a25-46e8-9f7a-837f8f30a160.png', alt: 'Outdoor villa – garden and facade' },
      ];

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
