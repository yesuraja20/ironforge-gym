"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { gymConfig } from "@/config/gymConfig";
import { Dumbbell, Menu, X, ArrowUpRight, Phone, Clock } from "lucide-react";

interface NavbarProps {
  onOpenBookingModal: (plan?: string) => void;
}

export default function Navbar({ onOpenBookingModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Programs", href: "#programs" },
    { label: "Facilities & 3D", href: "#facilities" },
    { label: "Master Coaches", href: "#coaches" },
    { label: "Memberships", href: "#memberships" },
    { label: "Athletes", href: "#testimonials" },
    { label: "Location", href: "#location" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-obsidian-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5"
          : "bg-transparent py-5 lg:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-lg bg-obsidian-800 border border-white/15 flex items-center justify-center transition-transform group-hover:scale-105 group-hover:border-crimson/50">
              <div className="absolute inset-0 bg-crimson/10 rounded-lg blur group-hover:bg-crimson/25 transition-colors" />
              <Dumbbell className="w-5 h-5 text-crimson group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-widest text-metal font-sans leading-none">
                {gymConfig.brand.name}
              </span>
              <span className="text-[10px] tracking-[0.28em] text-silver-400 font-mono mt-0.5 uppercase">
                {gymConfig.brand.brandTag}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-widest text-silver-400 hover:text-white transition-colors font-medium relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-crimson transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`tel:${gymConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="hidden xl:flex items-center gap-2 text-xs font-mono text-silver-400 hover:text-silver-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-crimson" />
              <span>{gymConfig.contact.phoneDisplay}</span>
            </a>

            <button
              onClick={() => onOpenBookingModal()}
              className="relative group overflow-hidden px-5 py-2.5 rounded-lg bg-crimson hover:bg-crimson-dark text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-glow-red hover:shadow-glow-red-lg active:scale-95 flex items-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                START FREE TRIAL
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenBookingModal()}
              className="px-3 py-1.5 rounded-md bg-crimson text-white text-[11px] font-bold tracking-wider uppercase shadow-glow-red"
            >
              TRIAL
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-obsidian-800 text-silver-300 hover:text-white border border-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 pb-6 border-t border-white/10 bg-obsidian-950/95 rounded-2xl px-5 space-y-4 shadow-2xl backdrop-blur-2xl">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium tracking-wider uppercase text-silver-300 hover:text-crimson transition-colors py-2 border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs text-silver-400 font-mono">
                <Clock className="w-3.5 h-3.5 text-crimson" />
                <span>Today: {gymConfig.hours.weekdays}</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookingModal();
                }}
                className="w-full py-3 rounded-lg bg-crimson text-white text-xs font-bold tracking-widest uppercase shadow-glow-red flex items-center justify-center gap-2"
              >
                BOOK VIP TRIAL SESSION <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
