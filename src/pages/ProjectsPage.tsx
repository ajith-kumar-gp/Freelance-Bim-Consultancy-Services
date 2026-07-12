import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Award } from 'lucide-react';

// Dynamic import of all project JSON files under /src/content/projects/
const projectModules = import.meta.glob('/src/content/projects/*.json', { eager: true });
const projectsData = Object.values(projectModules)
  .map((m: any) => m.default || m)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

type CategoryFilter = 'All' | 'Architecture' | 'Interior Design' | 'BIM Services';

export default function ProjectsPage() {
  const [filter, setFilter] = useState<CategoryFilter>('All');

  const categories: CategoryFilter[] = ['All', 'Architecture', 'Interior Design', 'BIM Services'];

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <div className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Title */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-blue-600 dark:text-accent-blue uppercase">The Portfolio</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-slate-900 dark:text-white tracking-tight">
            Our <span className="font-bold text-blue-900 dark:text-accent-blue italic">Projects</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl font-light">
            A showcasing of our high-fidelity designs, coordinated structures, and virtual twins.
          </p>
        </div>

        {/* Filter Toolbar - Styled as a Frosted Pill Container */}
        <div className="flex justify-center mb-4">
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl w-full glass-card p-2 rounded-2xl shadow-inner">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4.5 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer relative flex-1 text-center justify-center flex items-center min-w-[120px] ${
                  filter === cat 
                    ? 'text-blue-900 dark:text-accent-blue font-extrabold' 
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium'
                }`}
              >
                <span>{cat}</span>
                {filter === cat && (
                  <motion.div 
                    layoutId="activeFilterIndicator"
                    className="absolute inset-0 bg-white/60 dark:bg-navy-900/60 rounded-xl -z-10 shadow-sm border border-white/40 dark:border-white/5"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group rounded-[2.2rem] glass-card shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 p-2 flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-[240px] rounded-[1.8rem]">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/40 dark:bg-navy-950/55 backdrop-blur-md border border-white/40 dark:border-white/10 px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase text-blue-900 dark:text-accent-blue font-bold">
                    {project.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col gap-4 flex-grow text-slate-800 dark:text-slate-100">
                  <div className="flex flex-wrap gap-y-1 gap-x-4 text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-blue-600 dark:text-accent-blue" />
                      <span>{project.location}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-blue-600 dark:text-accent-blue" />
                      <span>{project.year}</span>
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-sans font-bold text-lg text-slate-950 dark:text-white group-hover:text-blue-700 dark:group-hover:text-accent-blue transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-[10px] uppercase font-bold font-mono tracking-wider text-slate-400">Industry: {project.industry}</span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light line-clamp-4">
                    {project.description}
                  </p>

                  <div className="border-t border-slate-200/40 dark:border-white/10 pt-4 mt-auto">
                    <div className="flex gap-2 items-start bg-white/30 dark:bg-navy-950/40 p-3.5 rounded-xl border border-white/40 dark:border-white/10">
                      <Award size={15} className="text-blue-600 dark:text-accent-blue shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-mono font-bold uppercase text-blue-600 dark:text-accent-blue tracking-wider leading-none">Outcome Metric</span>
                        <span className="text-[11.5px] font-semibold text-slate-700 dark:text-slate-300 leading-tight">{project.highlight}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
