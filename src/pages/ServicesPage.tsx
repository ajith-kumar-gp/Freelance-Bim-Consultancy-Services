import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building, LayoutGrid, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import servicesData from '../content/services.json';

type ServiceKey = 'architecture' | 'interior' | 'bim';

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<ServiceKey>('architecture');

  const tabs = [
    { key: 'architecture', label: 'Architecture', icon: Building },
    { key: 'interior', label: 'Interior Design', icon: LayoutGrid },
    { key: 'bim', label: 'BIM Engineering', icon: Cpu }
  ] as const;

  const currentService = servicesData[activeTab];

  return (
    <div className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Title Block */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-blue-600 dark:text-accent-blue uppercase">Consultancy Suite</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-slate-900 dark:text-white tracking-tight">
            Professional <span className="font-bold text-blue-900 dark:text-accent-blue italic">Services</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl font-light">
            Unifying premium aesthetics, digital twin precision, and architectural lifecycle stewardship.
          </p>
        </div>

        {/* Tab Controls - Styled as a Frosted Pill Container */}
        <div className="flex justify-center mb-4">
          <div className="flex flex-wrap justify-center gap-2 max-w-xl w-full glass-card p-2 rounded-2xl shadow-inner">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer relative flex-1 justify-center ${
                    isActive 
                      ? 'text-blue-900 dark:text-accent-blue font-extrabold' 
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium'
                  }`}
                >
                  <Icon size={15} />
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeServiceTabIndicator"
                      className="absolute inset-0 bg-white/60 dark:bg-navy-900/60 rounded-xl -z-10 shadow-sm border border-white/40 dark:border-white/5"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Detailed Content */}
        <AnimatePresence mode="wait">
          <motion.section 
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-4"
          >
            
            {/* Left Column: Details & Sub-services */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              
              <div className="flex flex-col gap-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-accent-blue">{currentService.subtitle}</span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-semibold text-slate-950 dark:text-white leading-tight">{currentService.title}</h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mt-2 font-light">{currentService.description}</p>
              </div>

              {/* Sub-services mapping */}
              <div className="flex flex-col gap-6">
                <h3 className="font-sans font-bold text-base text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-200/40 dark:border-white/10 pb-2">Specialized Disciplines</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {currentService.subServices.map((sub, sidx) => (
                    <div 
                      key={sidx}
                      className="p-6 rounded-[1.8rem] glass-card flex flex-col gap-3 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    >
                      <h4 className="font-sans font-bold text-base text-slate-900 dark:text-white">{sub.name}</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-light">{sub.description}</p>
                      
                      <div className="border-t border-slate-200/30 dark:border-white/10 pt-3 mt-auto flex flex-col gap-2">
                        <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-accent-blue uppercase tracking-wider block">Key Deliverables:</span>
                        {sub.features.map((feature, fidx) => (
                          <div key={fidx} className="flex gap-2 items-start text-xs text-slate-600 dark:text-slate-300 font-medium">
                            <CheckCircle2 size={13} className="text-blue-500 dark:text-accent-blue shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual & Consult Prompters */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl glass-card p-2">
                <img 
                  src={currentService.image} 
                  alt={currentService.title} 
                  className="w-full h-[320px] object-cover rounded-[2rem]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Consultation prompt card */}
              <div className="p-8 rounded-[2.2rem] bg-gradient-to-br from-blue-950/90 to-slate-900/90 backdrop-blur-md text-white flex flex-col gap-4 shadow-xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                <h4 className="font-sans font-extrabold text-lg text-white relative z-10">Need a Corporate Quotation?</h4>
                <p className="text-slate-300 text-xs leading-relaxed font-light relative z-10">
                  Connect with our lead coordinators to schedule a parameterized virtual assessment mapping your project's unique architectural and engineering variables.
                </p>
                <Link 
                  to="/booking" 
                  className="inline-flex items-center justify-center gap-2 bg-accent-blue hover:bg-white text-navy-950 font-bold text-xs tracking-widest uppercase py-4 px-6 rounded-xl transition-all shadow-md mt-2 relative z-10 hover:-translate-y-0.5"
                >
                  <span>Book Consultation Session</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </motion.section>
        </AnimatePresence>

        {/* Unified Service Schematic (The uploaded services photo) */}
        <div className="mt-16 pt-16 border-t border-slate-200/50 dark:border-white/10 flex flex-col gap-8">
          <div className="text-center flex flex-col items-center gap-3">
            <span className="text-xs font-mono font-bold tracking-[0.3em] text-blue-600 dark:text-accent-blue uppercase">Service Blueprint</span>
            <h3 className="text-3xl font-sans font-light text-slate-900 dark:text-white tracking-tight">
              Official Service <span className="font-bold text-blue-900 dark:text-accent-blue">Portfolio Schematic</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl font-light">
              Below is the official conceptual architecture mapping our integrated lifecycle services across Residential, Commercial, and high-fidelity BIM networks.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto w-full glass-card p-4 rounded-[2.5rem] shadow-xl border border-white/40 dark:border-white/10 flex justify-center">
            <div className="relative group overflow-hidden rounded-[2rem] w-full bg-navy-950/5 dark:bg-white/5 flex justify-center items-center">
              <img 
                src="/services_photo.jpeg" 
                alt="BIM Earth Consultancy Service Portfolio" 
                className="w-full h-auto object-contain max-h-[500px] rounded-[2rem] transition-all duration-500 group-hover:scale-[1.01]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-6">
                <p className="text-white text-xs font-mono tracking-wider">Official BIM Earth Services Mapping Schema</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
