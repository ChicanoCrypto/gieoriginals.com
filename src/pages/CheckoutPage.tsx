import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { gsap } from 'gsap';
import { ArrowLeft, Check, Truck, CreditCard, MapPin, User, Lock, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

// Theme Toggle Component
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

// Card element styles
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#F6F6F6',
      '::placeholder': {
        color: '#B8B8B8',
      },
    },
    invalid: {
      color: '#ef4444',
    },
  },
};

export default function CheckoutPage() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const pageRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Form states
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('US');
  const [phone, setPhone] = useState('');
  const [cardError, setCardError] = useState('');

  const shipping = totalPrice >= 100 ? 0 : 15;
  const tax = Math.round(totalPrice * 0.08);
  const total = totalPrice + shipping + tax;

  useEffect(() => {
    if (items.length === 0 && paymentStatus !== 'success') {
      navigate('/');
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.checkout-content',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [items, navigate, paymentStatus]);

  const handleCardChange = (event: any) => {
    setCardError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(async () => {
      const { error } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: `${firstName} ${lastName}`,
          email,
          phone,
          address: {
            line1: address,
            city,
            postal_code: postalCode,
            country,
          },
        },
      });

      if (error) {
        setCardError(error.message || 'Payment failed');
        setPaymentStatus('error');
        setIsProcessing(false);
      } else {
        setPaymentStatus('success');
        setIsProcessing(false);
        clearCart();
      }
    }, 2000);
  };

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-[#0B0B0C] flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-[#B8FF3D] flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-[#0B0B0C]" />
          </div>
          <h1 className="text-3xl font-bold text-[#F6F6F6] mb-4">Order Confirmed!</h1>
          <p className="text-[#B8B8B8] mb-8">
            Thank you for your purchase. We've sent a confirmation email to {email}.
          </p>
          <div className="bg-[#1a1a1a] rounded-2xl p-6 mb-8">
            <p className="text-[#B8B8B8] text-sm mb-2">Order Total</p>
            <p className="text-2xl font-bold text-[#F6F6F6]">${total}</p>
          </div>
          <Link to="/" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-[#0B0B0C]">
      {/* Header */}
      <header className="px-6 md:px-12 py-6 border-b border-[#F6F6F6]/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tight text-[#F6F6F6]">
            GIE
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-[#B8FF3D]" />
              <span className="text-[#B8B8B8] text-sm">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <div className="checkout-content px-6 md:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-[#B8B8B8] hover:text-[#F6F6F6] transition-colors mb-8">
            <ArrowLeft size={18} />
            <span>Back to Shop</span>
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              {/* Progress Steps */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#B8FF3D]' : 'text-[#B8B8B8]'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= 1 ? 'bg-[#B8FF3D] text-[#0B0B0C]' : 'border border-[#F6F6F6]/20'
                  }`}>
                    1
                  </div>
                  <span className="hidden sm:inline">Shipping</span>
                </div>
                <div className="flex-1 h-px bg-[#F6F6F6]/20" />
                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#B8FF3D]' : 'text-[#B8B8B8]'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= 2 ? 'bg-[#B8FF3D] text-[#0B0B0C]' : 'border border-[#F6F6F6]/20'
                  }`}>
                    2
                  </div>
                  <span className="hidden sm:inline">Payment</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="bg-[#1a1a1a] rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <User className="text-[#B8FF3D]" size={20} />
                        <h2 className="text-lg font-semibold text-[#F6F6F6]">Contact Information</h2>
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full px-4 py-3 rounded-xl bg-[#0B0B0C] border border-[#F6F6F6]/20 text-[#F6F6F6] placeholder:text-[#B8B8B8] focus:outline-none focus:border-[#B8FF3D]"
                        required
                      />
                    </div>

                    <div className="bg-[#1a1a1a] rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <MapPin className="text-[#B8FF3D]" size={20} />
                        <h2 className="text-lg font-semibold text-[#F6F6F6]">Shipping Address</h2>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First Name"
                          className="px-4 py-3 rounded-xl bg-[#0B0B0C] border border-[#F6F6F6]/20 text-[#F6F6F6] placeholder:text-[#B8B8B8] focus:outline-none focus:border-[#B8FF3D]"
                          required
                        />
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Last Name"
                          className="px-4 py-3 rounded-xl bg-[#0B0B0C] border border-[#F6F6F6]/20 text-[#F6F6F6] placeholder:text-[#B8B8B8] focus:outline-none focus:border-[#B8FF3D]"
                          required
                        />
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Address"
                          className="sm:col-span-2 px-4 py-3 rounded-xl bg-[#0B0B0C] border border-[#F6F6F6]/20 text-[#F6F6F6] placeholder:text-[#B8B8B8] focus:outline-none focus:border-[#B8FF3D]"
                          required
                        />
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="City"
                          className="px-4 py-3 rounded-xl bg-[#0B0B0C] border border-[#F6F6F6]/20 text-[#F6F6F6] placeholder:text-[#B8B8B8] focus:outline-none focus:border-[#B8FF3D]"
                          required
                        />
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="Postal Code"
                          className="px-4 py-3 rounded-xl bg-[#0B0B0C] border border-[#F6F6F6]/20 text-[#F6F6F6] placeholder:text-[#B8B8B8] focus:outline-none focus:border-[#B8FF3D]"
                          required
                        />
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="sm:col-span-2 px-4 py-3 rounded-xl bg-[#0B0B0C] border border-[#F6F6F6]/20 text-[#F6F6F6] focus:outline-none focus:border-[#B8FF3D]"
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                        </select>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Phone (optional)"
                          className="sm:col-span-2 px-4 py-3 rounded-xl bg-[#0B0B0C] border border-[#F6F6F6]/20 text-[#F6F6F6] placeholder:text-[#B8B8B8] focus:outline-none focus:border-[#B8FF3D]"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full btn-primary"
                    >
                      Continue to Payment
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="bg-[#1a1a1a] rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <CreditCard className="text-[#B8FF3D]" size={20} />
                        <h2 className="text-lg font-semibold text-[#F6F6F6]">Payment Details</h2>
                      </div>
                      
                      <div className="p-4 rounded-xl bg-[#0B0B0C] border border-[#F6F6F6]/20 mb-4">
                        <CardElement options={cardElementOptions} onChange={handleCardChange} />
                      </div>
                      
                      {cardError && (
                        <p className="text-red-400 text-sm mb-4">{cardError}</p>
                      )}

                      <div className="flex items-center gap-2 text-[#B8B8B8] text-sm">
                        <Lock size={14} />
                        <span>Your payment information is secure and encrypted</span>
                      </div>
                    </div>

                    <div className="bg-[#1a1a1a] rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Truck className="text-[#B8FF3D]" size={20} />
                        <h2 className="text-lg font-semibold text-[#F6F6F6]">Shipping Method</h2>
                      </div>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between p-4 rounded-xl bg-[#0B0B0C] border border-[#B8FF3D] cursor-pointer">
                          <div className="flex items-center gap-3">
                            <input type="radio" name="shipping" defaultChecked className="accent-[#B8FF3D]" />
                            <div>
                              <p className="text-[#F6F6F6] font-medium">Standard Shipping</p>
                              <p className="text-[#B8B8B8] text-sm">5-7 business days</p>
                            </div>
                          </div>
                          <span className="text-[#F6F6F6] font-semibold">
                            {shipping === 0 ? 'FREE' : `$${shipping}`}
                          </span>
                        </label>
                        <label className="flex items-center justify-between p-4 rounded-xl bg-[#0B0B0C] border border-[#F6F6F6]/20 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <input type="radio" name="shipping" className="accent-[#B8FF3D]" />
                            <div>
                              <p className="text-[#F6F6F6] font-medium">Express Shipping</p>
                              <p className="text-[#B8B8B8] text-sm">2-3 business days</p>
                            </div>
                          </div>
                          <span className="text-[#F6F6F6] font-semibold">$25</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 py-4 rounded-full border border-[#F6F6F6]/30 text-[#F6F6F6] font-semibold tracking-wide uppercase hover:bg-[#F6F6F6]/10 transition-all"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={!stripe || isProcessing}
                        className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? 'Processing...' : `Pay $${total}`}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#1a1a1a] rounded-2xl p-6 sticky top-6">
                <h2 className="text-lg font-semibold text-[#F6F6F6] mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6 max-h-64 overflow-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="text-[#F6F6F6] text-sm font-medium">{item.name}</p>
                        <p className="text-[#B8B8B8] text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-[#F6F6F6] font-medium">${item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-[#F6F6F6]/10">
                  <div className="flex justify-between text-[#B8B8B8]">
                    <span>Subtotal</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-[#B8B8B8]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-[#B8B8B8]">
                    <span>Tax</span>
                    <span>${tax}</span>
                  </div>
                  <div className="flex justify-between text-[#F6F6F6] font-semibold text-lg pt-3 border-t border-[#F6F6F6]/10">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
