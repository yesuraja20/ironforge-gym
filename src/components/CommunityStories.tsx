"use client";

import React from "react";
import Image from "next/image";
import { gymConfig } from "@/config/gymConfig";
import { Quote, CheckCircle2, TrendingUp, Trophy } from "lucide-react";

export default function CommunityStories() {
  return (
    <section id="testimonials" className="relative py-24 lg:py-32 bg-obsidian-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-800 border border-white/10 text-xs font-mono text-crimson uppercase tracking-widest">
            <span>07</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>Athletic Proof</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            FORGED BY DISCIPLINE. <br />
            <span className="text-metal">PROVEN BY DATA.</span>
          </h2>

          <p className="text-silver-400 text-sm sm:text-base">
            Genuine transformations from our dedicated community. No filtered gimmicks — measurable strength, body composition, and athletic endurance.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {gymConfig.testimonials.map((story) => (
            <div
              key={story.id}
              className="rounded-2xl glass-panel border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-crimson/40 transition-all duration-300 group shadow-xl"
            >
              <div className="space-y-6">
                {/* Metric Callout */}
                <div className="p-4 rounded-xl bg-obsidian-950 border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-silver-400">
                    <span className="flex items-center gap-1 text-crimson font-semibold">
                      <TrendingUp className="w-3.5 h-3.5" /> VERIFIED METRIC
                    </span>
                    <span>{story.timeframe}</span>
                  </div>
                  <p className="text-base sm:text-lg font-black text-white font-mono tracking-tight pt-1">
                    {story.metric}
                  </p>
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="w-6 h-6 text-crimson/40 mb-2" />
                  <p className="text-xs sm:text-sm text-silver-300 italic leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Author Footer */}
              <div className="pt-6 border-t border-white/10 flex items-center gap-3.5 mt-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 shrink-0">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    sizes="48px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white uppercase truncate flex items-center gap-1.5">
                    {story.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-crimson inline shrink-0" />
                  </h4>
                  <p className="text-[11px] text-silver-400 font-mono truncate">{story.role}</p>
                  <p className="text-[10px] text-crimson font-mono truncate">{story.program}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community Banner */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-obsidian-950 via-obsidian-900 to-obsidian-950 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-crimson/20 border border-crimson/40 flex items-center justify-center text-crimson shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-base font-bold text-white uppercase tracking-tight">
                IRONFORGE ATHLETIC GUILD
              </p>
              <p className="text-xs text-silver-400">
                Join a community of 400+ focused lifters, entrepreneurs, and athletes who leave their egos at the door.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-silver-300 bg-obsidian-850 px-4 py-2 rounded-xl border border-white/5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Exclusive Cap: 85 Memberships Available</span>
          </div>
        </div>
      </div>
    </section>
  );
}
