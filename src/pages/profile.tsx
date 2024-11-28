import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { Package, Heart, Settings, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';
 
function Profile() {
  const navigate = useNavigate();
  const { user, signIn, signOut, isAdmin } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to admin dashboard if admin
  useEffect(() => {
    if (user && isAdmin()) {
      navigate('/admin');
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn(formData.email, formData.password);
      toast.success('Signed in successfully');
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full btn btn-primary bg-green-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation */}
        <div className="space-y-2">
          {[
            { icon: Package, label: 'Orders' },
            { icon: Heart, label: 'Wishlist' },
            { icon: CreditCard, label: 'Payment Methods' },
            { icon: Settings, label: 'Settings' },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
          <button
            onClick={() => {
              signOut();
              toast.success('Signed out successfully');
            }}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            Sign Out
          </button>
        </div>

        {/* Content */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            <p className="text-gray-600">No orders yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
