import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Image as ImageIcon } from 'lucide-react';

// Dynamic import of all gallery JSON files under /src/content/gallery/
const galleryModules = import.meta.glob('/src/content/gallery/*.json', { eager: true });
const galleryData = Object.values(galleryModules)
  .map((m: any) => m.default || m)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

type GalleryCategory = 'All' | 'Architecture' | 'Interior Design' | 'BIM';

export default function GalleryPage() {
  const [filter, setFilter] = useState<GalleryCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories: GalleryCategory[] = ['All', 'Architecture', 'Interior Design', 'BIM'];

  const filteredImages = filter === 'All' 
    ? galleryData 
    : galleryData.filter(img => img.category === filter);

  return (
    <div className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-blue-600 dark:text-accent-blue uppercase">Visual Library</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-slate-900 dark:text-white tracking-tight">
            Our <span className="font-bold text-blue-900 dark:text-accent-blue italic">Gallery</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl font-light">
            Inspect our detailed mechanical routings, structural steel configurations, and luxury interior spaces.
          </p>
        </div>

        {/* Filter Controls - Styled as a Frosted Pill Container */}
        <div className="flex justify-center mb-4">
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl w-full glass-card p-2 rounded-2xl shadow-inner">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer relative flex-1 text-center justify-center flex items-center min-w-[100px] ${
                  filter === cat 
                    ? 'text-blue-900 dark:text-accent-blue font-extrabold' 
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium'
                }`}
              >
                <span>{cat}</span>
                {filter === cat && (
                  <motion.div 
                    layoutId="activeGalleryFilter"
                    className="absolute inset-0 bg-white/60 dark:bg-navy-900/60 rounded-xl -z-10 shadow-sm border border-white/40 dark:border-white/5"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((item, idx) => (
              <motion.div
                layout
                key={item.image}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                onClick={() => setLightboxIndex(idx)}
                className="break-inside-avoid relative rounded-[2.2rem] overflow-hidden border border-white/40 dark:border-white/10 shadow-sm hover:shadow-xl group cursor-pointer p-2 glass-card mb-6 block"
              >
                <div className="rounded-[1.8rem] overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.caption} 
                    className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Overlay Hover details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 rounded-[1.8rem]">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold tracking-widest text-accent-blue uppercase block">{item.category}</span>
                        <span className="font-sans font-bold text-sm text-white mt-1 block">{item.caption}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/10">
                        <Search size={16} />
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6"
            >
              
              {/* Close Button */}
              <button 
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 text-slate-300 hover:text-white p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors"
                aria-label="Close Lightbox"
              >
                <X size={22} />
              </button>

              <div className="max-w-5xl w-full flex flex-col gap-4">
                
                {/* Showcase image */}
                <motion.div 
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl relative bg-navy-900/40 flex justify-center p-2 glass-card"
                >
                  <img 
                    src={filteredImages[lightboxIndex].image} 
                    alt={filteredImages[lightboxIndex].caption} 
                    className="max-h-[75vh] w-auto object-contain rounded-[1.8rem]"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Captions */}
                <div className="flex justify-between items-center text-slate-300 text-sm border-t border-white/10 pt-4 px-2">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-accent-blue">{filteredImages[lightboxIndex].category}</span>
                    <span className="font-sans font-semibold text-base text-white">{filteredImages[lightboxIndex].caption}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                    <ImageIcon size={14} className="text-accent-blue" />
                    <span>{lightboxIndex + 1} / {filteredImages.length}</span>
                  </div>
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
