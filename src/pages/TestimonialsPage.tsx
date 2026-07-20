import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Quote, Star, PenTool, X, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import settingsData from '../content/settings.json';

// Dynamic import of all testimonial JSON files under /src/content/testimonials/
const testimonialModules = import.meta.glob('/src/content/testimonials/*.json', { eager: true });
const fileReviews = Object.values(testimonialModules)
  .map((m: any) => m.default || m);

export default function TestimonialsPage() {
  const [guestReviews, setGuestReviews] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    project: '',
    content: '',
    rating: 5
  });
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Load guest reviews from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bim_earth_guest_reviews');
      if (saved) {
        setGuestReviews(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load guest reviews from localStorage:', e);
    }
  }, []);

  // Merge CMS testimonials and guest reviews
  const allReviews = [...fileReviews, ...guestReviews];

  // Filter based on client settings (e.g. only show 5-star reviews or higher by default)
  const minRating = settingsData.minimumRatingToDisplay ?? 5;
  const filteredReviews = allReviews.filter((review) => {
    // Note: guest reviews are always shown locally so the guest can see their own,
    // but filtered globally based on rating. Let's apply standard filter:
    return review.rating >= minRating;
  });

  // Sort based on priority
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    // If prioritizeFiveStars is active, place 5-star ratings at the absolute top
    if (settingsData.prioritizeFiveStars ?? true) {
      if (a.rating === 5 && b.rating !== 5) return -1;
      if (a.rating !== 5 && b.rating === 5) return 1;
    }
    // Then sort by rating DESC
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    // Then by designated sorting order
    return (a.order ?? 10) - (b.order ?? 10);
  });

  // Handle Form Submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.content) return;

    const newReview = {
      ...formData,
      order: 100,
      isLocalGuest: true,
      id: `guest_${Date.now()}`
    };

    // Save to guest reviews array
    const updatedGuest = [newReview, ...guestReviews];
    setGuestReviews(updatedGuest);
    try {
      localStorage.setItem('bim_earth_guest_reviews', JSON.stringify(updatedGuest));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }

    // Submit to Netlify forms asynchronously
    try {
      const encodedData = new URLSearchParams({
        'form-name': 'testimonials-submissions',
        name: formData.name,
        role: formData.role,
        company: formData.company,
        project: formData.project,
        content: formData.content,
        rating: String(formData.rating)
      }).toString();

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodedData
      });
    } catch (err) {
      console.warn('Netlify Form submission skipped or failed. This is normal in dev environments.', err);
    }

    setFormSubmitted(true);
    
    // Reset form after delay
    setTimeout(() => {
      setIsModalOpen(false);
      setFormSubmitted(false);
      setFormData({
        name: '',
        role: '',
        company: '',
        project: '',
        content: '',
        rating: 5
      });
    }, 2500);
  };

  return (
    <div className="py-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 relative">
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-blue-600 dark:text-accent-blue uppercase">Client Feedback</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-slate-900 dark:text-white tracking-tight">
            Our Partners' <span className="font-bold text-blue-900 dark:text-accent-blue italic">Endorsements</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl font-light">
            A reflection of our commitment to seamless structural coordination, lifecycle BIM modeling, and aesthetic excellence.
          </p>

          {/* Action Row */}
          <div className="mt-4 flex flex-wrap gap-4 items-center justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 dark:bg-accent-blue text-white dark:text-navy-950 font-sans font-bold text-xs sm:text-sm rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-0.5"
            >
              <PenTool size={16} className="group-hover:rotate-12 transition-transform" />
              <span>Write a Review / Rating</span>
            </button>
            
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200/60 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>Review Filters Active (Min: {minRating} Stars)</span>
            </div>
          </div>
        </div>

        {/* Grid List of Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {sortedReviews.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-slate-50/50 dark:bg-white/5 rounded-3xl border border-slate-200/50 dark:border-white/5">
              <p className="text-slate-400 font-sans text-sm font-light">No reviews match the current display filter threshold ({minRating} Stars).</p>
            </div>
          ) : (
            sortedReviews.map((review, idx) => (
              <motion.div
                key={review.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(idx * 0.08, 0.4) }}
                whileHover={{ y: -4 }}
                className={`p-8 rounded-[2rem] glass-card shadow-sm flex flex-col gap-5 relative overflow-hidden group border ${
                  review.isLocalGuest 
                    ? 'border-blue-600/30 dark:border-accent-blue/30 bg-blue-900/5' 
                    : 'border-slate-200/40 dark:border-white/10'
                }`}
              >
                {/* Backdrops */}
                <div className="absolute top-6 right-8 text-slate-200/30 dark:text-navy-800/20 text-7xl font-serif select-none pointer-events-none group-hover:scale-110 transition-transform">
                  <Quote className="w-12 h-12" />
                </div>

                <div className="flex justify-between items-start relative z-10">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={15} 
                        fill={i < review.rating ? "currentColor" : "none"} 
                        stroke={i < review.rating ? "none" : "currentColor"} 
                        className="shrink-0"
                      />
                    ))}
                  </div>

                  {review.isLocalGuest && (
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase bg-blue-600/10 text-blue-700 dark:bg-accent-blue/15 dark:text-accent-blue px-2 py-0.5 rounded-md">
                      Your Submission
                    </span>
                  )}
                </div>

                {/* Review Statement */}
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed italic relative z-10 font-light">
                  "{review.content}"
                </p>

                {/* Sub-block detailing name and project connection */}
                <div className="border-t border-slate-200/40 dark:border-white/10 pt-4 mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 relative z-10">
                  <div className="flex flex-col text-left">
                    <span className="font-sans font-bold text-sm text-slate-900 dark:text-white">{review.name}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-light">
                      {review.role}{review.company ? ' — ' : ''}<span className="font-semibold text-blue-700 dark:text-accent-blue">{review.company}</span>
                    </span>
                  </div>
                  {review.project && (
                    <div className="inline-flex items-center gap-1.5 bg-white/30 dark:bg-navy-950/40 px-3.5 py-1.5 rounded-xl border border-white/40 dark:border-white/10 text-[10px] font-mono tracking-wider font-bold text-slate-600 dark:text-slate-300 uppercase">
                      <MessageSquare size={11} className="text-blue-500 dark:text-accent-blue" />
                      <span>{review.project}</span>
                    </div>
                  )}
                </div>

              </motion.div>
            ))
          )}
        </div>

      </div>

      {/* Netlify Form for static parsing bots */}
      <form name="testimonials-submissions" data-netlify="true" className="hidden">
        <input type="text" name="name" />
        <input type="text" name="role" />
        <input type="text" name="company" />
        <input type="text" name="project" />
        <textarea name="content"></textarea>
        <input type="number" name="rating" />
      </form>

      {/* Submission Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] bg-white dark:bg-navy-950 p-6 sm:p-10 shadow-2xl border border-slate-200/60 dark:border-white/10 flex flex-col gap-6 text-left z-10"
            >
              {/* Close Icon */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 p-2 rounded-full transition-colors"
                aria-label="Close form"
              >
                <X size={16} />
              </button>

              {/* Title Header */}
              <div className="flex gap-3 items-center border-b border-slate-100 dark:border-white/5 pb-4">
                <div className="bg-blue-600/10 text-blue-600 dark:text-accent-blue p-2.5 rounded-xl">
                  <HeartHandshake size={20} />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-lg text-slate-950 dark:text-white">Share Your Feedback</h3>
                  <p className="text-slate-400 text-xs font-light">Join the ranks of leading AEC innovators globally.</p>
                </div>
              </div>

              {formSubmitted ? (
                /* Success Statement */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center gap-4 text-center"
                >
                  <div className="text-emerald-500 bg-emerald-500/10 p-4 rounded-full">
                    <CheckCircle2 size={48} />
                  </div>
                  <h4 className="text-lg font-sans font-bold text-slate-950 dark:text-white">Submission Successful!</h4>
                  <p className="text-slate-400 text-xs sm:text-sm max-w-sm font-light leading-relaxed">
                    Thank you. Your review has been saved locally and sent to our team's moderation system. In compliance with our rating policy, 5-star items appear instantly!
                  </p>
                </motion.div>
              ) : (
                /* Active Form fields */
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                  
                  {/* Rating Selector */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Your Rating Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setFormData({ ...formData, rating: star })}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="text-slate-300 hover:text-amber-400 dark:hover:text-amber-500 p-1.5 transition-colors duration-150 cursor-pointer text-2xl focus:outline-none"
                        >
                          <Star
                            size={32}
                            fill={(hoverRating !== null ? star <= hoverRating : star <= formData.rating) ? "#f59e0b" : "none"}
                            stroke={(hoverRating !== null ? star <= hoverRating : star <= formData.rating) ? "#f59e0b" : "currentColor"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Grid Rows for Name & Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase text-slate-500 font-bold">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="p-3.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase text-slate-500 font-bold">Role / Title</label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="Lead BIM Engineer"
                        className="p-3.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  {/* Grid Rows for Company & Project */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase text-slate-500 font-bold">Company Name</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Global AEC Inc."
                        className="p-3.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase text-slate-500 font-bold">Connected Project</label>
                      <input
                        type="text"
                        value={formData.project}
                        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                        placeholder="Vertex Smart Tower"
                        className="p-3.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  {/* Review Box */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-500 font-bold">Your Review *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="BIM Earth caught all cross-disciplinary interferences, optimizing our execution time frame..."
                      className="p-3.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 resize-none"
                    />
                  </div>

                  {/* Security Compliance Note */}
                  <div className="text-[10px] text-slate-400 leading-relaxed bg-slate-50 dark:bg-white/5 p-3.5 rounded-xl border border-slate-100 dark:border-white/5">
                    <strong>Notice:</strong> We enforce an organizational review moderation filter. Only 5-star submissions or verified client accounts will display globally. Other feedback undergoes structural verification.
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-blue-900 dark:bg-accent-blue text-white dark:text-navy-950 font-sans font-bold text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl cursor-pointer text-center"
                  >
                    Transmit Feedback
                  </button>

                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
