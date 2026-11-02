import { Product, Review } from '../types';

export const SAMPLE_PRODUCTS: Product[] = [
  // ================= 16 T-SHIRTS =================
  {
    id: 'tee-01',
    name: 'Tawhid Minimal Tee',
    slug: 'tawhid-minimal-tee',
    description: 'A heavyweight luxury oversized T-shirt with understated micro-calligraphy "Tawhid" (Oneness) subtly printed on the nape and chest. Cut from 280 GSM premium organic cotton with dropped shoulders and a thick ribbed collar.',
    details: ['280 GSM heavyweight combed cotton', 'Dropped shoulders with boxy relaxed drape', 'Screen-printed micro typography', 'Preshrunk to preserve fit'],
    fabric: '100% Organic Heavyweight Cotton (280 GSM)',
    fit: 'Oversized Streetwear Fit',
    category: 'Minimalist T-Shirts',
    collection: 'Tawhid & Sabr Chapter 1',
    price: 650,
    salePrice: 550,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Sandstone', hex: '#D2C8B8' },
      { name: 'Washed Olive', hex: '#4A5340' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'Onyx Black', size: 'S', stock: 12, sku: 'TEE-TAW-BLK-S' },
      { color: 'Onyx Black', size: 'M', stock: 18, sku: 'TEE-TAW-BLK-M' },
      { color: 'Onyx Black', size: 'L', stock: 20, sku: 'TEE-TAW-BLK-L' },
      { color: 'Onyx Black', size: 'XL', stock: 8, sku: 'TEE-TAW-BLK-XL' },
      { color: 'Sandstone', size: 'M', stock: 15, sku: 'TEE-TAW-SND-M' },
      { color: 'Sandstone', size: 'L', stock: 14, sku: 'TEE-TAW-SND-L' },
      { color: 'Washed Olive', size: 'L', stock: 9, sku: 'TEE-TAW-OLV-L' }
    ],
    sku: 'TEE-TAW-001',
    stock: 96,
    rating: 4.9,
    reviewCount: 38,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-09-01T10:00:00Z'
  },
  {
    id: 'tee-02',
    name: 'Faith Over Fear Tee',
    slug: 'faith-over-fear-tee',
    description: 'Bold back-print streetwear statement piece featuring clean geometric typography in dual English and stylized Arabic calligraphy. Built to withstand daily wear while maintaining structure.',
    details: ['300 GSM ultra-heavyweight cotton', 'High-density matte puff print on reverse', 'Wide collar ribbing (3cm)', 'Reinforced twin needle stitching'],
    fabric: '100% Combed Heavy Cotton (300 GSM)',
    fit: 'Relaxed Boxy Fit',
    category: 'Graphic T-Shirts',
    collection: 'Faith Over Fear Collection',
    price: 690,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Charcoal Grey', hex: '#222225' },
      { name: 'Off-White', hex: '#F5F5F0' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'Charcoal Grey', size: 'M', stock: 14, sku: 'TEE-FOF-CHR-M' },
      { color: 'Charcoal Grey', size: 'L', stock: 22, sku: 'TEE-FOF-CHR-L' },
      { color: 'Charcoal Grey', size: 'XL', stock: 10, sku: 'TEE-FOF-CHR-XL' },
      { color: 'Off-White', size: 'M', stock: 12, sku: 'TEE-FOF-WHT-M' },
      { color: 'Off-White', size: 'L', stock: 18, sku: 'TEE-FOF-WHT-L' }
    ],
    sku: 'TEE-FOF-002',
    stock: 76,
    rating: 4.8,
    reviewCount: 29,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-09-05T12:00:00Z'
  },
  {
    id: 'tee-03',
    name: 'Sabr Oversized Tee',
    slug: 'sabr-oversized-tee',
    description: 'Patience and endurance translated into tactile fashion. Features the Arabic script for "Sabr" (صبر) embroidered in tonal high-density thread across the left chest and a large back concept art piece.',
    details: ['280 GSM cotton jersey', 'Tonal satin-stitch chest embroidery', 'Silk-screen architectural back layout', 'Garment enzyme washed for soft vintage hand feel'],
    fabric: '100% Enzyme-Washed Cotton (280 GSM)',
    fit: 'Oversized Streetwear Fit',
    category: 'Oversized T-Shirts',
    collection: 'Tawhid & Sabr Chapter 1',
    price: 680,
    salePrice: 590,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Desert Sand', hex: '#C2B299' },
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Deep Emerald', hex: '#0B3B2B' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'Desert Sand', size: 'S', stock: 8, sku: 'TEE-SBR-SND-S' },
      { color: 'Desert Sand', size: 'M', stock: 24, sku: 'TEE-SBR-SND-M' },
      { color: 'Desert Sand', size: 'L', stock: 30, sku: 'TEE-SBR-SND-L' },
      { color: 'Desert Sand', size: 'XL', stock: 15, sku: 'TEE-SBR-SND-XL' },
      { color: 'Onyx Black', size: 'L', stock: 20, sku: 'TEE-SBR-BLK-L' },
      { color: 'Deep Emerald', size: 'L', stock: 12, sku: 'TEE-SBR-EMR-L' }
    ],
    sku: 'TEE-SBR-003',
    stock: 109,
    rating: 5.0,
    reviewCount: 44,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-09-08T14:30:00Z'
  },
  {
    id: 'tee-04',
    name: 'Alhamdulillah Everyday Tee',
    slug: 'alhamdulillah-everyday-tee',
    description: 'A daily gratitude reminder designed with clean Swiss typography on the front and minimalist Arabic script at the lower hem. Perfect foundational layer for modern streetwear styling.',
    details: ['260 GSM breathable mid-heavyweight cotton', 'Discreet woven label at hem', 'Double needle hem and cuffs', 'Pre-shrunk cotton'],
    fabric: '100% Ringspun Cotton (260 GSM)',
    fit: 'Standard Relaxed Fit',
    category: 'Minimalist T-Shirts',
    collection: 'Daily Essentials',
    price: 580,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Slate Grey', hex: '#3B3D44' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Pure White', size: 'M', stock: 15, sku: 'TEE-ALH-WHT-M' },
      { color: 'Pure White', size: 'L', stock: 25, sku: 'TEE-ALH-WHT-L' },
      { color: 'Slate Grey', size: 'L', stock: 18, sku: 'TEE-ALH-SLT-L' }
    ],
    sku: 'TEE-ALH-004',
    stock: 58,
    rating: 4.7,
    reviewCount: 19,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    createdAt: '2026-09-12T09:00:00Z'
  },
  {
    id: 'tee-05',
    name: 'Bismillah Essential Tee',
    slug: 'bismillah-essential-tee',
    description: 'Starting every journey with intention. Features subtle reflective tonal lettering of "Bismillah" across the collarline. Cut in an oversized streetwear silhouette with raw-edge cuff accents.',
    details: ['280 GSM cotton', '3M reflective subtle graphic', 'Wide cut sleeves and drop shoulder', 'Signature MusLims Shirts back patch'],
    fabric: '100% Combed Cotton (280 GSM)',
    fit: 'Oversized Streetwear Fit',
    category: 'Oversized T-Shirts',
    collection: 'Daily Essentials',
    price: 640,
    salePrice: 540,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Beige Chalk', hex: '#E6DFC5' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'Onyx Black', size: 'M', stock: 16, sku: 'TEE-BIS-BLK-M' },
      { color: 'Onyx Black', size: 'L', stock: 20, sku: 'TEE-BIS-BLK-L' },
      { color: 'Beige Chalk', size: 'L', stock: 14, sku: 'TEE-BIS-BEG-L' }
    ],
    sku: 'TEE-BIS-005',
    stock: 50,
    rating: 4.9,
    reviewCount: 22,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-09-15T11:00:00Z'
  },
  {
    id: 'tee-06',
    name: 'Ummah Unity Tee',
    slug: 'ummah-unity-tee',
    description: 'Celebrating brotherhood, solidarity, and universal connection. A back-print graphic that blends global coordinate typography with classic Islamic arabesque motifs.',
    details: ['290 GSM cotton', 'Multi-layer discharge screen print', 'Custom brand locker loop at neck', 'Seamless sides'],
    fabric: '100% Heavy Jersey Cotton (290 GSM)',
    fit: 'Boxy Oversized Fit',
    category: 'Graphic T-Shirts',
    collection: 'Ummah Street Series',
    price: 690,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Vintage Black', hex: '#1E1E1E' },
      { name: 'Forest Green', hex: '#1C352D' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Vintage Black', size: 'M', stock: 12, sku: 'TEE-UMH-BLK-M' },
      { color: 'Vintage Black', size: 'L', stock: 18, sku: 'TEE-UMH-BLK-L' },
      { color: 'Forest Green', size: 'L', stock: 10, sku: 'TEE-UMH-GRN-L' }
    ],
    sku: 'TEE-UMH-006',
    stock: 40,
    rating: 4.8,
    reviewCount: 16,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    createdAt: '2026-09-18T16:00:00Z'
  },
  {
    id: 'tee-07',
    name: 'Islamic Geometry Tee',
    slug: 'islamic-geometry-tee',
    description: 'Complex 8-point star and girih tiling redesigned through contemporary deconstructivism. Tonal silk-screen graphic in charcoal on pitch black cotton.',
    details: ['280 GSM cotton', 'High precision technical screen print', 'Custom silicone interior wash tag', 'Reinforced collar band'],
    fabric: '100% Luxury Combed Cotton (280 GSM)',
    fit: 'Streetwear Boxy Fit',
    category: 'Graphic T-Shirts',
    collection: 'Heritage Redefined',
    price: 660,
    salePrice: 560,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#0A0A0A' },
      { name: 'Ash Grey', hex: '#4A4A4F' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'Pitch Black', size: 'M', stock: 14, sku: 'TEE-GEO-BLK-M' },
      { color: 'Pitch Black', size: 'L', stock: 22, sku: 'TEE-GEO-BLK-L' }
    ],
    sku: 'TEE-GEO-007',
    stock: 36,
    rating: 4.9,
    reviewCount: 31,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-09-20T10:20:00Z'
  },
  {
    id: 'tee-08',
    name: 'Crescent Moon Tee',
    slug: 'crescent-moon-tee',
    description: 'A minimalist astronomical emblem combining a fine-line crescent with lunar calendar markers. Screenprinted on the left chest with an oversized lunar map across the shoulders.',
    details: ['270 GSM jersey', 'Soft feel water-based ink', 'Drop shoulder with wide arm openings', 'Anti-curl ribbed collar'],
    fabric: '100% Ringspun Cotton (270 GSM)',
    fit: 'Oversized Fit',
    category: 'Minimalist T-Shirts',
    collection: 'Heritage Redefined',
    price: 620,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Midnight Navy', hex: '#0F172A' },
      { name: 'Warm Off-White', hex: '#F3EFE0' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Midnight Navy', size: 'M', stock: 15, sku: 'TEE-CRS-NVY-M' },
      { color: 'Midnight Navy', size: 'L', stock: 20, sku: 'TEE-CRS-NVY-L' }
    ],
    sku: 'TEE-CRS-008',
    stock: 35,
    rating: 4.6,
    reviewCount: 14,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    createdAt: '2026-09-22T08:00:00Z'
  },
  {
    id: 'tee-09',
    name: 'Minimal Arabic Typography Tee',
    slug: 'minimal-arabic-typography-tee',
    description: 'Clean Kufic script reimagined as modern architectural layout. Centered front placement with sharp negative space and heavy cotton texture.',
    details: ['300 GSM heavyweight jersey', 'Ultra-dense 1x1 rib collar', 'Screen printed in Cairo', 'Heavy structured drape'],
    fabric: '100% Combed Cotton (300 GSM)',
    fit: 'Heavy Oversized Fit',
    category: 'Minimalist T-Shirts',
    collection: 'Cairo Street Series',
    price: 680,
    salePrice: 580,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Charcoal', hex: '#262626' },
      { name: 'Earth Clay', hex: '#8B5A3C' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'Charcoal', size: 'M', stock: 10, sku: 'TEE-ARB-CHR-M' },
      { color: 'Charcoal', size: 'L', stock: 18, sku: 'TEE-ARB-CHR-L' }
    ],
    sku: 'TEE-ARB-009',
    stock: 28,
    rating: 4.9,
    reviewCount: 25,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    createdAt: '2026-09-25T13:00:00Z'
  },
  {
    id: 'tee-10',
    name: 'Modest Streetwear Tee',
    slug: 'modest-streetwear-tee',
    description: 'Engineered specifically for modest streetwear styling: longer curved back hem for optimal coverage, thick non-see-through fabric, and roomier sleeves.',
    details: ['310 GSM high-density fabric', 'Extended scooped rear hem for extra coverage', 'Reinforced neck tape', 'Deep armholes'],
    fabric: '100% Egyptian Cotton Heavyweight (310 GSM)',
    fit: 'Extended Modest Boxy Fit',
    category: 'Oversized T-Shirts',
    collection: 'Modest Movement',
    price: 720,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'True Black', hex: '#0B0B0C' },
      { name: 'Heather Moss', hex: '#5E6B58' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'True Black', size: 'M', stock: 20, sku: 'TEE-MOD-BLK-M' },
      { color: 'True Black', size: 'L', stock: 35, sku: 'TEE-MOD-BLK-L' },
      { color: 'True Black', size: 'XL', stock: 15, sku: 'TEE-MOD-BLK-XL' }
    ],
    sku: 'TEE-MOD-010',
    stock: 70,
    rating: 5.0,
    reviewCount: 42,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-09-28T15:00:00Z'
  },
  {
    id: 'tee-11',
    name: 'Black Essential Oversized Tee',
    slug: 'black-essential-oversized-tee',
    description: 'The foundation of the MUSLIMS SHIRTS wardrobe. Utterly clean, unbranded front with an embossed rubberized tonal monogram patch at the lower side hem.',
    details: ['280 GSM cotton', 'Embossed rubber tonal logo tag', 'Pre-washed for zero shrinkage', 'Heavy gauge collar'],
    fabric: '100% Combed Cotton (280 GSM)',
    fit: 'Oversized Fit',
    category: 'Oversized T-Shirts',
    collection: 'Daily Essentials',
    price: 590,
    salePrice: 490,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111111' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'Onyx Black', size: 'M', stock: 30, sku: 'TEE-ESS-BLK-M' },
      { color: 'Onyx Black', size: 'L', stock: 45, sku: 'TEE-ESS-BLK-L' },
      { color: 'Onyx Black', size: 'XL', stock: 25, sku: 'TEE-ESS-BLK-XL' }
    ],
    sku: 'TEE-ESS-011',
    stock: 100,
    rating: 4.8,
    reviewCount: 56,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-09-30T10:00:00Z'
  },
  {
    id: 'tee-12',
    name: 'Sandstone Graphic Tee',
    slug: 'sandstone-graphic-tee',
    description: 'Desert-dune photography screenprinted with subtle chromatic overlay and Quranic verse citation on reflection and creation.',
    details: ['270 GSM jersey', 'Photographic halftone silk screen', 'Enzyme washed sandstone dye', 'Dropped shoulders'],
    fabric: '100% Heavy Combed Cotton (270 GSM)',
    fit: 'Relaxed Fit',
    category: 'Graphic T-Shirts',
    collection: 'Heritage Redefined',
    price: 670,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Sandstone Dune', hex: '#D7C4A5' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Sandstone Dune', size: 'M', stock: 12, sku: 'TEE-SND-M' },
      { color: 'Sandstone Dune', size: 'L', stock: 18, sku: 'TEE-SND-L' }
    ],
    sku: 'TEE-SND-012',
    stock: 30,
    rating: 4.7,
    reviewCount: 15,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    createdAt: '2026-10-02T11:00:00Z'
  },
  {
    id: 'tee-13',
    name: 'Olive Minimal Tee',
    slug: 'olive-minimal-tee',
    description: 'Garment-dyed military olive tee finished with clean embroidered Arabic numbers signifying coordinates of historical centers of learning.',
    details: ['280 GSM cotton', 'Subtle chest embroidery', 'Ribbed collar that does not bacon', 'Relaxed silhouette'],
    fabric: '100% Cotton (280 GSM)',
    fit: 'Relaxed Boxy Fit',
    category: 'Minimalist T-Shirts',
    collection: 'Heritage Redefined',
    price: 630,
    salePrice: 530,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Military Olive', hex: '#4B5320' }
    ],
    sizes: ['M', 'L', 'XL'],
    variants: [
      { color: 'Military Olive', size: 'M', stock: 14, sku: 'TEE-OLV-M' },
      { color: 'Military Olive', size: 'L', stock: 16, sku: 'TEE-OLV-L' }
    ],
    sku: 'TEE-OLV-013',
    stock: 30,
    rating: 4.8,
    reviewCount: 18,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-10-05T14:00:00Z'
  },
  {
    id: 'tee-14',
    name: 'Midnight Collection Tee',
    slug: 'midnight-collection-tee',
    description: 'Deep black garment with iridescent emerald-tinted foil print detailing "Ihsan" (excellence in deed) in abstract Kufic geometric lines.',
    details: ['300 GSM cotton', 'Iridescent metallic foil application', 'Double stitched hems', 'Premium branded hangtag'],
    fabric: '100% Combed Heavy Cotton (300 GSM)',
    fit: 'Oversized Streetwear Fit',
    category: 'Graphic T-Shirts',
    collection: 'Midnight Series',
    price: 750,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Midnight Pitch', hex: '#0B0D11' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'Midnight Pitch', size: 'M', stock: 15, sku: 'TEE-MDN-M' },
      { color: 'Midnight Pitch', size: 'L', stock: 22, sku: 'TEE-MDN-L' }
    ],
    sku: 'TEE-MDN-014',
    stock: 37,
    rating: 5.0,
    reviewCount: 27,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    createdAt: '2026-10-10T12:00:00Z'
  },
  {
    id: 'tee-15',
    name: 'Friday Essentials Tee',
    slug: 'friday-essentials-tee',
    description: 'Crisp white luxury tee with clean typography "Jumuah: Renewal & Clarity" on the upper back. High thread-count cotton with an ultra-soft silk-wash finish.',
    details: ['260 GSM silk-washed jersey', 'Tonal white-on-white embroidery', 'Minimalist typography', 'Reinforced neck seam'],
    fabric: '100% Silk-Touch Combed Cotton (260 GSM)',
    fit: 'Regular Relaxed Fit',
    category: 'Minimalist T-Shirts',
    collection: 'Daily Essentials',
    price: 610,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Crisp White', size: 'M', stock: 18, sku: 'TEE-FRI-M' },
      { color: 'Crisp White', size: 'L', stock: 20, sku: 'TEE-FRI-L' }
    ],
    sku: 'TEE-FRI-015',
    stock: 38,
    rating: 4.8,
    reviewCount: 20,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-10-12T10:00:00Z'
  },
  {
    id: 'tee-16',
    name: 'Abstract Architecture Tee',
    slug: 'abstract-architecture-tee',
    description: 'Inspired by the arches and light filtration of Andalusian and Ottoman mosques. Subtle blueprint linework printed across the chest and back panel.',
    details: ['280 GSM cotton', 'Precision architectural graphic', 'Preshrunk fabric', 'Comfort rib collar'],
    fabric: '100% Organic Cotton (280 GSM)',
    fit: 'Boxy Fit',
    category: 'Graphic T-Shirts',
    collection: 'Heritage Redefined',
    price: 660,
    salePrice: 560,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Warm Charcoal', hex: '#2C2B2A' },
      { name: 'Stone Grey', hex: '#A8A49C' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Warm Charcoal', size: 'M', stock: 12, sku: 'TEE-ARC-CHR-M' },
      { color: 'Warm Charcoal', size: 'L', stock: 16, sku: 'TEE-ARC-CHR-L' }
    ],
    sku: 'TEE-ARC-016',
    stock: 28,
    rating: 4.7,
    reviewCount: 17,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    createdAt: '2026-10-15T11:00:00Z'
  },

  // ================= 12 HOODIES =================
  {
    id: 'hoodie-01',
    name: 'Tawhid Heavyweight Hoodie',
    slug: 'tawhid-heavyweight-hoodie',
    description: 'Our flagship 460 GSM heavyweight fleece hoodie. Double-lined generous crossover hood without drawstrings for an uncompromising minimalist silhouette. Features dense embroidered Tawhid Arabic script on chest.',
    details: ['460 GSM ultra-heavyweight brushed fleece', 'Double-layered hood with clean crossover neckline', 'Hidden kangaroo pocket side openings', 'Thick 2x2 ribbed cuffs and waist'],
    fabric: '100% French Terry Cotton Fleece (460 GSM)',
    fit: 'Drop-Shoulder Boxy Streetwear Cut',
    category: 'Hoodies',
    collection: 'Tawhid & Sabr Chapter 1',
    price: 1450,
    salePrice: 1250,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Warm Sand', hex: '#D1C4AD' },
      { name: 'Forest Emerald', hex: '#11352A' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'Onyx Black', size: 'S', stock: 8, sku: 'HD-TAW-BLK-S' },
      { color: 'Onyx Black', size: 'M', stock: 18, sku: 'HD-TAW-BLK-M' },
      { color: 'Onyx Black', size: 'L', stock: 25, sku: 'HD-TAW-BLK-L' },
      { color: 'Onyx Black', size: 'XL', stock: 12, sku: 'HD-TAW-BLK-XL' },
      { color: 'Warm Sand', size: 'M', stock: 14, sku: 'HD-TAW-SND-M' },
      { color: 'Warm Sand', size: 'L', stock: 20, sku: 'HD-TAW-SND-L' },
      { color: 'Forest Emerald', size: 'L', stock: 15, sku: 'HD-TAW-EMR-L' }
    ],
    sku: 'HD-TAW-001',
    stock: 112,
    rating: 5.0,
    reviewCount: 64,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-08-20T10:00:00Z'
  },
  {
    id: 'hoodie-02',
    name: 'Sabr Premium Hoodie',
    slug: 'sabr-premium-hoodie',
    description: 'An ode to steadfast patience. Crafted from 440 GSM organic loopback terry with tonal puff-ink "Sabr" across the spine and subtle typography on the front pocket.',
    details: ['440 GSM loopback organic cotton', 'High density puff-ink typography', 'Double needle flatlock seams', 'Pre-shrunk treatment'],
    fabric: '100% Organic Loopback Cotton (440 GSM)',
    fit: 'Oversized Streetwear Fit',
    category: 'Hoodies',
    collection: 'Tawhid & Sabr Chapter 1',
    price: 1390,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Charcoal Wash', hex: '#26262A' },
      { name: 'Desert Khaki', hex: '#C7BBA5' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'Charcoal Wash', size: 'M', stock: 16, sku: 'HD-SBR-CHR-M' },
      { color: 'Charcoal Wash', size: 'L', stock: 24, sku: 'HD-SBR-CHR-L' },
      { color: 'Desert Khaki', size: 'L', stock: 15, sku: 'HD-SBR-KHK-L' }
    ],
    sku: 'HD-SBR-002',
    stock: 55,
    rating: 4.9,
    reviewCount: 48,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-08-25T11:00:00Z'
  },
  {
    id: 'hoodie-03',
    name: 'Faith Over Fear Hoodie',
    slug: 'faith-over-fear-hoodie',
    description: 'Empowering streetwear design constructed with 450 GSM winter-ready fleece. Large structural back artwork with inspirational typography.',
    details: ['450 GSM heavyweight cotton', 'Matte silkscreen back print', 'Double lined oversized hood', 'Deep kangaroo pocket'],
    fabric: '100% Cotton Fleece (450 GSM)',
    fit: 'Relaxed Streetwear Fit',
    category: 'Hoodies',
    collection: 'Faith Over Fear Collection',
    price: 1420,
    salePrice: 1220,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#0D0D0E' },
      { name: 'Cream Chalk', hex: '#F0ECE1' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'Pitch Black', size: 'M', stock: 12, sku: 'HD-FOF-BLK-M' },
      { color: 'Pitch Black', size: 'L', stock: 20, sku: 'HD-FOF-BLK-L' },
      { color: 'Cream Chalk', size: 'L', stock: 15, sku: 'HD-FOF-CRM-L' }
    ],
    sku: 'HD-FOF-003',
    stock: 47,
    rating: 4.8,
    reviewCount: 37,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-09-02T13:00:00Z'
  },
  {
    id: 'hoodie-04',
    name: 'Ummah Oversized Hoodie',
    slug: 'ummah-oversized-hoodie',
    description: 'Heavyweight boxy fleece pullover celebrating community and modest brotherhood. Features tonal geometric shoulder paneling.',
    details: ['460 GSM brushed fleece', 'Clean stringless hood', 'Subtle embroidered wrist logo', 'Thick ribbed bottom hem'],
    fabric: '100% Cotton (460 GSM)',
    fit: 'Heavy Oversized Fit',
    category: 'Hoodies',
    collection: 'Ummah Street Series',
    price: 1490,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Earth Clay', hex: '#7A543E' },
      { name: 'Onyx Black', hex: '#111111' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Earth Clay', size: 'M', stock: 10, sku: 'HD-UMH-CLY-M' },
      { color: 'Earth Clay', size: 'L', stock: 16, sku: 'HD-UMH-CLY-L' }
    ],
    sku: 'HD-UMH-004',
    stock: 26,
    rating: 4.9,
    reviewCount: 23,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    createdAt: '2026-09-10T10:00:00Z'
  },
  {
    id: 'hoodie-05',
    name: 'Crescent Essential Hoodie',
    slug: 'crescent-essential-hoodie',
    description: 'A discreet modern classic. Featuring high-precision micro embroidery of the crescent silhouette in silver metallic thread on the chest.',
    details: ['420 GSM French Terry', 'Silver metallic embroidery', 'Tailored dropped shoulders', 'Sturdy wrist ribbing'],
    fabric: '100% Combed French Terry Cotton (420 GSM)',
    fit: 'Relaxed Fit',
    category: 'Hoodies',
    collection: 'Heritage Redefined',
    price: 1350,
    salePrice: 1190,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Deep Midnight', hex: '#0B132B' },
      { name: 'Cool Grey', hex: '#5C677D' }
    ],
    sizes: ['M', 'L', 'XL'],
    variants: [
      { color: 'Deep Midnight', size: 'M', stock: 14, sku: 'HD-CRS-MDN-M' },
      { color: 'Deep Midnight', size: 'L', stock: 18, sku: 'HD-CRS-MDN-L' }
    ],
    sku: 'HD-CRS-005',
    stock: 32,
    rating: 4.7,
    reviewCount: 20,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-09-14T15:00:00Z'
  },
  {
    id: 'hoodie-06',
    name: 'Bismillah Minimal Hoodie',
    slug: 'bismillah-minimal-hoodie',
    description: 'Minimalist luxury fleece hoodie with understated tonal embroidery of "Bismillah" in sleek contemporary calligraphy along the hood brim.',
    details: ['440 GSM fleece', 'Hood brim embroidered detailing', 'Preshrunk cotton', 'Heavyweight thermal retention'],
    fabric: '100% Ringspun Cotton Fleece (440 GSM)',
    fit: 'Boxy Oversized Cut',
    category: 'Hoodies',
    collection: 'Daily Essentials',
    price: 1380,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Alabaster Bone', hex: '#EAE5D9' },
      { name: 'Charcoal Black', hex: '#1C1C1E' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'Alabaster Bone', size: 'M', stock: 15, sku: 'HD-BIS-BNE-M' },
      { color: 'Alabaster Bone', size: 'L', stock: 22, sku: 'HD-BIS-BNE-L' }
    ],
    sku: 'HD-BIS-006',
    stock: 37,
    rating: 4.9,
    reviewCount: 31,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-09-19T09:00:00Z'
  },
  {
    id: 'hoodie-07',
    name: 'Midnight Black Hoodie',
    slug: 'midnight-black-hoodie',
    description: 'Black-on-black streetwear mastery. Heavy 480 GSM fabric with custom matte black eyelets, tone-on-tone raised rubber print, and soft fleece interior.',
    details: ['480 GSM maximum density fleece', 'Tonal matte rubberized print', 'Double layered heavy hood', 'Deep hand-warmer pocket'],
    fabric: '100% Super-Heavy Cotton (480 GSM)',
    fit: 'Streetwear Boxy Fit',
    category: 'Hoodies',
    collection: 'Midnight Series',
    price: 1550,
    salePrice: 1350,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Total Black', hex: '#050505' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'Total Black', size: 'M', stock: 18, sku: 'HD-MDB-M' },
      { color: 'Total Black', size: 'L', stock: 26, sku: 'HD-MDB-L' },
      { color: 'Total Black', size: 'XL', stock: 14, sku: 'HD-MDB-XL' }
    ],
    sku: 'HD-MDB-007',
    stock: 58,
    rating: 5.0,
    reviewCount: 52,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'hoodie-08',
    name: 'Desert Sand Hoodie',
    slug: 'desert-sand-hoodie',
    description: 'Warm earth tones inspired by Cairo and Medina architecture. Finished with garment dye for natural patina and soft broken-in luxury comfort.',
    details: ['430 GSM cotton terry', 'Garment washed desert tone', 'Crossover neck design', 'Twin-needle seams'],
    fabric: '100% Combed Cotton (430 GSM)',
    fit: 'Oversized Fit',
    category: 'Hoodies',
    collection: 'Heritage Redefined',
    price: 1390,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Desert Sand', hex: '#CEBFAB' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Desert Sand', size: 'M', stock: 12, sku: 'HD-DSN-M' },
      { color: 'Desert Sand', size: 'L', stock: 19, sku: 'HD-DSN-L' }
    ],
    sku: 'HD-DSN-008',
    stock: 31,
    rating: 4.8,
    reviewCount: 26,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    createdAt: '2026-09-29T14:00:00Z'
  },
  {
    id: 'hoodie-09',
    name: 'Olive Streetwear Hoodie',
    slug: 'olive-streetwear-hoodie',
    description: 'Rich military olive hoodie with embroidered geometric sleeve badge and clean typography across upper back reading "Patience is a Light".',
    details: ['450 GSM fleece', 'Embroidered geometric patch', 'High density ribbed waistband', 'Heavy hood volume'],
    fabric: '100% Organic Cotton Fleece (450 GSM)',
    fit: 'Boxy Dropped-Shoulder Fit',
    category: 'Hoodies',
    collection: 'Modest Movement',
    price: 1420,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Olive Drab', hex: '#3E4738' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'Olive Drab', size: 'M', stock: 10, sku: 'HD-OLV-M' },
      { color: 'Olive Drab', size: 'L', stock: 16, sku: 'HD-OLV-L' }
    ],
    sku: 'HD-OLV-009',
    stock: 26,
    rating: 4.8,
    reviewCount: 19,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    createdAt: '2026-10-04T16:00:00Z'
  },
  {
    id: 'hoodie-10',
    name: 'Islamic Geometry Hoodie',
    slug: 'islamic-geometry-hoodie',
    description: 'Intricate 12-fold geometric rosette deconstructed into crisp modern vector screenprint across both sleeves and center hood.',
    details: ['440 GSM heavyweight cotton', 'Sleeve graphic detailing', 'Double needle coverstitch', 'Soft fleece interior'],
    fabric: '100% Ringspun Cotton (440 GSM)',
    fit: 'Streetwear Relaxed Fit',
    category: 'Hoodies',
    collection: 'Heritage Redefined',
    price: 1460,
    salePrice: 1260,
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#1C1C1F' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Charcoal Black', size: 'M', stock: 14, sku: 'HD-GEO-M' },
      { color: 'Charcoal Black', size: 'L', stock: 20, sku: 'HD-GEO-L' }
    ],
    sku: 'HD-GEO-010',
    stock: 34,
    rating: 4.9,
    reviewCount: 28,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-10-08T11:00:00Z'
  },
  {
    id: 'hoodie-11',
    name: 'Premium Everyday Hoodie',
    slug: 'premium-everyday-hoodie',
    description: 'The effortless everyday zip-free pullover hoodie. Designed for maximum versatility with high thermal retention and clean aesthetic lines.',
    details: ['420 GSM cotton', 'Pre-washed against shrinking', 'Reinforced seams', 'Minimalist side seam tag'],
    fabric: '100% Combed Cotton Fleece (420 GSM)',
    fit: 'Standard Relaxed Cut',
    category: 'Hoodies',
    collection: 'Daily Essentials',
    price: 1320,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Warm Off-White', hex: '#EAE6DC' },
      { name: 'Onyx Black', hex: '#111111' }
    ],
    sizes: ['M', 'L', 'XL'],
    variants: [
      { color: 'Warm Off-White', size: 'M', stock: 12, sku: 'HD-EVE-WHT-M' },
      { color: 'Warm Off-White', size: 'L', stock: 18, sku: 'HD-EVE-WHT-L' }
    ],
    sku: 'HD-EVE-011',
    stock: 30,
    rating: 4.7,
    reviewCount: 16,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-10-14T09:00:00Z'
  },
  {
    id: 'hoodie-12',
    name: 'Winter Essentials Hoodie',
    slug: 'winter-essentials-hoodie',
    description: 'Ultra-warm thermal insulated hoodie lined with soft brushed fleece. Built for cold desert nights and winter streetwear styling.',
    details: ['480 GSM dense knit', 'Thermal brushed lining', 'Heavy 600g total garment weight', 'Wide wrist cuffs'],
    fabric: '100% Heavy Cotton Fleece (480 GSM)',
    fit: 'Oversized Boxy Fit',
    category: 'Hoodies',
    collection: 'Winter Essentials',
    price: 1590,
    salePrice: 1390,
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Smoked Pine', hex: '#2A3C34' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'Smoked Pine', size: 'M', stock: 14, sku: 'HD-WNT-M' },
      { color: 'Smoked Pine', size: 'L', stock: 22, sku: 'HD-WNT-L' }
    ],
    sku: 'HD-WNT-012',
    stock: 36,
    rating: 5.0,
    reviewCount: 33,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    createdAt: '2026-10-18T13:00:00Z'
  },

  // ================= 8 SWEATSHIRTS =================
  {
    id: 'sw-01',
    name: 'Modest Heritage Crewneck',
    slug: 'modest-heritage-crewneck',
    description: 'Classic collegiate sweatshirt updated with Arabic script "MUSLIMS" in tonal felt applique across the chest. Built from 400 GSM luxury French terry.',
    details: ['400 GSM French terry', 'Wool-blend felt applique lettering', 'Ribbed V-insert at collar', 'Side rib expander panels'],
    fabric: '100% French Terry Cotton (400 GSM)',
    fit: 'Relaxed Heritage Cut',
    category: 'Sweatshirts',
    collection: 'Heritage Redefined',
    price: 1150,
    salePrice: 990,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Heather Grey', hex: '#7D7F85' },
      { name: 'Onyx Black', hex: '#111111' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'Heather Grey', size: 'M', stock: 15, sku: 'SW-HRT-GRY-M' },
      { color: 'Heather Grey', size: 'L', stock: 22, sku: 'SW-HRT-GRY-L' }
    ],
    sku: 'SW-HRT-001',
    stock: 37,
    rating: 4.8,
    reviewCount: 25,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-09-03T10:00:00Z'
  },
  {
    id: 'sw-02',
    name: 'Sabr Boxy Sweatshirt',
    slug: 'sabr-boxy-sweatshirt',
    description: 'Boxy crop-waistline cut for modern streetwear layering with dropped shoulders and minimal embroidered Sabr emblem.',
    details: ['380 GSM combed cotton fleece', 'Cropped boxy streetwear drape', 'Dense tonal embroidery', 'Elasticated cuffs'],
    fabric: '100% Cotton (380 GSM)',
    fit: 'Boxy Streetwear Fit',
    category: 'Sweatshirts',
    collection: 'Tawhid & Sabr Chapter 1',
    price: 1190,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Desert Dune', hex: '#D2C3B0' },
      { name: 'Pitch Black', hex: '#0B0B0C' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Desert Dune', size: 'M', stock: 12, sku: 'SW-SBR-M' },
      { color: 'Desert Dune', size: 'L', stock: 18, sku: 'SW-SBR-L' }
    ],
    sku: 'SW-SBR-002',
    stock: 30,
    rating: 4.9,
    reviewCount: 29,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-09-08T12:00:00Z'
  },
  {
    id: 'sw-03',
    name: 'Tawhid Minimal Pullover',
    slug: 'tawhid-minimal-pullover',
    description: 'High collar mockneck sweatshirt with clean front profile and subtle typographic embroidery on left wrist.',
    details: ['420 GSM brushed fleece', 'Mockneck ribbed collar', 'Raglan sleeve construct', 'Soft interior'],
    fabric: '100% Brushed Cotton Fleece (420 GSM)',
    fit: 'Relaxed Fit',
    category: 'Sweatshirts',
    collection: 'Tawhid & Sabr Chapter 1',
    price: 1250,
    salePrice: 1050,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Forest Green', hex: '#1B382B' }
    ],
    sizes: ['M', 'L', 'XL'],
    variants: [
      { color: 'Forest Green', size: 'M', stock: 14, sku: 'SW-TAW-M' },
      { color: 'Forest Green', size: 'L', stock: 19, sku: 'SW-TAW-L' }
    ],
    sku: 'SW-TAW-003',
    stock: 33,
    rating: 4.9,
    reviewCount: 18,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    createdAt: '2026-09-15T15:00:00Z'
  },
  {
    id: 'sw-04',
    name: 'Corduroy Collar Sweatshirt',
    slug: 'corduroy-collar-sweatshirt',
    description: 'Unique hybrid streetwear piece combining heavy 400 GSM fleece body with a rich corduroy polo collar and concealed brass snap buttons.',
    details: ['400 GSM cotton body', 'Fine-wale corduroy collar', 'Concealed metal snap placket', 'Side welt pockets'],
    fabric: 'Cotton Fleece Body with Corduroy Contrast',
    fit: 'Relaxed Casual Fit',
    category: 'Sweatshirts',
    collection: 'Winter Essentials',
    price: 1350,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Caramel & Brown', hex: '#8C6239' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Caramel & Brown', size: 'M', stock: 10, sku: 'SW-CRD-M' },
      { color: 'Caramel & Brown', size: 'L', stock: 14, sku: 'SW-CRD-L' }
    ],
    sku: 'SW-CRD-004',
    stock: 24,
    rating: 4.7,
    reviewCount: 14,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    createdAt: '2026-09-21T09:00:00Z'
  },
  {
    id: 'sw-05',
    name: 'Desert Mirage Graphic Crew',
    slug: 'desert-mirage-graphic-crew',
    description: 'Sand-washed crewneck featuring abstract desert topography and Arabic quote on navigating life with spiritual clarity.',
    details: ['380 GSM loopback cotton', 'Halftone graphic print', 'Ribbed collar and hem', 'Garment washed'],
    fabric: '100% Loopback Cotton (380 GSM)',
    fit: 'Streetwear Relaxed Fit',
    category: 'Sweatshirts',
    collection: 'Heritage Redefined',
    price: 1180,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Desert Mirage', hex: '#CDBCA7' }
    ],
    sizes: ['M', 'L', 'XL'],
    variants: [
      { color: 'Desert Mirage', size: 'M', stock: 11, sku: 'SW-MRG-M' },
      { color: 'Desert Mirage', size: 'L', stock: 15, sku: 'SW-MRG-L' }
    ],
    sku: 'SW-MRG-005',
    stock: 26,
    rating: 4.6,
    reviewCount: 12,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-09-27T14:00:00Z'
  },
  {
    id: 'sw-06',
    name: 'Noor Embroidered Sweatshirt',
    slug: 'noor-embroidered-sweatshirt',
    description: 'Refined crewneck celebrating light and knowledge with luminous silver thread calligraphy "Noor" (Light) along the sleeve line.',
    details: ['400 GSM French terry', 'Silver thread sleeve embroidery', 'Clean ribbed neckline', 'Pre-shrunk cotton'],
    fabric: '100% Combed Cotton (400 GSM)',
    fit: 'Relaxed Streetwear Fit',
    category: 'Sweatshirts',
    collection: 'Daily Essentials',
    price: 1220,
    salePrice: 1050,
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Clean Off-White', hex: '#F4F2EA' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Clean Off-White', size: 'M', stock: 16, sku: 'SW-NOR-M' },
      { color: 'Clean Off-White', size: 'L', stock: 20, sku: 'SW-NOR-L' }
    ],
    sku: 'SW-NOR-006',
    stock: 36,
    rating: 5.0,
    reviewCount: 30,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-10-01T11:00:00Z'
  },
  {
    id: 'sw-07',
    name: 'Barakah Heavyweight Fleece',
    slug: 'barakah-heavyweight-fleece',
    description: 'Thick cozy sweatshirt with a rich olive wash and subtle embossed Arabic text on lower hem.',
    details: ['440 GSM dense fleece', 'Embossed hem details', 'Heavy ribbed collar that holds shape', 'Dropped shoulder'],
    fabric: '100% Cotton (440 GSM)',
    fit: 'Heavy Boxy Cut',
    category: 'Sweatshirts',
    collection: 'Modest Movement',
    price: 1290,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Olive Green', hex: '#394B37' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'Olive Green', size: 'M', stock: 12, sku: 'SW-BRK-M' },
      { color: 'Olive Green', size: 'L', stock: 17, sku: 'SW-BRK-L' }
    ],
    sku: 'SW-BRK-007',
    stock: 29,
    rating: 4.8,
    reviewCount: 15,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    createdAt: '2026-10-09T13:00:00Z'
  },
  {
    id: 'sw-08',
    name: 'Cairo Minimalist Crewneck',
    slug: 'cairo-minimalist-crewneck',
    description: 'Inspired by the historic stones of Cairo. A washed charcoal grey sweatshirt with coordinates and subtle brand typography.',
    details: ['410 GSM brushed cotton', 'Garment wash for unique patina', 'Thick 2x2 ribbing', 'Drop shoulders'],
    fabric: '100% Combed Cotton (410 GSM)',
    fit: 'Streetwear Boxy Fit',
    category: 'Sweatshirts',
    collection: 'Cairo Street Series',
    price: 1240,
    salePrice: 1040,
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Washed Charcoal', hex: '#2B2B2E' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Washed Charcoal', size: 'M', stock: 14, sku: 'SW-CAI-M' },
      { color: 'Washed Charcoal', size: 'L', stock: 18, sku: 'SW-CAI-L' }
    ],
    sku: 'SW-CAI-008',
    stock: 32,
    rating: 4.9,
    reviewCount: 21,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-10-16T15:00:00Z'
  },

  // ================= 6 LONG-SLEEVE SHIRTS =================
  {
    id: 'ls-01',
    name: 'Wanderer Heavy Longsleeve',
    slug: 'wanderer-heavy-longsleeve',
    description: 'Thick 300 GSM long-sleeve tee with sturdy ribbed cuffs and an inspirational quote "Travel through the earth and observe" along the left forearm.',
    details: ['300 GSM heavyweight cotton', 'Sleeve typography silkscreen', 'Deep ribbed wrist cuffs', 'Dropped shoulder profile'],
    fabric: '100% Heavy Jersey Cotton (300 GSM)',
    fit: 'Oversized Streetwear Fit',
    category: 'Long-Sleeve Shirts',
    collection: 'Heritage Redefined',
    price: 790,
    salePrice: 690,
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Sand Khaki', hex: '#D2C4B0' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'Onyx Black', size: 'M', stock: 16, sku: 'LS-WND-BLK-M' },
      { color: 'Onyx Black', size: 'L', stock: 24, sku: 'LS-WND-BLK-L' }
    ],
    sku: 'LS-WND-001',
    stock: 40,
    rating: 4.9,
    reviewCount: 32,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-09-04T11:00:00Z'
  },
  {
    id: 'ls-02',
    name: 'Calligraphy Sleeve Mockneck',
    slug: 'calligraphy-sleeve-mockneck',
    description: 'Elevated mockneck long-sleeve with intricate Kufic calligraphy running down both sleeves. Ideal layered under tees or worn alone.',
    details: ['280 GSM premium cotton', 'High 4cm mockneck collar', 'Screenprinted sleeves', 'Form-holding cuffs'],
    fabric: '100% Combed Cotton (280 GSM)',
    fit: 'Relaxed Tailored Streetwear',
    category: 'Long-Sleeve Shirts',
    collection: 'Tawhid & Sabr Chapter 1',
    price: 840,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#1C1C1F' }
    ],
    sizes: ['M', 'L', 'XL'],
    variants: [
      { color: 'Charcoal Black', size: 'M', stock: 14, sku: 'LS-CLG-M' },
      { color: 'Charcoal Black', size: 'L', stock: 20, sku: 'LS-CLG-L' }
    ],
    sku: 'LS-CLG-002',
    stock: 34,
    rating: 4.8,
    reviewCount: 22,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    createdAt: '2026-09-11T14:00:00Z'
  },
  {
    id: 'ls-03',
    name: 'Faith Over Fear Longsleeve',
    slug: 'faith-over-fear-longsleeve',
    description: 'Long-sleeve adaptation of our iconic design with typography on the chest, right sleeve, and back panel.',
    details: ['290 GSM cotton', 'Puff print details', 'Ribbed crewneck and cuffs', 'Preshrunk fabric'],
    fabric: '100% Heavy Cotton (290 GSM)',
    fit: 'Boxy Relaxed Fit',
    category: 'Long-Sleeve Shirts',
    collection: 'Faith Over Fear Collection',
    price: 820,
    salePrice: 720,
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Off-White Bone', hex: '#ECE8DD' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Off-White Bone', size: 'M', stock: 12, sku: 'LS-FOF-M' },
      { color: 'Off-White Bone', size: 'L', stock: 18, sku: 'LS-FOF-L' }
    ],
    sku: 'LS-FOF-003',
    stock: 30,
    rating: 4.9,
    reviewCount: 27,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-09-17T16:00:00Z'
  },
  {
    id: 'ls-04',
    name: 'Minimal Arabic Mockneck',
    slug: 'minimal-arabic-mockneck',
    description: 'Clean high neck shirt with tonal micro-embroidered emblem centered under the collar. Ultra-sleek minimalist look.',
    details: ['270 GSM mercerized cotton', 'Comfort stretch mockneck', 'Smooth silk-like touch', 'Reinforced seams'],
    fabric: '100% Mercerized Cotton (270 GSM)',
    fit: 'Clean Streetwear Fit',
    category: 'Long-Sleeve Shirts',
    collection: 'Daily Essentials',
    price: 850,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111111' }
    ],
    sizes: ['M', 'L', 'XL'],
    variants: [
      { color: 'Onyx Black', size: 'M', stock: 15, sku: 'LS-MCK-M' },
      { color: 'Onyx Black', size: 'L', stock: 18, sku: 'LS-MCK-L' }
    ],
    sku: 'LS-MCK-004',
    stock: 33,
    rating: 4.7,
    reviewCount: 16,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-09-23T10:00:00Z'
  },
  {
    id: 'ls-05',
    name: 'Medina Relaxed Longsleeve',
    slug: 'medina-relaxed-longsleeve',
    description: 'Garment-dyed sage green long-sleeve with palm branch motif and minimalist architectural lines on the back.',
    details: ['280 GSM cotton', 'Vintage dye wash', 'Wide cuff band', 'Dropped shoulders'],
    fabric: '100% Cotton (280 GSM)',
    fit: 'Oversized Streetwear Fit',
    category: 'Long-Sleeve Shirts',
    collection: 'Heritage Redefined',
    price: 780,
    salePrice: 680,
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Sage Green', hex: '#5E6D59' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Sage Green', size: 'M', stock: 12, sku: 'LS-MDN-M' },
      { color: 'Sage Green', size: 'L', stock: 16, sku: 'LS-MDN-L' }
    ],
    sku: 'LS-MDN-005',
    stock: 28,
    rating: 4.8,
    reviewCount: 19,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    createdAt: '2026-10-03T12:00:00Z'
  },
  {
    id: 'ls-06',
    name: 'Desert Sand Raglan Longsleeve',
    slug: 'desert-sand-raglan-longsleeve',
    description: 'Raglan cut two-tone streetwear long sleeve combining sand beige body with charcoal sleeves and minimal chest script.',
    details: ['290 GSM cotton', 'Raglan shoulder construction', 'Two-tone contrast', 'Sturdy rib cuffs'],
    fabric: '100% Combed Cotton (290 GSM)',
    fit: 'Athletic Relaxed Fit',
    category: 'Long-Sleeve Shirts',
    collection: 'Daily Essentials',
    price: 790,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Sand & Charcoal', hex: '#C6BAA8' }
    ],
    sizes: ['M', 'L', 'XL'],
    variants: [
      { color: 'Sand & Charcoal', size: 'M', stock: 11, sku: 'LS-RGL-M' },
      { color: 'Sand & Charcoal', size: 'L', stock: 14, sku: 'LS-RGL-L' }
    ],
    sku: 'LS-RGL-006',
    stock: 25,
    rating: 4.7,
    reviewCount: 15,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-10-11T15:00:00Z'
  },

  // ================= 6 ACCESSORIES =================
  {
    id: 'acc-01',
    name: 'Ummah Streetwear Tote Bag',
    slug: 'ummah-streetwear-tote-bag',
    description: 'Heavy 16oz raw canvas tote bag with reinforced cross-stitched handles, internal zippered pocket, and screenprinted Arabic geometric design.',
    details: ['16oz ultra-heavy cotton duck canvas', 'Interior zip pocket for phone and keys', 'Key clip d-ring loop', 'Holds 16" laptop easily'],
    fabric: '100% Heavy Organic Cotton Canvas (16oz)',
    fit: 'One Size (45cm x 40cm x 12cm)',
    category: 'Accessories',
    collection: 'Ummah Street Series',
    price: 420,
    salePrice: 350,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Natural Ecru', hex: '#EAE5D9' },
      { name: 'Onyx Black', hex: '#111111' }
    ],
    sizes: ['One Size'],
    variants: [
      { color: 'Natural Ecru', size: 'One Size', stock: 35, sku: 'ACC-TOT-ECR' },
      { color: 'Onyx Black', size: 'One Size', stock: 40, sku: 'ACC-TOT-BLK' }
    ],
    sku: 'ACC-TOT-001',
    stock: 75,
    rating: 4.9,
    reviewCount: 41,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-09-06T10:00:00Z'
  },
  {
    id: 'acc-02',
    name: 'Sabr Embroidered 5-Panel Cap',
    slug: 'sabr-embroidered-5-panel-cap',
    description: 'Unstructured streetwear 5-panel cap made from durable cotton twill with flat brim, brass eyelets, and tonal embroidered "Sabr" calligraphy on the front.',
    details: ['100% cotton twill', 'Custom brass slide closure', 'Nylon webbed strap', 'Moisture-wicking sweatband'],
    fabric: 'Heavy Cotton Twill',
    fit: 'Adjustable One Size',
    category: 'Accessories',
    collection: 'Tawhid & Sabr Chapter 1',
    price: 450,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#0E0E0F' },
      { name: 'Desert Khaki', hex: '#C2B29A' }
    ],
    sizes: ['One Size'],
    variants: [
      { color: 'Pitch Black', size: 'One Size', stock: 30, sku: 'ACC-CAP-BLK' },
      { color: 'Desert Khaki', size: 'One Size', stock: 25, sku: 'ACC-CAP-KHK' }
    ],
    sku: 'ACC-CAP-002',
    stock: 55,
    rating: 4.8,
    reviewCount: 38,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-09-13T12:00:00Z'
  },
  {
    id: 'acc-03',
    name: 'Geometry Jacquard Scarf',
    slug: 'geometry-jacquard-scarf',
    description: 'Substantial reversible knit scarf featuring custom geometric arabesque jacquard patterns in charcoal and sandstone tones. Soft cashmere-feel acrylic blend.',
    details: ['High gauge double-knit jacquard', 'Reversible dual colorway', 'Fringeless modern clean edges', 'Length: 190cm x 35cm'],
    fabric: 'Soft Acrylic/Cotton Jacquard Knit',
    fit: 'One Size (190cm x 35cm)',
    category: 'Accessories',
    collection: 'Winter Essentials',
    price: 520,
    salePrice: 420,
    images: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Charcoal & Sand', hex: '#3A3837' }
    ],
    sizes: ['One Size'],
    variants: [
      { color: 'Charcoal & Sand', size: 'One Size', stock: 28, sku: 'ACC-SCF-CHR' }
    ],
    sku: 'ACC-SCF-003',
    stock: 28,
    rating: 5.0,
    reviewCount: 19,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    createdAt: '2026-09-20T14:00:00Z'
  },
  {
    id: 'acc-04',
    name: 'Crescent Heavy Canvas Duffel',
    slug: 'crescent-heavy-canvas-duffel',
    description: 'Rugged weekender and gym duffel made from water-resistant wax-treated canvas. Features reinforced seatbelt-webbing straps and branded metal hardware.',
    details: ['18oz waxed heavy canvas', 'YKK metal zippers with leather pulls', 'Detachable padded shoulder strap', 'Capacity: 38 Liters'],
    fabric: 'Waxed Cotton Canvas & Full-Grain Leather Details',
    fit: 'One Size (52cm x 28cm x 26cm)',
    category: 'Accessories',
    collection: 'Heritage Redefined',
    price: 1100,
    salePrice: 950,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Midnight Charcoal', hex: '#1E1E22' },
      { name: 'Military Olive', hex: '#3E463A' }
    ],
    sizes: ['One Size'],
    variants: [
      { color: 'Midnight Charcoal', size: 'One Size', stock: 15, sku: 'ACC-DUF-CHR' },
      { color: 'Military Olive', size: 'One Size', stock: 12, sku: 'ACC-DUF-OLV' }
    ],
    sku: 'ACC-DUF-004',
    stock: 27,
    rating: 4.9,
    reviewCount: 23,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-09-26T16:00:00Z'
  },
  {
    id: 'acc-05',
    name: 'Identity Minimalist Beanie',
    slug: 'identity-minimalist-beanie',
    description: 'Thick ribbed fisherman beanie with foldover cuff and a small woven metallic tag depicting the MUSLIMS SHIRTS geometric seal.',
    details: ['100% soft merino-touch acrylic', 'Heavy 7-gauge rib knit', 'Fold-up cuff design', 'Retains shape and warmth'],
    fabric: 'Heavy Rib Knit (100% Merino-Touch Acrylic)',
    fit: 'One Size',
    category: 'Accessories',
    collection: 'Daily Essentials',
    price: 380,
    salePrice: null,
    images: [
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#111111' },
      { name: 'Warm Almond', hex: '#D7C7B2' }
    ],
    sizes: ['One Size'],
    variants: [
      { color: 'Pitch Black', size: 'One Size', stock: 25, sku: 'ACC-BNE-BLK' },
      { color: 'Warm Almond', size: 'One Size', stock: 20, sku: 'ACC-BNE-ALM' }
    ],
    sku: 'ACC-BNE-005',
    stock: 45,
    rating: 4.8,
    reviewCount: 35,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    createdAt: '2026-10-06T10:00:00Z'
  },
  {
    id: 'acc-06',
    name: 'Modest Travel Waist Bag',
    slug: 'modest-travel-waist-bag',
    description: 'Compact crossbody and sling bag made from durable Cordura nylon with multiple secure compartments for travel, passport, and daily essentials.',
    details: ['500D Cordura tear-resistant nylon', 'Waterproof taped zippers', 'Adjustable quick-release buckle strap', 'Reflective micro brand print'],
    fabric: 'Waterproof 500D Ballistic Nylon',
    fit: 'One Size',
    category: 'Accessories',
    collection: 'Modest Movement',
    price: 490,
    salePrice: 420,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Stealth Black', hex: '#111112' }
    ],
    sizes: ['One Size'],
    variants: [
      { color: 'Stealth Black', size: 'One Size', stock: 30, sku: 'ACC-WST-BLK' }
    ],
    sku: 'ACC-WST-006',
    stock: 30,
    rating: 4.9,
    reviewCount: 28,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    createdAt: '2026-10-17T11:00:00Z'
  }
];

