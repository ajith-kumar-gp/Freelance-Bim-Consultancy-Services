import React, { useState, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Award, ChevronLeft, ChevronRight, Layers, Eye } from 'lucide-react';

export interface ProjectImage {
  title: string;
  caption?: string;
  type?: string;
  url: string;
}

export interface ProjectData {
  title: string;
  category: string;
  industry: string;
  location: string;
  year: string;
  image: string;
  images?: ProjectImage[];
  description: string;
  highlight: string;
  order?: number;
}

export interface ProjectCardProps {
  project: ProjectData;
  onOpenModal: (project: ProjectData, initialImageIndex?: number) => void;
  key?: React.Key;
}

export function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const imagesList: ProjectImage[] = (project.images && project.images.length > 0)
    ? project.images
    : [{ title: project.title, caption: project.industry, type: 'Overview', url: project.image }];

  const [currentIdx, setCurrentIdx] = useState(0);

  const prevSlide = (e: MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const nextSlide = (e: MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
  };

  const currentImage = imagesList[currentIdx];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      onClick={() => onOpenModal(project, currentIdx)}
      className="group rounded-[2.2rem] glass-card shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 p-2.5 flex flex-col h-full cursor-pointer border border-white/50 dark:border-white/10"
      id={`project-card-${project.order ?? 0}`}
    >
      {/* Slideable Slideshow Header */}
      <div className="relative overflow-hidden h-[245px] rounded-[1.8rem] bg-navy-950/20 dark:bg-navy-950/60 select-none">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIdx}
            src={currentImage.url}
            alt={currentImage.title || project.title}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
          <span className="bg-navy-950/80 dark:bg-navy-950/90 text-accent-blue backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-bold shadow-sm">
            {project.category}
          </span>
          {imagesList.length > 1 && (
            <span className="bg-black/60 text-white backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold">
              {currentIdx + 1} / {imagesList.length}
            </span>
          )}
        </div>

        {/* Bottom Image Title Badge on Slide */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 flex items-end justify-between pointer-events-none">
          <div className="bg-navy-950/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl max-w-[85%] text-left">
            <span className="text-[9.5px] font-mono uppercase tracking-wider text-accent-blue font-bold block">
              {currentImage.type || 'Deliverable'}
            </span>
            <span className="text-xs font-sans font-medium text-white line-clamp-1">
              {currentImage.title}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <Eye size={14} />
          </div>
        </div>

        {/* Slide Controls (< Previous / Next >) */}
        {imagesList.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between z-20 pointer-events-none">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="pointer-events-auto w-8 h-8 rounded-full bg-navy-950/70 hover:bg-navy-950 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 shadow-md cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="pointer-events-auto w-8 h-8 rounded-full bg-navy-950/70 hover:bg-navy-950 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 shadow-md cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Slide Dots Indicator */}
        {imagesList.length > 1 && (
          <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-1 z-20 pointer-events-none">
            {imagesList.slice(0, 9).map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all ${
                  i === currentIdx
                    ? 'w-4 bg-accent-blue'
                    : 'w-1 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details Container */}
      <div className="p-5 flex flex-col gap-4 flex-grow text-slate-800 dark:text-slate-100">
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

        <div className="flex flex-col gap-1">
          <h3 className="font-sans font-bold text-lg text-slate-950 dark:text-white group-hover:text-blue-700 dark:group-hover:text-accent-blue transition-colors">
            {project.title}
          </h3>
          <span className="text-[10px] uppercase font-bold font-mono tracking-wider text-slate-400">
            Industry: {project.industry}
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light line-clamp-3">
          {project.description}
        </p>

        {/* Deliverables Count & View Prompt */}
        <div className="flex items-center justify-between text-xs font-mono font-bold text-blue-600 dark:text-accent-blue border-t border-slate-200/40 dark:border-white/10 pt-3">
          <span className="flex items-center gap-1.5">
            <Layers size={13} />
            <span>{imagesList.length} Technical Deliverables</span>
          </span>
          <span className="text-[11px] uppercase tracking-wider underline underline-offset-2">Inspect &rarr;</span>
        </div>

        {/* Outcome Metric Badge */}
        <div className="mt-auto">
          <div className="flex gap-2.5 items-start bg-white/40 dark:bg-navy-950/45 p-3 rounded-xl border border-white/40 dark:border-white/10">
            <Award size={14} className="text-blue-600 dark:text-accent-blue shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[9.5px] font-mono font-bold uppercase text-blue-600 dark:text-accent-blue tracking-wider leading-none">
                Outcome Metric
              </span>
              <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-snug">
                {project.highlight}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
