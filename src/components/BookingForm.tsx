"use client";

import React, { useState } from "react";
import { gymConfig } from "@/config/gymConfig";
import { CheckCircle2, AlertCircle, Loader2, Calendar, Clock, User, Phone, Mail, Dumbbell, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

interface BookingFormProps {
  initialPlan?: string;
  initialProgram?: string;
  onSuccess?: () => void;
}

export default function BookingForm({ initialPlan, initialProgram, onSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    program: initialProgram || gymConfig.programs[0].title,
    plan: initialPlan || "VIP Trial Experience",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
    timeSlot: "Morning (08:00 AM - 10:00 AM)",
    goal: "Maximum Strength & Hypertrophy",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    referenceId: string;
    message: string;
    mode: "supabase" | "demo";
    note: string;
  } | null>(null);

  const timeSlots = [
    "Dawn Lift (05:30 AM - 07:30 AM)",
    "Morning (08:00 AM - 10:00 AM)",
    "Midday (12:00 PM - 02:00 PM)",
    "Peak Afternoon (04:30 PM - 06:30 PM)",
    "Evening Session (07:00 PM - 09:00 PM)",
  ];

  const goals = [
    "Maximum Strength & Hypertrophy",
    "Olympic Weightlifting Mastery",
    "Metabolic Conditioning & Body Fat Reduction",
    "Joint Mobility & Pain-Free Longevity",
    "Executive 1-on-1 Performance Coaching",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      setErrorMsg("Please enter a valid phone number for SMS session confirmation.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("Please provide a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit booking.");
      }

      setSuccessData({
        referenceId: data.booking.referenceId,
        message: data.message,
        mode: data.mode,
        note: data.note,
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#ff1e27", "#ffffff", "#888888"],
        });
      } catch {
        // Ignore confetti if unsupported
      }

      if (onSuccess) {
        setTimeout(() => onSuccess(), 4000);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Network error. Please try again or WhatsApp us directly.");
    } finally {
      setIsLoading(false);
    }
  };

  if (successData) {
    return (
      <div className="p-8 text-center space-y-6 bg-obsidian-900 border border-crimson/40 rounded-2xl shadow-glow-red animate-fade-in">
        <div className="w-16 h-16 mx-auto rounded-full bg-crimson/20 border border-crimson/50 flex items-center justify-center text-crimson">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-crimson">
            Reservation Confirmed
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            VIP SESSION SECURED
          </h3>
          <p className="text-sm text-silver-300 max-w-md mx-auto">{successData.message}</p>
        </div>

        {/* Reference details box */}
        <div className="p-4 rounded-xl bg-obsidian-950 border border-white/10 text-left space-y-2 text-xs font-mono">
          <div className="flex justify-between border-b border-white/5 pb-1.5">
            <span className="text-silver-500 uppercase">Confirmation Pass:</span>
            <span className="text-white font-bold">{successData.referenceId}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-1.5">
            <span className="text-silver-500 uppercase">Selected Discipline:</span>
            <span className="text-silver-300">{formData.program}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-1.5">
            <span className="text-silver-500 uppercase">Time & Date:</span>
            <span className="text-silver-300">{formData.date} • {formData.timeSlot}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-silver-500 uppercase">Tier Pass:</span>
            <span className="text-crimson font-bold">{formData.plan}</span>
          </div>
        </div>

        {/* Transparency note about mode */}
        <div className="p-3 rounded-lg bg-obsidian-950/80 border border-white/5 text-[11px] font-mono text-silver-400 flex items-center gap-2 text-left">
          <ShieldCheck className="w-4 h-4 text-crimson shrink-0" />
          <span>{successData.note}</span>
        </div>

        <button
          type="button"
          onClick={() => {
            setSuccessData(null);
            setFormData({
              ...formData,
              name: "",
              phone: "",
              email: "",
            });
          }}
          className="px-6 py-2.5 rounded-lg bg-obsidian-800 hover:bg-obsidian-750 text-silver-300 text-xs font-mono uppercase tracking-wider transition-colors"
        >
          Book Another Session
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Selected Membership Tag */}
      {formData.plan && (
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-obsidian-950 border border-white/10 text-xs font-mono">
          <span className="text-silver-400">Membership Tier:</span>
          <span className="text-crimson font-bold uppercase">{formData.plan}</span>
        </div>
      )}

      {/* Name Input */}
      <div>
        <label className="block text-xs font-mono uppercase text-silver-400 mb-1.5">
          Full Name *
        </label>
        <div className="relative">
          <User className="w-4 h-4 text-silver-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Alexander Cole"
            className="w-full bg-obsidian-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-silver-600 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
          />
        </div>
      </div>

      {/* Phone & Email Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase text-silver-400 mb-1.5">
            Phone (for SMS confirmation) *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-silver-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 019-2834"
              className="w-full bg-obsidian-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-silver-600 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-silver-400 mb-1.5">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-silver-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@domain.com"
              className="w-full bg-obsidian-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-silver-600 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
            />
          </div>
        </div>
      </div>

      {/* Program & Goal Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase text-silver-400 mb-1.5">
            Preferred Discipline
          </label>
          <div className="relative">
            <Dumbbell className="w-4 h-4 text-silver-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={formData.program}
              onChange={(e) => setFormData({ ...formData, program: e.target.value })}
              className="w-full bg-obsidian-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all appearance-none"
            >
              {gymConfig.programs.map((p) => (
                <option key={p.id} value={p.title} className="bg-obsidian-900 text-white">
                  {p.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-silver-400 mb-1.5">
            Primary Performance Goal
          </label>
          <select
            value={formData.goal}
            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
            className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all appearance-none"
          >
            {goals.map((g, i) => (
              <option key={i} value={g} className="bg-obsidian-900 text-white">
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Date & Time Slot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase text-silver-400 mb-1.5">
            Preferred Date
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-silver-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="date"
              value={formData.date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-obsidian-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-silver-400 mb-1.5">
            Arrival Time Window
          </label>
          <div className="relative">
            <Clock className="w-4 h-4 text-silver-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={formData.timeSlot}
              onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
              className="w-full bg-obsidian-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all appearance-none"
            >
              {timeSlots.map((slot, i) => (
                <option key={i} value={slot} className="bg-obsidian-900 text-white">
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 rounded-xl bg-crimson hover:bg-crimson-dark text-white font-bold text-xs uppercase tracking-widest shadow-glow-red hover:shadow-glow-red-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>CONFIRMING SESSION WITH CONCIERGE...</span>
            </>
          ) : (
            <span>CLAIM PRIVATE TRIAL & WALKTHROUGH</span>
          )}
        </button>
      </div>

      <p className="text-[11px] text-center text-silver-500 font-mono">
        Strict privacy policy. Your information is never shared or sold.
      </p>
    </form>
  );
}
