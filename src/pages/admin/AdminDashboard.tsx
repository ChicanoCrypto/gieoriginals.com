import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  DollarSign, 
  LogOut,
  Menu,
  X,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data for charts
const salesData = [
  { name: 'Mon', sales: 2400 },
  { name: 'Tue', sales: 1398 },
  { name: 'Wed', sales: 9800 },
  { name: 'Thu', sales: 3908 },
  { name: 'Fri', sales: 4800 },
  { name: 'Sat', sales: 3800 },
  { name: 'Sun', sales: 4300 },
];

const categoryData = [
  { name: 'Tops', value: 45 },
  { name: 'Bottoms', value: 30 },
  { name: 'Outerwear', value: 25 },
];

const COLORS = ['#B8FF3D', '#F6F6F6', '#B8B8B8'];

// Mock orders data
const recentOrders = [
  { id: '#ORD-001', customer: 'John Doe', total: 145, status: 'completed', date: '2026-03-19' },
  { id: '#ORD-002', customer: 'Jane Smith', total: 78, status: 'processing', date: '2026-03-19' },
  { id: '#ORD-003', customer: 'Mike Johnson', total: 240, status: 'pending', date: '2026-03-18' },
  { id: '#ORD-004', customer: 'Sarah Williams', total: 95, status: 'completed', date: '2026-03-18' },
  { id: '#ORD-005', customer: 'Tom Brown', total: 180, status: 'shipped', date: '2026-03-17' },
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
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
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
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#B8B8B8] hover:bg-[#0B0B0C] hover:text-[#F6F6F6] transition-all"
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

// Stat Card Component
function StatCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon 
}: { 
  title: string; 
  value: string; 
  change: string; 
  changeType: 'up' | 'down'; 
  icon: any;
}) {
  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#B8FF3D]/10 flex items-center justify-center">
          <Icon className="text-[#B8FF3D]" size={24} />
        </div>
        <div className={`flex items-center gap-1 text-sm ${
          changeType === 'up' ? 'text-green-400' : 'text-red-400'
        }`}>
          {changeType === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span>{change}</span>
        </div>
      </div>
      <p className="text-[#B8B8B8] text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold text-[#F6F6F6]">{value}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0B0B0C] flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

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
              <h1 className="text-xl font-bold text-[#F6F6F6]">Dashboard</h1>
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
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Revenue"
              value="$24,500"
              change="+12.5%"
              changeType="up"
              icon={DollarSign}
            />
            <StatCard
              title="Total Orders"
              value="156"
              change="+8.2%"
              changeType="up"
              icon={ShoppingCart}
            />
            <StatCard
              title="Total Customers"
              value="1,240"
              change="+15.3%"
              changeType="up"
              icon={Users}
            />
            <StatCard
              title="Conversion Rate"
              value="3.2%"
              change="-2.1%"
              changeType="down"
              icon={TrendingUp}
            />
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Sales Chart */}
            <div className="lg:col-span-2 bg-[#1a1a1a] rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-[#F6F6F6] mb-6">Sales Overview</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#B8B8B8" />
                    <YAxis stroke="#B8B8B8" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                      labelStyle={{ color: '#F6F6F6' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#B8FF3D" 
                      strokeWidth={2}
                      dot={{ fill: '#B8FF3D' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-[#F6F6F6] mb-6">Sales by Category</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                {categoryData.map((cat, i) => (
                  <div key={cat.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[i] }}
                    />
                    <span className="text-[#B8B8B8] text-sm">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[#F6F6F6]">Recent Orders</h2>
              <Link 
                to="/admin/orders" 
                className="text-[#B8FF3D] text-sm hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#F6F6F6]/10">
                    <th className="text-left py-3 px-4 text-[#B8B8B8] font-medium">Order ID</th>
                    <th className="text-left py-3 px-4 text-[#B8B8B8] font-medium">Customer</th>
                    <th className="text-left py-3 px-4 text-[#B8B8B8] font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-[#B8B8B8] font-medium">Total</th>
                    <th className="text-left py-3 px-4 text-[#B8B8B8] font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-[#F6F6F6]/5 hover:bg-[#0B0B0C]/50">
                      <td className="py-4 px-4 text-[#F6F6F6]">{order.id}</td>
                      <td className="py-4 px-4 text-[#F6F6F6]">{order.customer}</td>
                      <td className="py-4 px-4 text-[#B8B8B8]">{order.date}</td>
                      <td className="py-4 px-4 text-[#F6F6F6]">${order.total}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                          order.status === 'shipped' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
