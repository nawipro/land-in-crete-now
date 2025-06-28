
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
    // Outdoor Areas - Garden, Pool (Day & Night)
    { id: 1, category: 'outdoor', src: '/lovable-uploads/cb4246ae-3441-4bed-bb30-12d0525376a3.png', alt: 'Sunset view from villa' },
    { id: 2, category: 'outdoor', src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Pool area day view' },
    { id: 3, category: 'outdoor', src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Garden and pool night view' },
    
    // Hidden Bay
    { id: 4, category: 'hidden-bay', src: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Hidden bay view' },
    { id: 5, category: 'hidden-bay', src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Secret swimming spot' },
    
    // Bedroom 1
    { id: 6, category: 'bedroom1', src: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Bedroom 1' },
    { id: 7, category: 'bedroom1', src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Bedroom 1 bathroom' },
    
    // Bedroom 2 - Sea & Pool View
    { id: 8, category: 'bedroom2', src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Bedroom 2 with sea view' },
    { id: 9, category: 'bedroom2', src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Bedroom 2 balcony' },
    
    // Bedroom 3 - Upper Floor
    { id: 10, category: 'bedroom3', src: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Master bedroom' },
    { id: 11, category: 'bedroom3', src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Master bedroom terrace' },
    
    // Extra Sleeping Area
    { id: 12, category: 'extra-sleeping', src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Sunroom with fold-out beds' },
    
    // Kitchen
    { id: 13, category: 'kitchen', src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Fully equipped kitchen' },
    { id: 14, category: 'kitchen', src: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Kitchen dining area' },
    
    // Living Room
    { id: 15, category: 'living', src: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Living room' },
    { id: 16, category: 'living', src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Living room view to pool' },
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const getCategoryDescription = (categoryId: string) => {
    const descriptions = translations.gallery.descriptions || {};
    return descriptions[categoryId] || '';
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-mediterranean-blue mb-6">
            {translations.gallery.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {translations.gallery.subtitle}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {galleryCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Category Description */}
        {selectedCategory !== 'all' && getCategoryDescription(selectedCategory) && (
          <div className="text-center mb-8">
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {getCategoryDescription(selectedCategory)}
            </p>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <Card 
              key={image.id} 
              className="overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              onClick={() => setSelectedImage(image.src)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
