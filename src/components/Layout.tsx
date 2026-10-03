import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Sun, Moon, Phone, Mail, MapPin, Clock, ArrowUp, Compass, ChevronRight, ChevronDown
} from 'lucide-react';
import { navItems } from './navMenu';
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
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
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

  // On navigation: close menus, then scroll to the #section if the link has one, otherwise to the top
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenMenu(null);
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(location.hash.slice(1));
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;
    // The target may not be rendered yet right after a page change, so retry briefly
    const scrollToSection = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else if (attempts++ < 20) timer = setTimeout(scrollToSection, 50);
    };
    scrollToSection();
    return () => clearTimeout(timer);
  }, [location]);

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'FAQs', path: '/faq' },
    { name: 'Contact', path: '/contact' },
    { name: 'Book Consultation', path: '/booking' }
  ];

  const footerServices = [
    'Architectural BIM Services',
    'Structural BIM Services',
    'MEP BIM Services',
    'Clash Detection & Coordination',
    'Quantity Take-Off & BOQ',
    'BIM Training Programs'
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
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
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
              <span className="text-[8px] tracking-wider text-slate-500 dark:text-slate-400 font-mono italic mt-1 uppercase font-bold leading-none">
                We Build Future
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links with hover sub-menus */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-7" onKeyDown={(e) => e.key === 'Escape' && setOpenMenu(null)}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const isOpen = openMenu === item.name;
              return (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.name)}
                  onMouseLeave={() => setOpenMenu(null)}
                  onFocus={() => setOpenMenu(item.name)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenMenu(null);
                  }}
                >
                  <Link
                    to={item.path}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    className={`relative py-1 flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors ${
                      isActive || isOpen
                        ? 'text-navy-700 dark:text-accent-blue'
                        : 'text-navy-800/85 hover:text-navy-900 dark:text-slate-200 dark:hover:text-white'
                    }`}
                  >
                    {item.name}
                    <ChevronDown size={13} className={`hidden xl:block opacity-60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-navy-600 dark:bg-accent-blue rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.16 }}
                        // pt-4 keeps a hover "bridge" between the link and the panel
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50"
                      >
                        <div className={`${item.name === 'Blog' ? 'w-80' : 'w-60'} rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-900/10 p-2`}>
                          <span className="block px-3 pt-2 pb-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-accent-blue">
                            {item.name}
                          </span>
                          <ul className="flex flex-col">
                            {item.children.map((child) => (
                              <li key={child.to}>
                                <Link
                                  to={child.to}
                                  onClick={() => setOpenMenu(null)}
                                  className="group flex items-start gap-2 px-3 py-2 rounded-xl text-[13px] font-medium leading-snug text-slate-700 dark:text-slate-200 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-white/5 dark:hover:text-accent-blue focus:bg-blue-50 dark:focus:bg-white/5 outline-none transition-colors"
                                >
                                  <ChevronRight size={13} className="mt-0.5 shrink-0 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-accent-blue group-hover:translate-x-0.5 transition-all" />
                                  <span>{child.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* CTA & Dark Mode Toggle Container */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
            
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
            <div className="px-6 py-5 flex flex-col gap-3 max-h-[calc(100vh-80px)] overflow-y-auto">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const isExpanded = mobileExpanded === item.name;
                return (
                  <div key={item.path} className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <Link
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`py-1 text-base font-semibold transition-colors ${
                          isActive
                            ? 'text-navy-700 dark:text-accent-blue'
                            : 'text-navy-800/80 hover:text-navy-900 dark:text-slate-300 dark:hover:text-white'
                        }`}
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileExpanded(isExpanded ? null : item.name)}
                        className="p-1.5 -mr-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-navy-50 dark:hover:bg-white/5"
                        aria-label={`Show ${item.name} sections`}
                        aria-expanded={isExpanded}
                      >
                        <ChevronDown size={18} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden border-l-2 border-blue-600/20 dark:border-accent-blue/30 ml-1 pl-4 flex flex-col"
                        >
                          {item.children.map((child) => (
                            <li key={child.to}>
                              <Link
                                to={child.to}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-accent-blue transition-colors"
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
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
                <div className="flex flex-col">
                  <span className="font-sans font-extrabold tracking-widest text-lg text-white leading-none">
                    BIM EARTH
                  </span>
                  <span className="text-[8px] tracking-wider text-slate-400 font-mono italic mt-1 uppercase font-bold leading-none">
                    We Build Future
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Your trusted partner in Building Information Modelling — Architectural, Structural and MEP BIM services, multidisciplinary coordination and professional BIM training.
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
                Quick Links
              </h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
                {footerLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="group inline-flex items-center gap-1.5 text-slate-400 hover:text-accent-blue transition-colors"
                    >
                      <ChevronRight size={12} className="text-navy-600 group-hover:text-accent-blue group-hover:translate-x-0.5 transition-all" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="flex flex-col gap-4">
              <h4 className="font-sans font-bold text-sm text-white tracking-widest uppercase border-b border-navy-800 pb-2">
                Our Services
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs">
                {footerServices.map((service) => (
                  <li key={service}>
                    <Link
                      to="/services"
                      className="group inline-flex items-center gap-1.5 text-slate-400 hover:text-accent-blue transition-colors"
                    >
                      <ChevronRight size={12} className="text-navy-600 group-hover:text-accent-blue group-hover:translate-x-0.5 transition-all" />
                      <span>{service}</span>
                    </Link>
                  </li>
                ))}
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
