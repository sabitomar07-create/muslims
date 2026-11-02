export type ProductCategory = 
  | 'All'
  | 'Oversized T-Shirts'
  | 'Graphic T-Shirts'
  | 'Minimalist T-Shirts'
  | 'Hoodies'
  | 'Sweatshirts'
  | 'Long-Sleeve Shirts'
  | 'Accessories';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductVariant {
  color: string;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'One Size';
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  details?: string[];
  fabric?: string;
  fit?: string;
  category: ProductCategory;
  collection: string;
  price: number;
  salePrice?: number | null;
  images: string[];
  colors: ProductColor[];
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'One Size')[];
  variants: ProductVariant[];
  sku: string;
  stock: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Review {
  id: string;
  productId: string;
  productName?: string;
  userId: string;
  userName: string;
  userEmail: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  fitFeedback?: 'Runs Small' | 'True to Size' | 'Runs Large';
  verifiedPurchase: boolean;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
}

export interface CartItem {
  id: string; // product id + color + size unique key
  productId: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number | null;
  image: string;
  color: string;
  size: string;
  quantity: number;
  stock: number;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  governorate?: string;
  postalCode?: string;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string | null;
  userEmail: string;
  customer: CustomerDetails;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  shipping: number;
  total: number;
  paymentMethod: 'Cash on Delivery (COD)' | 'Online Card Payment';
  paymentStatus: 'unpaid' | 'paid';
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
}

export interface DiscountCode {
  id: string;
  code: string;
  discountPercent: number;
  minSpend?: number;
  isActive: boolean;
  validUntil?: string;
}

export interface SiteSettings {
  id: string;
  announcementText: string;
  currency: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  contactEmail: string;
  contactPhone?: string;
  instagramHandle?: string;
  whatsappNotificationPhone?: string;
  enableWhatsAppAlerts?: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  active: boolean;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string | null;
  photoURL?: string | null;
  isAdmin?: boolean;
}
