"use client";

import React from "react";
import BookingForm from "./BookingForm";
import { gymConfig } from "@/config/gymConfig";
import { ShieldCheck, Sparkles, Clock, CheckCircle } from "lucide-react";

interface BookingSectionProps {
  preselectedPlan?: string;
  preselectedProgram?: string;
}

export default function BookingSection({
  preselectedPlan,
  preselectedProgram,
}: BookingSectionProps) {
  return (
    <section id="trial" className="relative py-24 lg:py-32 bg-obsidian-950 border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-crimson/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-800 border border-white/10 text-xs font-mono text-crimson uppercase tracking-widest">
              <span>06</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>Complimentary Access</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
              EXPERIENCE THE <br />
              <span className="text-metal">SANCTUARY FIRSTHAND.</span>
            </h2>

            <p className="text-silver-300 text-sm sm:text-base leading-relaxed">
              We invite serious athletes, executives, and fitness enthusiasts to a private complimentary session. Experience calibrated Swedish steel, our thermal recovery suites, and consultation with a Master Biomechanist.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-silver-300">
                <CheckCircle className="w-4 h-4 text-crimson shrink-0" />
                <span>Complimentary 3D DEXA Body Composition Scan</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-silver-300">
                <CheckCircle className="w-4 h-4 text-crimson shrink-0" />
                <span>Private 1-on-1 Movement & Barbell Technique Screen</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-silver-300">
                <CheckCircle className="w-4 h-4 text-crimson shrink-0" />
                <span>Access to Sub-Zero Cryotherapy & Finnish Cedar Sauna</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-900 border border-white/10 flex items-center gap-3">
              <Clock className="w-5 h-5 text-crimson shrink-0" />
              <div className="text-xs">
                <span className="text-white font-bold block uppercase font-mono">Instant Confirmation</span>
                <span className="text-silver-400">Our VIP concierge confirms your session within 2 business hours.</span>
              </div>
            </div>
          </div>

          {/* Right: Booking Form Container */}
          <div className="lg:col-span-7 rounded-2xl glass-panel-glow border-crimson/30 p-6 sm:p-10 shadow-2xl relative">
            <div className="mb-6 pb-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white uppercase tracking-tight">
                  VIP TRIAL SESSION INVITATION
                </h3>
                <p className="text-xs text-silver-400 font-mono">No credit card required. Zero obligation.</p>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded bg-crimson/15 text-crimson border border-crimson/30 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>GUEST PASS</span>
              </div>
            </div>

            <BookingForm
              initialPlan={preselectedPlan}
              initialProgram={preselectedProgram}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
