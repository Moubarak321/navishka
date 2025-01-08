import { 
  initializeApp 
} from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { 
  getAuth 
} from 'firebase/auth';

// Initialisation Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

/* =========================
 * GESTION DES PRODUITS
 * ========================= */
export const getProducts = async () => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
};

export const getProductById = async (id: string) => {
  try {
    const productRef = doc(db, 'products', id);
    const snapshot = await getDoc(productRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
};

export const addProduct = async (product: any) => {
  try {
    const productsRef = collection(db, 'products');
    const docRef = await addDoc(productsRef, {
      ...product,
      rating: 0,
      reviews: 0,
      createdAt: new Date().toISOString(),
    });
    return { id: docRef.id, ...product };
  } catch (error) {
    console.error('Error adding product:', error);
    return null;
  }
};

export const updateProduct = async (id: string, updates: any) => {
  try {
    const productRef = doc(db, 'products', id);
    await updateDoc(productRef, updates);
    return { id, ...updates };
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const productRef = doc(db, 'products', id);
    await deleteDoc(productRef);
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};

/* =========================
 * GESTION DES ARTICLES DE BLOG
 * ========================= */
export const getBlogs = async () => {
  try {
    const blogsRef = collection(db, 'blogs');
    const q = query(blogsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return null;
  }
};

export const addBlog = async (blog: any) => {
  try {
    const blogsRef = collection(db, 'blogs');
    const docRef = await addDoc(blogsRef, {
      ...blog,
      createdAt: new Date().toISOString(),
    });
    return { id: docRef.id, ...blog };
  } catch (error) {
    console.error('Error adding blog:', error);
    return null;
  }
};

export const updateBlog = async (id: string, updates: any) => {
  try {
    const blogRef = doc(db, 'blogs', id);
    await updateDoc(blogRef, updates);
    return { id, ...updates };
  } catch (error) {
    console.error('Error updating blog:', error);
    return null;
  }
};

export const deleteBlog = async (id: string) => {
  try {
    const blogRef = doc(db, 'blogs', id);
    await deleteDoc(blogRef);
    return true;
  } catch (error) {
    console.error('Error deleting blog:', error);
    return false;
  }
};

/* =========================
 * GESTION DES IMAGES
 * ========================= */
export const uploadImage = async (file: File | string, path: string): Promise<string> => {
  try {
    if (typeof file === 'string' && file.startsWith('http')) {
      return file;
    }
    if (file instanceof File) {
      const storageRef = ref(storage, `${path}/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      return await getDownloadURL(snapshot.ref);
    }
    throw new Error('Invalid image input');
  } catch (error) {
    console.error('Error uploading image:', error);
    return `https://source.unsplash.com/random/400x400/?default-image&${Date.now()}`;
  }
};