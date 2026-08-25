import React, { useState } from "react";
import { Layers, Activity, Eye, Compass, ShieldCheck, Box, Zap, Sparkles } from "lucide-react";

export function HomeHeroVisual({ className = "" }: { className?: string }) {
  const [activeLayer, setActiveLayer] = useState<"all" | "mep" | "structure" | "facade">("all");

  return (
    <div className={`relative rounded-[2rem] overflow-hidden border border-white/60 dark:border-white/10 shadow-2xl glass-card p-3 font-sans ${className}`}>
      
      {/* Visual Canvas Stage */}
      <div className="relative rounded-[1.6rem] overflow-hidden bg-gradient-to-b from-[#0b192e] via-[#0f2744] to-[#14375e] text-white min-h-[380px] sm:min-h-[420px] flex flex-col justify-between p-5 border border-blue-400/20">
        
        {/* Sky / Space background & Planet curve */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Earth atmosphere curve */}
          <div className="absolute -top-40 -left-20 w-[140%] h-[240px] rounded-[100%] bg-gradient-to-b from-blue-400/20 via-blue-600/10 to-transparent blur-md"></div>
          {/* Distant moon */}
          <div className="absolute top-6 right-8 w-6 h-6 rounded-full bg-slate-200/80 shadow-[0_0_12px_rgba(255,255,255,0.6)]"></div>
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        {/* Top Floating Badge & Layer Selector */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-cyan-300">
              BIM EARTH 3D VIRTUAL TWIN
            </span>
          </div>

          {/* Quick layer filter toggles */}
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md p-1 rounded-xl border border-white/10 text-[10px] font-mono">
            <button 
              onClick={() => setActiveLayer("all")}
              className={`px-2.5 py-1 rounded-lg transition-all ${activeLayer === "all" ? "bg-blue-600 text-white font-bold" : "text-slate-300 hover:text-white"}`}
            >
              All Layers
            </button>
            <button 
              onClick={() => setActiveLayer("mep")}
              className={`px-2.5 py-1 rounded-lg transition-all ${activeLayer === "mep" ? "bg-emerald-600 text-white font-bold" : "text-slate-300 hover:text-white"}`}
            >
              MEP
            </button>
            <button 
              onClick={() => setActiveLayer("structure")}
              className={`px-2.5 py-1 rounded-lg transition-all ${activeLayer === "structure" ? "bg-amber-600 text-white font-bold" : "text-slate-300 hover:text-white"}`}
            >
              Structure
            </button>
          </div>
        </div>

        {/* 3D Interactive Building Cutaway Visualization */}
        <div className="relative z-10 my-4 flex items-center justify-center">
          <div className="relative w-full max-w-sm h-52 sm:h-60 rounded-2xl bg-gradient-to-tr from-slate-950/80 to-blue-950/60 border border-cyan-500/30 p-4 flex flex-col justify-between shadow-2xl backdrop-blur-sm overflow-hidden group">
            
            {/* Cutaway Building Structure Simulation */}
            <div className="relative w-full h-full flex flex-col justify-between">
              
              {/* Roof & Brand Label */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-1.5">
                  <Box size={14} className="text-cyan-400" />
                  <span className="text-xs font-mono font-extrabold tracking-widest text-white">BIM EARTH HQ MODEL</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">LOD 500</span>
              </div>

              {/* Multi-tier floor cross section */}
              <div className="grid grid-cols-3 gap-2 my-auto">
                {/* Section 1: Architectural Envelope */}
                <div className={`p-2.5 rounded-xl border transition-all ${activeLayer === "facade" || activeLayer === "all" ? "bg-blue-900/40 border-blue-400/50" : "opacity-30 border-white/10"}`}>
                  <span className="text-[9px] font-mono uppercase text-blue-300 block mb-1">Architecture</span>
                  <div className="h-12 flex flex-col justify-around">
                    <div className="h-1.5 bg-blue-400/60 rounded"></div>
                    <div className="h-1.5 bg-blue-300/40 rounded w-3/4"></div>
                    <div className="h-1.5 bg-blue-200/50 rounded w-5/6"></div>
                  </div>
                </div>

                {/* Section 2: Colorful MEP Piping Systems */}
                <div className={`p-2.5 rounded-xl border transition-all ${activeLayer === "mep" || activeLayer === "all" ? "bg-emerald-950/60 border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "opacity-30 border-white/10"}`}>
                  <span className="text-[9px] font-mono uppercase text-emerald-300 block mb-1">MEPF Coordination</span>
                  <div className="h-12 flex flex-col justify-around">
                    {/* HVAC Duct (Cyan) */}
                    <div className="h-2 bg-cyan-400 rounded-sm flex items-center justify-end px-1">
                      <span className="text-[7px] font-mono text-black font-bold">HVAC</span>
                    </div>
                    {/* Fire Protection (Red/Orange) */}
                    <div className="h-1.5 bg-rose-500 rounded-full"></div>
                    {/* Electrical Tray (Yellow) */}
                    <div className="h-1.5 bg-amber-400 rounded-full"></div>
                    {/* Plumbing (Green) */}
                    <div className="h-1.5 bg-emerald-400 rounded-full"></div>
                  </div>
                </div>

                {/* Section 3: Structural Skeleton */}
                <div className={`p-2.5 rounded-xl border transition-all ${activeLayer === "structure" || activeLayer === "all" ? "bg-amber-950/40 border-amber-400/50" : "opacity-30 border-white/10"}`}>
                  <span className="text-[9px] font-mono uppercase text-amber-300 block mb-1">Structural Frame</span>
                  <div className="h-12 flex flex-col justify-around">
                    <div className="h-2 bg-amber-500/80 rounded border-dashed border border-amber-300"></div>
                    <div className="h-1.5 bg-amber-400/60 rounded"></div>
                    <div className="h-2 bg-amber-600/70 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Real-time telemetry bar */}
              <div className="flex items-center justify-between text-[9px] font-mono text-slate-300 pt-2 border-t border-white/10">
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Zero Clashes Detected
                </span>
                <span>Energy Opt: 98.4%</span>
              </div>

            </div>

            {/* Island Shoreline Ground Base */}
            <div className="absolute -bottom-2 -left-4 -right-4 h-5 bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 opacity-80 blur-xs"></div>
          </div>
        </div>

        {/* Bottom Digital Twin Metrics Ribbon */}
        <div className="relative z-10 grid grid-cols-3 gap-2 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 block">Clash Reduction</span>
            <span className="font-sans font-bold text-cyan-300">100% Resolved</span>
          </div>
          <div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 block">Design Efficiency</span>
            <span className="font-sans font-bold text-emerald-300">+30% Faster</span>
          </div>
          <div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 block">Cost Precision</span>
            <span className="font-sans font-bold text-amber-300">5D LOD 500</span>
          </div>
        </div>

      </div>
    </div>
  );
}
