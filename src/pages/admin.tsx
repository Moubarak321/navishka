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
  getBlogs,
  addBlog as addFirebaseBlog,
  updateBlog as updateFirebaseBlog,
  deleteBlog as deleteFirebaseBlog,
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

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  image: string;
  createdAt: Date;
}

function Admin() {
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuthStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const categories = ['shampoing','crême', 'savon', 'huile', 'beurre',];

  const [activeTab, setActiveTab] = useState('products');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const authors = ['Navishka Cosmétics', 'Autre Auteur 1', 'Autre Auteur 2'];

  const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'rating' | 'reviews'>>({
    name: '',
    price: 0,
    category: 'shampoing',
    description: '',
    image: '',
  });

  const [newBlog, setNewBlog] = useState<Omit<Blog, 'id' | 'createdAt'>>({
    title: '',
    content: '',
    author: '',
    image: '',
  });

  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isAddBlogModalOpen, setIsAddBlogModalOpen] = useState(false);
  const [isEditBlogModalOpen, setIsEditBlogModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchBlogs();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const fetchedProducts = await getProducts();
      if (fetchedProducts) {
        setProducts(fetchedProducts as Product[]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const fetchedBlogs = await getBlogs();
      if (fetchedBlogs) {
        setBlogs(fetchedBlogs as Blog[]);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || !isAdmin()) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <AlertCircle className="w-16 h-16 text-red-500" />
        <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
        <p className="text-gray-600 text-center max- w-md">
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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setImagePreview(reader.result as string);
        } else {
          setNewProduct({ ...newProduct, image: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const addedProduct = await addFirebaseProduct(newProduct);
      if (addedProduct) {
        setProducts((prev) => [addedProduct, ...prev]);
        setIsAddModalOpen(false);
        setNewProduct({
          name: '',
          price: 0,
          category: 'shampoing',
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
      const updatedProduct = await updateFirebaseProduct(selectedProduct.id, selectedProduct);
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
        setProducts((prev) => prev.filter((p) => p.id !== id));
        toast.success('Product deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const addedBlog = await addFirebaseBlog({
        ...newBlog,
        author: newBlog.author || authors[0], // Définit un auteur par défaut si non sélectionné
      });
      if (addedBlog) {
        setBlogs((prev) => [addedBlog, ...prev]);
        setIsAddBlogModalOpen(false);
        setNewBlog({
          title: '',
          content: '',
          author: '', // Réinitialise le champ auteur
          image: '',
        });
        toast.success('Blog ajouté avec succès');
      }
    } catch (error) {
      toast.error('Échec de l’ajout du blog');
      console.error('Erreur lors de l’ajout du blog :', error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleEditBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBlog) return;

    try {
      setIsLoading(true);
      const updatedBlog = await updateFirebaseBlog(selectedBlog.id, selectedBlog);
      if (updatedBlog) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === selectedBlog.id ? updatedBlog : b))
        );
        setIsEditBlogModalOpen(false);
        setSelectedBlog(null);
        toast.success('Blog updated successfully');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('Failed to update blog');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      setIsLoading(true);
      const success = await deleteFirebaseBlog(id);
      if (success) {
        setBlogs(prev => prev.filter(b => b.id !== id));
        toast.success('Blog deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
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
          onClick={() => setIsAddBlogModalOpen(true)}
          className="btn bg-green-600 text-white flex items-center gap-2 px-4 py-2"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4" />
          <span>Add Blog</span>
        </button>

        <button
          onClick={() => signOut()}
          className="btn bg-red-600 text-white flex items-center gap-2 px-4 py-2"
        >
          <span>Déconnexion</span>
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
              { id: 'blogs', label: 'Blogs', icon: Grid },
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
              placeholder="Search..."
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Image</th>
                    <th className="text-left py-3">Title</th>
                    <th className="text-left py-3">Author</th>
                    <th className="text-left py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBlogs.map((blog) => (
                    <tr key={blog.id} className="border-b">
                      <td className="py-3">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      </td>
                      <td className="max-w-[200px] truncate">{blog.title}</td>
                      <td className="py-3">{blog.author}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedBlog(blog);
                              setIsEditBlogModalOpen(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            disabled={isLoading}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blog.id)}
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
            <div className="flex justify-between items-center mb-4">
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
                <label className=" block text-sm font-medium text-gray-700 mb-1">
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

      {/* Add Blog Modal */}
      <Dialog
        open={isAddBlogModalOpen}
        onClose={() => setIsAddBlogModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-semibold">
                Add Blog
              </Dialog.Title>
              <button
                onClick={() => setIsAddBlogModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddBlog} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Title
                </label>
                <input
                  type="text"
                  className="input"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  className="input"
                  rows={3}
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <select
                  className="input"
                  value={newBlog.author}
                  onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                  required
                >
                  {authors.map((author) => (
                    <option key={author} value={author}>
                      {author}
                    </option>
                  ))}
                </select>
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  className="input"
                  placeholder="https://example.com/image.jpg"
                  value={newBlog.image}
                  onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
                  required
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddBlogModalOpen(false);
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
                  {isLoading ? 'Processing...' : 'Add Blog'}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Edit Blog Modal */}
      <Dialog
        open={isEditBlogModalOpen}
        onClose={() => setIsEditBlogModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-semibold">
                Edit Blog
              </Dialog.Title>
              <button
                onClick={() => setIsEditBlogModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedBlog && (
              <form onSubmit={handleEditBlog} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={selectedBlog.title}
                    onChange={(e) =>
                      setSelectedBlog({ ...selectedBlog, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    className="input"
                    rows={3}
                    value={selectedBlog.content}
                    onChange={(e) =>
                      setSelectedBlog({ ...selectedBlog, content: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <select
                    className="input"
                    value={selectedBlog.author}
                    onChange={(e) =>
                      setSelectedBlog({ ...selectedBlog, author: e.target.value })
                    }
                    required
                  >
                    {authors.map((author) => (
                      <option key={author} value={author}>
                        {author}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    className="input"
                    placeholder="https://example.com/image.jpg"
                    value={selectedBlog.image}
                    onChange={(e) =>
                      setSelectedBlog({ ...selectedBlog, image: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditBlogModalOpen(false);
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
                    {isLoading ? 'Processing...' : 'Save Changes'}
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