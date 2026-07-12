import { motion } from 'motion/react';
import { Compass, Target, ShieldCheck, Milestone, Award, Star, Mail, Linkedin, ExternalLink, Users, Briefcase } from 'lucide-react';
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
            {aboutData.achievements.map((ach, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl glass-card shadow-sm flex gap-4 items-center"
              >
                <div className="bg-amber-500/10 text-amber-500 p-2.5 rounded-xl shrink-0">
                  <Star size={18} />
                </div>
                <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold">{ach}</span>
              </div>
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
    </div>
  );
}
