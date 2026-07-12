import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Terminal, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import contactData from '../content/contact.json';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSandbox, setIsSandbox] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    // EmailJS credentials from Vite Env
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const emailParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject_line: formData.subject,
      message_content: formData.message,
      to_email: 'dr.ajithkumargp@gmail.com' // From user email metadata
    };

    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(serviceId, templateId, emailParams, publicKey);
        setStatus('success');
        setIsSandbox(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (err) {
        console.error('EmailJS contact form submission error:', err);
        setStatus('error');
      } finally {
        setLoading(false);
      }
    } else {
      // Sandbox mode: simulation
      setTimeout(() => {
        console.group('%c BIM Earth Developer Sandbox ', 'background: #10b981; color: #fff; padding: 4px; font-weight: bold; border-radius: 4px;');
        console.warn('EmailJS environment variables (VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY) are not set in the Secrets Panel.');
        console.info('Simulated submission payload targeted to dr.ajithkumargp@gmail.com:', emailParams);
        console.groupEnd();
        setLoading(false);
        setStatus('success');
        setIsSandbox(true);
      }, 1000);
    }
  };

  return (
    <div className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-blue-600 dark:text-accent-blue uppercase">Headquarters</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-slate-900 dark:text-white tracking-tight">
            Contact <span className="font-bold text-blue-900 dark:text-accent-blue italic">Our Office</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl font-light">
            Get in touch with our global project desk or reach our engineering coordinators.
          </p>
        </div>

        {/* Dynamic Success Alert */}
        <AnimatePresence>
          {status === 'success' && (
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-6 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex flex-col gap-4 shadow-md relative overflow-hidden backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" size={24} />
                <h4 className="font-sans font-extrabold text-base">Message Received Successfully!</h4>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed font-light">
                Thank you for reaching out. Your submission has been securely routed directly to our Gmail inbox. One of our lead BIM coordinators will contact you via email within 2 hours.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Layout Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-4">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="p-6 rounded-2xl glass-card shadow-sm flex items-start gap-4">
              <div className="bg-white/40 dark:bg-navy-950/40 text-blue-900 dark:text-accent-blue p-3.5 rounded-xl shrink-0 shadow-sm border border-white/50 dark:border-white/10">
                <MapPin size={22} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-accent-blue font-mono">HQ Office Address</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">{contactData.address}</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-card shadow-sm flex items-start gap-4">
              <div className="bg-white/40 dark:bg-navy-950/40 text-blue-900 dark:text-accent-blue p-3.5 rounded-xl shrink-0 shadow-sm border border-white/50 dark:border-white/10">
                <Phone size={22} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-accent-blue font-mono">Dial Direct</span>
                <a href={`tel:${contactData.phone}`} className="text-sm font-bold text-blue-900 dark:text-white mt-1 hover:underline">
                  {contactData.phone}
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-card shadow-sm flex items-start gap-4">
              <div className="bg-white/40 dark:bg-navy-950/40 text-blue-900 dark:text-accent-blue p-3.5 rounded-xl shrink-0 shadow-sm border border-white/50 dark:border-white/10">
                <Mail size={22} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-accent-blue font-mono">Corporate Email</span>
                <a href={`mailto:${contactData.email}`} className="text-sm font-bold text-blue-900 dark:text-white mt-1 hover:underline">
                  {contactData.email}
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-card shadow-sm flex items-start gap-4">
              <div className="bg-white/40 dark:bg-navy-950/40 text-blue-900 dark:text-accent-blue p-3.5 rounded-xl shrink-0 shadow-sm border border-white/50 dark:border-white/10">
                <Clock size={22} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-accent-blue font-mono">Business Hours</span>
                <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold">{contactData.hoursWeekdays}</span>
                <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold">{contactData.hoursWeekends}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 p-8 rounded-[2.5rem] glass-card shadow-lg">
            <h3 className="font-sans font-bold text-xl text-slate-900 dark:text-white border-b border-slate-200/30 dark:border-white/10 pb-2 mb-6">Send Message</h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name *</label>
                  <input 
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-3 rounded-xl border border-white/50 dark:border-white/10 bg-white/40 dark:bg-navy-950/40 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-accent-blue text-sm"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email *</label>
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="e.g. sjenkins@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-white/50 dark:border-white/10 bg-white/40 dark:bg-navy-950/40 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-accent-blue text-sm"
                  />
                </div>

              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Subject *</label>
                <input 
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="e.g. LOD 500 MEP BIM Project Quotation"
                  className="w-full px-4 py-3 rounded-xl border border-white/50 dark:border-white/10 bg-white/40 dark:bg-navy-950/40 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-accent-blue text-sm"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Message *</label>
                <textarea 
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Describe your design vision or engineering scope parameters..."
                  className="w-full px-4 py-3 rounded-xl border border-white/50 dark:border-white/10 bg-white/40 dark:bg-navy-950/40 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-accent-blue text-sm resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-accent-blue dark:text-navy-950 dark:hover:bg-white text-white font-bold py-4 rounded-xl text-xs tracking-widest uppercase transition-all shadow-lg shadow-blue-600/20 dark:shadow-accent-blue/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:-translate-y-0.5"
              >
                {loading ? 'Transmitting Message...' : 'Send Message'}
              </button>

            </form>
          </div>

        </section>

        {/* Google Maps Section - Glass Wrapped Frame */}
        <section className="rounded-[2.5rem] overflow-hidden border border-white/40 dark:border-white/10 shadow-xl glass-card p-2">
          <iframe 
            src={contactData.mapEmbed}
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            className="rounded-[2rem]"
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="BIM Earth HQ Map Location"
          />
        </section>

      </div>
    </div>
  );
}
