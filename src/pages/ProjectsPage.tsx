import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FolderOpen, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { ProjectCard, ProjectData } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';

// Dynamic import of all project JSON files under /src/content/projects/
const projectModules = import.meta.glob('/src/content/projects/*.json', { eager: true });
const projectsData: ProjectData[] = Object.values(projectModules)
  .map((m: any) => m.default || m)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

type CategoryFilter = 'All' | 'Architectural' | 'Interiors' | 'BIM';

export default function ProjectsPage() {
  const [filter, setFilter] = useState<CategoryFilter>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [modalInitialImageIdx, setModalInitialImageIdx] = useState<number>(0);

  const categories: CategoryFilter[] = ['All', 'Architectural', 'Interiors', 'BIM'];

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => {
        if (filter === 'Architectural') {
          return p.category === 'Architectural' || p.category === 'Architecture';
        }
        if (filter === 'Interiors') {
          return p.category === 'Interiors' || p.category === 'Interior Design';
        }
        if (filter === 'BIM') {
          return p.category === 'BIM' || p.category === 'BIM Services';
        }
        return p.category === filter;
      });

  const handleOpenProjectModal = (project: ProjectData, imageIndex: number = 0) => {
    setSelectedProject(project);
    setModalInitialImageIdx(imageIndex);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="py-20 px-6 relative z-10" id="projects-page-container">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Title */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-blue-600 dark:text-accent-blue uppercase">
            The Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-slate-900 dark:text-white tracking-tight">
            Our <span className="font-bold text-blue-900 dark:text-accent-blue italic">Projects</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl font-light leading-relaxed">
            A comprehensive showcasing of our engineering deliverables, transit corridors, institutional housing, commercial complexes, and material take-off schedules.
          </p>
        </div>

        {/* Filter Toolbar - Styled as a Frosted Pill Container */}
        <div className="flex justify-center mb-2">
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

        {/* Projects Count Indicator & Interactive Hint */}
        <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-500 px-2 gap-2">
          <span>
            Displaying: <strong className="text-blue-600 dark:text-accent-blue">{filter}</strong> ({filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'})
          </span>

        </div>

        {/* Projects Grid or Empty State */}
        {filteredProjects.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  onOpenModal={handleOpenProjectModal}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty State for Services without active items */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center p-12 sm:p-16 rounded-[2.5rem] glass-card text-center max-w-2xl mx-auto border border-white/40 dark:border-white/10 shadow-lg"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-navy-950 flex items-center justify-center text-blue-600 dark:text-accent-blue mb-4 shadow-inner">
              <FolderOpen size={30} />
            </div>
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-slate-900 dark:text-white mb-2">
              No Projects in {filter} Category
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-md mb-6">
              BIM Earth Consultancy is currently executing active contracts in this discipline. Detailed case studies and project documentation will be published shortly.
            </p>
            <button
              onClick={() => setFilter('All')}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white dark:bg-white dark:text-navy-950 dark:hover:bg-slate-100 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              <span>View All {projectsData.length} Projects</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        )}

      </div>

      {/* Full-Screen Project Detail & Deliverables Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          initialImageIndex={modalInitialImageIdx}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
