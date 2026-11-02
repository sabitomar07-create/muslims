import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './config';
import { Product, Review, Order, DiscountCode, SiteSettings, NewsletterSubscriber } from '../types';
import {
  SAMPLE_PRODUCTS,
  INITIAL_DISCOUNT_CODES,
  INITIAL_SITE_SETTINGS,
  INITIAL_SAMPLE_REVIEWS
} from '../data/sampleProducts';

const LOCAL_PRODUCTS_KEY = 'ms_local_products';
const LOCAL_REVIEWS_KEY = 'ms_local_reviews';
const LOCAL_ORDERS_KEY = 'ms_local_orders';
const LOCAL_SETTINGS_KEY = 'ms_local_settings';
const LOCAL_CODES_KEY = 'ms_local_discount_codes';
const LOCAL_SUBSCRIBERS_KEY = 'ms_local_subscribers';

// Helper to get local fallback data
function getLocal<T>(key: string, defaultVal: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setLocal<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Local storage error', e);
  }
}

// 1. PRODUCTS
export async function getProducts(): Promise<Product[]> {
  try {
    const colRef = collection(db, 'products');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      const prods: Product[] = [];
      snapshot.forEach(docSnap => {
        prods.push(docSnap.data() as Product);
      });
      setLocal(LOCAL_PRODUCTS_KEY, prods);
      return prods;
    }
  } catch (error) {
    console.warn('Could not fetch products from Firestore, falling back to local seed data', error);
  }

  // Fallback to local stored or initial 48 sample products
  return getLocal<Product[]>(LOCAL_PRODUCTS_KEY, SAMPLE_PRODUCTS);
}

export async function getProductById(productId: string): Promise<Product | null> {
  try {
    const docRef = doc(db, 'products', productId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as Product;
    }
  } catch (error) {
    console.warn('Failed to get product from Firestore', error);
  }
  const all = await getProducts();
  return all.find(p => p.id === productId || p.slug === productId) || null;
}

export async function saveProduct(product: Product): Promise<void> {
  const localList = getLocal<Product[]>(LOCAL_PRODUCTS_KEY, SAMPLE_PRODUCTS);
  const existingIdx = localList.findIndex(p => p.id === product.id);
  if (existingIdx >= 0) {
    localList[existingIdx] = product;
  } else {
    localList.unshift(product);
  }
  setLocal(LOCAL_PRODUCTS_KEY, localList);

  try {
    const docRef = doc(db, 'products', product.id);
    await setDoc(docRef, { ...product, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `products/${product.id}`);
  }
}

export async function deleteProduct(productId: string): Promise<void> {
  const localList = getLocal<Product[]>(LOCAL_PRODUCTS_KEY, SAMPLE_PRODUCTS);
  const filtered = localList.filter(p => p.id !== productId);
  setLocal(LOCAL_PRODUCTS_KEY, filtered);

  try {
    const docRef = doc(db, 'products', productId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `products/${productId}`);
  }
}

// 2. REVIEWS
export async function getReviewsForProduct(productId: string): Promise<Review[]> {
  try {
    const q = query(
      collection(db, 'reviews'),
      where('productId', '==', productId)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const reviews: Review[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data() as Review;
        if (data.status === 'approved') {
          reviews.push({ ...data, id: docSnap.id });
        }
      });
      return reviews;
    }
  } catch (error) {
    console.warn('Failed to load reviews from Firestore, using local cache', error);
  }

  const allReviews = getLocal<Review[]>(LOCAL_REVIEWS_KEY, INITIAL_SAMPLE_REVIEWS);
  return allReviews.filter(r => r.productId === productId && r.status === 'approved');
}

export async function getAllReviews(): Promise<Review[]> {
  try {
    const snapshot = await getDocs(collection(db, 'reviews'));
    if (!snapshot.empty) {
      const reviews: Review[] = [];
      snapshot.forEach(docSnap => {
        reviews.push({ ...(docSnap.data() as Review), id: docSnap.id });
      });
      setLocal(LOCAL_REVIEWS_KEY, reviews);
      return reviews;
    }
  } catch (error) {
    console.warn('Failed to load all reviews from Firestore', error);
  }
  return getLocal<Review[]>(LOCAL_REVIEWS_KEY, INITIAL_SAMPLE_REVIEWS);
}

