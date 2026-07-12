import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Building, LayoutGrid, Cpu, CheckCircle2, Shield, ArrowRight, UserCheck, MessageSquare, Award
} from 'lucide-react';
import homepageData from '../content/homepage.json';
import servicesData from '../content/services.json';

// Dynamic folder collections imports
const projectModules = import.meta.glob('/src/content/projects/*.json', { eager: true });
const projectsList = Object.values(projectModules)
  .map((m: any) => m.default || m)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

const testimonialModules = import.meta.glob('/src/content/testimonials/*.json', { eager: true });
const testimonialsList = Object.values(testimonialModules)
  .map((m: any) => m.default || m)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

const faqModules = import.meta.glob('/src/content/faqs/*.json', { eager: true });
const faqsList = Object.values(faqModules)
  .map((m: any) => m.default || m)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

export default function Home() {
  
  // Slide animation helpers
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="flex flex-col relative z-10">
      
      {/* 1. Large Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-transparent px-6 py-20 border-b border-white/20 dark:border-white/5">
        
        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 grid-bg opacity-30 z-0"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-white/40 dark:bg-navy-950/45 backdrop-blur-md border border-white/60 dark:border-white/10 px-4 py-2 rounded-full text-xs font-mono font-bold tracking-widest text-blue-900 dark:text-accent-blue uppercase w-fit shadow-sm"
            >
              <Cpu size={14} className="animate-pulse text-blue-600 dark:text-accent-blue" />
              <span>LOD 500 BIM & Engineering Architecture</span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-7xl font-sans font-light tracking-tight leading-[1.1] text-slate-900 dark:text-white"
            >
              Engineering the <span className="font-bold text-blue-900 dark:text-accent-blue italic">digital twin</span> of tomorrow.
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-light"
            >
              {homepageData.heroSubtitle}
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4 mt-4"
            >
              <Link 
                to="/booking" 
                className="bg-blue-600 hover:bg-blue-700 dark:bg-accent-blue dark:text-navy-950 dark:hover:bg-white text-white px-8 py-4 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 dark:shadow-accent-blue/10 transition-all hover:-translate-y-0.5"
              >
                {homepageData.ctaText}
              </Link>
              <Link 
                to="/projects" 
                className="bg-white/50 backdrop-blur-sm border border-slate-200 dark:border-white/10 hover:bg-white text-slate-900 dark:text-white dark:bg-navy-900/40 px-8 py-4 rounded-xl font-bold text-sm shadow-sm transition-all hover:bg-white/10"
              >
                View Our Portfolio
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Geometric Mockup/Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 relative"
          >
            {/* Soft decorative blur ring */}
            <div className="absolute -inset-2 bg-blue-600/10 dark:bg-accent-blue/10 rounded-[2.5rem] blur opacity-50 animate-pulse"></div>
            
            <div className="relative overflow-hidden rounded-[2rem] border border-white/60 dark:border-white/10 shadow-2xl glass-card p-2.5">
              <div className="rounded-[1.5rem] overflow-hidden relative">
                <img 
                  src={homepageData.heroImage} 
                  alt="BIM Earth Corporate Facility" 
                  className="w-full h-[390px] object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Glassmorphic Overlay Badge */}
                <div className="absolute bottom-5 left-5 right-5 glass-panel p-5 rounded-2xl border border-white/40 text-slate-950 dark:text-white flex items-center justify-between shadow-xl">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-blue-800 dark:text-accent-blue font-mono block mb-1">Featured Project</span>
                    <span className="font-sans font-extrabold text-sm text-slate-900 dark:text-white">The Vertex Commercial Tower</span>
                  </div>
                  <Link to="/projects" className="text-blue-900 dark:text-accent-blue hover:text-white p-2.5 rounded-xl bg-white/60 dark:bg-navy-950/60 hover:bg-blue-600 dark:hover:bg-navy-900 transition-colors shadow-sm">
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. Statistics Counter Section */}
      <section className="relative py-14 bg-transparent border-b border-white/20 dark:border-white/5 transition-colors duration-300 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl glass-card transition-all shadow-sm flex flex-col justify-center items-center"
            >
              <h3 className="text-3xl sm:text-4xl font-mono font-extrabold text-blue-900 dark:text-accent-blue">{homepageData.stat1_num}</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-slate-500 mt-2">{homepageData.stat1_label}</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl glass-card transition-all shadow-sm flex flex-col justify-center items-center"
            >
              <h3 className="text-3xl sm:text-4xl font-mono font-extrabold text-blue-900 dark:text-accent-blue">{homepageData.stat2_num}</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-slate-500 mt-2">{homepageData.stat2_label}</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl glass-card transition-all shadow-sm flex flex-col justify-center items-center"
            >
              <h3 className="text-3xl sm:text-4xl font-mono font-extrabold text-blue-900 dark:text-accent-blue">{homepageData.stat3_num}</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-slate-500 mt-2">{homepageData.stat3_label}</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl glass-card transition-all shadow-sm flex flex-col justify-center items-center"
            >
              <h3 className="text-3xl sm:text-4xl font-mono font-extrabold text-blue-900 dark:text-accent-blue">{homepageData.stat4_num}</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-slate-500 mt-2">{homepageData.stat4_label}</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. Company Overview Section */}
      <section className="relative py-24 px-6 bg-transparent transition-colors duration-300 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <span className="text-xs font-mono font-bold tracking-[0.3em] text-blue-600 dark:text-accent-blue uppercase">Who We Are</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-light text-slate-900 dark:text-white tracking-tight leading-[1.2]">
              An Architectural Design Studio Infused with <span className="font-bold text-blue-900 dark:text-accent-blue italic">Engineering Precision</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              BIM Earth Consultancy represents the pinnacle of multi-disciplinary structural coordination. We operate at the intersection of creative building envelope design and robust engineering logic.
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-light">
              Our unique unified process ensures that spatial luxury, energy conservation, structural longevity, and mechanical piping are fully resolved inside a rich virtual model before on-site steel is cast. We bring transparency, schedule certainty, and immense architectural beauty to our corporate clients.
            </p>
            <div className="mt-2">
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-accent-blue hover:underline"
              >
                <span>Read Our Corporate Journey</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-6 relative rounded-[2.5rem] overflow-hidden shadow-xl glass-card p-2"
          >
            <img 
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80" 
              alt="BIM Engineering Office" 
              className="w-full h-[380px] object-cover rounded-[2rem]"
              referrerPolicy="no-referrer"
            />
          </motion.div>

        </div>
      </section>

      {/* 4. Services Preview Section */}
      <section className="relative py-24 px-6 bg-transparent transition-colors duration-300 z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <span className="text-xs font-mono font-bold tracking-[0.3em] text-blue-600 dark:text-accent-blue uppercase">Core Competencies</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-light text-slate-900 dark:text-white tracking-tight">Our Professional Services Suite</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl font-light">
              We coordinate three critical building lifecycles directly, ensuring single-point-of-contact structural delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Architecture Card - Glassmorphic */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="p-8 rounded-[2.5rem] glass-card flex flex-col gap-5 transition-all shadow-sm"
            >
              <div className="w-12 h-12 bg-white dark:bg-navy-950 rounded-2xl flex items-center justify-center shadow-md">
                <Building size={22} className="text-blue-900 dark:text-accent-blue" />
              </div>
              <h3 className="font-sans font-bold text-xl text-slate-950 dark:text-white">{servicesData.architecture.title}</h3>
              <p className="text-xs text-blue-600 dark:text-accent-blue font-mono font-bold uppercase tracking-wider">{servicesData.architecture.subtitle}</p>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                {servicesData.architecture.description}
              </p>
              <ul className="flex flex-col gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 mt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-600 dark:text-accent-blue shrink-0" />
                  <span>Residential estates & custom villas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-600 dark:text-accent-blue shrink-0" />
                  <span>High-rise office buildings & retail</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-600 dark:text-accent-blue shrink-0" />
                  <span>Municipal infrastructure planning</span>
                </li>
              </ul>
              <Link to="/services" className="text-xs font-bold text-blue-700 dark:text-accent-blue hover:underline inline-flex items-center gap-1.5 mt-auto pt-4">
                <span>Learn More →</span>
              </Link>
            </motion.div>

            {/* Interior Design Card - Glassmorphic */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="p-8 rounded-[2.5rem] glass-card flex flex-col gap-5 transition-all shadow-sm"
            >
              <div className="w-12 h-12 bg-white dark:bg-navy-950 rounded-2xl flex items-center justify-center shadow-md">
                <LayoutGrid size={22} className="text-blue-900 dark:text-accent-blue" />
              </div>
              <h3 className="font-sans font-bold text-xl text-slate-950 dark:text-white">{servicesData.interior.title}</h3>
              <p className="text-xs text-blue-600 dark:text-accent-blue font-mono font-bold uppercase tracking-wider">{servicesData.interior.subtitle}</p>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                {servicesData.interior.description}
              </p>
              <ul className="flex flex-col gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 mt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-600 dark:text-accent-blue shrink-0" />
                  <span>High-end luxury apartment curation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-600 dark:text-accent-blue shrink-0" />
                  <span>Ergonomic, modern corporate workspaces</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-600 dark:text-accent-blue shrink-0" />
                  <span>Hospitality & retail sensory layouts</span>
                </li>
              </ul>
              <Link to="/services" className="text-xs font-bold text-blue-700 dark:text-accent-blue hover:underline inline-flex items-center gap-1.5 mt-auto pt-4">
                <span>Learn More →</span>
              </Link>
            </motion.div>

            {/* BIM Card - Standout Blue Card matching "Frosted Glass" theme specs */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="p-8 rounded-[2.5rem] bg-blue-600 dark:bg-blue-600/90 text-white flex flex-col gap-5 transition-all shadow-xl shadow-blue-600/30 border border-blue-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md relative z-10">
                <Cpu size={22} className="text-blue-900" />
              </div>
              <h3 className="font-sans font-bold text-xl text-white relative z-10">{servicesData.bim.title}</h3>
              <p className="text-xs text-blue-100 font-mono font-bold uppercase tracking-wider relative z-10">{servicesData.bim.subtitle}</p>
              <p className="text-blue-50/90 text-xs sm:text-sm leading-relaxed font-light relative z-10">
                {servicesData.bim.description}
              </p>
              <ul className="flex flex-col gap-2.5 text-xs font-medium text-blue-50 mt-2 relative z-10">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-white shrink-0" />
                  <span>LOD 100 - 500 BIM Model compilation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-white shrink-0" />
                  <span>Advanced Structural concrete detailing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-white shrink-0" />
                  <span>Multi-trade MEP clash analysis</span>
                </li>
              </ul>
              <Link to="/services" className="text-xs font-bold text-white hover:underline inline-flex items-center gap-1.5 mt-auto pt-4 relative z-10">
                <span>Learn More →</span>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. Featured Projects Showcase */}
      <section className="relative py-24 px-6 bg-transparent transition-colors duration-300 z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono font-bold tracking-[0.3em] text-blue-600 dark:text-accent-blue uppercase">Selected Works</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-light text-slate-900 dark:text-white tracking-tight">Our High-Profile Portfolio</h2>
            </div>
            <Link 
              to="/projects" 
              className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-white dark:text-navy-950 dark:hover:bg-slate-100 px-6 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md"
            >
              Explore Complete Portfolio
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsList.slice(0, 3).map((project, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group rounded-[2.2rem] overflow-hidden glass-card shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 p-2"
              >
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
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">
                    <span>{project.location}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-sans font-bold text-lg text-slate-950 dark:text-white">{project.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 font-light">
                    {project.description}
                  </p>
                  <div className="border-t border-slate-200/40 dark:border-white/10 pt-4 mt-2">
                    <span className="text-[10px] font-bold text-blue-800 dark:text-accent-blue font-mono uppercase block mb-1">Highlight Outcome:</span>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{project.highlight}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Why Choose Us Section */}
      <section className="relative py-24 px-6 bg-transparent transition-colors duration-300 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] glass-card p-2 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80" 
                alt="Architectural Blueprint Concept" 
                className="w-full h-[440px] object-cover rounded-[2rem]"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <span className="text-xs font-mono font-bold tracking-[0.3em] text-blue-600 dark:text-accent-blue uppercase">Core Strengths</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-light text-slate-900 dark:text-white tracking-tight">
              Why Corporate Developers Choose BIM Earth
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light">
              We eliminate technical overlap and architectural compromises. By maintaining an in-house roster of design architects, civil structures draftsmen, and computational MEP modelers, we coordinate your asset's total digital profile.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              
              <div className="flex gap-3">
                <div className="text-blue-600 dark:text-accent-blue shrink-0 bg-blue-900/10 dark:bg-accent-blue/15 p-2 rounded-xl h-fit">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-900 dark:text-white">ISO 19650 Compliance</h4>
                  <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-light">Our information management structures adhere to global digital twin standards.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-blue-600 dark:text-accent-blue shrink-0 bg-blue-900/10 dark:bg-accent-blue/15 p-2 rounded-xl h-fit">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-900 dark:text-white">Zero-Error Risk Curation</h4>
                  <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-light">We simulate and resolve architectural conflicts, guaranteeing field execution.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-blue-600 dark:text-accent-blue shrink-0 bg-blue-900/10 dark:bg-accent-blue/15 p-2 rounded-xl h-fit">
                  <UserCheck size={20} />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-900 dark:text-white">Single Source of Truth</h4>
                  <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-light">No disjointed communication between architects, structural, and mechanical engineers.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-blue-600 dark:text-accent-blue shrink-0 bg-blue-900/10 dark:bg-accent-blue/15 p-2 rounded-xl h-fit">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-900 dark:text-white">Immersive C-Suite VR Reviews</h4>
                  <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-light">Walk through your physical layout parametrically before releasing capital.</p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* 7. Client Testimonial Segment */}
      <section className="relative py-24 px-6 bg-transparent transition-colors duration-300 z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <span className="text-xs font-mono font-bold tracking-[0.3em] text-blue-600 dark:text-accent-blue uppercase">Client Endorsements</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-light text-slate-900 dark:text-white tracking-tight">What Our Partners Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonialsList.slice(0, 2).map((review, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -4 }}
                className="p-8 rounded-[2rem] glass-card shadow-sm flex flex-col gap-4 relative overflow-hidden"
              >
                {/* Visual quote accent mark */}
                <div className="absolute top-6 right-8 text-slate-200/50 dark:text-navy-800 text-6xl font-serif select-none pointer-events-none">“</div>
                
                <div className="flex items-center gap-1.5 text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed italic relative z-10 font-light">
                  "{review.content}"
                </p>

                <div className="border-t border-slate-200/40 dark:border-navy-800/80 pt-4 mt-auto flex flex-col relative z-10">
                  <span className="font-sans font-bold text-sm text-slate-900 dark:text-white">{review.name}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-light">{review.role} — <span className="font-semibold text-blue-700 dark:text-accent-blue">{review.company}</span></span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. FAQ Preview Accordion */}
      <section className="relative py-24 px-6 bg-transparent transition-colors duration-300 z-10">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <span className="text-xs font-mono font-bold tracking-[0.3em] text-blue-600 dark:text-accent-blue uppercase">Information Portal</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-light text-slate-900 dark:text-white tracking-tight">Frequently Answered Queries</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-light">A quick preview of our engineering and modeling processes.</p>
          </div>

          <div className="flex flex-col gap-4">
            {faqsList.slice(0, 3).map((faq, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-3xl glass-card transition-all"
              >
                <h4 className="font-sans font-bold text-base text-slate-900 dark:text-white">{faq.question}</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed font-light">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link 
              to="/faq" 
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-accent-blue hover:underline"
            >
              <span>Explore Complete FAQ Database</span>
              <ArrowRight size={15} />
            </Link>
          </div>

        </div>
      </section>

      {/* 9. Final Call to Action Segment */}
      <section className="relative py-24 px-6 text-white text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/85 to-slate-950/85 backdrop-blur-md z-0 rounded-[3rem] border border-white/10 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-15 z-0"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-6">
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-accent-blue uppercase">Let's Co-create Your Digital Twin</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-light tracking-tight leading-[1.2]">Ready to Safeguard Your <br className="hidden sm:inline" /> <span className="font-bold italic text-accent-blue">Structural Assets?</span></h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed font-light">
            Eliminate field delays, spatial clashes, and material take-off inaccuracies. Partner with BIM Earth for elite-level architectural and technical BIM coordination.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <Link 
              to="/booking" 
              className="bg-accent-blue text-navy-950 hover:bg-white text-navy-950 px-8 py-4 rounded-xl text-xs font-bold tracking-widest uppercase shadow-lg transition-all hover:-translate-y-0.5"
            >
              Book Corporate Consult
            </Link>
            <Link 
              to="/contact" 
              className="border border-slate-500 hover:border-white px-8 py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all hover:bg-white/5"
            >
              Contact Our Office
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
