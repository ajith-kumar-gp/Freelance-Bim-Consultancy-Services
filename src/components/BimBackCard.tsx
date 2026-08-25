import React from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, ExternalLink } from "lucide-react";

export function BimBackCard({ className = "" }: { className?: string }) {
  return (
    <div 
      id="bim-back-card"
      className={`relative bg-white text-slate-800 rounded-3xl shadow-2xl border-2 border-dashed border-slate-300 max-w-xl w-full mx-auto font-sans overflow-hidden transition-transform duration-300 hover:shadow-blue-500/10 ${className}`}
    >
      {/* Corner Registration Marks */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-slate-400 z-20"></div>
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-slate-400 z-20"></div>
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-slate-400 z-20"></div>
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-slate-400 z-20"></div>

      {/* Top Header Section (White Background) */}
      <div className="p-6 sm:p-7 relative z-10 flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#004f8c]">
            BIM EARTH CONSULTANCY
          </h3>
          <p className="text-sm font-semibold text-[#0077c8] tracking-wide">
            We Build Future
          </p>
          <div className="w-40 h-0.5 bg-[#0077c8] my-1"></div>

          {/* Social Media Links */}
          <div className="flex items-center gap-4 mt-2 text-xs font-semibold text-[#0066b2]">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 hover:text-blue-900 transition-colors"
            >
              <Facebook size={14} className="fill-current" />
              <span>Facebook</span>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 hover:text-blue-900 transition-colors"
            >
              <Instagram size={14} />
              <span>Instagram</span>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 hover:text-blue-900 transition-colors"
            >
              <Twitter size={14} className="fill-current" />
              <span>Twitter</span>
            </a>
          </div>
        </div>

        {/* Circular Logo Badge */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-white border-2 border-blue-500 shadow-md flex-shrink-0 flex items-center justify-center overflow-hidden">
          <img 
            src="/logo.jpeg" 
            alt="BIM Earth Consultancy Logo" 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </div>
      </div>

      {/* Bottom Geometric Blue Angled Shape with Contact Info */}
      <div className="relative bg-[#0066b2] text-white p-6 sm:p-7 pt-8 mt-2 overflow-hidden">
        {/* Geometric Angular Accent Slices */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#004f8c] transform rotate-45 translate-x-16 -translate-y-20 opacity-70 pointer-events-none"></div>
        <div className="absolute top-0 right-28 w-2 h-full bg-white/20 transform -skew-x-45 pointer-events-none"></div>
        <div className="absolute top-0 right-16 w-3 h-full bg-white/30 transform -skew-x-45 pointer-events-none"></div>

        {/* Contact Information List */}
        <div className="relative z-10 flex flex-col gap-3.5 text-xs sm:text-sm font-medium">
          
          {/* Email */}
          <a 
            href="mailto:bimearthconsultancy@gmail.com" 
            className="flex items-center gap-3 hover:text-blue-200 transition-colors group"
          >
            <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-white/20">
              <Mail size={16} />
            </div>
            <span className="font-mono tracking-tight text-white">bimearthconsultancy@gmail.com</span>
          </a>

          {/* Phone */}
          <a 
            href="tel:+918826508932" 
            className="flex items-center gap-3 hover:text-blue-200 transition-colors group"
          >
            <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-white/20">
              <Phone size={16} />
            </div>
            <span className="font-mono text-white">(+91) 8826508932 ; 8826175595</span>
          </a>

          {/* Address */}
          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-white/10 mt-0.5">
              <MapPin size={16} />
            </div>
            <span className="text-xs sm:text-sm leading-relaxed text-blue-50">
              B-703 French Apartment Sector 16B, Greater Noida West, Uttar Pradesh-201301
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
