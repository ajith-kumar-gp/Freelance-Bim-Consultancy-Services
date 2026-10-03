import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import GalleryPage from './pages/GalleryPage';
import BlogPage from './pages/BlogPage';
import TestimonialsPage from './pages/TestimonialsPage';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import LegalPage from './pages/LegalPage';
import { isPageVisible } from './components/pageVisibility';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {isPageVisible('/about') && <Route path="/about" element={<About />} />}
          {isPageVisible('/services') && <Route path="/services" element={<ServicesPage />} />}
          {isPageVisible('/projects') && <Route path="/projects" element={<ProjectsPage />} />}
          {isPageVisible('/gallery') && <Route path="/gallery" element={<GalleryPage />} />}
          {isPageVisible('/blog') && <Route path="/blog" element={<BlogPage />} />}
          {isPageVisible('/testimonials') && <Route path="/testimonials" element={<TestimonialsPage />} />}
          <Route path="/booking" element={<BookingPage />} />
          {isPageVisible('/contact') && <Route path="/contact" element={<ContactPage />} />}
          {isPageVisible('/faq') && <Route path="/faq" element={<FAQPage />} />}
          <Route path="/legal" element={<LegalPage />} />
          
          {/* Fallback to homepage for any unmatched routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
