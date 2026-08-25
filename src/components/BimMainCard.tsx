import React from "react";
import { Building2, Home, Compass, Layers, Wrench, Shield, CheckCircle2 } from "lucide-react";

export function BimMainCard({ className = "" }: { className?: string }) {
  return (
    <div 
      id="bim-main-card"
      className={`relative bg-white text-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-dashed border-slate-300 max-w-xl w-full mx-auto font-sans overflow-hidden transition-transform duration-300 hover:shadow-blue-500/10 ${className}`}
    >
      {/* Corner Registration Marks */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-slate-400"></div>
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-slate-400"></div>
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-slate-400"></div>
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-slate-400"></div>

      {/* Top Logo Badge */}
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-white border-2 border-blue-500 shadow-md flex items-center justify-center overflow-hidden relative">
          <img 
            src="/logo.jpeg" 
            alt="BIM Earth Consultancy Logo" 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback if logo.jpeg not found
              (e.target as HTMLElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-50 text-[9px] font-mono font-bold text-blue-900 -z-10">
            <span>BIM EARTH</span>
          </div>
        </div>
      </div>

      {/* Central "SERVICES" Ribbon Header */}
      <div className="relative my-6 flex items-center justify-center">
        {/* Horizontal dividing blue line */}
        <div className="absolute inset-x-0 h-1 bg-[#0066b2]"></div>
        
        {/* Angled Center SERVICES banner */}
        <div className="relative z-10 bg-[#005599] text-white px-10 py-2 shadow-lg transform -skew-x-12 border-t-2 border-b-2 border-blue-300">
          <h3 className="text-xl sm:text-2xl font-black tracking-wider uppercase transform skew-x-12 text-center drop-shadow-sm">
            SERVICES
          </h3>
        </div>
      </div>

      {/* 3 Columns for ARCHITECTURE, INTERIORS, BIM */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-4 mt-6">
        
        {/* Column 1: ARCHITECTURE */}
        <div className="flex flex-col">
          <div className="bg-[#0077c8] text-white py-1.5 px-3 transform -skew-x-12 shadow-md mb-3">
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-center transform skew-x-12">
              ARCHITECTURE
            </h4>
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 font-medium pl-3">
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0077c8]"></span>
              <span>Residential</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0077c8]"></span>
              <span>Commercial</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0077c8]"></span>
              <span>Infrastructure</span>
            </li>
          </ul>
        </div>

        {/* Column 2: INTERIORS */}
        <div className="flex flex-col">
          <div className="bg-[#0066b2] text-white py-1.5 px-3 transform -skew-x-12 shadow-md mb-3">
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-center transform skew-x-12">
              STRUCTURAL BIM
            </h4>
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 font-medium pl-3">
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066b2]"></span>
              <span>Residential</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066b2]"></span>
              <span>Office Space</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066b2]"></span>
              <span>Commercial</span>
            </li>
          </ul>
        </div>

        {/* Column 3: BIM */}
        <div className="flex flex-col">
          <div className="bg-[#004f8c] text-white py-1.5 px-3 transform -skew-x-12 shadow-md mb-3">
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-center transform skew-x-12">
              BIM
            </h4>
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 font-medium pl-3">
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#004f8c]"></span>
              <span>Architecture</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#004f8c]"></span>
              <span>Structure</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#004f8c]"></span>
              <span>MEP</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#004f8c]"></span>
              <span>Services</span>
            </li>
          </ul>
        </div>

      </div>

      {/* <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>BIM EARTH CONSULTANCY</span>
        <span>SERVICE BLUEPRINT CARD</span>
      </div> */}
    </div>
  );
}
