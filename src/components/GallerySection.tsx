import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

interface GallerySectionProps {
  translations: any;
  content?: {
    categories?: { id: string; title: string; order: number }[];
    images?: { url: string; alt: string; categoryId: string; order: number }[];
  };
}

/* ── Scroll-reveal hook ────────────────────────────────────────── */
function useFadeIn(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return {
    ref,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
    } as React.CSSProperties,
  };
}

/* ── 6 merged categories ───────────────────────────────────────── */
const categoryMeta: Record<string, { label: string; displayName: string; cover: string }> = {
  'the-villa':     { label: 'ARCHITECTURE', displayName: 'The Villa',      cover: '/lovable-uploads/146cd19f-7a25-46e8-9f7a-837f8f30a160.png' },
  'the-garden':    { label: 'OUTDOORS',     displayName: 'The Garden',     cover: '/lovable-uploads/c6a0949b-ccd7-42e3-a208-1684ee5d242b.png' },
  'hidden-bay':    { label: 'NATURE',       displayName: 'The Hidden Bay', cover: '/lovable-uploads/1ea14e94-47b6-40de-8917-733a37785a6b.png' },
  'sunset':        { label: 'GOLDEN HOUR',  displayName: 'Sunset',         cover: '/lovable-uploads/b746bc1b-01b0-42d2-ad3d-28f7d70e9ca3.png' },
  'living-spaces': { label: 'INTERIORS',    displayName: 'Living Spaces',  cover: '/lovable-uploads/5b7d6b86-1d7e-446d-b3f6-350f7e087144.png' },
  'bedrooms':      { label: 'INTERIORS',    displayName: 'The Bedrooms',   cover: '/lovable-uploads/7925bc99-5c63-405e-9890-6345c6a5d32a.png' },
};

/** Map old CMS category IDs → new merged IDs */
const categoryRemap: Record<string, string> = {
  'outdoor': 'the-villa', 'balconies': 'the-villa',
  'garden-day-light': 'the-garden', 'garden-night': 'the-garden',
  'secret-bay': 'hidden-bay',
  'sunset': 'sunset',
  'living-room': 'living-spaces', 'kitchen': 'living-spaces',
  'bed-room-1': 'bedrooms', 'bed-room-2': 'bedrooms', 'bed-room-3': 'bedrooms',
  'terrace-family-suite': 'bedrooms',
};

const withBase = (p: string) => p?.startsWith('http') ? p : p?.replace(/^\/+/, '');

const getDisplayName = (catId: string) =>
  categoryMeta[catId]?.displayName || catId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

const getLabel = (catId: string) =>
  categoryMeta[catId]?.label || 'VILLA';

/* ── Sub-components ────────────────────────────────────────────── */

const CategoryCard: React.FC<{
  coverSrc: string;
  label: string;
  displayName: string;
  imageCount: number;
  onClick: () => void;
}> = ({ coverSrc, label, displayName, imageCount, onClick }) => {
  const fade = useFadeIn(0.08);
  return (
    <div ref={fade.ref} style={fade.style}>
      <div
        onClick={onClick}
        className="relative overflow-hidden rounded-2xl cursor-pointer group"
        style={{ aspectRatio: '4/5' }}
      >
        <img
          src={coverSrc}
          alt={displayName}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 40%, transparent 65%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
          <p className="text-[12px] lg:text-[14px] font-inter font-semibold uppercase tracking-[0.22em] text-[#C4A882] mb-2">
            {label}
          </p>
          <h3 className="text-[32px] lg:text-[40px] font-cormorant font-medium text-white leading-tight">
            {displayName}
          </h3>
          <p className="text-[14px] font-inter text-white/50 font-light mt-2">
            {imageCount} photos
          </p>
          <div className="h-[1px] bg-[#C4A882] mt-5 transition-all duration-700 w-0 group-hover:w-full origin-left" />
        </div>
      </div>
    </div>
  );
};

const ImageCard: React.FC<{
  src: string;
  alt: string;
  onClick: () => void;
}> = ({ src, alt, onClick }) => {
  const fade = useFadeIn(0.06);
  return (
    <div ref={fade.ref} style={fade.style}>
      <div
        onClick={onClick}
        className="relative overflow-hidden rounded-xl cursor-pointer group aspect-[4/3]"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>
    </div>
  );
};

