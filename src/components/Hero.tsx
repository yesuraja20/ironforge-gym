"use client";

import React from "react";
import Image from "next/image";
import { gymConfig } from "@/config/gymConfig";
import Hero3DCanvas from "./Hero3DCanvas";
import { ArrowDown, Flame, Shield, Award, ChevronRight } from "lucide-react";

interface HeroProps {
  onOpenBookingModal: () => void;
}

export default function Hero({ onOpenBookingModal }: HeroProps) {
  const scrollToExplore = () => {
    const target = document.getElementById("overview");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-obsidian-950 pt-24 sm:pt-28 pb-10">
      {/* Cinematic Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=85&w=2000&auto=format&fit=crop"
          alt="Cinematic Elite Gym Environment with Calibrated Strength Equipment"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 filter brightness-[0.28] contrast-[1.25] transition-transform duration-1000"
        />
        {/* Cinematic atmospheric depth overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950 via-obsidian-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-obsidian-950/80" />
        <div className="absolute inset-0 bg-radial-crimson pointer-events-none" />
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
        {/* Subtle grid line texture */}
        <div className="absolute inset-0 bg-subtle-grid opacity-60 pointer-events-none" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-obsidian-800/80 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-crimson animate-ping" />
              <span className="text-[11px] font-mono tracking-[0.22em] text-silver-300 uppercase font-semibold">
                {gymConfig.brand.name} • {gymConfig.brand.tagline}
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] uppercase font-sans">
                <span className="block text-white">BUILT BY</span>
                <span className="block text-metal relative inline-block">
                  DISCIPLINE.
                  {/* Subtle red accent line under discipline */}
                  <span className="absolute -bottom-1 left-0 w-32 sm:w-48 h-1 sm:h-1.5 bg-crimson rounded-full shadow-glow-red" />
                </span>
              </h1>
              <p className="text-lg sm:text-2xl text-silver-300 font-light tracking-wide max-w-xl pt-2">
                {gymConfig.brand.heroSubtext}
              </p>
            </div>

            {/* Supporting Micro Points */}
            <p className="text-xs sm:text-sm text-silver-500 font-mono tracking-wider uppercase max-w-lg">
              Eleiko IWF Calibrated Steel • Contrast Cryo Therapy • 1-on-1 Biomechanics Laboratory
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              {/* Button 1: Start Fitness Journey */}
              <button
                onClick={onOpenBookingModal}
                className="group relative px-8 py-4 rounded-xl bg-crimson hover:bg-crimson-dark text-white font-bold text-xs sm:text-sm tracking-[0.16em] uppercase shadow-glow-red hover:shadow-glow-red-lg transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  START YOUR FITNESS JOURNEY
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </button>

              {/* Button 2: Explore Gym */}
              <button
                onClick={scrollToExplore}
                className="group px-8 py-4 rounded-xl bg-obsidian-800/80 hover:bg-obsidian-700/80 text-silver-200 hover:text-white font-bold text-xs sm:text-sm tracking-[0.16em] uppercase border border-white/15 hover:border-white/30 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>EXPLORE THE GYM</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1 text-silver-400 group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* Right: 3D Metallic Emblem & Depth Layer */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative mt-6 lg:mt-0">
            <div className="relative w-full h-72 sm:h-96 lg:h-[460px] flex items-center justify-center">
              {/* Background ambient red glow */}
              <div className="absolute w-72 h-72 bg-crimson/20 rounded-full blur-[80px] pointer-events-none" />

              {/* Three.js Interactive 3D Canvas */}
              <Hero3DCanvas className="z-10" />

              {/* 3D Interactivity Badge */}
              <div className="absolute -bottom-2 sm:bottom-0 right-2 sm:right-6 z-20 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-900/90 border border-white/10 text-[10px] font-mono text-silver-400 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
                  3D Interactive Forged Emblem
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Highlights & Metrics Ticker */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-obsidian-800 border border-white/10 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-crimson" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-extrabold text-white font-mono tracking-tight">45,000 SQ FT</p>
              <p className="text-[11px] text-silver-400 uppercase tracking-wider">Sanctuary of Strength</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-obsidian-800 border border-white/10 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-silver-300" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-extrabold text-white font-mono tracking-tight">ELEIKO CERTIFIED</p>
              <p className="text-[11px] text-silver-400 uppercase tracking-wider">Competition Standards</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-obsidian-800 border border-white/10 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-crimson" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-extrabold text-white font-mono tracking-tight">18 MASTER COACHES</p>
              <p className="text-[11px] text-silver-400 uppercase tracking-wider">1-on-1 Biomechanics</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-obsidian-800 border border-white/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-mono font-bold text-crimson">99.4%</span>
            </div>
            <div>
              <p className="text-sm sm:text-base font-extrabold text-white font-mono tracking-tight">PROVEN RESULTS</p>
              <p className="text-[11px] text-silver-400 uppercase tracking-wider">Transformation Record</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
