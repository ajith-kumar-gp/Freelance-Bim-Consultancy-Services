import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, User, Building, Phone, Mail, FileText, CheckCircle2, Terminal } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    service: 'BIM Services',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSandbox, setIsSandbox] = useState(false);

  const servicesList = [
    'Architecture - Residential',
    'Architecture - Commercial',
    'Architecture - Infrastructure',
    'Interior Design - Residential',
    'Interior Design - Office Space',
    'Interior Design - Commercial',
    'BIM - Architecture BIM',
    'BIM - Structural BIM',
    'BIM - MEP BIM'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      phone_number: formData.phone,
      company_name: formData.company,
      service_required: formData.service,
      preferred_date: formData.preferredDate,
      preferred_time: formData.preferredTime,
      message_content: formData.message,
      to_email: 'dr.ajithkumargp@gmail.com' // From user email metadata
    };

    if (serviceId && templateId && publicKey) {
      // Production mode: Actual send
      try {
        await emailjs.send(serviceId, templateId, emailParams, publicKey);
        setStatus('success');
        setIsSandbox(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          company: '',
          service: 'BIM Services',
          preferredDate: '',
          preferredTime: '',
          message: ''
        });
      } catch (err) {
        console.error('EmailJS booking submission error:', err);
        setStatus('error');
      } finally {
        setLoading(false);
      }
    } else {
      // Sandbox mode: Realistic simulation
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
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-blue-600 dark:text-accent-blue uppercase">Scheduler</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-slate-900 dark:text-white tracking-tight">
            Book <span className="font-bold text-blue-900 dark:text-accent-blue italic">Appointment</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl font-light">
            Schedule a virtual synchronization session with Dr. Marcus Vance or our lead coordinators.
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
                <h4 className="font-sans font-extrabold text-base">Appointment Requested Successfully!</h4>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed font-light">
                Thank you for scheduling. Our project desk will review your engineering parameters and send a Calendar Invitation along with access credentials directly to your email within 1 business hour.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Booking Form Layout */}
        <section className="p-8 sm:p-10 rounded-[2.5rem] glass-card shadow-lg">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <User size={13} className="text-blue-600 dark:text-accent-blue" />
                <span>Full Name *</span>
              </label>
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
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Mail size={13} className="text-blue-600 dark:text-accent-blue" />
                <span>Corporate Email *</span>
              </label>
              <input 
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="e.g. sjenkins@vanguard.com"
                className="w-full px-4 py-3 rounded-xl border border-white/50 dark:border-white/10 bg-white/40 dark:bg-navy-950/40 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-accent-blue text-sm"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Phone size={13} className="text-blue-600 dark:text-accent-blue" />
                <span>Phone Number *</span>
              </label>
              <input 
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="e.g. +1 (555) 309-3278"
                className="w-full px-4 py-3 rounded-xl border border-white/50 dark:border-white/10 bg-white/40 dark:bg-navy-950/40 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-accent-blue text-sm"
              />
            </div>

            {/* Company */}
            <div className="flex flex-col gap-2">
              <label htmlFor="company" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Building size={13} className="text-blue-600 dark:text-accent-blue" />
                <span>Company Name</span>
              </label>
              <input 
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Vanguard Properties Group"
                className="w-full px-4 py-3 rounded-xl border border-white/50 dark:border-white/10 bg-white/40 dark:bg-navy-950/40 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-accent-blue text-sm"
              />
            </div>

            {/* Service Selection */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="service" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <FileText size={13} className="text-blue-600 dark:text-accent-blue" />
                <span>Service Required *</span>
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-white/50 dark:border-white/10 bg-white/40 dark:bg-navy-950/45 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-accent-blue text-sm cursor-pointer"
              >
                {servicesList.map((svc) => (
                  <option key={svc} value={svc} className="text-slate-900 dark:text-slate-900">{svc}</option>
                ))}
              </select>
            </div>

            {/* Preferred Date */}
            <div className="flex flex-col gap-2">
              <label htmlFor="preferredDate" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Calendar size={13} className="text-blue-600 dark:text-accent-blue" />
                <span>Preferred Date *</span>
              </label>
              <input 
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-white/50 dark:border-white/10 bg-white/40 dark:bg-navy-950/45 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-accent-blue text-sm cursor-pointer"
              />
            </div>

            {/* Preferred Time */}
            <div className="flex flex-col gap-2">
              <label htmlFor="preferredTime" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Clock size={13} className="text-blue-600 dark:text-accent-blue" />
                <span>Preferred Time *</span>
              </label>
              <input 
                type="time"
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-white/50 dark:border-white/10 bg-white/40 dark:bg-navy-950/45 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-accent-blue text-sm cursor-pointer"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <FileText size={13} className="text-blue-600 dark:text-accent-blue" />
                <span>Project Parameters or Message</span>
              </label>
              <textarea 
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="e.g. High-level project square-footage, architectural timeline constraints, and structural parameters..."
                className="w-full px-4 py-3 rounded-xl border border-white/50 dark:border-white/10 bg-white/40 dark:bg-navy-950/40 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-accent-blue text-sm resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 mt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-accent-blue dark:text-navy-950 dark:hover:bg-white text-white font-bold py-4 rounded-xl text-xs tracking-widest uppercase transition-all shadow-lg shadow-blue-600/20 dark:shadow-accent-blue/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:-translate-y-0.5"
              >
                {loading ? 'Transmitting Schedule...' : 'Request Appointment'}
              </button>
            </div>

          </form>
        </section>

      </div>
    </div>
  );
}
