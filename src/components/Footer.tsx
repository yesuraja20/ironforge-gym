"use client";

import React, { useState } from "react";
import Link from "next/link";
import { gymConfig } from "@/config/gymConfig";
import {
  Dumbbell,
  ArrowUp,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Mail,
  CheckCircle2,
  Shield,
} from "lucide-react";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes("@")) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-obsidian-950 border-t border-white/10 pt-20 pb-12 overflow-hidden text-silver-400">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-crimson/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-obsidian-850 border border-white/15 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-crimson" />
              </div>
              <div>
                <span className="text-xl font-black tracking-widest text-white uppercase block leading-none">
                  {gymConfig.brand.name}
                </span>
                <span className="text-[10px] tracking-[0.25em] text-silver-400 font-mono uppercase">
                  {gymConfig.brand.brandTag}
                </span>
              </div>
            </Link>

            <p className="text-xs text-silver-400 leading-relaxed max-w-sm">
              An uncompromising cathedral of strength. Engineered with calibrated Swedish steel,
              hypothermic recovery, and collegiate master biomechanists.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={gymConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-obsidian-900 border border-white/10 flex items-center justify-center text-silver-400 hover:text-white hover:border-crimson/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={gymConfig.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-obsidian-900 border border-white/10 flex items-center justify-center text-silver-400 hover:text-white hover:border-crimson/40 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={gymConfig.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-obsidian-900 border border-white/10 flex items-center justify-center text-silver-400 hover:text-white hover:border-crimson/40 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={gymConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-obsidian-900 border border-white/10 flex items-center justify-center text-silver-400 hover:text-white hover:border-crimson/40 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="#overview" className="hover:text-white transition-colors">
                  Overview & Manifesto
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-white transition-colors">
                  Training Disciplines
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-white transition-colors">
                  3D Hardware & Labs
                </a>
              </li>
              <li>
                <a href="#coaches" className="hover:text-white transition-colors">
                  Master Biomechanists
                </a>
              </li>
              <li>
                <a href="#memberships" className="hover:text-white transition-colors">
                  Membership Tiers
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">
                  Athlete Proven Data
                </a>
              </li>
            </ul>
          </div>

          {/* Sanctuary Hours & Address */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
              Sanctuary Access
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-white font-semibold">{gymConfig.contact.address.street}</p>
              <p>{gymConfig.contact.address.suite}</p>
              <p>
                {gymConfig.contact.address.city}, {gymConfig.contact.address.state}{" "}
                {gymConfig.contact.address.zip}
              </p>
              <div className="pt-2 text-[11px] font-mono text-silver-500">
                <p>Weekdays: {gymConfig.hours.weekdays}</p>
                <p>Saturday: {gymConfig.hours.saturday}</p>
                <p className="text-crimson font-bold">VIP 24/7 Keycard Active</p>
              </div>
            </div>
          </div>

          {/* Newsletter / Bulletin */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
              Discipline Dispatch
            </h4>
            <p className="text-xs text-silver-400">
              Receive monthly biomechanical research digests, lifting velocity studies, and intake announcements.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Subscribed to Ironforge Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-4 h-4 text-silver-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter executive email"
                    className="w-full bg-obsidian-900 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-silver-600 focus:outline-none focus:border-crimson transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-crimson hover:bg-crimson-dark text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-glow-red"
                >
                  Join Dispatch
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits & Client Customization Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-silver-500">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-crimson" />
            <span>
              &copy; {new Date().getFullYear()} {gymConfig.brand.name} {gymConfig.brand.brandTag}. All Rights Reserved.
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <span>Configurable Client Ready</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-silver-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
