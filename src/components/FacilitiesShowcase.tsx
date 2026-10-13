"use client";

import React, { useState } from "react";
import Image from "next/image";
import { gymConfig, Facility } from "@/config/gymConfig";
import Equipment3DViewer from "./Equipment3DViewer";
import { ShieldCheck, CheckCircle, ArrowRight } from "lucide-react";

export default function FacilitiesShowcase() {
  const [activeFacilityId, setActiveFacilityId] = useState<string>(gymConfig.facilities[0].id);

  const activeFacility =
    gymConfig.facilities.find((f) => f.id === activeFacilityId) || gymConfig.facilities[0];

  return (
    <section id="facilities" className="relative py-24 lg:py-32 bg-obsidian-950 border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-crimson/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-800 border border-white/10 text-xs font-mono text-crimson uppercase tracking-widest">
              <span>04</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>Sanctuary & Hardware</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              WORLD-CLASS <span className="text-metal">FACILITIES.</span>
            </h2>

            <p className="text-silver-400 text-sm sm:text-base">
              A 45,000 sq ft cathedral of strength built with Swedish steel, custom Arsenal frames, and medical-grade recovery suites.
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-obsidian-850 border border-white/10 text-right">
            <span className="text-xs font-mono text-crimson uppercase tracking-wider block">FACILITY ACCREDITATION</span>
            <span className="text-sm font-bold text-white font-mono">ELEIKO OFFICIAL TRAINING HALL</span>
          </div>
        </div>

        {/* 3D Equipment Hardware Inspection Canvas */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-mono tracking-widest uppercase text-silver-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
              Interactive 3D Hardware Inspector
            </h3>
            <span className="text-xs text-silver-500 font-mono">Real-Time WebGL Engine</span>
          </div>
          <Equipment3DViewer />
        </div>

        {/* Facilities Interactive Tour Tabs */}
        <div className="space-y-8 pt-8">
          <div className="flex flex-wrap gap-2 sm:gap-3 border-b border-white/10 pb-4">
            {gymConfig.facilities.map((fac) => {
              const isActive = fac.id === activeFacilityId;
              return (
                <button
                  key={fac.id}
                  onClick={() => setActiveFacilityId(fac.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                    isActive
                      ? "bg-crimson text-white shadow-glow-red"
                      : "bg-obsidian-900 text-silver-400 hover:text-white hover:bg-obsidian-800"
                  }`}
                >
                  {fac.name}
                </button>
              );
            })}
          </div>

          {/* Active Facility Presentation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl glass-panel border border-white/10 p-6 sm:p-10">
            {/* Facility Imagery */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[420px] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={activeFacility.image}
                alt={activeFacility.name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center filter contrast-[1.2]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-obsidian-900/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-silver-300 uppercase">{activeFacility.category}</span>
                <span className="text-crimson">24/7 Access for Elite Members</span>
              </div>
            </div>

            {/* Facility Specs & Copy */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-crimson uppercase tracking-widest">
                  {activeFacility.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  {activeFacility.name}
                </h3>
                <p className="text-sm font-semibold text-silver-300">{activeFacility.tagline}</p>
                <p className="text-xs sm:text-sm text-silver-400 leading-relaxed pt-2">
                  {activeFacility.description}
                </p>
              </div>

              {/* Engineering Specs */}
              <div className="space-y-2.5 pt-2">
                <p className="text-xs font-mono text-silver-500 uppercase tracking-wider">
                  Facility Specifications
                </p>
                {activeFacility.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-silver-200">
                    <CheckCircle className="w-4 h-4 text-crimson shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-silver-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-crimson" />
                  Sanitized with hospital-grade antimicrobial filtration after every training cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
