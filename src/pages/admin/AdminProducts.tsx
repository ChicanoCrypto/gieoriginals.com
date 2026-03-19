import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  LogOut,
  Menu,
  X,
  Search,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Product type
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  description: string;
  sizes: string[];
}

// Initial products data
const initialProducts: Product[] = [
  { id: '1', name: 'Oversized Tee — Bone', price: 45, image: '/product_1.jpg', category: 'Tops', description: 'Premium heavyweight cotton tee with a relaxed, oversized fit.', sizes: ['S', 'M', 'L', 'XL'], inStock: true },
  { id: '2', name: 'Boxy Hoodie — Ash', price: 78, image: '/product_2.jpg', category: 'Tops', description: 'Ultra-soft fleece hoodie with a modern boxy cut.', sizes: ['S', 'M', 'L', 'XL'], inStock: true },
  { id: '3', name: 'Relaxed Trouser — Ink', price: 95, image: '/product_3.jpg', category: 'Bottoms', description: 'Tailored relaxed-fit trousers in premium cotton twill.', sizes: ['S', 'M', 'L', 'XL'], inStock: true },
  { id: '4', name: 'Canvas Jacket — Slate', price: 140, image: '/product_4.jpg', category: 'Outerwear', description: 'Durable canvas jacket with a modern silhouette.', sizes: ['S', 'M', 'L', 'XL'], inStock: true },
  { id: '5', name: 'Ribbed Tank — White', price: 32, image: '/product_5.jpg', category: 'Tops', description: 'Classic ribbed tank top in stretch cotton.', sizes: ['S', 'M', 'L', 'XL'], inStock: true },
  { id: '6', name: 'Wide Short — Charcoal', price: 58, image: '/product_6.jpg', category: 'Bottoms', description: 'Relaxed wide-leg shorts with an elastic waist.', sizes: ['S', 'M', 'L', 'XL'], inStock: true },
];

// Sidebar Component
function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Package, label: 'Products', href: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#1a1a1a] border-r border-[#F6F6F6]/10
        transform transition-transform duration-300 lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="text-2xl font-bold text-[#F6F6F6]">
              GIE
            </Link>
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-[#B8B8B8]"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  location.pathname === item.href
                    ? 'bg-[#B8FF3D] text-[#0B0B0C]'
                    : 'text-[#B8B8B8] hover:bg-[#0B0B0C] hover:text-[#F6F6F6]'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#F6F6F6]/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-[#B8B8B8] hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

// Product Modal Component
function ProductModal({ 
  product, 
  isOpen, 
  onClose, 
  onSave 
}: { 
  product: Product | null; 
  isOpen: boolean; 
  onClose: () => void;
  onSave: (product: Product) => void;
}) {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'Tops',
    description: '',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    image: '',
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        name: '',
        price: 0,
        category: 'Tops',
        description: '',
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true,
        image: '',
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: product?.id || Math.random().toString(36).substr(2, 9),
    } as Product);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative bg-[#1a1a1a] rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#B8B8B8] hover:text-[#F6F6F6]"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold text-[#F6F6F6] mb-6">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#B8B8B8] text-sm mb-2">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0B0B0C] border border-[#F6F6F6]/20 text-[#F6F6F6] focus:outline-none focus:border-[#B8FF3D]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#B8B8B8] text-sm mb-2">Price ($)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl bg-[#0B0B0C] border border-[#F6F6F6]/20 text-[#F6F6F6] focus:outline-none focus:border-[#B8FF3D]"
                required
              />
            </div>
            <div>
              <label className="block text-[#B8B8B8] text-sm mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#0B0B0C] border border-[#F6F6F6]/20 text-[#F6F6F6] focus:outline-none focus:border-[#B8FF3D]"
              >
                <option value="Tops">Tops</option>
                <option value="Bottoms">Bottoms</option>
                <option value="Outerwear">Outerwear</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#B8B8B8] text-sm mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-[#0B0B0C] border border-[#F6F6F6]/20 text-[#F6F6F6] focus:outline-none focus:border-[#B8FF3D] resize-none"
            />
          </div>

          <div>
            <label className="block text-[#B8B8B8] text-sm mb-2">Image URL</label>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8B8B8]" size={18} />
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/product_image.jpg"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0B0B0C] border border-[#F6F6F6]/20 text-[#F6F6F6] placeholder:text-[#B8B8B8] focus:outline-none focus:border-[#B8FF3D]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="inStock"
              checked={formData.inStock}
              onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
              className="w-5 h-5 rounded border-[#F6F6F6]/20 accent-[#B8FF3D]"
            />
            <label htmlFor="inStock" className="text-[#F6F6F6]">In Stock</label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full border border-[#F6F6F6]/30 text-[#F6F6F6] font-semibold hover:bg-[#F6F6F6]/10 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              {product ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminProducts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const itemsPerPage = 10;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSaveProduct = (product: Product) => {
    if (selectedProduct) {
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      setProducts([...products, product]);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onSave={handleSaveProduct}
      />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#0B0B0C]/80 backdrop-blur-md border-b border-[#F6F6F6]/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-[#F6F6F6]"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-bold text-[#F6F6F6]">Products</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#B8B8B8] hidden sm:inline">Welcome, {user?.name}</span>
              <div className="w-10 h-10 rounded-full bg-[#B8FF3D] flex items-center justify-center">
                <span className="text-[#0B0B0C] font-bold">{user?.name?.[0]}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8B8B8]" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#F6F6F6]/10 text-[#F6F6F6] placeholder:text-[#B8B8B8] focus:outline-none focus:border-[#B8FF3D]"
              />
            </div>
            <button
              onClick={() => {
                setSelectedProduct(null);
                setIsModalOpen(true);
              }}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#F6F6F6]/10">
                    <th className="text-left py-4 px-6 text-[#B8B8B8] font-medium">Product</th>
                    <th className="text-left py-4 px-6 text-[#B8B8B8] font-medium">Category</th>
                    <th className="text-left py-4 px-6 text-[#B8B8B8] font-medium">Price</th>
                    <th className="text-left py-4 px-6 text-[#B8B8B8] font-medium">Status</th>
                    <th className="text-right py-4 px-6 text-[#B8B8B8] font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((product) => (
                    <tr key={product.id} className="border-b border-[#F6F6F6]/5 hover:bg-[#0B0B0C]/50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-[#0B0B0C] overflow-hidden">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="text-[#B8B8B8]" size={20} />
                              </div>
                            )}
                          </div>
                          <span className="text-[#F6F6F6] font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full bg-[#0B0B0C] text-[#B8B8B8] text-sm">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-[#F6F6F6]">${product.price}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.inStock 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsModalOpen(true);
                            }}
                            className="w-9 h-9 rounded-lg bg-[#0B0B0C] flex items-center justify-center text-[#B8B8B8] hover:text-[#B8FF3D] transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="w-9 h-9 rounded-lg bg-[#0B0B0C] flex items-center justify-center text-[#B8B8B8] hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-[#F6F6F6]/10">
                <p className="text-[#B8B8B8] text-sm">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-9 h-9 rounded-lg bg-[#0B0B0C] flex items-center justify-center text-[#F6F6F6] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-[#F6F6F6] px-3">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-9 h-9 rounded-lg bg-[#0B0B0C] flex items-center justify-center text-[#F6F6F6] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
