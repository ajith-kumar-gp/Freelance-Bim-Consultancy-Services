import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ChevronLeft, ChevronRight, MapPin, Calendar, Layers, Award, FileText, CheckCircle2, ArrowRight, Download, Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectData, ProjectImage } from './ProjectCard';

interface ProjectModalProps {
  project: ProjectData | null;
  initialImageIndex?: number;
  onClose: () => void;
}

export function ProjectModal({ project, initialImageIndex = 0, onClose }: ProjectModalProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(initialImageIndex);
  const [activeTab, setActiveTab] = useState<'viewer' | 'deliverables' | 'spec'>('viewer');

  useEffect(() => {
    setActiveImageIdx(initialImageIndex);
  }, [initialImageIndex, project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!project) return;
      const total = project.images?.length || 1;
      if (e.key === 'ArrowLeft') {
        setActiveImageIdx((prev) => (prev === 0 ? total - 1 : prev - 1));
      }
      if (e.key === 'ArrowRight') {
        setActiveImageIdx((prev) => (prev === total - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const imagesList: ProjectImage[] = (project.images && project.images.length > 0)
    ? project.images
    : [{ title: project.title, caption: project.industry, type: 'Overview', url: project.image }];

  const currentImage = imagesList[activeImageIdx] || imagesList[0];

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
        id="project-modal-backdrop"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-6xl bg-white dark:bg-navy-900 rounded-[2.5rem] shadow-2xl border border-white/60 dark:border-white/10 overflow-hidden flex flex-col max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="p-6 sm:px-8 border-b border-slate-100 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-navy-950/40">
            <div className="flex flex-col gap-1 pr-6">
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-accent-blue px-3 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-widest">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {imagesList.length} Technical Sheets / Files
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-sans font-bold text-slate-900 dark:text-white leading-tight">
                {project.title}
              </h2>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-slate-200/60 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-white transition-all cursor-pointer shrink-0"
              aria-label="Close Project Modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Navigation Tabs */}
          <div className="flex border-b border-slate-100 dark:border-white/10 px-6 sm:px-8 bg-slate-50/30 dark:bg-navy-950/20 gap-2 sm:gap-6 text-xs font-mono font-bold uppercase tracking-wider overflow-x-auto">
            <button
              onClick={() => setActiveTab('viewer')}
              className={`py-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'viewer'
                  ? 'border-blue-600 dark:border-accent-blue text-blue-600 dark:text-accent-blue'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
              }`}
            >
              <Eye size={14} />
              <span>Interactive Drawing Viewer ({activeImageIdx + 1}/{imagesList.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('deliverables')}
              className={`py-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'deliverables'
                  ? 'border-blue-600 dark:border-accent-blue text-blue-600 dark:text-accent-blue'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
              }`}
            >
              <Layers size={14} />
              <span>All {imagesList.length} Technical Deliverables</span>
            </button>
            <button
              onClick={() => setActiveTab('spec')}
              className={`py-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'spec'
                  ? 'border-blue-600 dark:border-accent-blue text-blue-600 dark:text-accent-blue'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
              }`}
            >
              <FileText size={14} />
              <span>Project Overview & Metrics</span>
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-6 sm:p-8 flex flex-col gap-8 flex-grow">
            {activeTab === 'viewer' && (
              <div className="flex flex-col gap-6">
                {/* Main Showcase Image Stage */}
                <div className="relative rounded-[2rem] overflow-hidden bg-navy-950 flex items-center justify-center min-h-[380px] max-h-[520px] shadow-inner border border-black/20">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImageIdx}
                      src={currentImage.url}
                      alt={currentImage.title}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="max-h-[500px] w-auto max-w-full object-contain select-none"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <span className="bg-navy-950/80 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-mono font-bold text-accent-blue uppercase">
                      {currentImage.type || 'Deliverable'}
                    </span>
                    <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-mono font-bold text-white">
                      Sheet {activeImageIdx + 1} of {imagesList.length}
                    </span>
                  </div>

                  {/* Left / Right Carousel Controls */}
                  {imagesList.length > 1 && (
                    <div className="absolute inset-y-0 inset-x-4 flex items-center justify-between z-20 pointer-events-none">
                      <button
                        onClick={prevImage}
                        aria-label="Previous Image"
                        className="pointer-events-auto w-11 h-11 rounded-full bg-navy-950/80 hover:bg-navy-950 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 shadow-lg cursor-pointer"
                      >
                        <ChevronLeft size={22} />
                      </button>
                      <button
                        onClick={nextImage}
                        aria-label="Next Image"
                        className="pointer-events-auto w-11 h-11 rounded-full bg-navy-950/80 hover:bg-navy-950 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 shadow-lg cursor-pointer"
                      >
                        <ChevronRight size={22} />
                      </button>
                    </div>
                  )}

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col gap-1 text-white">
                    <span className="text-base sm:text-lg font-sans font-bold text-white flex items-center gap-2">
                      <span>{currentImage.title}</span>
                    </span>
                    {currentImage.caption && (
                      <p className="text-xs sm:text-sm text-slate-300 font-light">
                        {currentImage.caption}
                      </p>
                    )}
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Select Deliverable / Take-Off Drawing:
                  </span>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                    {imagesList.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIdx(idx)}
                        className={`relative rounded-2xl overflow-hidden shrink-0 w-24 sm:w-32 h-16 sm:h-20 border-2 transition-all cursor-pointer ${
                          activeImageIdx === idx
                            ? 'border-blue-600 dark:border-accent-blue shadow-md scale-105'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={img.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-navy-950/30 flex items-end p-1">
                          <span className="text-[9px] font-mono text-white font-bold truncate">
                            {idx + 1}. {img.title.replace(/\.(jpg|png|PNG|JPG)$/, '')}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'deliverables' && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-sans font-bold text-slate-900 dark:text-white">
                    Technical Drawing Sheets & Material Take-Off Schedules
                  </h3>
                  <span className="text-xs font-mono text-blue-600 dark:text-accent-blue font-bold">
                    Total: {imagesList.length} Files
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {imagesList.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setActiveImageIdx(idx);
                        setActiveTab('viewer');
                      }}
                      className="p-4 rounded-2xl glass-card flex flex-col gap-3 hover:shadow-md transition-all cursor-pointer border border-slate-200/50 dark:border-white/10 group hover:-translate-y-0.5"
                    >
                      <div className="relative h-32 rounded-xl overflow-hidden bg-navy-950/10">
                        <img
                          src={img.url}
                          alt={img.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-2 left-2 bg-navy-950/80 text-accent-blue backdrop-blur-md px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase">
                          {img.type || 'Deliverable'}
                        </span>
                        <span className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-0.5 rounded-md text-[9px] font-mono">
                          #{idx + 1}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h4 className="font-sans font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-accent-blue transition-colors">
                          {img.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-light line-clamp-2">
                          {img.caption || 'High-precision BIM deliverable extracted from authoring models.'}
                        </p>
                      </div>
                      <button className="mt-auto inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-blue-600 dark:text-accent-blue uppercase tracking-wider group-hover:underline">
                        <span>Open High-Res Viewer</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'spec' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-accent-blue">
                      Project Executive Summary
                    </span>
                    <h3 className="text-xl sm:text-2xl font-sans font-bold text-slate-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light mt-1">
                      {project.description}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-navy-950/60 border border-blue-100 dark:border-white/10 flex flex-col gap-3">
                    <span className="text-xs font-mono font-bold text-blue-800 dark:text-accent-blue uppercase tracking-wider flex items-center gap-2">
                      <Award size={16} />
                      <span>Verified Outcome Benchmark</span>
                    </span>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                      {project.highlight}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-4 p-6 rounded-2xl glass-card border border-slate-200/50 dark:border-white/10">
                  <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200/40 dark:border-white/10 pb-2">
                    Project Parameters
                  </h4>
                  <div className="flex flex-col gap-3 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                      <span className="text-slate-400 font-mono">Discipline Category</span>
                      <span className="font-bold text-slate-800 dark:text-white">{project.category}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                      <span className="text-slate-400 font-mono">Industry Sector</span>
                      <span className="font-bold text-slate-800 dark:text-white">{project.industry}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                      <span className="text-slate-400 font-mono">Location</span>
                      <span className="font-bold text-slate-800 dark:text-white">{project.location}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                      <span className="text-slate-400 font-mono">Execution Period</span>
                      <span className="font-bold text-slate-800 dark:text-white">{project.year}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400 font-mono">Deliverables Count</span>
                      <span className="font-bold text-blue-600 dark:text-accent-blue">{imagesList.length} Drawing / Schedule Sheets</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer CTA */}
          <div className="p-4 sm:px-8 border-t border-slate-100 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50 dark:bg-navy-950/40">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <CheckCircle2 size={15} className="text-blue-600 dark:text-accent-blue" />
              <span>Full LOD 100 - LOD 500 Project Dossier Available on Request</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-white/10 transition-all cursor-pointer"
              >
                Close
              </button>
              <Link
                to="/booking"
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-accent-blue dark:text-navy-950 dark:hover:bg-white text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                <span>Consult On Similar Project</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