/** Sub-group display names (keyed by subGroup ID) */
const subGroupLabels: Record<string, string> = {
  'bed-room-1': 'Bedroom One',
  'bed-room-2': 'Bedroom Two',
  'bed-room-3': 'Master Suite',
  'terrace-family-suite': 'Family Suite',
};

const SubGroupSection: React.FC<{
  label: string;
  images: { image: { id: number; category: string; src: string; alt: string; subGroup?: string }; globalIndex: number }[];
  onOpenLightbox: (index: number) => void;
}> = ({ label, images, onOpenLightbox }) => {
  const fade = useFadeIn(0.08);
  return (
    <div ref={fade.ref} style={fade.style}>
      {/* Sub-group heading */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-[1px] w-10 bg-[#C4A882]/50" />
        <h3 className="text-[24px] lg:text-[28px] font-cormorant font-medium text-[#1A1714] whitespace-nowrap">
          {subGroupLabels[label] || label}
        </h3>
        <div className="h-[1px] flex-1 bg-[#C4A882]/15" />
      </div>
      {/* Images grid for this sub-group */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {images.map(({ image, globalIndex }) => (
          <ImageCard
            key={`${image.category}-${image.src}`}
            src={withBase(image.src)}
            alt={image.alt}
            onClick={() => onOpenLightbox(globalIndex)}
          />
        ))}
      </div>
    </div>
  );
};

const CategoryDetailView: React.FC<{
  categoryId: string;
  images: { id: number; category: string; src: string; alt: string; subGroup?: string }[];
  onBack: () => void;
  onOpenLightbox: (index: number) => void;
}> = ({ categoryId, images, onBack, onOpenLightbox }) => {
  const fade = useFadeIn(0.05);

  /** Only show sub-group divisions for bedrooms */
  const hasSubGroups = categoryId === 'bedrooms' && images.some(img => img.subGroup);

  /** Group images by subGroup */
  const groupedImages = hasSubGroups
    ? images.reduce<{ group: string; images: { image: typeof images[0]; globalIndex: number }[] }[]>(
        (acc, image, idx) => {
          const group = image.subGroup || 'other';
          const last = acc[acc.length - 1];
          if (last && last.group === group) {
            last.images.push({ image, globalIndex: idx });
          } else {
            acc.push({ group, images: [{ image, globalIndex: idx }] });
          }
          return acc;
        }, [])
    : null;

  return (
    <>
      {/* Back bar — prominent, sticky */}
      <div className="sticky top-0 z-30 bg-[#f8f5f2]/95 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10 py-4 mb-10">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#C4A882]/40 text-[15px] font-inter text-[#1A1714] hover:bg-[#C4A882]/10 hover:border-[#C4A882] transition-all group"
          >
            <ArrowLeft className="h-4 w-4 text-[#C4A882] transition-transform group-hover:-translate-x-1" />
            Back to Gallery
          </button>
          <p className="hidden sm:block text-[13px] font-inter uppercase tracking-[0.18em] text-[#C4A882]">
            {getDisplayName(categoryId)}
          </p>
        </div>
      </div>

      {/* Header */}
      <div ref={fade.ref} style={fade.style} className="mb-14">
        <p className="text-[13px] font-inter font-semibold uppercase tracking-[0.22em] text-[#C4A882] mb-3">
          {getLabel(categoryId)}
        </p>
        <h2 className="text-[44px] lg:text-[56px] font-cormorant font-medium text-[#1A1714] leading-[1.1]">
          {getDisplayName(categoryId)}
        </h2>
        <p className="text-[16px] font-inter text-[#6B6560] font-light mt-3">
          {images.length} photos
        </p>
      </div>

      {/* Image grid — with sub-group sections for bedrooms */}
      {hasSubGroups && groupedImages ? (
        <div className="space-y-14">
          {groupedImages.map(({ group, images: groupImgs }) => (
            <SubGroupSection
              key={group}
              label={group}
              images={groupImgs}
              onOpenLightbox={onOpenLightbox}
            />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {images.map((image, index) => (
            <ImageCard
              key={`${image.category}-${image.src}`}
              src={withBase(image.src)}
              alt={image.alt}
              onClick={() => onOpenLightbox(index)}
            />
          ))}
        </div>
      )}
    </>
  );
};

/* ── Main component ────────────────────────────────────────────── */

const GallerySection: React.FC<GallerySectionProps> = ({ translations, content }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerFade = useFadeIn();

  /* ── CMS data ────────────────────────────────────────────────── */
  const cmsImages = (content?.images ?? []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  /* ── Default images (categories already remapped) ────────────── */
  const defaultImages: { id: number; category: string; src: string; alt: string; subGroup?: string }[] = [
    // The Villa (outdoor + balconies)
    { id: 1,  category: 'the-villa', src: '/lovable-uploads/b03503c6-c5da-4a36-b32d-5da4c87923b1.png', alt: 'Villa. Front garden' },
    { id: 2,  category: 'the-villa', src: '/lovable-uploads/0cf91a09-cb3b-4953-a757-513680d5bd34.png', alt: 'Villa. Entrance gate' },
    { id: 3,  category: 'the-villa', src: '/lovable-uploads/6d2acc7b-041d-4587-b32c-a11b99b4d4c7.png', alt: 'Villa. Side view' },
    { id: 4,  category: 'the-villa', src: '/lovable-uploads/146cd19f-7a25-46e8-9f7a-837f8f30a160.png', alt: 'Villa. Garden and facade' },
    { id: 34, category: 'the-villa', src: '/lovable-uploads/7171ad66-0628-4615-93c0-8f63cb57530b.png', alt: 'Terrace. Sea view over pool and hillside' },
    { id: 35, category: 'the-villa', src: '/lovable-uploads/d444242b-16ec-4051-9a27-c42daaac757b.png', alt: 'Terrace. Rustic bench with shutters' },
    { id: 36, category: 'the-villa', src: '/lovable-uploads/fc5b6502-8bb3-49dc-9387-e7b494783222.png', alt: 'Terrace. Wine with pool and sea view' },
    { id: 37, category: 'the-villa', src: '/lovable-uploads/9a3bf05d-7192-4fd0-8ed4-74dc0fc0fe0a.png', alt: 'Terrace. Dining table with panoramic sea view' },
    { id: 38, category: 'the-villa', src: '/lovable-uploads/87de0f88-1982-4cea-9c90-5693f4c7d935.png', alt: 'Terrace. Pool and sea view from upper terrace' },
    { id: 39, category: 'the-villa', src: '/lovable-uploads/4580ac6e-c8b0-4bc9-b68b-173838cf0060.png', alt: 'Terrace. Cozy corner with macrame' },

    // The Garden (day + night)
    { id: 10, category: 'the-garden', src: '/lovable-uploads/b3adb8c1-e7a0-4048-b109-fbd0d574d7e8.png', alt: 'Garden. Patio with table and pool view' },
    { id: 11, category: 'the-garden', src: '/lovable-uploads/849c94d6-f867-443b-95a8-586894e93925.png', alt: 'Garden. Villa and pool' },
    { id: 12, category: 'the-garden', src: '/lovable-uploads/c6a0949b-ccd7-42e3-a208-1684ee5d242b.png', alt: 'Garden. Pool and sea view from above' },
    { id: 13, category: 'the-garden', src: '/lovable-uploads/497058df-0eee-470e-aa25-8152dec11164.png', alt: 'Garden. Lawn seating area and pool' },
    { id: 14, category: 'the-garden', src: '/lovable-uploads/34f209d0-6644-43a2-b4bc-8b3f22ccedeb.png', alt: 'Garden. Outdoor shower with sea backdrop' },
    { id: 15, category: 'the-garden', src: '/lovable-uploads/0cf5d84e-6414-4b56-bf41-8f4c6326d299.png', alt: 'Garden. Sun loungers and umbrella by pool' },
    { id: 5,  category: 'the-garden', src: '/lovable-uploads/66d41bb2-c918-4f2e-b49f-5404d5685356.png', alt: 'Garden at night. Villa exterior lights' },
    { id: 6,  category: 'the-garden', src: '/lovable-uploads/4c4a02ce-70d2-4065-925a-70d8f9bf5d9f.png', alt: 'Garden at night. Pool view from terrace' },
    { id: 7,  category: 'the-garden', src: '/lovable-uploads/923fb47c-f2d2-4712-8807-1f726abfb743.png', alt: 'Garden at night. BBQ and pool' },
    { id: 8,  category: 'the-garden', src: '/lovable-uploads/9f1780d8-e629-494b-8240-9ce6a67b17ee.png', alt: 'Garden at night. Villa and lit pool' },
    { id: 9,  category: 'the-garden', src: '/lovable-uploads/5afaa76f-fe29-4fb9-8d4f-b9f00925bddd.png', alt: 'Garden at night. Garden and terrace' },

    // The Hidden Bay
    { id: 16, category: 'hidden-bay', src: '/lovable-uploads/fe62f0b0-bf9b-4e12-8493-636dc8d90a3b.png', alt: 'Hidden Bay. Cove and villa view' },
    { id: 17, category: 'hidden-bay', src: '/lovable-uploads/1ea14e94-47b6-40de-8917-733a37785a6b.png', alt: 'Hidden Bay. Turquoise water by rocky shore' },
    { id: 18, category: 'hidden-bay', src: '/lovable-uploads/8e80ccdd-fe8d-4766-adda-ec5c847d68d8.png', alt: 'Hidden Bay. Stone steps path' },
    { id: 19, category: 'hidden-bay', src: '/lovable-uploads/56bdb900-04bd-4ddf-8cc6-f667096f9a1a.png', alt: 'Hidden Bay. Path up to the house' },
    { id: 20, category: 'hidden-bay', src: '/lovable-uploads/7f16ca73-ff74-4efc-a9e0-d712ab162e24.png', alt: 'Hidden Bay. Clear water and cliffs' },
    { id: 21, category: 'hidden-bay', src: '/lovable-uploads/d6a759c2-d3d6-4075-86d1-1fb91bb11102.png', alt: 'Hidden Bay. Narrow bay opening to sea' },

    // Sunset
    { id: 22, category: 'sunset', src: '/lovable-uploads/6be09474-ca9b-4709-a76d-69549d31243a.png', alt: 'Sunset over the Cretan Sea from villa terrace' },
    { id: 23, category: 'sunset', src: '/lovable-uploads/70addbb5-bbb4-47a6-92ef-3d0c69b55d5d.png', alt: 'Golden sunset sky above the Mediterranean' },
    { id: 24, category: 'sunset', src: '/lovable-uploads/8573aa1d-be2b-4739-8999-05a16fb24a34.png', alt: 'Sunset colours reflected on the pool surface' },
    { id: 25, category: 'sunset', src: '/lovable-uploads/6c68c096-2633-442e-adb6-5631763becfb.png', alt: 'Dusk panorama over the bay from the garden' },
    { id: 26, category: 'sunset', src: '/lovable-uploads/5508ca10-156e-4cce-ad38-6888235e9ef0.png', alt: 'Warm sunset light across the villa landscape' },
    { id: 27, category: 'sunset', src: '/lovable-uploads/e0402a06-027d-4914-a14a-e6baeec25255.png', alt: 'Sunset. Sun rays over sea and pool' },
    { id: 28, category: 'sunset', src: '/lovable-uploads/b746bc1b-01b0-42d2-ad3d-28f7d70e9ca3.png', alt: 'Sunset. Golden horizon over village and pool' },

    // Living Spaces (living room + kitchen)
    { id: 29, category: 'living-spaces', src: '/lovable-uploads/5b7d6b86-1d7e-446d-b3f6-350f7e087144.png', alt: 'Living room. Sea view window and sofas' },
    { id: 30, category: 'living-spaces', src: '/lovable-uploads/98e27587-c03d-4938-92e4-c997f60ca03d.png', alt: 'Living room. Leather sofa and coffee table' },
    { id: 31, category: 'living-spaces', src: '/lovable-uploads/0ed3769e-ddea-4f5f-8657-8888643a909b.png', alt: 'Living room. Archway view to kitchen' },
    { id: 32, category: 'living-spaces', src: '/lovable-uploads/6668c6f2-b4f5-4b23-ab06-d536f9fcb36e.png', alt: 'Living room. Armchair by window with sea view' },
    { id: 33, category: 'living-spaces', src: '/lovable-uploads/61dc4378-4d22-4b4d-b534-4acb8d083a59.png', alt: 'Living room. Entryway with natural light' },
    { id: 65, category: 'living-spaces', src: '/lovable-uploads/01be3a91-7d9c-4ca2-816c-6f1c6a051246.png', alt: 'Kitchen. Blue cabinets with dining area' },
    { id: 66, category: 'living-spaces', src: '/lovable-uploads/5f8d35d5-33b8-4648-883e-c1f9db774b14.png', alt: 'Kitchen. Dining area with wooden cabinet' },
    { id: 67, category: 'living-spaces', src: '/lovable-uploads/9c4e3266-c6f0-4a53-8e13-d67319abe0cd.png', alt: 'Kitchen. Dining area with stone fireplace and sea view' },
    { id: 68, category: 'living-spaces', src: '/lovable-uploads/dd533a7c-92b0-4bff-a64f-9e84eb8cbfaf.png', alt: 'Kitchen. Living area with stone fireplace' },
    { id: 69, category: 'living-spaces', src: '/lovable-uploads/9923e3cb-7231-4b17-b809-91f1b00065ca.png', alt: 'Kitchen. Dining area with stairs' },
    { id: 70, category: 'living-spaces', src: '/lovable-uploads/6aab1831-46b1-45f7-8d1b-63b4b299a706.png', alt: 'Kitchen. Stone fireplace with candles and decor' },

    // The Bedrooms (1 + 2 + 3 + family suite) — subGroup for visual separation
    { id: 40, category: 'bedrooms', subGroup: 'bed-room-1', src: '/lovable-uploads/ee91f65f-0775-46b4-94a8-be2a27122aae.png', alt: 'Bedroom 1. Bright room with balcony doors' },
    { id: 41, category: 'bedrooms', subGroup: 'bed-room-1', src: '/lovable-uploads/eca4d710-7fee-4d01-a099-177b0960e6c6.png', alt: 'Bedroom 1. Sea view from window above bed' },
    { id: 42, category: 'bedrooms', subGroup: 'bed-room-1', src: '/lovable-uploads/5567f900-8d91-4231-978b-a8754c577779.png', alt: 'Bedroom 1. View to pool and sea from window' },
    { id: 43, category: 'bedrooms', subGroup: 'bed-room-1', src: '/lovable-uploads/70c8831a-de26-43b6-a47a-3bc2ca306524.png', alt: 'Bedroom 1. Wardrobe and balcony doors' },
    { id: 44, category: 'bedrooms', subGroup: 'bed-room-1', src: '/lovable-uploads/e92f3097-8ebf-47c3-b94f-48816a3afaa1.png', alt: 'Bedroom 1. Side view of bed and window' },
    { id: 45, category: 'bedrooms', subGroup: 'bed-room-2', src: '/lovable-uploads/ddf17b2e-03d7-4b73-b263-2045f07b067b.png', alt: 'Bedroom 2. Wardrobe and balcony doors' },
    { id: 46, category: 'bedrooms', subGroup: 'bed-room-2', src: '/lovable-uploads/34b34cf9-3d63-4d99-9bf9-b9955337cdb9.png', alt: 'Bedroom 2. Bed with woven decor' },
    { id: 47, category: 'bedrooms', subGroup: 'bed-room-2', src: '/lovable-uploads/e5393da9-7f8e-45d3-8406-e3bd950943d3.png', alt: 'Bedroom 2. Bed facing en-suite bathroom' },
    { id: 48, category: 'bedrooms', subGroup: 'bed-room-2', src: '/lovable-uploads/df2e670f-cd51-4ea0-87c9-82c2dcf2b251.png', alt: 'Bedroom 2. Balcony view to sea and pool' },
    { id: 49, category: 'bedrooms', subGroup: 'bed-room-2', src: '/lovable-uploads/e039fbf6-1a84-4ae8-98b5-5f6d92373551.png', alt: 'Bedroom 2. Bathroom vanity and mirror' },
    { id: 50, category: 'bedrooms', subGroup: 'bed-room-2', src: '/lovable-uploads/4b24e34d-8d7b-4093-bd82-1b66c7178621.png', alt: 'Bedroom 2. Bathroom shower' },
    { id: 51, category: 'bedrooms', subGroup: 'bed-room-2', src: '/lovable-uploads/d9d44efd-5443-48bd-95b8-398af1a8b763.png', alt: 'Bedroom 2. Bathroom with tub and shower' },
    { id: 52, category: 'bedrooms', subGroup: 'bed-room-2', src: '/lovable-uploads/8b0207a4-cde8-4c7b-8386-fd8835ebc3d8.png', alt: 'Bedroom 2. Vanity and toilet' },
    { id: 53, category: 'bedrooms', subGroup: 'bed-room-3', src: '/lovable-uploads/7925bc99-5c63-405e-9890-6345c6a5d32a.png', alt: 'Bedroom 3. Bright room with sea view window' },
    { id: 54, category: 'bedrooms', subGroup: 'bed-room-3', src: '/lovable-uploads/cc772d3d-8e07-4be1-889f-fbe8e860c874.png', alt: 'Bedroom 3. Bed facing window and TV cabinet' },
    { id: 55, category: 'bedrooms', subGroup: 'bed-room-3', src: '/lovable-uploads/e45052d2-172f-486f-8afa-0612093bfd7d.png', alt: 'Bedroom 3. Open window with sea view' },
    { id: 56, category: 'bedrooms', subGroup: 'bed-room-3', src: '/lovable-uploads/9c193e2d-c130-46bc-9e5f-5fb0db8c4881.png', alt: 'Bedroom 3. Bed and artwork' },
    { id: 57, category: 'bedrooms', subGroup: 'bed-room-3', src: '/lovable-uploads/3830ea0d-4907-4830-ace7-bd3a304cd1e6.png', alt: 'Bedroom 3. Pillows and pendant light' },
    { id: 58, category: 'bedrooms', subGroup: 'bed-room-3', src: '/lovable-uploads/5c750d84-e0a3-40e9-ad3d-9af87cff4564.png', alt: 'Bedroom 3. View from doorway' },
    { id: 59, category: 'bedrooms', subGroup: 'bed-room-3', src: '/lovable-uploads/5fba73ec-c41e-4dc6-8e0f-1de7228a2c17.png', alt: 'Bedroom 3. Bathroom with bathtub' },
    { id: 60, category: 'bedrooms', subGroup: 'bed-room-3', src: '/lovable-uploads/83e5abc8-1e73-4da6-b04e-f701f917a491.png', alt: 'Bedroom 3. Bathroom vanity and toilet' },
    { id: 61, category: 'bedrooms', subGroup: 'terrace-family-suite', src: '/lovable-uploads/3112cde9-597f-427a-9b9f-797586a070a0.png', alt: 'Family Suite. Armchair corner with sea view window' },
    { id: 62, category: 'bedrooms', subGroup: 'terrace-family-suite', src: '/lovable-uploads/57bc86d7-8bad-4874-98eb-3627cd6fa16d.png', alt: 'Family Suite. Sofa with pillows and coffee table' },
    { id: 63, category: 'bedrooms', subGroup: 'terrace-family-suite', src: '/lovable-uploads/cecc3ce2-b6f4-46a1-be7d-715312c9b099.png', alt: 'Family Suite. Spacious room with armchair' },
    { id: 64, category: 'bedrooms', subGroup: 'terrace-family-suite', src: '/lovable-uploads/e5aa503c-c418-4f4d-ad9a-a218937864c1.png', alt: 'Family Suite. Sofa area with bathroom entrance' },
  ];

  /* ── The 6 merged category IDs ───────────────────────────────── */
  const mergedCategoryIds = ['the-villa', 'the-garden', 'hidden-bay', 'sunset', 'living-spaces', 'bedrooms'];

  /* ── Build final image list (remap CMS images to new categories) */
  let galleryImages: { id: number; category: string; src: string; alt: string; subGroup?: string }[];
  if (cmsImages.length) {
    const cmsMapped = cmsImages.map((img, idx) => ({
      id: idx + 1,
      category: categoryRemap[img.categoryId] || img.categoryId || '',
      subGroup: img.categoryId || undefined, // preserve original ID as sub-group
      src: img.url,
      alt: img.alt || '',
    }));
    // Track which specific subGroups CMS covers (e.g. bed-room-1, bed-room-2)
    const cmsSubGroups = new Set(cmsMapped.map(img => img.subGroup).filter(Boolean));
    const cmsCategoriesWithoutSub = new Set(
      cmsMapped.filter(img => !img.subGroup).map(img => img.category),
    );

    // Keep defaults that CMS doesn't cover:
    // If default has subGroup → only exclude if CMS has that exact subGroup
    // If no subGroup → exclude if CMS has that category
    const extras = defaultImages.filter(img => {
      if (img.subGroup) return !cmsSubGroups.has(img.subGroup);
      return !cmsCategoriesWithoutSub.has(img.category) && !cmsSubGroups.has(img.category);
    });
    galleryImages = [...cmsMapped, ...extras];
  } else {
    galleryImages = defaultImages;
  }

  /* ── Derived state ───────────────────────────────────────────── */
  const activeCategoryImages: { id: number; category: string; src: string; alt: string; subGroup?: string }[] = activeCategory
    ? galleryImages.filter(img => img.category === activeCategory)
    : [];

  const getImageCount = (catId: string) =>
    galleryImages.filter(img => img.category === catId).length;

  const getCover = (catId: string) => {
    const meta = categoryMeta[catId];
    if (meta?.cover) return withBase(meta.cover);
    const first = galleryImages.find(img => img.category === catId);
    return first ? withBase(first.src) : '';
  };

  /* ── Navigation ──────────────────────────────────────────────── */
  const openCategory = useCallback((id: string) => {
    setActiveCategory(id);
    setLightboxIndex(null);
    setTimeout(() => sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }, []);

  const closeCategory = useCallback(() => {
    setActiveCategory(null);
    setLightboxIndex(null);
    setTimeout(() => sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }, []);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const nextImage = useCallback(() => {
    setLightboxIndex(prev => prev !== null ? (prev + 1) % activeCategoryImages.length : null);
  }, [activeCategoryImages.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex(prev => prev !== null ? (prev - 1 + activeCategoryImages.length) % activeCategoryImages.length : null);
  }, [activeCategoryImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  /* ── Render ──────────────────────────────────────────────────── */
  return (
    <section ref={sectionRef} id="gallery" className="py-28 bg-[#f8f5f2]">
      <div className="mx-auto px-4 sm:px-6 lg:px-10 max-w-[1400px]">

        {/* ═══ VIEW 1: 6 Category cards (2 rows × 3) ═══ */}
        {!activeCategory && (
          <>
            <div ref={headerFade.ref} style={headerFade.style} className="text-center mb-16 lg:mb-24 pt-4">
              <p className="text-[13px] font-inter font-semibold uppercase tracking-[0.25em] text-[#C4A882] mb-5">
                Visual Journey
              </p>
              <h2 className="text-[52px] md:text-[64px] lg:text-[72px] font-cormorant font-medium text-[#1A1714] mb-6 leading-[1.05]">
                {translations.gallery.title}
              </h2>
              <p className="text-[18px] lg:text-[20px] font-inter text-[#6B6560] max-w-2xl mx-auto font-light italic leading-relaxed">
                {translations.gallery.subtitle}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {mergedCategoryIds.map(catId => (
                <CategoryCard
                  key={catId}
                  coverSrc={getCover(catId)}
                  label={getLabel(catId)}
                  displayName={getDisplayName(catId)}
                  imageCount={getImageCount(catId)}
                  onClick={() => openCategory(catId)}
                />
              ))}
            </div>
          </>
        )}

        {/* ═══ VIEW 2: Category detail ═══ */}
        {activeCategory && (
          <CategoryDetailView
            categoryId={activeCategory}
            images={activeCategoryImages}
            onBack={closeCategory}
            onOpenLightbox={openLightbox}
          />
        )}

        {/* ═══ Lightbox ═══ */}
        {lightboxIndex !== null && activeCategoryImages[lightboxIndex] && (
          <div
            className="fixed inset-0 bg-black/92 z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 text-white/60 hover:text-white transition-colors"
            >
              <X className="h-7 w-7" strokeWidth={1.5} />
            </button>

            <p className="absolute top-7 left-1/2 -translate-x-1/2 text-[14px] font-inter text-white/40 tracking-wider">
              {lightboxIndex + 1} / {activeCategoryImages.length}
            </p>

            {activeCategoryImages.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                <ChevronLeft className="h-10 w-10" strokeWidth={1.2} />
              </button>
            )}

            <img
              src={withBase(activeCategoryImages[lightboxIndex].src)}
              alt={activeCategoryImages[lightboxIndex].alt}
              className="max-w-[90vw] max-h-[82vh] object-contain rounded-lg select-none"
              onClick={e => e.stopPropagation()}
              draggable={false}
            />

            {activeCategoryImages.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                <ChevronRight className="h-10 w-10" strokeWidth={1.2} />
              </button>
            )}

            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[13px] font-inter text-white/30 uppercase tracking-[0.18em]">
              {getDisplayName(activeCategory!)}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
