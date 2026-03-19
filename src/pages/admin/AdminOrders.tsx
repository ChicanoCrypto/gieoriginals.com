import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  LogOut,
  Menu,
  X,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  Truck,
  CheckCircle,
  Clock,
  PackageCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Order types
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  date: string;
  shipping: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customer: { name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 890' },
    items: [
      { id: '1', name: 'Oversized Tee — Bone (Size M)', price: 45, quantity: 1, image: '/product_1.jpg' },
      { id: '2', name: 'Boxy Hoodie — Ash (Size L)', price: 78, quantity: 1, image: '/product_2.jpg' },
    ],
    total: 123,
    status: 'completed',
    date: '2026-03-19',
    shipping: { address: '123 Main St', city: 'New York', postalCode: '10001', country: 'US' },
  },
  {
    id: 'ORD-002',
    customer: { name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234 567 891' },
    items: [
      { id: '3', name: 'Relaxed Trouser — Ink (Size S)', price: 95, quantity: 1, image: '/product_3.jpg' },
    ],
    total: 95,
    status: 'processing',
    date: '2026-03-19',
    shipping: { address: '456 Oak Ave', city: 'Los Angeles', postalCode: '90001', country: 'US' },
  },
  {
    id: 'ORD-003',
    customer: { name: 'Mike Johnson', email: 'mike@example.com', phone: '+1 234 567 892' },
    items: [
      { id: '4', name: 'Canvas Jacket — Slate (Size XL)', price: 140, quantity: 1, image: '/product_4.jpg' },
      { id: '5', name: 'Ribbed Tank — White (Size M)', price: 32, quantity: 2, image: '/product_5.jpg' },
    ],
    total: 204,
    status: 'shipped',
    date: '2026-03-18',
    shipping: { address: '789 Pine Rd', city: 'Chicago', postalCode: '60601', country: 'US' },
  },
  {
    id: 'ORD-004',
    customer: { name: 'Sarah Williams', email: 'sarah@example.com', phone: '+1 234 567 893' },
    items: [
      { id: '6', name: 'Wide Short — Charcoal (Size M)', price: 58, quantity: 1, image: '/product_6.jpg' },
    ],
    total: 58,
    status: 'pending',
    date: '2026-03-18',
    shipping: { address: '321 Elm St', city: 'Miami', postalCode: '33101', country: 'US' },
  },
  {
    id: 'ORD-005',
    customer: { name: 'Tom Brown', email: 'tom@example.com', phone: '+1 234 567 894' },
    items: [
      { id: '1', name: 'Oversized Tee — Bone (Size L)', price: 45, quantity: 2, image: '/product_1.jpg' },
      { id: '3', name: 'Relaxed Trouser — Ink (Size M)', price: 95, quantity: 1, image: '/product_3.jpg' },
    ],
    total: 185,
    status: 'completed',
    date: '2026-03-17',
    shipping: { address: '654 Maple Dr', city: 'Seattle', postalCode: '98101', country: 'US' },
  },
  {
    id: 'ORD-006',
    customer: { name: 'Emily Davis', email: 'emily@example.com', phone: '+1 234 567 895' },
    items: [
      { id: '2', name: 'Boxy Hoodie — Ash (Size S)', price: 78, quantity: 1, image: '/product_2.jpg' },
    ],
    total: 78,
    status: 'cancelled',
    date: '2026-03-17',
    shipping: { address: '987 Cedar Ln', city: 'Boston', postalCode: '02101', country: 'US' },
  },
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

// Order Detail Modal
function OrderModal({ 
  order, 
  isOpen, 
  onClose, 
  onUpdateStatus 
}: { 
  order: Order | null; 
  isOpen: boolean; 
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}) {
  if (!isOpen || !order) return null;

  const statusOptions: Order['status'][] = ['pending', 'processing', 'shipped', 'completed', 'cancelled'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative bg-[#1a1a1a] rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#B8B8B8] hover:text-[#F6F6F6]"
        >
          <X size={24} />
        </button>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#F6F6F6]">{order.id}</h2>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${
            order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
            order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
            order.status === 'shipped' ? 'bg-purple-500/20 text-purple-400' :
            order.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
            'bg-yellow-500/20 text-yellow-400'
          }`}>
            {order.status}
          </span>
        </div>

        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-[#0B0B0C] rounded-xl p-4">
            <h3 className="text-[#B8B8B8] text-sm mb-3">Customer</h3>
            <p className="text-[#F6F6F6] font-medium">{order.customer.name}</p>
            <p className="text-[#B8B8B8] text-sm">{order.customer.email}</p>
            <p className="text-[#B8B8B8] text-sm">{order.customer.phone}</p>
          </div>

          {/* Shipping Address */}
          <div className="bg-[#0B0B0C] rounded-xl p-4">
            <h3 className="text-[#B8B8B8] text-sm mb-3">Shipping Address</h3>
            <p className="text-[#F6F6F6]">{order.shipping.address}</p>
            <p className="text-[#F6F6F6]">{order.shipping.city}, {order.shipping.postalCode}</p>
            <p className="text-[#F6F6F6]">{order.shipping.country}</p>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-[#B8B8B8] text-sm mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-[#0B0B0C] rounded-xl p-3">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="text-[#F6F6F6] font-medium">{item.name}</p>
                    <p className="text-[#B8B8B8] text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-[#F6F6F6] font-medium">${item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="flex justify-between items-center pt-4 border-t border-[#F6F6F6]/10">
            <span className="text-[#B8B8B8]">Order Total</span>
            <span className="text-2xl font-bold text-[#F6F6F6]">${order.total}</span>
          </div>

          {/* Update Status */}
          <div className="pt-4 border-t border-[#F6F6F6]/10">
            <h3 className="text-[#B8B8B8] text-sm mb-3">Update Status</h3>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => onUpdateStatus(order.id, status)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                    order.status === status
                      ? 'bg-[#B8FF3D] text-[#0B0B0C]'
                      : 'bg-[#0B0B0C] text-[#B8B8B8] hover:text-[#F6F6F6]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminOrders() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const itemsPerPage = 10;

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleUpdateStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status });
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} className="text-green-400" />;
      case 'shipped': return <Truck size={16} className="text-purple-400" />;
      case 'processing': return <PackageCheck size={16} className="text-blue-400" />;
      case 'pending': return <Clock size={16} className="text-yellow-400" />;
      case 'cancelled': return <X size={16} className="text-red-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <OrderModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
        onUpdateStatus={handleUpdateStatus}
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
              <h1 className="text-xl font-bold text-[#F6F6F6]">Orders</h1>
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
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {[
              { label: 'Total', value: orders.length, color: 'text-[#F6F6F6]' },
              { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, color: 'text-yellow-400' },
              { label: 'Processing', value: orders.filter(o => o.status === 'processing').length, color: 'text-blue-400' },
              { label: 'Shipped', value: orders.filter(o => o.status === 'shipped').length, color: 'text-purple-400' },
              { label: 'Completed', value: orders.filter(o => o.status === 'completed').length, color: 'text-green-400' },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#1a1a1a] rounded-xl p-4">
                <p className="text-[#B8B8B8] text-sm">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8B8B8]" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#F6F6F6]/10 text-[#F6F6F6] placeholder:text-[#B8B8B8] focus:outline-none focus:border-[#B8FF3D]"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-[#B8B8B8]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as Order['status'] | 'all')}
                className="px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#F6F6F6]/10 text-[#F6F6F6] focus:outline-none focus:border-[#B8FF3D]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#F6F6F6]/10 text-[#F6F6F6] hover:border-[#B8FF3D] transition-all">
              <Download size={18} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>

          {/* Orders Table */}
          <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#F6F6F6]/10">
                    <th className="text-left py-4 px-6 text-[#B8B8B8] font-medium">Order ID</th>
                    <th className="text-left py-4 px-6 text-[#B8B8B8] font-medium">Customer</th>
                    <th className="text-left py-4 px-6 text-[#B8B8B8] font-medium">Date</th>
                    <th className="text-left py-4 px-6 text-[#B8B8B8] font-medium">Items</th>
                    <th className="text-left py-4 px-6 text-[#B8B8B8] font-medium">Total</th>
                    <th className="text-left py-4 px-6 text-[#B8B8B8] font-medium">Status</th>
                    <th className="text-right py-4 px-6 text-[#B8B8B8] font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((order) => (
                    <tr key={order.id} className="border-b border-[#F6F6F6]/5 hover:bg-[#0B0B0C]/50">
                      <td className="py-4 px-6 text-[#F6F6F6] font-medium">{order.id}</td>
                      <td className="py-4 px-6">
                        <p className="text-[#F6F6F6]">{order.customer.name}</p>
                        <p className="text-[#B8B8B8] text-sm">{order.customer.email}</p>
                      </td>
                      <td className="py-4 px-6 text-[#B8B8B8]">{order.date}</td>
                      <td className="py-4 px-6 text-[#F6F6F6]">{order.items.length} items</td>
                      <td className="py-4 px-6 text-[#F6F6F6] font-medium">${order.total}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                          order.status === 'shipped' ? 'bg-purple-500/20 text-purple-400' :
                          order.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsModalOpen(true);
                            }}
                            className="w-9 h-9 rounded-lg bg-[#0B0B0C] flex items-center justify-center text-[#B8B8B8] hover:text-[#B8FF3D] transition-colors"
                          >
                            <Eye size={16} />
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
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
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
