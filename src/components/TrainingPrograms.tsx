"use client";

import React, { useState } from "react";
import Image from "next/image";
import { gymConfig, Program } from "@/config/gymConfig";
import { Flame, CheckCircle2, ArrowRight, Zap, Dumbbell } from "lucide-react";

interface TrainingProgramsProps {
  onSelectProgramForTrial: (programTitle: string) => void;
}

export default function TrainingPrograms({ onSelectProgramForTrial }: TrainingProgramsProps) {
  const [activeProgramId, setActiveProgramId] = useState<string>(gymConfig.programs[0].id);

  const activeProgram = gymConfig.programs.find((p) => p.id === activeProgramId) || gymConfig.programs[0];

  return (
    <section id="programs" className="relative py-24 lg:py-32 bg-obsidian-950 border-t border-white/5">
      {/* Background radial gradient */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-crimson/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-800 border border-white/10 text-xs font-mono text-crimson uppercase tracking-widest">
              <span>02</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>Disciplines of Mastery</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              ELITE TRAINING <span className="text-metal">PROGRAMS.</span>
            </h2>
            <p className="text-silver-400 text-sm sm:text-base">
              Each discipline is periodized with strict athletic progression. No randomized workouts.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-silver-400">
            <Dumbbell className="w-4 h-4 text-crimson" />
            <span>Select a discipline to inspect protocol</span>
          </div>
        </div>

        {/* Program Navigation Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-10">
          {gymConfig.programs.map((program) => {
            const isActive = program.id === activeProgramId;
            return (
              <button
                key={program.id}
                onClick={() => setActiveProgramId(program.id)}
                className={`p-3.5 sm:p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between ${
                  isActive
                    ? "bg-obsidian-800 border-crimson shadow-glow-red"
                    : "bg-obsidian-900/60 border-white/5 hover:border-white/20 hover:bg-obsidian-850"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${isActive ? "text-crimson" : "text-silver-500"}`}>
                    {program.number}
                  </span>
                  {isActive && <Zap className="w-3.5 h-3.5 text-crimson fill-crimson" />}
                </div>
                <p className={`text-xs sm:text-sm font-bold line-clamp-2 ${isActive ? "text-white" : "text-silver-300"}`}>
                  {program.title.split(" ")[0]} {program.title.split(" ")[1]}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Program Spotlight Showcase */}
        <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-auto min-h-[380px]">
              <Image
                src={activeProgram.image}
                alt={activeProgram.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center filter brightness-[0.75] contrast-[1.15]"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-obsidian-950 via-obsidian-950/40 to-transparent" />

              {/* Intensity floating badge */}
              <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-obsidian-950/90 border border-white/15 text-xs font-mono backdrop-blur-md">
                <Flame className="w-4 h-4 text-crimson fill-crimson" />
                <span className="text-white font-semibold">Intensity: {activeProgram.intensity}</span>
              </div>
            </div>

            {/* Details Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-crimson/15 text-crimson border border-crimson/30">
                    Frequency: {activeProgram.frequency}
                  </span>
                  <span className="text-xs text-silver-400 font-mono">
                    Protocol #{activeProgram.number}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                  {activeProgram.title}
                </h3>

                <p className="text-crimson font-medium text-sm sm:text-base">
                  {activeProgram.tagline}
                </p>

                <p className="text-sm sm:text-base text-silver-300 leading-relaxed">
                  {activeProgram.description}
                </p>

                {/* Focus Badges */}
                <div className="pt-2">
                  <p className="text-xs font-mono uppercase text-silver-400 tracking-wider mb-2">Key Disciplines:</p>
                  <div className="flex flex-wrap gap-2">
                    {activeProgram.focus.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-md bg-obsidian-800 text-silver-200 text-xs font-medium border border-white/10"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 pt-2">
                  {activeProgram.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-silver-300">
                      <CheckCircle2 className="w-4 h-4 text-crimson shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-silver-400">Next Cohort Intake</span>
                  <p className="text-sm font-semibold text-white">Open for Private Assessment</p>
                </div>

                <button
                  onClick={() => onSelectProgramForTrial(activeProgram.title)}
                  className="px-6 py-3.5 rounded-xl bg-crimson hover:bg-crimson-dark text-white font-bold text-xs uppercase tracking-wider shadow-glow-red transition-all flex items-center justify-center gap-2 group"
                >
                  <span>BOOK TRIAL IN THIS DISCIPLINE</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
