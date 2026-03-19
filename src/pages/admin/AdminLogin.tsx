import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated as admin
  if (isAuthenticated && isAdmin) {
    navigate('/admin');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(email, password);
    
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <Link to="/" className="text-4xl font-bold text-[#F6F6F6]">
            GIE
          </Link>
          <p className="text-[#B8B8B8] mt-2">Admin Panel</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#1a1a1a] rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-[#F6F6F6] mb-6">Welcome Back</h1>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#B8B8B8] text-sm mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8B8B8]" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gieoriginals.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0B0B0C] border border-[#F6F6F6]/20 text-[#F6F6F6] placeholder:text-[#B8B8B8] focus:outline-none focus:border-[#B8FF3D]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[#B8B8B8] text-sm mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8B8B8]" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-[#0B0B0C] border border-[#F6F6F6]/20 text-[#F6F6F6] placeholder:text-[#B8B8B8] focus:outline-none focus:border-[#B8FF3D]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B8B8B8] hover:text-[#F6F6F6]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#F6F6F6]/10">
            <p className="text-[#B8B8B8] text-sm text-center">
              Demo credentials:<br />
              <span className="text-[#F6F6F6]">admin@gieoriginals.com / admin123</span>
            </p>
          </div>
        </div>

        <p className="text-center mt-8">
          <Link to="/" className="text-[#B8B8B8] hover:text-[#F6F6F6] transition-colors text-sm">
            ← Back to Website
          </Link>
        </p>
      </div>
    </div>
  );
}