export const INITIAL_DISCOUNT_CODES = [
  {
    id: 'code-1',
    code: 'SABR10',
    discountPercent: 10,
    minSpend: 500,
    isActive: true,
    validUntil: '2027-12-31'
  },
  {
    id: 'code-2',
    code: 'BARAKAH20',
    discountPercent: 20,
    minSpend: 1500,
    isActive: true,
    validUntil: '2027-12-31'
  },
  {
    id: 'code-3',
    code: 'NEWDROP15',
    discountPercent: 15,
    minSpend: 1000,
    isActive: true,
    validUntil: '2027-12-31'
  }
];

export const INITIAL_SITE_SETTINGS = {
  id: 'store_settings',
  announcementText: 'NEW DROP: THE TAWHID & SABR CHAPTER 1 — FREE EXPRESS SHIPPING OVER 1200 EGP',
  currency: 'EGP',
  freeShippingThreshold: 1200,
  standardShippingFee: 60,
  contactEmail: 'support@muslimsshirts.com',
  contactPhone: '+20 100 000 0000',
  instagramHandle: '@muslimsshirts',
  whatsappNotificationPhone: '+20 100 000 0000',
  enableWhatsAppAlerts: true
};

export const INITIAL_SAMPLE_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    productId: 'tee-01',
    productName: 'Tawhid Minimal Tee',
    userId: 'user-sample-1',
    userName: 'Kareem M.',
    userEmail: 'kareem@example.com',
    rating: 5,
    title: 'Hands down the best oversized tee I own',
    comment: 'The collar does not stretch out, the 280 GSM weight gives it a boxy structure like high-end luxury streetwear. Minimalist Arabic typography is tasteful and clean.',
    fitFeedback: 'True to Size',
    verifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-09-15T14:32:00Z'
  },
  {
    id: 'rev-02',
    productId: 'hoodie-01',
    productName: 'Tawhid Heavyweight Hoodie',
    userId: 'user-sample-2',
    userName: 'Youssef A.',
    userEmail: 'youssef@example.com',
    rating: 5,
    title: '460 GSM is no joke. Pure luxury.',
    comment: 'The hood has actual weight and doesn’t flop around. Clean crossover neckline without strings looks so sleek. Fast delivery in Cairo as well.',
    fitFeedback: 'True to Size',
    verifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-09-22T18:10:00Z'
  },
  {
    id: 'rev-03',
    productId: 'tee-03',
    productName: 'Sabr Oversized Tee',
    userId: 'user-sample-3',
    userName: 'Hamza S.',
    userEmail: 'hamza@example.com',
    rating: 5,
    title: 'Subtle, modest and very stylish',
    comment: 'Love that the tee has modest length and drop shoulders. The Sabr embroidery on the chest is top notch. Got compliments from friends first day wearing it.',
    fitFeedback: 'True to Size',
    verifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-09-28T11:45:00Z'
  },
  {
    id: 'rev-04',
    productId: 'hoodie-02',
    productName: 'Sabr Premium Hoodie',
    userId: 'user-sample-4',
    userName: 'Tariq N.',
    userEmail: 'tariq@example.com',
    rating: 5,
    title: 'The puff print and charcoal wash are insane',
    comment: 'High quality loopback terry. Kept me warm during winter evenings. 10/10 recommendation.',
    fitFeedback: 'True to Size',
    verifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-10-04T16:20:00Z'
  }
];
