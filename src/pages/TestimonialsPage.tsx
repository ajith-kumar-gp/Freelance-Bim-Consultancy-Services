import { motion } from 'motion/react';
import { MessageSquare, Quote, Star } from 'lucide-react';

// Dynamic import of all testimonial JSON files under /src/content/testimonials/
const testimonialModules = import.meta.glob('/src/content/testimonials/*.json', { eager: true });
const reviewsList = Object.values(testimonialModules)
  .map((m: any) => m.default || m)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

export default function TestimonialsPage() {
  return (
    <div className="py-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-blue-600 dark:text-accent-blue uppercase">Client Feedback</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-slate-900 dark:text-white tracking-tight">
            Our Partners' <span className="font-bold text-blue-900 dark:text-accent-blue italic">Endorsements</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl font-light">
            A reflection of our commitment to seamless structural coordination and aesthetic excellence.
          </p>
        </div>

        {/* Grid List of Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {reviewsList.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-8 rounded-[2rem] glass-card shadow-sm flex flex-col gap-5 relative overflow-hidden group"
            >
              {/* Backdrops */}
              <div className="absolute top-6 right-8 text-slate-200/50 dark:text-navy-800/30 text-7xl font-serif select-none pointer-events-none group-hover:scale-110 transition-transform">
                <Quote className="w-12 h-12" />
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" stroke="none" />
                ))}
              </div>

              {/* Review Statement */}
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed italic relative z-10 font-light">
                "{review.content}"
              </p>

              {/* Sub-block detailing name and project connection */}
              <div className="border-t border-slate-200/40 dark:border-white/10 pt-4 mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 relative z-10">
                <div className="flex flex-col">
                  <span className="font-sans font-bold text-sm text-slate-900 dark:text-white">{review.name}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-light">
                    {review.role} — <span className="font-semibold text-blue-700 dark:text-accent-blue">{review.company}</span>
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
          ))}
        </div>

      </div>
    </div>
  );
}
