import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  Users,
  ShoppingBag,
  BarChart3,
  Plus,
  Pencil,
  Trash2,
  Grid,
  Search,
  AlertCircle,
  X,
  Upload,
} from 'lucide-react';
import { Dialog } from '@headlessui/react';
import {
  getProducts,
  addProduct as addFirebaseProduct,
  updateProduct as updateFirebaseProduct,
  deleteProduct as deleteFirebaseProduct,

} from '../lib/firebase';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
}

function Admin() {
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuthStore();
  const [products, setProducts] = useState<Product[]>([]);
  const categories = ['shampoing', 'savon', 'huile', 'beurre'];

  const [activeTab, setActiveTab] = useState('products');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'rating' | 'reviews'>>({
    name: '',
    price: 0,
    category: 'shampoing',
    description: '',
    image: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const fetchedProducts = await getProducts();
      if (fetchedProducts) {
        setProducts(fetchedProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || !isAdmin()) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <AlertCircle className="w-16 h-16 text-red-500" />
        <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
        <p className="text-gray-600 text-center max-w-md">
          You must be logged in as an administrator to access this page.
        </p>
        <button
          onClick={() => navigate('/profile')}
          className="btn btn-primary mt-4 bg-green-600 text-white"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   try {
  //     setIsUploading(true);
  //     const imageUrl = await uploadProductImage(file, 'products');
  //     setImagePreview(imageUrl);

  //     if (isEdit && selectedProduct) {
  //       setSelectedProduct({ ...selectedProduct, image: imageUrl });
  //     } else {
  //       setNewProduct({ ...newProduct, image: imageUrl });
  //     }
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //     toast.error('Failed to upload image');
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!newProduct.image) {
    //   toast.error('Please provide a valid image URL');
    //   return;
    // }

    try {
      setIsLoading(true);
      const addedProduct = await addFirebaseProduct(newProduct); // Ajout dans la base Firebase
      if (addedProduct) {
        setProducts((prev) => [addedProduct, ...prev]);
        setIsAddModalOpen(false);
        setNewProduct({
          name: '',
          price: 0,
          category: 'shampoo',
          description: '',
          image: '',
        });
        toast.success('Product added successfully');
      }

    } catch (error) {
      toast.error('Failed to add product');
      console.error('Error adding product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      setIsLoading(true);
      const updatedProduct = await updateFirebaseProduct(
        selectedProduct.id,
        selectedProduct
      ); // Mise à jour dans Firebase
      if (updatedProduct) {
        setProducts((prev) =>
          prev.map((p) => (p.id === selectedProduct.id ? updatedProduct : p))
        );
        setIsEditModalOpen(false);
        setSelectedProduct(null);
        toast.success('Product updated successfully');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    } finally {
      setIsLoading(false);
    }
  };


  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      setIsLoading(true);
      const success = await deleteFirebaseProduct(id);
      if (success) {
        setProducts(prev => prev.filter(p => p.id !== id));
        toast.success('Product deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">Admin Dashboard</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn bg-green-600 text-white flex items-center gap-2 px-4 py-2"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
        <button
          onClick={() => signOut()}
          className="btn bg-red-600 text-white flex items-center gap-2 px-4 py-2"
        >
          <span>Sign Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Orders', value: '156', icon: Package },
          { label: 'Total Customers', value: '2,451', icon: Users },
          { label: 'Total Products', value: products.length.toString(), icon: ShoppingBag },
          { label: 'Total Revenue', value: '$12,454', icon: BarChart3 },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">{label}</p>
                <p className="text-2xl font-semibold">{value}</p>
              </div>
              <Icon className="w-8 h-8 text-brand-500" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b px-4 sm:px-6">
          <div className="flex space-x-4 sm:space-x-8 overflow-x-auto">
            {[
              { id: 'products', label: 'Products', icon: ShoppingBag },
              { id: 'categories', label: 'Categories', icon: Grid },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 whitespace-nowrap ${activeTab === id
                  ? 'border-brand-500 text-brand-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="relative mb-6">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          ) : activeTab === 'products' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Image</th>
                    <th className="text-left py-3">Name</th>
                    <th className="text-left py-3 hidden sm:table-cell">Category</th>
                    <th className="text-left py-3">Price</th>
                    <th className="text-left py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="py-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      </td>
                      <td className="max-w-[200px] truncate">{product.name}</td>
                      <td className="py-3 px-4 hidden sm:table-cell capitalize">{product.category}</td>
                      <td>{product.price} fcfa</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsEditModalOpen(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            disabled={isLoading}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            disabled={isLoading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div
                  key={category}
                  className="bg-gray-50 rounded-lg p-6 flex items-center justify-between hover:shadow-md"
                >
                  <div>
                    <h3 className="font-semibold capitalize">{category}</h3>
                    <p className="text-sm text-gray-600">
                      {products.filter((p) => p.category === category).length} products
                    </p>
                  </div>
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      <Dialog
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
            <div className="flex justify-between  items-center mb-4">
              <Dialog.Title className="text-xl font-semibold">
                Add Product
              </Dialog.Title>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  className="input"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (fcfa)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="input"
                  value={newProduct.price || ''}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="input"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  required
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="input"
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, description: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  className="input"
                  placeholder="https://example.com/image.jpg"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  required
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                  }}
                  className="btn btn-secondary"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-green-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Add Product'}
                </button>
              </div>
            </form>


          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Edit Product Modal */}
      <Dialog
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-semibold">
                Edit Product
              </Dialog.Title>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedProduct && (
              <form onSubmit={handleEditProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={selectedProduct.name}
                    onChange={(e) =>
                      setSelectedProduct({ ...selectedProduct, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (fcfa)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="input"
                    value={selectedProduct.price}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    className="input"
                    value={selectedProduct.category}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        category: e.target.value,
                      })
                    }
                    required
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="input"
                    rows={3}
                    value={selectedProduct.description}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Image
                  </label>
                  <div className="mt-1 flex items-center gap-4">
                    <img
                      src={imagePreview || selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <label className="flex items-center justify-center w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 hover:border-brand-500 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => handleImageUpload(e, true)}
                      />
                      <Upload className="w-6 h-6 text-gray-400" />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setImagePreview(null);
                    }}
                    className="btn btn-secondary"
                    disabled={isLoading || isUploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading || isUploading}
                  >
                    {isLoading || isUploading ? 'Processing...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default Admin;
