import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Minus, Plus, Trash2, Sun, Moon, Instagram, Twitter, Youtube } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { products } from '../products';

gsap.registerPlugin(ScrollTrigger);



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

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 bg-gradient-to-b from-black/50 to-transparent">
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

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B0B0C]/98 backdrop-blur-sm">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5">
              <Link to="/" className="text-2xl font-bold tracking-tight text-[#F6F6F6]" onClick={() => setIsMenuOpen(false)}>
                GIE
              </Link>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#F6F6F6] hover:text-[#B8FF3D] transition-colors"
                >
                  <X size={28} />
                </button>
              </div>
            </div>

            {/* Menu Content */}
            <div className="flex-1 flex flex-col lg:flex-row">
              {/* Main Navigation */}
              <div className="flex-1 flex items-center justify-center lg:justify-start lg:pl-24">
                <nav className="flex flex-col gap-6">
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

              {/* Sidebar Info */}
              <div className="lg:w-80 px-6 py-8 lg:py-24 lg:border-l lg:border-[#F6F6F6]/10">
                <div className="space-y-8">
                  {/* Contact Info */}
                  <div>
                    <h3 className="text-[#B8B8B8] text-sm uppercase tracking-wider mb-3">Contact</h3>
                    <p className="text-[#F6F6F6]">hello@gieoriginals.com</p>
                    <p className="text-[#F6F6F6]">+1 (555) 123-4567</p>
                  </div>

                  {/* Shipping Info */}
                  <div>
                    <h3 className="text-[#B8B8B8] text-sm uppercase tracking-wider mb-3">Shipping</h3>
                    <p className="text-[#F6F6F6]">Free shipping on orders over $100</p>
                    <p className="text-[#B8B8B8] text-sm mt-1">Worldwide delivery</p>
                  </div>

                  {/* Social Links */}
                  <div>
                    <h3 className="text-[#B8B8B8] text-sm uppercase tracking-wider mb-3">Follow Us</h3>
                    <div className="flex gap-4">
                      {socialLinks.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          className="w-10 h-10 rounded-full border border-[#F6F6F6]/20 flex items-center justify-center text-[#F6F6F6] hover:border-[#B8FF3D] hover:text-[#B8FF3D] transition-all"
                          aria-label={social.label}
                        >
                          <social.icon size={18} />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Newsletter */}
                  <div>
                    <h3 className="text-[#B8B8B8] text-sm uppercase tracking-wider mb-3">Newsletter</h3>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Your email"
                        className="flex-1 px-4 py-2 rounded-full bg-[#1a1a1a] border border-[#F6F6F6]/20 text-[#F6F6F6] text-sm focus:outline-none focus:border-[#B8FF3D]"
                      />
                      <button className="px-4 py-2 rounded-full bg-[#B8FF3D] text-[#0B0B0C] text-sm font-semibold hover:scale-105 transition-transform">
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

