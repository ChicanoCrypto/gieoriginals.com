import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft, Heart, Share2, Truck, RotateCcw, Shield, X, ShoppingBag, Minus, Plus, Trash2, Sun, Moon, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { products } from './HomePage';

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

// Navigation Component
function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  const menuLinks = [
    { label: 'Shop', href: '/#lookbook' },
    { label: 'New Arrivals', href: '/#lookbook' },
    { label: 'Collections', href: '/#lookbook' },
    { label: 'About', href: '/#about' },
    { label: 'Size Guide', href: '/#size-guide' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 bg-[#0B0B0C]/80 backdrop-blur-md">
        <Link to="/" className="text-2xl font-bold tracking-tight text-[#F6F6F6]">
          GIE
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-sm font-semibold tracking-wide uppercase text-[#F6F6F6] hover:text-[#B8FF3D] transition-colors"
          >
            Menu
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-sm font-semibold tracking-wide uppercase text-[#F6F6F6] hover:text-[#B8FF3D] transition-colors"
          >
            Cart ({totalItems})
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B0B0C]/98 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center h-full">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-5 right-6 text-[#F6F6F6] hover:text-[#B8FF3D] transition-colors"
            >
              <X size={28} />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {menuLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl md:text-6xl font-bold text-[#F6F6F6] hover:text-[#B8FF3D] transition-colors uppercase tracking-tight"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

// Cart Drawer Component
function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalPrice } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={() => setIsCartOpen(false)} />
      <div className="relative w-full max-w-md h-full bg-[#0B0B0C] border-l border-[#F6F6F6]/10 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-[#F6F6F6]/10">
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#F6F6F6]">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-[#F6F6F6] hover:text-[#B8FF3D]">
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#B8B8B8]">
              <ShoppingBag size={48} className="mb-4 opacity-50" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-[#F6F6F6]">{item.name}</h3>
                    <p className="text-[#B8B8B8] text-sm">${item.price}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full border border-[#F6F6F6]/20 flex items-center justify-center hover:border-[#B8FF3D] text-[#F6F6F6]"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm text-[#F6F6F6]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-[#F6F6F6]/20 flex items-center justify-center hover:border-[#B8FF3D] text-[#F6F6F6]"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-[#B8B8B8] hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-6 border-t border-[#F6F6F6]/10">
            <div className="flex justify-between mb-4">
              <span className="text-[#B8B8B8]">Subtotal</span>
              <span className="font-semibold text-[#F6F6F6]">${totalPrice}</span>
            </div>
            <Link to="/checkout" onClick={() => setIsCartOpen(false)} className="btn-primary w-full block text-center">
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// Image Gallery Component
function ImageGallery({ images, productName }: { images: { main: string; front: string; back: string; side: string; model: string }; productName: string }) {
  const [selectedImage, setSelectedImage] = useState('main');

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const imageList = [
    { key: 'main', label: 'Main', src: images.main },
    { key: 'front', label: 'Front', src: images.front },
    { key: 'back', label: 'Back', src: images.back },
    { key: 'side', label: 'Side', src: images.side },
    { key: 'model', label: 'Model', src: images.model },
  ];

  const currentImage = imageList.find(img => img.key === selectedImage) || imageList[0];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % imageList.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div 
          className="relative aspect-square rounded-[28px] overflow-hidden bg-[#1a1a1a] cursor-zoom-in group"
          onClick={() => openLightbox(imageList.findIndex(img => img.key === selectedImage))}
        >
          <img
            src={currentImage.src}
            alt={`${productName} - ${currentImage.label}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={20} className="text-white" />
          </div>
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
            {currentImage.label} View
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-5 gap-3">
          {imageList.map((image) => (
            <button
              key={image.key}
              onClick={() => setSelectedImage(image.key)}
              className={`relative aspect-square rounded-xl overflow-hidden transition-all ${
                selectedImage === image.key
                  ? 'ring-2 ring-[#B8FF3D] ring-offset-2 ring-offset-[#0B0B0C]'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={image.src}
                alt={`${productName} - ${image.label}`}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-white bg-black/50 px-2 py-0.5 rounded-full">
                {image.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-[#B8FF3D] transition-colors"
          >
            <X size={32} />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={24} />
          </button>

          <div className="max-w-4xl max-h-[80vh] px-20">
            <img
              src={imageList[lightboxIndex].src}
              alt={`${productName} - ${imageList[lightboxIndex].label}`}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <p className="text-center text-white mt-4 text-lg">
              {imageList[lightboxIndex].label} View
            </p>
            <p className="text-center text-[#B8B8B8] text-sm">
              {lightboxIndex + 1} / {imageList.length}
            </p>
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {imageList.map((image, index) => (
              <button
                key={image.key}
                onClick={() => setLightboxIndex(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden transition-all ${
                  lightboxIndex === index
                    ? 'ring-2 ring-[#B8FF3D]'
                    : 'opacity-50 hover:opacity-100'
                }`}
              >
                <img src={image.src} alt={image.label} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, setIsCartOpen } = useCart();
  const pageRef = useRef<HTMLDivElement>(null);
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find(p => p.id === id);
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== id).slice(0, 3);

  useEffect(() => {
    if (!product) {
      navigate('/');
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.product-gallery',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
      );
      gsap.fromTo(
        '.product-info > *',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [product, navigate]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: `${product.id}-${selectedSize}`,
        name: `${product.name} (Size ${selectedSize})`,
        price: product.price,
        image: product.image,
      });
    }
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    handleAddToCart();
    setIsCartOpen(true);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-[#0B0B0C]">
      <Navigation />
      <CartDrawer />
      
      {/* Breadcrumb */}
      <div className="pt-24 pb-6 px-6 md:px-12">
        <Link to="/#lookbook" className="inline-flex items-center gap-2 text-[#B8B8B8] hover:text-[#F6F6F6] transition-colors">
          <ArrowLeft size={18} />
          <span>Back to Shop</span>
        </Link>
      </div>

      {/* Product Details */}
      <div className="px-6 md:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Image Gallery */}
            <div className="product-gallery">
              <ImageGallery images={product.images} productName={product.name} />
            </div>

            {/* Product Info */}
            <div className="product-info flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-[#B8FF3D] text-sm font-semibold tracking-wide uppercase">
                    {product.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#F6F6F6] mt-2">
                    {product.name}
                  </h1>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                      isWishlisted 
                        ? 'border-[#B8FF3D] bg-[#B8FF3D] text-[#0B0B0C]' 
                        : 'border-[#F6F6F6]/20 text-[#F6F6F6] hover:border-[#F6F6F6]/50'
                    }`}
                  >
                    <Heart size={20} fill={isWishlisted ? '#0B0B0C' : 'none'} />
                  </button>
                  <button className="w-12 h-12 rounded-full border border-[#F6F6F6]/20 text-[#F6F6F6] flex items-center justify-center hover:border-[#F6F6F6]/50 transition-all">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              <p className="text-2xl font-semibold text-[#F6F6F6] mb-6">
                ${product.price}
              </p>

              <p className="text-[#B8B8B8] leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Size Selection */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#F6F6F6] font-semibold">Select Size</span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-[#B8B8B8] text-sm hover:text-[#B8FF3D] transition-colors underline"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 rounded-xl font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-[#B8FF3D] text-[#0B0B0C]'
                          : 'border border-[#F6F6F6]/20 text-[#F6F6F6] hover:border-[#F6F6F6]/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <span className="text-[#F6F6F6] font-semibold block mb-4">Quantity</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-full border border-[#F6F6F6]/20 flex items-center justify-center text-[#F6F6F6] hover:border-[#F6F6F6]/50"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-[#F6F6F6] font-semibold text-lg w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-full border border-[#F6F6F6]/20 flex items-center justify-center text-[#F6F6F6] hover:border-[#F6F6F6]/50"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-10">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 rounded-full font-semibold tracking-wide uppercase transition-all ${
                    addedToCart
                      ? 'bg-green-500 text-white'
                      : 'bg-[#B8FF3D] text-[#0B0B0C] hover:scale-105'
                  }`}
                >
                  {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-4 rounded-full border border-[#F6F6F6]/30 text-[#F6F6F6] font-semibold tracking-wide uppercase hover:bg-[#F6F6F6]/10 transition-all"
                >
                  Buy Now
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#F6F6F6]/10">
                <div className="text-center">
                  <Truck className="mx-auto mb-2 text-[#B8FF3D]" size={24} />
                  <span className="text-[#B8B8B8] text-sm">Free Shipping<br/>Over $100</span>
                </div>
                <div className="text-center">
                  <RotateCcw className="mx-auto mb-2 text-[#B8FF3D]" size={24} />
                  <span className="text-[#B8B8B8] text-sm">30-Day<br/>Returns</span>
                </div>
                <div className="text-center">
                  <Shield className="mx-auto mb-2 text-[#B8FF3D]" size={24} />
                  <span className="text-[#B8B8B8] text-sm">Secure<br/>Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="px-6 md:px-12 py-16 border-t border-[#F6F6F6]/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="headline-md text-[#F6F6F6] mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="group"
                >
                  <div className="aspect-square rounded-[28px] overflow-hidden mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-[#F6F6F6] font-semibold group-hover:text-[#B8FF3D] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[#B8B8B8]">${item.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80" onClick={() => setShowSizeGuide(false)} />
          <div className="relative bg-[#1a1a1a] border border-[#F6F6F6]/10 rounded-2xl p-8 max-w-lg w-full">
            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-4 right-4 text-[#B8B8B8] hover:text-[#F6F6F6]"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-[#F6F6F6] mb-6">Size Guide</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#F6F6F6]/20">
                  <th className="text-left py-3 text-[#B8B8B8]">Size</th>
                  <th className="text-left py-3 text-[#B8B8B8]">Chest (cm)</th>
                  <th className="text-left py-3 text-[#B8B8B8]">Waist (cm)</th>
                  <th className="text-left py-3 text-[#B8B8B8]">Hip (cm)</th>
                </tr>
              </thead>
              <tbody className="text-[#F6F6F6]">
                {[
                  ['S', '96', '80', '98'],
                  ['M', '102', '86', '104'],
                  ['L', '108', '92', '110'],
                  ['XL', '114', '98', '116'],
                ].map(([size, chest, waist, hip]) => (
                  <tr key={size} className="border-b border-[#F6F6F6]/10">
                    <td className="py-3 font-semibold">{size}</td>
                    <td className="py-3">{chest}</td>
                    <td className="py-3">{waist}</td>
                    <td className="py-3">{hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
