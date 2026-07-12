import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Scale, ShieldCheck } from 'lucide-react';
import legalData from '../content/legal.json';

type LegalTab = 'privacy' | 'terms';

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState<LegalTab>('privacy');

  return (
    <div className="py-20 px-6 relative z-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-blue-600 dark:text-accent-blue uppercase">Compliance</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-slate-900 dark:text-white tracking-tight">
            Legal <span className="font-bold text-blue-900 dark:text-accent-blue italic">Policies</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl font-light">
            Review the privacy covenants and corporate terms governing our digital building consultancy.
          </p>
        </div>

        {/* Tab Selection - Styled as a Frosted Pill Container */}
        <div className="flex justify-center">
          <div className="flex gap-2 max-w-md w-full justify-center glass-card p-2 rounded-2xl shadow-inner">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer relative flex-1 text-center justify-center ${
                activeTab === 'privacy' 
                  ? 'text-blue-900 dark:text-accent-blue font-extrabold' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium'
              }`}
            >
              <ShieldCheck size={14} className="text-blue-600 dark:text-accent-blue shrink-0" />
              <span>Privacy</span>
              {activeTab === 'privacy' && (
                <motion.div 
                  layoutId="activeLegalTab"
                  className="absolute inset-0 bg-white/60 dark:bg-navy-900/60 rounded-xl -z-10 shadow-sm border border-white/40 dark:border-white/5"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer relative flex-1 text-center justify-center ${
                activeTab === 'terms' 
                  ? 'text-blue-900 dark:text-accent-blue font-extrabold' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium'
              }`}
            >
              <Scale size={14} className="text-blue-600 dark:text-accent-blue shrink-0" />
              <span>Terms</span>
              {activeTab === 'terms' && (
                <motion.div 
                  layoutId="activeLegalTab"
                  className="absolute inset-0 bg-white/60 dark:bg-navy-900/60 rounded-xl -z-10 shadow-sm border border-white/40 dark:border-white/5"
                />
              )}
            </button>
          </div>
        </div>

        {/* Policy Text Display */}
        <motion.section 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-8 sm:p-10 rounded-[2.5rem] glass-card shadow-lg flex flex-col gap-6"
        >
          {activeTab === 'privacy' ? (
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-sans font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="text-blue-600 dark:text-accent-blue shrink-0" />
                <span>{legalData.privacyTitle}</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line text-justify font-light">
                {legalData.privacyContent}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-sans font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldAlert className="text-blue-600 dark:text-accent-blue shrink-0" />
                <span>{legalData.termsTitle}</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line text-justify font-light">
                {legalData.termsContent}
              </p>
            </div>
          )}
        </motion.section>

      </div>
    </div>
  );
}
