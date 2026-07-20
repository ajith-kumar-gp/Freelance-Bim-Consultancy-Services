import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, User, Building, Phone, Mail, FileText, CheckCircle2, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import settingsData from '../content/settings.json';

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
  const [validationError, setValidationError] = useState('');

  // Interactive scheduler calendar state
  const [calendarMonth, setCalendarMonth] = useState(new Date());

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

  const timeSlots = [
    { label: '09:00 AM', value: '09:00 AM' },
    { label: '10:00 AM', value: '10:00 AM' },
    { label: '11:00 AM', value: '11:00 AM' },
    { label: '12:00 PM', value: '12:00 PM' },
    { label: '01:30 PM', value: '01:30 PM' },
    { label: '02:30 PM', value: '02:30 PM' },
    { label: '03:30 PM', value: '03:30 PM' },
    { label: '04:30 PM', value: '04:30 PM' },
    { label: '05:30 PM', value: '05:30 PM' }
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleDateSelect = (day: number) => {
    const year = calendarMonth.getFullYear();
    const month = String(calendarMonth.getMonth() + 1).padStart(2, '0');
    const dStr = String(day).padStart(2, '0');
    const formattedDate = `${year}-${month}-${dStr}`;
    setFormData(prev => ({ ...prev, preferredDate: formattedDate }));
    setValidationError('');
  };

  const handleTimeSelect = (val: string) => {
    setFormData(prev => ({ ...prev, preferredTime: val }));
    setValidationError('');
  };

  const formatSelectedDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString('default', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const renderCalendarDays = () => {
    const days = [];
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const totalDays = getDaysInMonth(year, month);
    const startDay = getFirstDayOfMonth(year, month);

    // Padding empty cells for days from previous month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let d = 1; d <= totalDays; d++) {
      const currentCellDate = new Date(year, month, d);
      const isPast = currentCellDate < today;

      const mStr = String(month + 1).padStart(2, '0');
      const dStr = String(d).padStart(2, '0');
      const cellDateStr = `${year}-${mStr}-${dStr}`;
      const isSelected = formData.preferredDate === cellDateStr;
      
      const isToday = 
        today.getDate() === d && 
        today.getMonth() === month && 
        today.getFullYear() === year;

      days.push(
        <button
          key={`day-${d}`}
          type="button"
          disabled={isPast}
          onClick={() => handleDateSelect(d)}
          className={`p-2 w-full aspect-square text-xs font-semibold rounded-xl transition-all flex items-center justify-center ${
            isPast 
              ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-30' 
              : isSelected
              ? 'bg-blue-600 text-white font-bold scale-105 shadow-md shadow-blue-600/20 dark:bg-accent-blue dark:text-navy-950'
              : isToday
              ? 'bg-blue-50 dark:bg-accent-blue/10 text-blue-600 dark:text-accent-blue border border-blue-200 dark:border-accent-blue/30'
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-accent-blue'
          }`}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!formData.preferredDate) {
      setValidationError('Please select a preferred date from the interactive calendar.');
      return;
    }
    if (!formData.preferredTime) {
      setValidationError('Please pick an available target time slot.');
      return;
    }

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
      phone: formData.phone,
      company_name: formData.company,
      company: formData.company,
      service_required: formData.service,
      service: formData.service,
      preferred_date: formData.preferredDate,
      preferred_time: formData.preferredTime,
      message_content: formData.message,
      message: formData.message,
      to_email: settingsData.contactEmail || 'dr.ajithkumargp@gmail.com'
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
        console.group('%c BIM Earth Developer Sandbox ', 'background: #2563eb; color: #fff; padding: 4px; font-weight: bold; border-radius: 4px;');
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
            Book <span className="font-bold text-blue-600 dark:text-accent-blue italic">Appointment</span>
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
        <section className="p-8 sm:p-10 rounded-[2.5rem] bg-white/70 dark:bg-slate-950/40 border border-slate-200/60 dark:border-white/5 shadow-lg backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
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
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-navy-950/40 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-accent-blue text-sm"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
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
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-navy-950/40 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-accent-blue text-sm"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
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
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-navy-950/40 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-accent-blue text-sm"
              />
            </div>

            {/* Company */}
            <div className="flex flex-col gap-2">
              <label htmlFor="company" className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
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
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-navy-950/40 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-accent-blue text-sm"
              />
            </div>

            {/* Service Selection */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="service" className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <FileText size={13} className="text-blue-600 dark:text-accent-blue" />
                <span>Service Required *</span>
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-navy-950/45 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-accent-blue text-sm cursor-pointer"
              >
                {servicesList.map((svc) => (
                  <option key={svc} value={svc} className="text-slate-900">{svc}</option>
                ))}
              </select>
            </div>

            {/* Premium Date & Time Scheduler Workspace */}
            <div className="md:col-span-2 border border-slate-200/80 dark:border-white/10 rounded-[1.8rem] p-6 bg-slate-50/50 dark:bg-slate-950/30 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-2">
                  <Calendar size={15} className="text-blue-600 dark:text-accent-blue" />
                  <span>Select Appointment Date & Time *</span>
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Select a date on the calendar, then select your preferred consulting hour on the right.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Monthly Calendar Column */}
                <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-150 dark:border-white/5 rounded-2xl p-5 shadow-sm">
                  {/* Month Navigation Row */}
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-white/5">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-600 dark:text-slate-300 transition-all active:scale-95"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="font-sans font-bold text-slate-800 dark:text-white text-xs tracking-wide">
                      {calendarMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </span>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-600 dark:text-slate-300 transition-all active:scale-95"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Week Day Header */}
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                      <div key={day} className="text-[10px] font-bold font-mono uppercase text-slate-400 dark:text-slate-500 py-1">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Days grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {renderCalendarDays()}
                  </div>
                </div>

                {/* Time Slots Selection Column */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-white/5">
                    <Clock size={14} className="text-blue-600 dark:text-accent-blue" />
                    <span className="font-sans font-bold text-slate-800 dark:text-white text-xs">
                      Available Time Slots
                    </span>
                  </div>

                  {formData.preferredDate ? (
                    <div className="flex flex-col gap-4">
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        <span>Date: {formatSelectedDate(formData.preferredDate)}</span>
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((slot) => {
                          const isSelected = formData.preferredTime === slot.value;
                          return (
                            <button
                              key={slot.value}
                              type="button"
                              onClick={() => handleTimeSelect(slot.value)}
                              className={`py-2.5 px-2 text-[11px] font-bold rounded-xl border transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
                                isSelected
                                  ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20 dark:bg-accent-blue dark:border-accent-blue dark:text-navy-950'
                                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-blue-400 dark:hover:border-accent-blue/30 hover:bg-blue-50/10'
                              }`}
                            >
                              <Clock size={11} className={isSelected ? 'text-white dark:text-navy-950' : 'text-slate-400'} />
                              <span>{slot.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-200 dark:border-white/5 rounded-2xl bg-white/20 dark:bg-transparent min-h-[180px]">
                      <Calendar size={24} className="text-slate-300 dark:text-slate-600 mb-2 animate-pulse" />
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 font-light max-w-[180px] leading-relaxed">
                        Please pick a calendar date first to unlock available hours.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="message" className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
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
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-navy-950/40 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-accent-blue text-sm resize-none"
              />
            </div>

            {/* Inline Validation Banner */}
            <AnimatePresence>
              {validationError && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:col-span-2 overflow-hidden"
                >
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>{validationError}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
