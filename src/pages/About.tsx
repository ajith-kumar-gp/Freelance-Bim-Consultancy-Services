import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Target, ShieldCheck, Milestone, Award, Star, Mail, Linkedin, ExternalLink, Users, Briefcase, X, Clock, TrendingUp, Sparkles, ArrowUpRight } from 'lucide-react';
import aboutData from '../content/about.json';

// Dynamic imports of repeatable collections
const teamModules = import.meta.glob('/src/content/team-members/*.json', { eager: true });
const teamData = Object.values(teamModules)
  .map((m: any) => m.default || m)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

const clientModules = import.meta.glob('/src/content/clients/*.json', { eager: true });
const clientsData = Object.values(clientModules)
  .map((m: any) => m.default || m)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

const certificationModules = import.meta.glob('/src/content/certifications/*.json', { eager: true });
const certificationsData = Object.values(certificationModules)
  .map((m: any) => m.default || m)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

const iconMap: { [key: string]: any } = {
  ShieldCheck,
  Compass,
  Award,
  Star,
  Users,
  Briefcase
};

export default function About() {
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const timelineVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: (idx: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: idx * 0.12 }
    })
  };

  return (
    <div className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        
        {/* Banner Section */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-blue-600 dark:text-accent-blue uppercase">The Enterprise</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-slate-900 dark:text-white tracking-tight">
            About <span className="font-bold text-blue-900 dark:text-accent-blue italic">BIM Earth</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl font-light">
            Pioneering digital building synchronization and structural architecture since 2012.
          </p>
        </div>

        {/* History Details */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-slate-900 dark:text-white">Our Corporate Legacy</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
              {aboutData.history}
            </p>
          </div>
          <div className="lg:col-span-5 relative rounded-[2.5rem] overflow-hidden shadow-xl glass-card p-2">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" 
              alt="BIM Earth skyscraper structural facade" 
              className="w-full h-[360px] object-cover rounded-[2rem]"
              referrerPolicy="no-referrer"
            />
          </div>
        </section>

        {/* Vision, Mission, Values */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-8 rounded-[2rem] glass-card shadow-sm flex flex-col gap-4"
          >
            <div className="text-blue-900 dark:text-accent-blue bg-white/40 dark:bg-navy-950/40 p-3 rounded-xl w-fit shadow-sm">
              <Compass size={22} />
            </div>
            <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white">Our Corporate Vision</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-light">
              {aboutData.vision}
            </p>
          </motion.div>

          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-8 rounded-[2rem] glass-card shadow-sm flex flex-col gap-4"
          >
            <div className="text-blue-900 dark:text-accent-blue bg-white/40 dark:bg-navy-950/40 p-3 rounded-xl w-fit shadow-sm">
              <Target size={22} />
            </div>
            <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white">Our Professional Mission</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-light">
              {aboutData.mission}
            </p>
          </motion.div>

          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-8 rounded-[2rem] glass-card shadow-sm flex flex-col gap-4"
          >
            <div className="text-blue-900 dark:text-accent-blue bg-white/40 dark:bg-navy-950/40 p-3 rounded-xl w-fit shadow-sm">
              <ShieldCheck size={22} />
            </div>
            <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white">Our Corporate Integrity</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-light">
              {aboutData.valuesIntro}
            </p>
          </motion.div>

        </section>

        {/* Core Values Bullets */}
        <section className="p-8 sm:p-10 rounded-[2.5rem] glass-card shadow-sm">
          <h3 className="font-sans font-bold text-xl text-slate-900 dark:text-white mb-6">Our Core Governing Pillars</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aboutData.values.map((val, idx) => (
              <div key={idx} className="flex gap-2.5 items-start">
                <Star size={14} className="text-blue-600 dark:text-accent-blue shrink-0 mt-1" />
                <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">{val}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Chronological Journey Timeline */}
        <section className="flex flex-col gap-10">
          <div className="flex items-center gap-3">
            <Milestone size={24} className="text-blue-600 dark:text-accent-blue" />
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 dark:text-white">Our Chronological Timeline</h2>
          </div>
          <div className="relative border-l border-slate-200 dark:border-white/10 ml-4 pl-8 flex flex-col gap-10">
            {aboutData.milestones.map((milestone, idx) => (
              <motion.div 
                key={idx}
                custom={idx}
                variants={timelineVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline node */}
                <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-blue-600 dark:bg-accent-blue border-4 border-slate-50 dark:border-navy-950 flex items-center justify-center"></div>
                
                <div className="flex flex-col gap-1.5 max-w-3xl glass-card p-6 rounded-2xl shadow-sm">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-accent-blue tracking-widest">{milestone.year}</span>
                  <h4 className="font-sans font-bold text-base sm:text-lg text-slate-950 dark:text-white">{milestone.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-light">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Corporate Achievements */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Award size={24} className="text-blue-600 dark:text-accent-blue" />
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 dark:text-white">Key Achievements & Merits</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutData.achievements.map((ach: any, idx: number) => (
              <motion.button
                key={idx}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedAchievement(ach)}
                className="p-6 rounded-2xl glass-card shadow-sm flex gap-4 items-center text-left hover:border-blue-600/30 dark:hover:border-accent-blue/30 group transition-colors duration-300 w-full"
              >
                <div className="bg-amber-500/10 text-amber-500 p-3 rounded-xl shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                  <Star size={20} />
                </div>
                <div className="flex flex-col flex-grow gap-1">
                  <span className="text-xs sm:text-sm text-slate-850 dark:text-slate-200 font-bold tracking-tight leading-tight group-hover:text-blue-900 dark:group-hover:text-accent-blue transition-colors duration-200">{ach.title || ach}</span>
                  <span className="text-[10px] font-mono uppercase text-slate-400 group-hover:text-slate-500 transition-colors duration-200 flex items-center gap-1">
                    <span>Click to view statistics & timeline</span>
                    <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        {certificationsData.length > 0 && (
          <section className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <ShieldCheck size={24} className="text-blue-600 dark:text-accent-blue" />
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 dark:text-white">Certifications & Compliance</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {certificationsData.map((cert: any, idx: number) => {
                const CertIcon = iconMap[cert.logo_or_icon] || Award;
                return (
                  <div key={idx} className="p-6 rounded-2xl glass-card shadow-sm flex gap-4 items-start">
                    <div className="bg-blue-500/10 text-blue-600 dark:text-accent-blue p-3 rounded-xl shrink-0">
                      <CertIcon size={20} />
                    </div>
                    <div className="flex flex-col gap-1 flex-grow">
                      <span className="text-[10px] font-mono font-bold uppercase text-blue-600 dark:text-accent-blue tracking-wider">{cert.issuer} ({cert.year})</span>
                      <h4 className="font-sans font-bold text-sm sm:text-base text-slate-950 dark:text-white leading-tight">{cert.title}</h4>
                      {cert.verification_url && (
                        <a 
                          href={cert.verification_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-blue-700 dark:hover:text-accent-blue mt-2 transition-colors"
                        >
                          <span>Verify compliance</span>
                          <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Team Members Section */}
        {teamData.length > 0 && (
          <section className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <Users size={24} className="text-blue-600 dark:text-accent-blue" />
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 dark:text-white">Meet Our Leadership Team</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamData.map((member: any, idx: number) => (
                <div 
                  key={idx} 
                  className="rounded-[2rem] p-2 glass-card hover:shadow-lg transition-all flex flex-col h-full bg-white/30 dark:bg-navy-900/30 overflow-hidden group"
                >
                  <div className="relative rounded-[1.7rem] overflow-hidden h-[240px]">
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h4 className="font-sans font-bold text-lg text-slate-950 dark:text-white">{member.name}</h4>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-accent-blue mb-3">{member.role}</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-4">{member.bio}</p>
                    
                    <div className="border-t border-slate-200/40 dark:border-white/10 pt-4 mt-auto flex items-center gap-3 text-slate-400">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-accent-blue transition-colors">
                          <Linkedin size={16} />
                        </a>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="hover:text-blue-600 dark:hover:text-accent-blue transition-colors">
                          <Mail size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Clients Section */}
        {clientsData.length > 0 && (
          <section className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <Briefcase size={24} className="text-blue-600 dark:text-accent-blue" />
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 dark:text-white">Our Trusted Corporate Clients</h2>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 p-8 sm:p-10 rounded-[2.5rem] glass-card shadow-sm bg-white/20 dark:bg-navy-900/20 backdrop-blur-md">
              {clientsData.map((client: any, idx: number) => (
                <a 
                  key={idx} 
                  href={client.website || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group transition-transform hover:-translate-y-1"
                >
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="w-14 h-14 rounded-full object-cover shadow-inner border border-white/40 dark:border-white/10 group-hover:border-blue-600 dark:group-hover:border-accent-blue transition-colors"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[11px] font-sans font-semibold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{client.name}</span>
                </a>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Interactive Achievements Merits Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAchievement(null)}
              className="absolute inset-0 bg-slate-950/65 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-4xl max-h-[85vh] md:max-h-[80vh] overflow-y-auto rounded-[2.5rem] bg-white dark:bg-navy-950 p-6 sm:p-10 shadow-2xl border border-slate-200/60 dark:border-white/10 flex flex-col gap-8 text-left z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-5 right-5 sm:top-8 sm:right-8 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 p-2.5 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Header Info */}
              <div className="flex gap-4 items-start pr-10">
                <div className="bg-amber-500/10 text-amber-500 p-3 rounded-2xl shrink-0">
                  <Award size={28} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-600 dark:text-accent-blue font-bold">Achievement Credentials</span>
                  <h3 className="text-xl sm:text-2xl font-sans font-bold text-slate-950 dark:text-white leading-tight">
                    {selectedAchievement.title}
                  </h3>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Panel: Big Statistics and Description */}
                <div className="lg:col-span-6 flex flex-col gap-6">
                  {/* Big Stat Box */}
                  <div className="p-6 rounded-[2rem] bg-gradient-to-br from-blue-900/5 to-blue-900/15 dark:from-white/5 dark:to-white/10 border border-blue-900/10 dark:border-white/5 flex flex-col gap-2 relative overflow-hidden">
                    <span className="text-4xl sm:text-5xl font-sans font-extrabold tracking-tight text-blue-900 dark:text-accent-blue leading-none">
                      {selectedAchievement.statValue}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                      {selectedAchievement.statLabel}
                    </span>
                    <div className="absolute right-4 bottom-4 opacity-5 text-blue-900 dark:text-white pointer-events-none">
                      <TrendingUp size={80} />
                    </div>
                  </div>

                  {/* Narrative Stats Breakdown */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
                      <Sparkles size={12} className="text-amber-500" />
                      <span>Corporate Narrative</span>
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                      {selectedAchievement.description}
                    </p>
                  </div>
                </div>

                {/* Right Panel: Timelines and Milestones */}
                <div className="lg:col-span-6 flex flex-col gap-8">
                  {/* Milestones Card */}
                  {selectedAchievement.milestones && selectedAchievement.milestones.length > 0 && (
                    <div className="flex flex-col gap-4">
                      <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
                        <Star size={12} className="text-blue-500 dark:text-accent-blue" />
                        <span>Key Milestones Reached</span>
                      </span>
                      <div className="flex flex-col gap-3">
                        {selectedAchievement.milestones.map((milestone: string, mIdx: number) => (
                          <div key={mIdx} className="flex gap-3 items-start text-left bg-slate-50/50 dark:bg-white/5 p-3 rounded-xl border border-slate-100 dark:border-white/5">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-accent-blue shrink-0 mt-2"></div>
                            <span className="text-xs text-slate-700 dark:text-slate-300 font-light">{milestone}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timeline Progression */}
                  {selectedAchievement.timeline && selectedAchievement.timeline.length > 0 && (
                    <div className="flex flex-col gap-4">
                      <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
                        <Clock size={12} className="text-blue-500 dark:text-accent-blue" />
                        <span>Chronological Progress</span>
                      </span>
                      <div className="relative border-l border-slate-200 dark:border-white/10 ml-2 pl-4 flex flex-col gap-4">
                        {selectedAchievement.timeline.map((step: string, tIdx: number) => (
                          <div key={tIdx} className="relative">
                            <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-blue-600 dark:bg-accent-blue"></div>
                            <span className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed block">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

              </div>
              
              {/* Footer Credentials */}
              <div className="border-t border-slate-200/50 dark:border-white/5 pt-4 mt-auto flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                <span>© BIM Earth Digital Audit Credentials</span>
                <span>Security Verified • Level 500 Compliant</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
