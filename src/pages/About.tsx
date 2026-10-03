import { motion } from 'motion/react';
import { Compass, Target, ShieldCheck, Milestone, Award, Star, Mail, Linkedin, ExternalLink, Users, Briefcase, X, Clock, TrendingUp, Sparkles, ArrowUpRight } from 'lucide-react';
import aboutData from '../content/about.json';
import { AboutBimVisual } from '../components/AboutBimVisual';

// Dynamic imports of repeatable collections
const clientModules = import.meta.glob('/src/content/clients/*.json', { eager: true });
const clientsData = Object.values(clientModules)
  .map((m: any) => m.default || m)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

const certificationModules = import.meta.glob('/src/content/certifications/*.json', { eager: true });
const certificationsData = Object.values(certificationModules)
  .map((m: any) => m.default || m)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

// "2021 — Foundation → 2022 — Growth → ..." from the CMS, split into { year, label } steps
const journeySteps = (aboutData.journeySummary || '')
  .split('→')
  .map((part: string) => {
    const [year, ...rest] = part.split(/\s+[—–-]\s+/);
    return { year: year.trim(), label: rest.join(' — ').trim() };
  })
  .filter((step: { year: string; label: string }) => step.year);

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
            About <span className="font-bold text-blue-900 dark:text-accent-blue italic">BIM Earth Consultancy</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl font-light">
            Where innovation, precision, and collaboration come together to transform the Architecture, Engineering, and Construction (AEC) industry.
          </p>
        </div>

        {/* History Details */}
        <section id="about-us" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-12 flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-slate-900 dark:text-white">About Us</h2>
            <div className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed flex flex-col gap-4 font-light">
              <p>
                BIM Earth Consultancy, where innovation, precision, and collaboration come together to transform the Architecture, Engineering, and Construction (AEC) industry. We specialize in delivering high-quality Building Information Modeling (BIM) solutions that help clients design, construct, and manage projects more efficiently. BIM Earth Consultancy (BEC) was established in 2021 to serve the needs of AEC and Design/ build industry. With years of practice and experience in Building information modelling, BEC offers BIM services covering 3D BIM modelling, Clash detection, 4D scheduling and simulation, 5D cost estimation services and Facilities & Assets Information Management.
              </p>
              <p>
                At BIM Earth Consultancy, we believe that every successful project starts with accurate information and intelligent planning. Our team combines technical expertise with industry best practices to provide BIM services that improve coordination, reduce project risks, and optimize construction workflows. Today, we serve premium developers, government agencies, and corporate clients globally as a trusted multi-disciplinary consultancy, driving cost reductions of up to 18% and shortening design cycles by 30%.
              </p>
            </div>
          </div>
        </section>

        {/* Building Information Modeling Architectural Presentation */}
        <section className="w-full">
          <AboutBimVisual />
        </section>

        {/* Vision, Mission, Values */}
        <section id="vision-mission" className="scroll-mt-28 grid grid-cols-1 md:grid-cols-3 gap-8">
          
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
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
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
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
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
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              {aboutData.integrity || aboutData.valuesIntro}
            </p>
          </motion.div>

        </section>

        {/* Core Values Bullets */}
        <section id="core-values" className="scroll-mt-28 p-8 sm:p-10 rounded-[2.5rem] glass-card shadow-sm">
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
        <section id="our-journey" className="scroll-mt-28 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Milestone size={24} className="text-blue-600 dark:text-accent-blue" />
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 dark:text-white">Our Journey</h2>
            </div>
          </div>

          {/* Journey in One Line Ribbon */}
          {journeySteps.length > 0 && (
            <div className="p-5 sm:p-7 rounded-3xl glass-card bg-blue-600/5 dark:bg-accent-blue/5 border border-blue-600/20 dark:border-accent-blue/20">
              <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-blue-600 dark:text-accent-blue block mb-6">Our Journey in One Line</span>
              <ol className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-6">
                {/* Connecting line behind the year markers (single row on large screens) */}
                <div className="hidden lg:block absolute top-[18px] left-[8.33%] right-[8.33%] h-0.5 bg-gradient-to-r from-blue-600/30 via-blue-600/60 to-blue-600/30 dark:from-accent-blue/30 dark:via-accent-blue/60 dark:to-accent-blue/30" />
                {journeySteps.map((step, idx) => {
                  const isLast = idx === journeySteps.length - 1;
                  return (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className="relative flex flex-col items-center text-center gap-2 px-2"
                    >
                      <span className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center border-2 shadow-sm ${
                        isLast
                          ? 'bg-blue-600 border-blue-600 text-white dark:bg-accent-blue dark:border-accent-blue dark:text-navy-950'
                          : 'bg-white border-blue-600/40 text-blue-600 dark:bg-navy-950 dark:border-accent-blue/50 dark:text-accent-blue'
                      }`}>
                        <span className="w-2 h-2 rounded-full bg-current" />
                      </span>
                      <span className="font-mono font-bold text-sm text-blue-700 dark:text-accent-blue tracking-wider">{step.year}</span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug">{step.label}</span>
                    </motion.li>
                  );
                })}
              </ol>
            </div>
          )}

          <div className="relative border-l-2 border-blue-600/20 dark:border-accent-blue/20 ml-4 pl-8 flex flex-col gap-10 mt-2">
            {aboutData.milestones.map((milestone: any, idx: number) => (
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
                <div className="absolute -left-[41px] top-2 w-5 h-5 rounded-full bg-blue-600 dark:bg-accent-blue border-4 border-slate-50 dark:border-navy-950 flex items-center justify-center shadow-sm"></div>
                
                <div className="flex flex-col gap-2.5 max-w-3xl glass-card p-6 sm:p-7 rounded-2xl shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-extrabold text-blue-600 dark:text-accent-blue tracking-widest uppercase bg-blue-50 dark:bg-white/5 px-2.5 py-1 rounded-md">
                      {milestone.phase ? `${milestone.year} — ${milestone.phase}` : milestone.year}
                    </span>
                  </div>
                  <h4 className="font-sans font-bold text-base sm:text-lg text-slate-950 dark:text-white">{milestone.title}</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-light whitespace-pre-line">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Our Commitment Statement */}
          {aboutData.commitment && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-r from-blue-900 to-slate-900 dark:from-navy-900 dark:to-blue-950 text-white shadow-xl relative overflow-hidden border border-blue-500/20"
            >
              <div className="relative z-10 flex flex-col gap-3 max-w-3xl">
                <span className="text-xs font-mono uppercase font-bold tracking-[0.25em] text-accent-blue">Our Commitment</span>
                <p className="text-base sm:text-xl font-sans font-light italic leading-relaxed text-slate-100">
                  {aboutData.commitment}
                </p>
              </div>
            </motion.div>
          )}
        </section>

        {/* Certifications Section */}
        {certificationsData.length > 0 && (
          <section id="certifications" className="scroll-mt-28 flex flex-col gap-8">
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

        {/* Clients Section */}
        {clientsData.length > 0 && (
          <section id="clients" className="scroll-mt-28 flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <Briefcase size={24} className="text-blue-600 dark:text-accent-blue" />
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 dark:text-white">Our Trusted Corporate Clients</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 p-6 sm:p-8 rounded-[2.5rem] glass-card shadow-sm bg-white/20 dark:bg-navy-900/20 backdrop-blur-md">
              {clientsData.map((client: any, idx: number) => (
                <a
                  key={idx}
                  href={client.website || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={client.name}
                  className="flex flex-col items-center gap-3 group"
                >
                  {/* Logo tile stays white in dark mode so brand colours read correctly */}
                  <span className="w-full h-24 rounded-2xl bg-white border border-slate-200/80 dark:border-white/10 shadow-sm flex items-center justify-center px-5 py-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:border-blue-600/40 dark:group-hover:border-accent-blue/60">
                    {client.logo ? (
                      <img
                        src={client.logo}
                        alt={`${client.name} logo`}
                        loading="lazy"
                        className="max-h-14 max-w-full object-contain grayscale-[35%] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                      />
                    ) : (
                      // No logo uploaded yet: show the client's initials instead
                      <span className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50 text-blue-800 font-bold text-sm">
                        {client.name.split(/\s+/).filter((w: string) => /^[A-Za-z]/.test(w)).slice(0, 2).map((w: string) => w[0].toUpperCase()).join('')}
                      </span>
                    )}
                  </span>
                  <span className="text-xs font-sans font-semibold text-center text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{client.name}</span>
                </a>
              ))}
            </div>
          </section>
        )}

      </div>

    </div>
  );
}
