"use client";

import React, { useState } from "react";
import Image from "next/image";
import { gymConfig, Trainer } from "@/config/gymConfig";
import { Award, ChevronRight, Quote, Sparkles, X } from "lucide-react";

interface TrainersSectionProps {
  onBookWithCoach: (coachName: string) => void;
}

export default function TrainersSection({ onBookWithCoach }: TrainersSectionProps) {
  const [selectedCoach, setSelectedCoach] = useState<Trainer | null>(null);

  return (
    <section id="coaches" className="relative py-24 lg:py-32 bg-obsidian-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-800 border border-white/10 text-xs font-mono text-crimson uppercase tracking-widest">
            <span>03</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>Master Coaches</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            THE ARCHITECTS OF <span className="text-metal">HUMAN PERFORMANCE.</span>
          </h2>

          <p className="text-silver-400 text-sm sm:text-base">
            Every coach at IRONFORGE holds master-level certifications and collegiate/Olympic background.
            We do not employ floor attendants; we train with biomechanists.
          </p>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gymConfig.trainers.map((coach) => (
            <div
              key={coach.id}
              className="group rounded-2xl glass-panel border border-white/10 overflow-hidden flex flex-col justify-between hover:border-crimson/50 transition-all duration-500 hover:-translate-y-1 shadow-xl"
            >
              {/* Photo Container */}
              <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-obsidian-950">
                <Image
                  src={coach.image}
                  alt={coach.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-top filter grayscale contrast-[1.25] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />

                {/* Experience badge */}
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-obsidian-950/80 border border-white/10 text-[11px] font-mono text-silver-300 backdrop-blur-md">
                  {coach.experience}
                </div>

                {/* Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-extrabold text-white uppercase tracking-tight">
                    {coach.name}
                  </h3>
                  <p className="text-xs font-mono text-crimson font-medium">{coach.role}</p>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {coach.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-obsidian-800 text-silver-300 border border-white/5"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-silver-400 line-clamp-3 leading-relaxed">
                    {coach.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCoach(coach)}
                    className="text-xs text-silver-300 hover:text-white font-medium flex items-center gap-1 transition-colors"
                  >
                    <span>View Dossier</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onBookWithCoach(coach.name)}
                    className="px-3 py-1.5 rounded-lg bg-crimson/20 hover:bg-crimson text-crimson hover:text-white text-xs font-bold font-mono tracking-wider transition-all"
                  >
                    CONSULT
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coach Detail Modal */}
        {selectedCoach && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-xl animate-fade-in">
            <div className="relative w-full max-w-2xl bg-obsidian-900 border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
              <button
                onClick={() => setSelectedCoach(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-obsidian-800 text-silver-400 hover:text-white transition-colors"
                aria-label="Close Coach Dossier"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative w-32 h-44 sm:w-44 sm:h-56 rounded-xl overflow-hidden shrink-0 border border-white/10">
                  <Image
                    src={selectedCoach.image}
                    alt={selectedCoach.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>

                <div className="space-y-3 flex-1">
                  <div className="inline-block text-xs font-mono px-2 py-0.5 rounded bg-crimson/20 text-crimson">
                    {selectedCoach.experience}
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase">{selectedCoach.name}</h3>
                  <p className="text-xs font-mono text-crimson">{selectedCoach.role}</p>

                  <p className="text-sm text-silver-300 leading-relaxed pt-1">{selectedCoach.bio}</p>

                  {/* Certifications */}
                  <div className="pt-2">
                    <p className="text-xs font-mono text-silver-500 uppercase tracking-wider mb-1.5">
                      Credentials & Accreditations
                    </p>
                    <ul className="space-y-1">
                      {selectedCoach.certifications.map((cert, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-silver-300">
                          <Award className="w-3.5 h-3.5 text-crimson" /> {cert}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quote */}
                  <div className="pt-2 p-3 rounded-lg bg-obsidian-950 border border-white/5 flex items-start gap-2 italic text-xs text-silver-400">
                    <Quote className="w-4 h-4 text-crimson shrink-0" />
                    <span>&ldquo;{selectedCoach.quote}&rdquo;</span>
                  </div>

                  {/* Action */}
                  <div className="pt-4 flex gap-3">
                    <button
                      onClick={() => {
                        const name = selectedCoach.name;
                        setSelectedCoach(null);
                        onBookWithCoach(name);
                      }}
                      className="w-full py-3 rounded-xl bg-crimson hover:bg-crimson-dark text-white font-bold text-xs uppercase tracking-wider shadow-glow-red transition-all"
                    >
                      Book 1-on-1 Consultation with {selectedCoach.name.split(" ")[0]}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
