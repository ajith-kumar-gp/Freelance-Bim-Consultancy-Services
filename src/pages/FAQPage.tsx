import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Search, ChevronDown, ChevronUp } from 'lucide-react';

// Dynamic import of all FAQ JSON files under /src/content/faqs/
const faqModules = import.meta.glob('/src/content/faqs/*.json', { eager: true });
const faqData = Object.values(faqModules)
  .map((m: any) => m.default || m)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

type FAQCategory = 'All' | 'Architecture' | 'Interior Design' | 'BIM' | 'General';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('All');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const categories: FAQCategory[] = ['All', 'Architecture', 'Interior Design', 'BIM', 'General'];

  const toggleAccordion = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  // Filter items
  const filteredItems = faqData.filter((item) => {
    const matchesSearch = 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      activeCategory === 'All' || 
      item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-20 px-6 relative z-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Title */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-blue-600 dark:text-accent-blue uppercase">Knowledge Hub</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-slate-900 dark:text-white tracking-tight">
            Frequently Asked <span className="font-bold text-blue-900 dark:text-accent-blue italic">Questions</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl font-light">
            Get immediate answers about our BIM level-of-development metrics, digital twins, and architectural modeling systems.
          </p>
        </div>

        {/* Search Bar - Glass styled */}
        <div className="relative max-w-lg mx-auto w-full">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type keywords to search (e.g. LOD, Clash, Price)..."
            className="w-full px-5 py-4 pl-12 rounded-2xl border border-white/50 dark:border-white/10 bg-white/40 dark:bg-navy-950/40 text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-accent-blue text-sm shadow-sm backdrop-blur-md"
          />
          <Search size={18} className="absolute left-4.5 top-4.5 text-slate-400" />
        </div>

        {/* Category filters - Styled as a Frosted Pill Container */}
        <div className="flex justify-center mb-4">
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl w-full glass-card p-2 rounded-2xl shadow-inner">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setExpandedIndex(null); // Reset expand on category change
                }}
                className={`px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer relative flex-1 text-center justify-center flex items-center min-w-[100px] ${
                  activeCategory === cat 
                    ? 'text-blue-900 dark:text-accent-blue font-extrabold' 
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium'
                }`}
              >
                <span>{cat}</span>
                {activeCategory === cat && (
                  <motion.div 
                    layoutId="activeFaqFilter"
                    className="absolute inset-0 bg-white/60 dark:bg-navy-900/60 rounded-xl -z-10 shadow-sm border border-white/40 dark:border-white/5"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-4 mt-2 min-h-[300px]">
          {filteredItems.length > 0 ? (
            filteredItems.map((faq, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-white/40 dark:border-white/10 bg-white/30 dark:bg-navy-900/30 backdrop-blur-md overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 hover:bg-white/30 dark:hover:bg-navy-950/20 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle size={18} className="text-blue-600 dark:text-accent-blue shrink-0" />
                      <span className="font-sans font-semibold text-sm sm:text-base text-slate-900 dark:text-white">{faq.question}</span>
                    </div>
                    <div className="text-slate-400 shrink-0">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 border-t border-slate-200/30 dark:border-white/5 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                          <p className="whitespace-pre-line font-light">{faq.answer}</p>
                          <div className="inline-flex items-center gap-1.5 mt-4 text-[9.5px] font-mono font-extrabold tracking-widest text-blue-900 dark:text-accent-blue uppercase bg-white/40 dark:bg-navy-950/40 px-2.5 py-1 rounded-xl">
                            Category: {faq.category}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 flex flex-col items-center gap-3">
              <span className="text-3xl">🔍</span>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">No questions matching your queries were found.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
