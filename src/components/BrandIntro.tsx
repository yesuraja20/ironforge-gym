"use client";

import React from "react";
import Image from "next/image";
import { gymConfig } from "@/config/gymConfig";
import { ShieldAlert, Compass, Gauge, Sparkles } from "lucide-react";

export default function BrandIntro() {
  const pillars = [
    {
      icon: Gauge,
      title: "Biomechanical Precision",
      desc: "Every barbell, cable angle, and isolateral machine has been curated for exact joint kinematics and zero energy leakage.",
    },
    {
      icon: Compass,
      title: "Science-Driven Protocols",
      desc: "No guess-work. We pair periodized loading cycles with DEXA body composition scans and velocity bar trackers.",
    },
    {
      icon: ShieldAlert,
      title: "Exclusive Private Atmosphere",
      desc: "Strict member caps ensure zero queues, pristine equipment availability, and uninterrupted athletic focus.",
    },
    {
      icon: Sparkles,
      title: "Contrast Thermal Recovery",
      desc: "Sub-zero electric cryo chambers and Finnish infrared dry saunas ensure you regenerate faster than you break down.",
    },
  ];

  return (
    <section id="overview" className="relative py-24 lg:py-32 bg-obsidian-900 border-t border-white/5 overflow-hidden">
      {/* Decorative ambient backdrop */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-crimson/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-800 border border-white/10 text-xs font-mono text-crimson uppercase tracking-widest">
            <span>01</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>The Ironforge Manifesto</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[1.05]">
            FORGED IN FIRE. <br />
            <span className="text-metal">DRIVEN BY PRECISION.</span>
          </h2>

          <p className="text-base sm:text-lg text-silver-300 leading-relaxed font-light">
            {gymConfig.brand.manifestoText}
          </p>
        </div>

        {/* Large Imagery & Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-16 items-center">
          {/* Main Visual with Floating Editorial Badge */}
          <div className="lg:col-span-7 relative group">
            <div className="relative h-80 sm:h-[450px] lg:h-[520px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop"
                alt="Olympic Weightlifting Platform at Ironforge"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center filter grayscale-[30%] contrast-[1.2] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-80" />

              {/* Bottom Editorial Caption */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-white/10">
                <p className="text-xs uppercase font-mono tracking-widest text-crimson">The Sanctuary Standard</p>
                <p className="text-sm font-semibold text-white mt-1">
                  Custom Swedish Oak lifting platforms, machined calibrated steel plates, and zero compromises.
                </p>
              </div>
            </div>

            {/* Corner floating aesthetic badge */}
            <div className="absolute -top-4 -right-4 hidden sm:flex flex-col items-center justify-center w-28 h-28 rounded-2xl bg-obsidian-950 border border-crimson/40 shadow-glow-red p-2 text-center">
              <span className="text-2xl font-black text-white font-mono">2021</span>
              <span className="text-[9px] uppercase tracking-widest text-silver-400 font-mono">ESTABLISHED</span>
            </div>
          </div>

          {/* Right: Pillars & Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-xl glass-panel border border-white/5 hover:border-crimson/40 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-crimson/10 border border-crimson/20 flex items-center justify-center text-crimson group-hover:bg-crimson group-hover:text-white transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h4 className="text-base font-bold text-white group-hover:text-crimson transition-colors">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-silver-400 leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 rounded-2xl bg-obsidian-950 border border-white/10 text-center">
          <div>
            <p className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
              {gymConfig.metrics.facilitySqFt}
            </p>
            <p className="text-xs uppercase font-mono tracking-widest text-crimson mt-1">Square Feet Floor</p>
          </div>
          <div>
            <p className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
              {gymConfig.metrics.equipmentPieces}
            </p>
            <p className="text-xs uppercase font-mono tracking-widest text-crimson mt-1">Calibrated Units</p>
          </div>
          <div>
            <p className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
              {gymConfig.metrics.coachesCount}
            </p>
            <p className="text-xs uppercase font-mono tracking-widest text-crimson mt-1">Elite Coaches</p>
          </div>
          <div>
            <p className="text-3xl sm:text-5xl font-black text-metal font-mono tracking-tight">
              {gymConfig.metrics.clientSuccessRate}
            </p>
            <p className="text-xs uppercase font-mono tracking-widest text-crimson mt-1">Success Metric</p>
          </div>
        </div>
      </div>
    </section>
  );
}