// Section 1: Hero with Video Background
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [, setVideoLoaded] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const ring = ringRef.current;
    const portrait = portraitRef.current;
    const headline = headlineRef.current;
    const cta = ctaRef.current;
    if (!section || !ring || !portrait || !headline || !cta) return;

    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ delay: 0.3 });
      
      loadTl
        .fromTo(ring, 
          { scale: 0.75, opacity: 0, rotation: -25 },
          { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: 'power2.out' }
        )
        .fromTo(portrait,
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        )
        .fromTo(headline,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo(cta,
          { y: 18, scale: 0.96, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([ring, portrait, headline, cta], { clearProps: 'all' });
            loadTl.progress(1);
          }
        }
      });

      scrollTl
        .fromTo(headline,
          { y: 0, opacity: 1 },
          { y: '-18vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(portrait,
          { x: 0, scale: 1, opacity: 1 },
          { x: '-22vw', scale: 0.92, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(ring,
          { x: 0, rotation: 0, opacity: 1 },
          { x: '22vw', rotation: 35, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(cta,
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, ease: 'power2.in' },
          0.75
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-10">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="video-background"
          poster="/hero_portrait.jpg"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-model-wearing-a-black-dress-in-a-studio-39875-large.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        {/* Circular Text Ring */}
        <svg
          ref={ringRef}
          className="absolute animate-rotate-slow"
          style={{ width: 'min(62vw, 62vh)', height: 'min(62vw, 62vh)' }}
          viewBox="0 0 400 400"
        >
          <defs>
            <path
              id="circlePath"
              d="M 200, 200 m -160, 0 a 160,160 0 1,1 320,0 a 160,160 0 1,1 -320,0"
            />
          </defs>
          <circle cx="200" cy="200" r="195" fill="none" stroke="#F6F6F6" strokeWidth="2" opacity="0.9" />
          <text fill="#F6F6F6" fontSize="24" fontWeight="700" letterSpacing="8">
            <textPath href="#circlePath">
              GIE ORIGINALS • GIE ORIGINALS • GIE ORIGINALS •
            </textPath>
          </text>
        </svg>

        {/* Center Portrait */}
        <div
          ref={portraitRef}
          className="absolute rounded-full overflow-hidden border-4 border-[#F6F6F6]/20"
          style={{ width: 'min(38vw, 38vh)', height: 'min(38vw, 38vh)' }}
        >
          <img
            src="/hero_portrait.jpg"
            alt="GIE Originals"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="absolute headline-xl text-[#F6F6F6] text-center drop-shadow-lg"
          style={{ bottom: '18vh' }}
        >
          ORIGINALS
        </h1>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="absolute flex gap-4" style={{ bottom: '8vh' }}>
          <a href="#lookbook" className="btn-primary">Shop the drop</a>
          <a href="#lookbook" className="btn-outline border-[#F6F6F6]/50">View lookbook</a>
        </div>
      </div>
    </section>
  );
}

// Section 2: New Arrivals
function NewArrivalsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      const leftPanel = section.querySelector('.left-panel');
      const neonTile = section.querySelector('.neon-tile');
      const headline = section.querySelector('.section-headline');
      const bodyText = section.querySelector('.body-text');
      const cta = section.querySelector('.cta-btn');
      const sticker = section.querySelector('.sticker-pill');

      scrollTl
        .fromTo(leftPanel, { x: '-60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo(neonTile, { x: '40vw', y: '-20vh', scale: 0.85, opacity: 0 }, { x: 0, y: 0, scale: 1, opacity: 1, ease: 'none' }, 0.05)
        .fromTo(headline, { x: '30vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.08)
        .fromTo(bodyText, { x: '30vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.1)
        .fromTo(cta, { y: '12vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.12)
        .fromTo(sticker, { y: '12vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.14)
        .fromTo(leftPanel, { x: 0, opacity: 1 }, { x: '-40vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(neonTile, { x: 0, y: 0, scale: 1, opacity: 1 }, { x: '20vw', y: '-10vh', scale: 0.95, opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(headline, { x: 0, opacity: 1 }, { y: '-12vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo([cta, sticker], { y: 0, opacity: 1 }, { y: '10vh', opacity: 0, ease: 'power2.in' }, 0.72);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned bg-[#0B0B0C] z-20">
      <div className="left-panel absolute left-0 top-0 w-[56vw] h-full">
        <img
          src="/new_arrivals_left.jpg"
          alt="New Arrivals"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      <div className="absolute right-0 top-0 w-[44vw] h-full bg-[#0B0B0C]" />

      <div className="neon-tile sticker-square absolute" style={{ left: '62vw', top: '10vh', width: 'clamp(200px, 20vw, 340px)', height: 'clamp(200px, 20vw, 340px)' }}>
        <span className="text-5xl font-bold">NEW</span>
        <span className="text-lg mt-2">ARRIVALS</span>
      </div>

      <h2 className="section-headline headline-md absolute text-[#F6F6F6]" style={{ left: '62vw', top: '52vh', width: '34vw' }}>
        NEW<br />ARRIVALS
      </h2>

      <p className="body-text absolute text-[#B8B8B8] text-base leading-relaxed" style={{ left: '62vw', top: '68vh', width: '30vw' }}>
        Fresh silhouettes, clean lines, and pieces built to own the day.
      </p>

      <a href="#lookbook" className="cta-btn btn-primary absolute" style={{ left: '62vw', top: '80vh' }}>
        Shop new
      </a>

      <span className="sticker-pill absolute" style={{ left: '62vw', top: '90vh' }}>
        FREE SHIPPING
      </span>
    </section>
  );
}

// Section 3: Be Original
function BeOriginalSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      const bg = section.querySelector('.bg-image');
      const headline = section.querySelector('.headline');
      const subheadline = section.querySelector('.subheadline');
      const cta = section.querySelector('.cta');
      const topPill = section.querySelector('.top-pill');
      const bottomLeft = section.querySelector('.bottom-left');
      const bottomRight = section.querySelector('.bottom-right');

      scrollTl
        .fromTo(bg, { scale: 1.12, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none' }, 0)
        .fromTo(topPill, { y: '-12vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo(headline, { y: '40vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05)
        .fromTo(subheadline, { y: '20vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1)
        .fromTo(cta, { y: '14vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.12)
        .fromTo([bottomLeft, bottomRight], { y: '16vh', scale: 0.9, opacity: 0 }, { y: 0, scale: 1, opacity: 1, ease: 'none' }, 0.1)
        .fromTo(bg, { scale: 1, opacity: 1 }, { scale: 1.06, opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(headline, { y: 0, opacity: 1 }, { y: '-18vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(topPill, { y: 0, opacity: 1 }, { y: '-8vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo([subheadline, cta, bottomLeft, bottomRight], { y: 0, opacity: 1 }, { y: '12vh', opacity: 0, ease: 'power2.in' }, 0.72);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-30">
      <div className="bg-image absolute inset-0">
        <img
          src="/be_original_bg.jpg"
          alt="Be Original"
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <span className="top-pill sticker-pill absolute left-1/2 -translate-x-1/2" style={{ top: '6vh' }}>
        GIE ORIGINALS
      </span>

      <h2 className="headline headline-lg absolute left-1/2 -translate-x-1/2 text-[#F6F6F6] text-center" style={{ top: '42vh' }}>
        BE ORIGINAL
      </h2>

      <p className="subheadline absolute left-1/2 -translate-x-1/2 text-[#F6F6F6]/90 text-lg" style={{ top: '58vh' }}>
        No rules. Just style.
      </p>

      <a href="#about" className="cta btn-outline absolute left-1/2 -translate-x-1/2" style={{ top: '66vh' }}>
        Explore the brand
      </a>

      <span className="bottom-left sticker-pill absolute" style={{ left: '6vw', bottom: '6vh' }}>
        NEW COLLECTION
      </span>

      <a href="#lookbook" className="bottom-right sticker-circle absolute animate-rotate-slow" style={{ right: '6vw', bottom: '6vh' }}>
        <span className="text-center leading-tight">Shop<br/>now</span>
      </a>
    </section>
  );
}

// Section 4: New Style
function NewStyleSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      const bg = section.querySelector('.bg-image');
      const headline = section.querySelector('.headline');
      const subheadline = section.querySelector('.subheadline');
      const cta = section.querySelector('.cta');
      const stickerCluster = section.querySelectorAll('.sticker-cluster > *');

      scrollTl
        .fromTo(bg, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none' }, 0)
        .fromTo([headline, subheadline], { x: '-40vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.05)
        .fromTo(cta, { y: '12vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.12)
        .fromTo(stickerCluster, { x: '40vw', opacity: 0 }, { x: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.08)
        .fromTo(bg, { scale: 1, opacity: 1 }, { scale: 1.06, opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo([headline, subheadline], { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(stickerCluster, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(cta, { y: 0, opacity: 1 }, { y: '8vh', opacity: 0, ease: 'power2.in' }, 0.72);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-40">
      <div className="bg-image absolute inset-0">
        <img
          src="/new_style_bg.jpg"
          alt="New Style"
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <h2 className="headline headline-lg absolute text-[#F6F6F6]" style={{ left: '6vw', top: '10vh' }}>
        NEW<br/>STYLE
      </h2>

      <p className="subheadline absolute text-[#F6F6F6]/80 text-base max-w-xs" style={{ left: '6vw', top: '30vh' }}>
        Minimal effort. Maximum impact.
      </p>

      <a href="#lookbook" className="cta btn-primary absolute" style={{ left: '6vw', top: '42vh' }}>
        Shop the look
      </a>

      <div className="sticker-cluster absolute flex flex-col gap-6" style={{ right: '6vw', top: '18vh' }}>
        <span className="sticker-pill">ORIGINALS</span>
        <span className="sticker-circle w-24 h-24 text-sm">NEW</span>
        <span className="sticker-pill">COLLECTION</span>
      </div>
    </section>
  );
}

// Section 5: New Collection
function NewCollectionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        }
      });

      const leftPanel = section.querySelector('.left-panel');
      const rightPanel = section.querySelector('.right-panel');
      const headline = section.querySelector('.headline');
      const topRight = section.querySelector('.top-right');
      const bottomLeft = section.querySelector('.bottom-left');
      const bottomRight = section.querySelector('.bottom-right');

      scrollTl
        .fromTo(leftPanel, { x: '-60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo(rightPanel, { x: '60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo(headline, { scale: 0.92, y: '10vh', opacity: 0 }, { scale: 1, y: 0, opacity: 1, ease: 'none' }, 0.08)
        .fromTo(topRight, { y: '-20vh', scale: 0.8, opacity: 0 }, { y: 0, scale: 1, opacity: 1, ease: 'none' }, 0.1)
        .fromTo([bottomLeft, bottomRight], { y: '16vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.12)
        .fromTo(leftPanel, { x: 0, opacity: 1 }, { x: '-30vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(rightPanel, { x: 0, opacity: 1 }, { x: '30vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(headline, { scale: 1, opacity: 1 }, { scale: 1.04, opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(topRight, { y: 0, opacity: 1 }, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.72)
        .fromTo([bottomLeft, bottomRight], { y: 0, opacity: 1 }, { y: '10vh', opacity: 0, ease: 'power2.in' }, 0.72);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-50">
      <div className="left-panel absolute left-0 top-0 w-1/2 h-full">
        <img
          src="/collection_left.jpg"
          alt="Collection"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      <div className="right-panel absolute right-0 top-0 w-1/2 h-full">
        <img
          src="/collection_right.jpg"
          alt="Collection"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      <h2 className="headline headline-lg absolute left-1/2 -translate-x-1/2 text-[#F6F6F6] text-center drop-shadow-2xl" style={{ top: '46vh', textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}>
        NEW<br/>COLLECTION
      </h2>

      <a href="#lookbook" className="top-right sticker-circle absolute animate-rotate-slow" style={{ right: '4vw', top: '6vh' }}>
        <span className="text-center leading-tight text-xs">Shop<br/>now</span>
      </a>

      <span className="bottom-left sticker-pill absolute" style={{ left: '4vw', bottom: '6vh' }}>
        ORIGINALS
      </span>

      <span className="bottom-right sticker-pill absolute" style={{ right: '4vw', bottom: '6vh' }}>
        NEW
      </span>
    </section>
  );
}

// Section 6: New Drop
function NewDropSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      const bg = section.querySelector('.bg-image');
      const headline = section.querySelector('.headline');
      const subheadline = section.querySelector('.subheadline');
      const cta = section.querySelector('.cta');
      const sticker = section.querySelector('.sticker');

      scrollTl
        .fromTo(bg, { scale: 1.12, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none' }, 0)
        .fromTo(sticker, { x: '30vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.08)
        .fromTo(headline, { y: '45vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05)
        .fromTo([subheadline, cta], { y: '14vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1)
        .fromTo(bg, { scale: 1, opacity: 1 }, { scale: 1.06, opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(headline, { y: 0, opacity: 1 }, { y: '-16vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(sticker, { x: 0, opacity: 1 }, { x: '14vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo([subheadline, cta], { y: 0, opacity: 1 }, { y: '10vh', opacity: 0, ease: 'power2.in' }, 0.72);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-[60]">
      <div className="bg-image absolute inset-0">
        <img
          src="/new_drop_bg.jpg"
          alt="New Drop"
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <span className="sticker sticker-pill absolute" style={{ right: '6vw', top: '8vh' }}>
        ORIGINALS
      </span>

      <h2 className="headline headline-lg absolute left-1/2 -translate-x-1/2 text-[#F6F6F6] text-center" style={{ top: '44vh' }}>
        NEW DROP
      </h2>

      <p className="subheadline absolute left-1/2 -translate-x-1/2 text-[#F6F6F6]/80 text-lg" style={{ top: '60vh' }}>
        Small batch. Big statement.
      </p>

      <a href="#lookbook" className="cta btn-primary absolute left-1/2 -translate-x-1/2" style={{ top: '70vh' }}>
        Shop the drop
      </a>
    </section>
  );
}

// Section 7: For You
function ForYouSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      const bg = section.querySelector('.bg-image');
      const headline = section.querySelector('.headline');
      const subheadline = section.querySelector('.subheadline');
      const circleCta = section.querySelector('.circle-cta');
      const sticker = section.querySelector('.sticker');

      scrollTl
        .fromTo(bg, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none' }, 0)
        .fromTo(headline, { y: '40vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05)
        .fromTo(subheadline, { y: '20vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1)
        .fromTo(circleCta, { x: '30vw', scale: 0.8, opacity: 0 }, { x: 0, scale: 1, opacity: 1, ease: 'none' }, 0.1)
        .fromTo(sticker, { y: '16vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.12)
        .fromTo(bg, { scale: 1, opacity: 1 }, { scale: 1.05, opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(headline, { y: 0, opacity: 1 }, { y: '-14vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(circleCta, { x: 0, opacity: 1 }, { x: '14vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo([subheadline, sticker], { y: 0, opacity: 1 }, { y: '10vh', opacity: 0, ease: 'power2.in' }, 0.72);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-[70]">
      <div className="bg-image absolute inset-0">
        <img
          src="/for_you_bg.jpg"
          alt="For You"
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <h2 className="headline headline-lg absolute left-1/2 -translate-x-1/2 text-[#F6F6F6] text-center" style={{ top: '42vh' }}>
        FOR YOU
      </h2>

      <p className="subheadline absolute left-1/2 -translate-x-1/2 text-[#F6F6F6]/80 text-lg text-center max-w-md" style={{ top: '58vh' }}>
        Designed to move. Made to stand out.
      </p>

      <a href="#lookbook" className="circle-cta sticker-circle absolute animate-rotate-slow" style={{ right: '6vw', bottom: '8vh', width: '120px', height: '120px' }}>
        <span className="text-center leading-tight">Shop<br/>now</span>
      </a>

      <span className="sticker sticker-pill absolute" style={{ left: '6vw', bottom: '8vh' }}>
        ORIGINALS
      </span>
    </section>
  );
}

// Section 8: Lookbook Grid
function LookbookSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { addItem, setIsCartOpen } = useCart();
  const [filter, setFilter] = useState('All');

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.section-title'),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo(
        section.querySelectorAll('.product-card'),
        { y: 40, scale: 0.98, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setIsCartOpen(true);
  };

  return (
    <section ref={sectionRef} id="lookbook" className="bg-[#0B0B0C] py-24 px-6 md:px-12 z-[80] relative">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
        <h2 className="section-title headline-md text-[#F6F6F6]">LOOKBOOK</h2>
        <div className="flex flex-wrap gap-3">
          {['All', 'Tops', 'Bottoms', 'Outerwear'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide uppercase transition-all ${
                filter === cat
                  ? 'bg-[#B8FF3D] text-[#0B0B0C]'
                  : 'border border-[#F6F6F6]/30 text-[#F6F6F6] hover:border-[#F6F6F6]/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card group">
            <Link to={`/product/${product.id}`} className="block relative aspect-square rounded-[28px] overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            <Link to={`/product/${product.id}`}>
              <h3 className="text-[#F6F6F6] font-semibold hover:text-[#B8FF3D] transition-colors">{product.name}</h3>
            </Link>
            <div className="flex items-center justify-between mt-2">
              <p className="text-[#B8B8B8]">${product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="text-sm text-[#B8FF3D] hover:underline"
              >
                Quick Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Section 9: About
function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.about-title'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo(
        section.querySelectorAll('.value-block'),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const values = [
    { title: 'Small-batch drops', desc: 'Limited runs. Less waste. More exclusive.' },
    { title: 'Quality fabrics', desc: 'Heavyweight cotton, clean finishes, made to last.' },
    { title: 'Universal fit', desc: 'Relaxed cuts designed to feel good on every body.' },
  ];

  return (
    <section ref={sectionRef} id="about" className="bg-[#0B0B0C] py-24 px-6 md:px-12 z-[90] relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <h2 className="about-title headline-md text-[#F6F6F6]">BUILT<br/>DIFFERENT</h2>
          <div className="space-y-10">
            {values.map((value, i) => (
              <div key={i} className="value-block">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-sm bg-[#B8FF3D] mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-[#F6F6F6] font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-[#B8B8B8] leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 10: Size Guide
function SizeGuideSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.size-col'),
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo(
        section.querySelector('.care-col'),
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="size-guide" className="bg-[#0B0B0C] py-24 px-6 md:px-12 z-[100] relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="headline-md text-[#F6F6F6] mb-12">SIZE & CARE</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="size-col">
            <h3 className="text-[#F6F6F6] font-semibold mb-6">Size Guide (cm)</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#F6F6F6]/20">
                  <th className="text-left py-3 text-[#B8B8B8]">Size</th>
                  <th className="text-left py-3 text-[#B8B8B8]">Chest</th>
                  <th className="text-left py-3 text-[#B8B8B8]">Waist</th>
                  <th className="text-left py-3 text-[#B8B8B8]">Hip</th>
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
                    <td className="py-3">{size}</td>
                    <td className="py-3">{chest}</td>
                    <td className="py-3">{waist}</td>
                    <td className="py-3">{hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="care-col">
            <h3 className="text-[#F6F6F6] font-semibold mb-6">Care Instructions</h3>
            <ul className="space-y-3 text-[#B8B8B8] mb-10">
              <li>• Machine wash cold with similar colors</li>
              <li>• Do not bleach</li>
              <li>• Tumble dry low or hang dry</li>
              <li>• Iron on low heat if needed</li>
            </ul>

            <h3 className="text-[#F6F6F6] font-semibold mb-4">Shipping & Returns</h3>
            <p className="text-[#B8B8B8] mb-6">
              Free shipping on orders over $100. Returns accepted within 30 days of delivery.
            </p>

            <button className="btn-outline">Ask a question</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 11: Newsletter
function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.newsletter-content > *'),
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="bg-[#F2F2F0] py-24 px-6 md:px-12 z-[110] relative">
      <div className="newsletter-content max-w-xl mx-auto text-center">
        <h2 className="headline-md text-[#0B0B0C] mb-4">JOIN THE LIST</h2>
        <p className="text-[#2a2a2a] mb-8">
          Get early access to drops and exclusive offers.
        </p>

        {submitted ? (
          <div className="sticker-pill mx-auto">
            Thanks for subscribing!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 px-6 py-4 rounded-full bg-white border border-[#0B0B0C]/10 text-[#0B0B0C] placeholder:text-[#0B0B0C]/40 focus:outline-none focus:border-[#B8FF3D]"
              required
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        )}

        <p className="mt-8 text-[#2a2a2a]/70 text-sm">
          hello@gieoriginals.com
        </p>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-[#0B0B0C] py-16 px-6 md:px-12 z-[120] relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 mb-12">
          <div>
            <h3 className="text-3xl font-bold text-[#F6F6F6] mb-4">GIE</h3>
            <p className="text-[#B8B8B8] max-w-xs">
              Style is a statement. Make yours loud.
            </p>
          </div>

          <div className="flex flex-wrap gap-12">
            <div>
              <h4 className="text-[#F6F6F6] font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-[#B8B8B8]">
                <li><a href="#lookbook" className="hover:text-[#B8FF3D] transition-colors">All Products</a></li>
                <li><a href="#lookbook" className="hover:text-[#B8FF3D] transition-colors">New Arrivals</a></li>
                <li><a href="#lookbook" className="hover:text-[#B8FF3D] transition-colors">Best Sellers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#F6F6F6] font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-[#B8B8B8]">
                <li><a href="#" className="hover:text-[#B8FF3D] transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-[#B8FF3D] transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-[#B8FF3D] transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#F6F6F6] font-semibold mb-4">Social</h4>
              <ul className="space-y-2 text-[#B8B8B8]">
                <li><a href="#" className="hover:text-[#B8FF3D] transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-[#B8FF3D] transition-colors">TikTok</a></li>
                <li><a href="#" className="hover:text-[#B8FF3D] transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#F6F6F6]/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-[#B8B8B8]">
          <p>© 2026 GIE Originals. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#F6F6F6] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#F6F6F6] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main HomePage Component
export default function HomePage() {
  useEffect(() => {
    const setupSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    };

    const timer = setTimeout(setupSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      <div className="grain-overlay" />
      <Navigation />
      <CartDrawer />
      <main className="relative">
        <HeroSection />
        <NewArrivalsSection />
        <BeOriginalSection />
        <NewStyleSection />
        <NewCollectionSection />
        <NewDropSection />
        <ForYouSection />
        <LookbookSection />
        <AboutSection />
        <SizeGuideSection />
        <NewsletterSection />
        <Footer />
      </main>
    </div>
  );
}
