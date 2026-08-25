import React from "react";
import { Box, Layers, Calendar, DollarSign, Building, Users, Target, Zap, Leaf } from "lucide-react";

export function AboutBimVisual({ className = "" }: { className?: string }) {
  const capabilities = [
    {
      icon: Box,
      title: "3D MODELING",
      desc: "Accurate & intelligent 3D models",
      color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/30"
    },
    {
      icon: Layers,
      title: "CLASH DETECTION",
      desc: "Identify & resolve clashes before construction",
      color: "text-blue-500 bg-blue-500/10 border-blue-500/30"
    },
    {
      icon: Calendar,
      title: "4D SCHEDULING",
      desc: "Visualize construction sequence over time",
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/30"
    },
    {
      icon: DollarSign,
      title: "5D ESTIMATION",
      desc: "Accurate quantity takeoff & cost estimation",
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30"
    },
    {
      icon: Building,
      title: "FACILITY MANAGEMENT",
      desc: "Efficient operation & maintenance of assets",
      color: "text-amber-500 bg-amber-500/10 border-amber-500/30"
    }
  ];

  const pillars = [
    { icon: Users, title: "COLLABORATION", desc: "Better teamwork & communication" },
    { icon: Target, title: "ACCURACY", desc: "Reduced errors & rework" },
    { icon: Zap, title: "EFFICIENCY", desc: "Optimized workflows & time saving" },
    { icon: Leaf, title: "SUSTAINABILITY", desc: "Better planning for a sustainable future" }
  ];

  return (
    <div 
      id="about-bim-visual"
      className={`relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/15 overflow-hidden font-sans ${className}`}
    >
      {/* Background technical grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none"></div>

      {/* Header Banner */}
      <div className="relative z-10 flex flex-col gap-1.5 mb-8 border-b border-white/10 pb-6">
        <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
          BIM Earth Consultancy Architecture
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white uppercase">
          BUILDING INFORMATION MODELING
        </h2>
        <p className="text-sm sm:text-base font-light text-slate-300">
          Smarter Design. Better Construction. Better Future.
        </p>
      </div>

      {/* Main Content: Left Capabilities + Right Architectural Preview */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: 5 Core Capabilities */}
        <div className="lg:col-span-6 flex flex-col gap-3.5">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="flex items-start gap-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
              >
                <div className={`p-2.5 rounded-xl border ${item.color} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon size={20} />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-sans font-bold text-xs sm:text-sm tracking-wide text-white">
                    {item.title}
                  </h4>
                  <p className="text-slate-400 text-xs font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Architectural Wireframe & Tablet Simulation */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="relative rounded-2xl bg-gradient-to-b from-blue-900/40 to-slate-950/80 p-5 border border-cyan-500/30 overflow-hidden shadow-xl">
            
            {/* Architectural Building Cutaway Simulation */}
            <div className="flex flex-col gap-3 mb-4">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
                <span>VIRTUAL TWIN DISCIPLINE LAYERS</span>
                <span className="bg-cyan-500/20 px-2 py-0.5 rounded text-[10px]">COORDINATED</span>
              </div>
              
              <div className="h-36 rounded-xl bg-slate-950/60 border border-white/10 p-3 flex flex-col justify-around relative overflow-hidden">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-rose-400 w-16">FIRE SYSTEM:</span>
                  <div className="h-2 flex-1 bg-rose-500/70 rounded"></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-cyan-400 w-16">HVAC DUCT:</span>
                  <div className="h-2.5 flex-1 bg-cyan-400/80 rounded"></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-amber-400 w-16">ELECTRICAL:</span>
                  <div className="h-1.5 flex-1 bg-amber-400/70 rounded"></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-emerald-400 w-16">PLUMBING:</span>
                  <div className="h-2 flex-1 bg-emerald-400/70 rounded"></div>
                </div>
              </div>
            </div>

            {/* Tablet Blueprint Mockup in foreground */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-blue-400/40 shadow-md flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Box size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-bold font-sans text-white">Tablet BIM Viewer</p>
                  <p className="text-[9px] font-mono text-slate-400">Live 3D Clash Sync on Site</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">100% Online</span>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Pillars Ribbon */}
      <div className="relative z-10 mt-8 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div key={idx} className="flex flex-col gap-1 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-1.5 text-cyan-400">
                <Icon size={14} />
                <span className="text-[11px] font-bold font-sans tracking-wide text-white">{pillar.title}</span>
              </div>
              <p className="text-[10px] text-slate-400 font-light leading-relaxed">{pillar.desc}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
