import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import FounderPage from './pages/FounderPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import GalleryPage from './pages/GalleryPage';
import BlogPage from './pages/BlogPage';
import TestimonialsPage from './pages/TestimonialsPage';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import LegalPage from './pages/LegalPage';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/founder" element={<FounderPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/legal" element={<LegalPage />} />
          
          {/* Fallback to homepage for any unmatched routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
