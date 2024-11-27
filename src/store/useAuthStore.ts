import { create } from 'zustand';
import { auth } from '../lib/firebase';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: () => boolean;
}

const ADMIN_EMAIL = 'admin@luxe.com';
const ADMIN_PASSWORD = 'admin123';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,

  isAdmin: () => {
    return get().user?.email === ADMIN_EMAIL;
  },

  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      
      // Special handling for admin account
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        set({
          user: {
            id: 'admin-id',
            email: ADMIN_EMAIL,
            role: 'admin'
          },
          isAuthenticated: true
        });
        toast.success('Signed in as administrator');
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      set({
        user: {
          id: userCredential.user.uid,
          email: userCredential.user.email || '',
          role: 'user'
        },
        isAuthenticated: true
      });
      toast.success('Signed in successfully');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      set({
        user: {
          id: userCredential.user.uid,
          email: userCredential.user.email || '',
          role: 'user'
        },
        isAuthenticated: true
      });
      toast.success('Account created successfully');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true });
      await firebaseSignOut(auth);
      set({ user: null, isAuthenticated: false });
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

// Set up auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    useAuthStore.setState({
      user: {
        id: user.uid,
        email: user.email || '',
        role: user.email === ADMIN_EMAIL ? 'admin' : 'user'
      },
      isAuthenticated: true
    });
  } else {
    useAuthStore.setState({
      user: null,
      isAuthenticated: false
    });
  }
});