export async function submitReview(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
  const newReview: Review = {
    ...review,
    id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString()
  };

  const localReviews = getLocal<Review[]>(LOCAL_REVIEWS_KEY, INITIAL_SAMPLE_REVIEWS);
  localReviews.unshift(newReview);
  setLocal(LOCAL_REVIEWS_KEY, localReviews);

  try {
    const docRef = doc(db, 'reviews', newReview.id);
    await setDoc(docRef, newReview);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `reviews/${newReview.id}`);
  }

  return newReview;
}

export async function updateReviewStatus(reviewId: string, status: 'approved' | 'rejected' | 'pending'): Promise<void> {
  const localReviews = getLocal<Review[]>(LOCAL_REVIEWS_KEY, INITIAL_SAMPLE_REVIEWS);
  const found = localReviews.find(r => r.id === reviewId);
  if (found) {
    found.status = status;
    setLocal(LOCAL_REVIEWS_KEY, localReviews);
  }

  try {
    const docRef = doc(db, 'reviews', reviewId);
    await updateDoc(docRef, { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `reviews/${reviewId}`);
  }
}

export async function deleteReview(reviewId: string): Promise<void> {
  const localReviews = getLocal<Review[]>(LOCAL_REVIEWS_KEY, INITIAL_SAMPLE_REVIEWS);
  const filtered = localReviews.filter(r => r.id !== reviewId);
  setLocal(LOCAL_REVIEWS_KEY, filtered);

  try {
    const docRef = doc(db, 'reviews', reviewId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `reviews/${reviewId}`);
  }
}

// 3. ORDERS
export async function createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
  const newOrder: Order = {
    ...orderData,
    id: `ord-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString()
  };

  const localOrders = getLocal<Order[]>(LOCAL_ORDERS_KEY, []);
  localOrders.unshift(newOrder);
  setLocal(LOCAL_ORDERS_KEY, localOrders);

  try {
    const docRef = doc(db, 'orders', newOrder.id);
    await setDoc(docRef, newOrder);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `orders/${newOrder.id}`);
  }

  return newOrder;
}

export async function getOrdersForUser(userId: string): Promise<Order[]> {
  try {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId)
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      const orders: Order[] = [];
      snap.forEach(d => orders.push(d.data() as Order));
      return orders;
    }
  } catch (error) {
    console.warn('Failed to load user orders from Firestore', error);
  }

  const localOrders = getLocal<Order[]>(LOCAL_ORDERS_KEY, []);
  return localOrders.filter(o => o.userId === userId);
}

export async function getAllOrders(): Promise<Order[]> {
  try {
    const snap = await getDocs(collection(db, 'orders'));
    if (!snap.empty) {
      const orders: Order[] = [];
      snap.forEach(d => orders.push(d.data() as Order));
      setLocal(LOCAL_ORDERS_KEY, orders);
      return orders;
    }
  } catch (error) {
    console.warn('Failed to load all orders from Firestore', error);
  }

  return getLocal<Order[]>(LOCAL_ORDERS_KEY, []);
}

export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
  const localOrders = getLocal<Order[]>(LOCAL_ORDERS_KEY, []);
  const found = localOrders.find(o => o.id === orderId);
  if (found) {
    found.status = status;
    setLocal(LOCAL_ORDERS_KEY, localOrders);
  }

  try {
    const docRef = doc(db, 'orders', orderId);
    await updateDoc(docRef, { status, updatedAt: new Date().toISOString() });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `orders/${orderId}`);
  }
}

// 4. DISCOUNT CODES
export async function getDiscountCodes(): Promise<DiscountCode[]> {
  try {
    const snap = await getDocs(collection(db, 'discountCodes'));
    if (!snap.empty) {
      const list: DiscountCode[] = [];
      snap.forEach(d => list.push(d.data() as DiscountCode));
      setLocal(LOCAL_CODES_KEY, list);
      return list;
    }
  } catch (error) {
    console.warn('Failed to load discount codes from Firestore', error);
  }
  return getLocal<DiscountCode[]>(LOCAL_CODES_KEY, INITIAL_DISCOUNT_CODES);
}

export async function saveDiscountCode(code: DiscountCode): Promise<void> {
  const localList = getLocal<DiscountCode[]>(LOCAL_CODES_KEY, INITIAL_DISCOUNT_CODES);
  const idx = localList.findIndex(c => c.id === code.id);
  if (idx >= 0) {
    localList[idx] = code;
  } else {
    localList.push(code);
  }
  setLocal(LOCAL_CODES_KEY, localList);

  try {
    const docRef = doc(db, 'discountCodes', code.id);
    await setDoc(docRef, code, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `discountCodes/${code.id}`);
  }
}

export async function deleteDiscountCode(codeId: string): Promise<void> {
  const localList = getLocal<DiscountCode[]>(LOCAL_CODES_KEY, INITIAL_DISCOUNT_CODES);
  setLocal(LOCAL_CODES_KEY, localList.filter(c => c.id !== codeId));

  try {
    await deleteDoc(doc(db, 'discountCodes', codeId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `discountCodes/${codeId}`);
  }
}

// 5. SITE SETTINGS
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const docRef = doc(db, 'siteSettings', 'store_settings');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const settings = snap.data() as SiteSettings;
      setLocal(LOCAL_SETTINGS_KEY, settings);
      return settings;
    }
  } catch (error) {
    console.warn('Failed to get site settings from Firestore', error);
  }
  return getLocal<SiteSettings>(LOCAL_SETTINGS_KEY, INITIAL_SITE_SETTINGS);
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = getLocal<SiteSettings>(LOCAL_SETTINGS_KEY, INITIAL_SITE_SETTINGS);
  const updated = { ...current, ...settings };
  setLocal(LOCAL_SETTINGS_KEY, updated);

  try {
    const docRef = doc(db, 'siteSettings', 'store_settings');
    await setDoc(docRef, updated, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'siteSettings/store_settings');
  }

  return updated;
}

// 6. NEWSLETTER
export async function subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  const subscribers = getLocal<NewsletterSubscriber[]>(LOCAL_SUBSCRIBERS_KEY, []);
  if (subscribers.some(s => s.email === cleanEmail)) {
    return { success: true, message: 'You are already subscribed to the MUSLIMS SHIRTS newsletter!' };
  }

  const newSub: NewsletterSubscriber = {
    id: `sub-${Date.now()}`,
    email: cleanEmail,
    subscribedAt: new Date().toISOString(),
    active: true
  };

  subscribers.push(newSub);
  setLocal(LOCAL_SUBSCRIBERS_KEY, subscribers);

  try {
    const docRef = doc(db, 'newsletterSubscribers', newSub.id);
    await setDoc(docRef, newSub);
  } catch (error) {
    console.warn('Could not write subscriber to Firestore, saved locally', error);
  }

  return { success: true, message: 'Welcome to the MUSLIMS SHIRTS VIP community. You will receive exclusive drop notices.' };
}

export async function getAllSubscribers(): Promise<NewsletterSubscriber[]> {
  try {
    const snap = await getDocs(collection(db, 'newsletterSubscribers'));
    if (!snap.empty) {
      const list: NewsletterSubscriber[] = [];
      snap.forEach(d => list.push(d.data() as NewsletterSubscriber));
      setLocal(LOCAL_SUBSCRIBERS_KEY, list);
      return list;
    }
  } catch (error) {
    console.warn('Failed to load subscribers from Firestore', error);
  }
  return getLocal<NewsletterSubscriber[]>(LOCAL_SUBSCRIBERS_KEY, []);
}

// 7. SEED DATABASE IF EMPTY
export async function seedDatabaseIfEmpty(): Promise<void> {
  try {
    const prodsSnap = await getDocs(collection(db, 'products'));
    if (prodsSnap.empty) {
      console.log('Seeding initial 48 products to Firestore...');
      for (const p of SAMPLE_PRODUCTS) {
        await setDoc(doc(db, 'products', p.id), p);
      }
      for (const r of INITIAL_SAMPLE_REVIEWS) {
        await setDoc(doc(db, 'reviews', r.id), r);
      }
      for (const c of INITIAL_DISCOUNT_CODES) {
        await setDoc(doc(db, 'discountCodes', c.id), c);
      }
      await setDoc(doc(db, 'siteSettings', 'store_settings'), INITIAL_SITE_SETTINGS);
      console.log('Seeding completed successfully.');
    }
  } catch (error) {
    console.warn('Database seeding skipped or deferred:', error);
  }
}
