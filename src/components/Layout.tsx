import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Sun, Moon, Phone, Mail, MapPin, Clock, ArrowUp, Compass
} from 'lucide-react';
import contactData from '../content/contact.json';
import settingsData from '../content/settings.json';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Founder', path: '/founder' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-navy-950 transition-colors duration-300 relative overflow-hidden">
      
      {/* Dynamic Background Glow Blobs for the Frosted Glass Theme */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[30%] left-[-150px] w-[600px] h-[600px] bg-indigo-600/10 dark:bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute top-[35%] right-[-180px] w-[450px] h-[450px] bg-cyan-600/10 dark:bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-100px] right-[10%] w-[500px] h-[500px] bg-blue-700/10 dark:bg-blue-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Top Header Contact Bar */}
      <div className="hidden lg:block bg-navy-900 dark:bg-navy-950 text-slate-300 py-2 border-b border-navy-800/60 text-xs transition-colors duration-300 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-accent-blue transition-colors">
              <Phone size={13} className="text-accent-blue" />
              <span>{contactData.phone}</span>
            </span>
            <span className="flex items-center gap-1.5 hover:text-accent-blue transition-colors">
              <Mail size={13} className="text-accent-blue" />
              <span>{contactData.email}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-accent-blue" />
              <span>{contactData.hoursWeekdays}</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent-blue transition-colors font-medium">LinkedIn</a>
            <span className="text-navy-700">|</span>
            <a href={contactData.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent-blue transition-colors font-medium">Instagram</a>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Sticky Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass-nav shadow-lg py-3 border-b border-navy-100 dark:border-navy-900/50' 
          : 'bg-white/30 dark:bg-navy-950/35 backdrop-blur-md border-b border-white/40 dark:border-white/10 py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            {settingsData.logo ? (
              <img 
                src={settingsData.logo} 
                alt="BIM Earth Logo" 
                className="w-10 h-10 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-10 h-10 bg-blue-900 dark:bg-accent-blue rounded-lg flex items-center justify-center shadow-lg group-hover:rotate-45 transition-transform duration-300">
                <div className="w-5 h-5 border-2 border-white dark:border-navy-950 rotate-45"></div>
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-sans font-extrabold tracking-widest text-lg text-blue-900 dark:text-white leading-none">
                BIM EARTH
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-700/80 dark:text-accent-blue -mt-0.5 font-mono">
                Consultancy
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`relative py-1 text-sm font-semibold tracking-wide transition-colors ${
                    isActive 
                      ? 'text-navy-700 dark:text-accent-blue' 
                      : 'text-navy-800/85 hover:text-navy-900 dark:text-slate-200 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavIndicator" 
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-navy-600 dark:bg-accent-blue rounded-full" 
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Dark Mode Toggle Container */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Dark Mode Toggle */}
            <button 
              id="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-navy-100 dark:border-navy-800/60 text-navy-800 dark:text-slate-300 hover:bg-navy-50 dark:hover:bg-navy-900/60 transition-all cursor-pointer"
              aria-label="Toggle theme mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Book Consult CTA */}
            <Link 
              id="nav-cta-btn"
              to="/booking" 
              className="bg-navy-800 dark:bg-white text-white dark:text-navy-950 hover:bg-navy-900 dark:hover:bg-slate-100 px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Consult
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-3">
            
            {/* Theme Toggle Mobile */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-navy-100 dark:border-navy-800/60 text-navy-800 dark:text-slate-300 hover:bg-navy-50 dark:hover:bg-navy-900/60 transition-all"
              aria-label="Toggle theme mode"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Mobile Menu Open Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-navy-800 dark:text-slate-300 hover:bg-navy-50 dark:hover:bg-navy-900/60 transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden glass-nav border-b border-navy-100 dark:border-navy-900/60 sticky top-[68px] z-40 overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-1 text-base font-semibold transition-colors ${
                      isActive 
                        ? 'text-navy-700 dark:text-accent-blue' 
                        : 'text-navy-800/80 hover:text-navy-900 dark:text-slate-300 dark:hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link 
                to="/booking" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-navy-800 dark:bg-white text-white dark:text-navy-950 py-3 rounded-lg text-sm font-semibold tracking-wide shadow-md block mt-2"
              >
                Book Consult
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow grid-bg transition-colors duration-300">
        {children}
      </main>

      {/* Professional Corporate Footer */}
      <footer className="bg-navy-950 text-slate-300 pt-16 pb-8 border-t border-navy-900/60 text-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            {/* Column 1: Brand details */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-accent-blue p-1.5 rounded-lg text-navy-950">
                  <Compass size={18} strokeWidth={2.5} />
                </div>
                <span className="font-sans font-extrabold tracking-widest text-lg text-white">
                  BIM EARTH
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Elite corporate multi-disciplinary consultancy providing state-of-the-art Architectural design, luxury Interior execution, and lifecycle Level 2 & 3 BIM coordination.
              </p>
              <div className="flex items-center gap-3.5 mt-2">
                <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-navy-900 hover:bg-accent-blue hover:text-navy-950 text-slate-300 transition-all shadow-sm">
                  <span className="font-semibold text-xs">LN</span>
                </a>
                <a href={contactData.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-navy-900 hover:bg-accent-blue hover:text-navy-950 text-slate-300 transition-all shadow-sm">
                  <span className="font-semibold text-xs">IG</span>
                </a>
                <a href={contactData.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-navy-900 hover:bg-accent-blue hover:text-navy-950 text-slate-300 transition-all shadow-sm">
                  <span className="font-semibold text-xs">TW</span>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="flex flex-col gap-4">
              <h4 className="font-sans font-bold text-sm text-white tracking-widest uppercase border-b border-navy-800 pb-2">
                Consultancy
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link to="/" className="hover:text-accent-blue transition-colors">Home</Link>
                <Link to="/about" className="hover:text-accent-blue transition-colors">About Us</Link>
                <Link to="/services" className="hover:text-accent-blue transition-colors">Services</Link>
                <Link to="/projects" className="hover:text-accent-blue transition-colors">Portfolio</Link>
                <Link to="/gallery" className="hover:text-accent-blue transition-colors">Gallery</Link>
                <Link to="/founder" className="hover:text-accent-blue transition-colors">The Founder</Link>
                <Link to="/faq" className="hover:text-accent-blue transition-colors">FAQs</Link>
                <Link to="/testimonials" className="hover:text-accent-blue transition-colors">Testimonials</Link>
              </div>
            </div>

            {/* Column 3: Corporate Services */}
            <div className="flex flex-col gap-4">
              <h4 className="font-sans font-bold text-sm text-white tracking-widest uppercase border-b border-navy-800 pb-2">
                Specialties
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
                <li>Architectural Masterplanning</li>
                <li>Commercial Facade Design</li>
                <li>Luxury Interior space planning</li>
                <li>LOD 500 BIM digital twin compilation</li>
                <li>MEP Clash-Detection & Resolution</li>
                <li>High-Rise Structural Modeling</li>
              </ul>
            </div>

            {/* Column 4: Address Details */}
            <div className="flex flex-col gap-4">
              <h4 className="font-sans font-bold text-sm text-white tracking-widest uppercase border-b border-navy-800 pb-2">
                Office Headquarters
              </h4>
              <div className="flex flex-col gap-3 text-xs text-slate-400">
                <span className="flex items-start gap-2">
                  <MapPin size={15} className="text-accent-blue shrink-0" />
                  <span>{contactData.address}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Phone size={15} className="text-accent-blue shrink-0" />
                  <span>{contactData.phone}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Mail size={15} className="text-accent-blue shrink-0" />
                  <span>{contactData.email}</span>
                </span>
                <div className="border-t border-navy-900 pt-3 flex flex-col gap-1 text-[11px]">
                  <span className="text-white font-medium">Business Hours:</span>
                  <span>{contactData.hoursWeekdays}</span>
                  <span>{contactData.hoursWeekends}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Sub-footer copyright / Legal policy links */}
          <div className="border-t border-navy-900 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <span>&copy; {new Date().getFullYear()} BIM EARTH CONSULTANCY. All rights reserved.</span>
            <div className="flex items-center gap-5">
              <Link to="/legal" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <span>|</span>
              <Link to="/legal" className="hover:text-slate-300 transition-colors">Terms & Conditions</Link>
              <span>|</span>
              <a href="/admin/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-blue transition-colors text-slate-400 font-semibold">CMS Panel</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA Widgets (WhatsApp and Back To Top) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        
        {/* Floating WhatsApp Chat */}
        <motion.a 
          href={contactData.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-colors"
          title="Chat with us on WhatsApp"
        >
          {/* Quick SVG of Whatsapp Icon */}
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.474 2.012 14.019 1.01 11.4 1.01c-5.439 0-9.866 4.372-9.87 9.802 0 1.761.487 3.479 1.412 5.021L1.964 21.05l5.223-1.354c-.161-.09-.452-.256-.54-.312z" />
          </svg>
        </motion.a>

        {/* Back To Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-navy-800 dark:bg-white text-white dark:text-navy-950 p-3.5 rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-colors border border-navy-700 dark:border-navy-100 hover:bg-navy-900 dark:hover:bg-slate-100"
              title="Back to Top"
            >
              <ArrowUp size={18} strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}
