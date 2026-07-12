import { motion } from 'motion/react';
import { Award, Briefcase, MessageSquare, GraduationCap } from 'lucide-react';
import founderData from '../content/founder.json';

export default function FounderPage() {
  return (
    <div className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Page Title */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-blue-600 dark:text-accent-blue uppercase">The Leadership</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-slate-900 dark:text-white tracking-tight">
            Meet Our <span className="font-bold text-blue-900 dark:text-accent-blue italic">Founder</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl font-light">
            Pioneering the intersection of virtual modeling and architectural aesthetics.
          </p>
        </div>

        {/* Profile Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Photo & Basic Details */}
          <div className="lg:col-span-5 flex flex-col gap-5 lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-[2.5rem] glass-card p-2 shadow-xl">
              <img 
                src={founderData.photo} 
                alt={founderData.name} 
                className="w-full h-[450px] object-cover rounded-[2rem] hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-center lg:text-left px-4">
              <h2 className="text-2xl font-sans font-extrabold text-slate-950 dark:text-white">{founderData.name}</h2>
              <p className="text-xs font-mono font-bold text-blue-600 dark:text-accent-blue tracking-widest uppercase mt-1">{founderData.title}</p>
            </div>
          </div>

          {/* Biography, Qualifications & Experience */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            
            {/* Biography */}
            <div className="flex flex-col gap-4">
              <h3 className="font-sans font-bold text-xl text-slate-900 dark:text-white border-b border-slate-200/30 dark:border-white/10 pb-2">Biography</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
                {founderData.biography}
              </p>
            </div>

            {/* Founder Message Quote */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2rem] glass-card shadow-sm border-l-4 border-blue-600 dark:border-accent-blue flex flex-col gap-4 relative overflow-hidden"
            >
              <div className="text-blue-600 dark:text-accent-blue">
                <MessageSquare size={24} />
              </div>
              <p className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm italic leading-relaxed font-light">
                "{founderData.message}"
              </p>
              <span className="text-xs font-mono font-bold text-blue-700 dark:text-accent-blue tracking-wider uppercase leading-none">— Dr. Marcus Vance, MIT Ph.D.</span>
            </motion.div>

            {/* Qualifications */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2 border-b border-slate-200/30 dark:border-white/10 pb-2">
                <GraduationCap size={20} className="text-blue-600 dark:text-accent-blue" />
                <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white">Credentials & Qualifications</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {founderData.qualifications.map((qual, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <div className="text-blue-500 dark:text-accent-blue shrink-0 mt-1">★</div>
                    <span className="font-light">{qual}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Professional Experience */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2 border-b border-slate-200/30 dark:border-white/10 pb-2">
                <Briefcase size={20} className="text-blue-600 dark:text-accent-blue" />
                <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white">Professional Experience Journey</h3>
              </div>
              <div className="flex flex-col gap-4">
                {founderData.experience.map((exp, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <div className="text-blue-500 dark:text-accent-blue shrink-0 mt-1">
                      <Award size={15} />
                    </div>
                    <span className="font-semibold">{exp}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </section>

      </div>
    </div>
  );
}
