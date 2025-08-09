import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GallerySectionProps {
  translations: any;
}

const GallerySection: React.FC<GallerySectionProps> = ({ translations }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const galleryCategories = [
    { id: 'all', name: translations.gallery.categories.all },
    { id: 'outdoor', name: translations.gallery.categories.outdoor },
    { id: 'hidden-bay', name: translations.gallery.categories.hiddenBay },
    { id: 'bedroom1', name: translations.gallery.categories.bedroom1 },
    { id: 'bedroom2', name: translations.gallery.categories.bedroom2 },
    { id: 'bedroom3', name: translations.gallery.categories.bedroom3 },
    { id: 'extra-sleeping', name: translations.gallery.categories.extraSleeping },
    { id: 'kitchen', name: translations.gallery.categories.kitchen },
    { id: 'living', name: translations.gallery.categories.living },
  ];

  const galleryImages = [
    // Featured villa photos
    { id: 1, category: 'outdoor', src: '/lovable-uploads/cb4246ae-3441-4bed-bb30-12d0525376a3.png', alt: 'Sunset view from villa', featured: true },
    { id: 2, category: 'outdoor', src: '/lovable-uploads/e6df6bc3-06bd-4e68-b8f3-fe91adcd3a41.png', alt: 'Villa at night with pool', featured: true },
    
    // Outdoor Areas - Garden, Pool (Day & Night)
    { id: 3, category: 'outdoor', src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Pool area day view' },
    { id: 4, category: 'outdoor', src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Garden and pool night view' },
    
    // Hidden Bay
    { id: 5, category: 'hidden-bay', src: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Hidden bay view' },
    { id: 6, category: 'hidden-bay', src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Secret swimming spot' },
    
    // Bedroom 1
    { id: 7, category: 'bedroom1', src: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Bedroom 1' },
    { id: 8, category: 'bedroom1', src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Bedroom 1 bathroom' },
    
    // Bedroom 2 - Sea & Pool View
    { id: 9, category: 'bedroom2', src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Bedroom 2 with sea view' },
    { id: 10, category: 'bedroom2', src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Bedroom 2 balcony' },
    
    // Bedroom 3 - Upper Floor
    { id: 11, category: 'bedroom3', src: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Master bedroom' },
    { id: 12, category: 'bedroom3', src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Master bedroom terrace' },
    
    // Extra Sleeping Area
    { id: 13, category: 'extra-sleeping', src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Sunroom with fold-out beds' },
    
    // Kitchen
    { id: 14, category: 'kitchen', src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Fully equipped kitchen' },
    { id: 15, category: 'kitchen', src: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Kitchen dining area' },
    
    // Living Room
    { id: 16, category: 'living', src: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Living room' },
    { id: 17, category: 'living', src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Living room view to pool' },
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
              className={`overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-none ${
                image.featured ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => setSelectedImage(image.src)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`w-full object-cover transition-transform duration-500 ${
                      image.featured ? 'h-96 md:h-full' : 'h-64'
                    }`}
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
                alt="Gallery image"
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
