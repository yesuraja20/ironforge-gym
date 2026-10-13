"use client";

import React, { useState } from "react";
import { gymConfig } from "@/config/gymConfig";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Navigation,
} from "lucide-react";

export default function ContactAndHours() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    interest: "General Facility Inquiry",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; msg: string } | null>(null);

  const whatsappUrl = `https://wa.me/${gymConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    gymConfig.contact.whatsappDefaultMessage
  )}`;

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit enquiry.");

      setStatus({
        success: true,
        msg: "Message received. Our executive concierge will contact you today.",
      });
      setFormData({ name: "", email: "", phone: "", message: "", interest: "General Facility Inquiry" });
    } catch (err: any) {
      setStatus({ success: false, msg: err.message || "Failed to submit. Please use WhatsApp." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="location" className="relative py-24 lg:py-32 bg-obsidian-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-800 border border-white/10 text-xs font-mono text-crimson uppercase tracking-widest">
            <span>08</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>Concierge & Sanctuary Access</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            LOCATION & <span className="text-metal">OPENING HOURS.</span>
          </h2>

          <p className="text-silver-400 text-sm sm:text-base">
            Located in the heart of Austin with reserved subterranean private parking and executive security.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Hours, Location & WhatsApp */}
          <div className="lg:col-span-6 space-y-6">
            {/* Hours Box */}
            <div className="rounded-2xl glass-panel border border-white/10 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-crimson">
                <Clock className="w-4 h-4" />
                <span>Operating Hours Schedule</span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-silver-300 font-medium">Monday – Friday</span>
                  <span className="text-white font-mono font-bold">{gymConfig.hours.weekdays}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-silver-300 font-medium">Saturday</span>
                  <span className="text-white font-mono font-bold">{gymConfig.hours.saturday}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-silver-300 font-medium">Sunday</span>
                  <span className="text-white font-mono font-bold">{gymConfig.hours.sunday}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-silver-400">Elite VIP Tier Access</span>
                  <span className="text-crimson font-mono font-bold text-xs">24/7 Keycard Private Access</span>
                </div>
              </div>
            </div>

            {/* Address Box */}
            <div className="rounded-2xl glass-panel border border-white/10 p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-crimson">
                  <MapPin className="w-4 h-4" />
                  <span>Sanctuary Address</span>
                </div>
                <a
                  href={gymConfig.contact.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-silver-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="space-y-1 text-sm text-silver-300">
                <p className="font-bold text-white text-base">{gymConfig.contact.address.street}</p>
                <p>{gymConfig.contact.address.suite}</p>
                <p>
                  {gymConfig.contact.address.city}, {gymConfig.contact.address.state}{" "}
                  {gymConfig.contact.address.zip}, {gymConfig.contact.address.country}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono">
                <a
                  href={`tel:${gymConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-1.5 text-silver-300 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-crimson" />
                  <span>{gymConfig.contact.phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${gymConfig.contact.email}`}
                  className="flex items-center gap-1.5 text-silver-300 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-crimson" />
                  <span>{gymConfig.contact.email}</span>
                </a>
              </div>
            </div>

            {/* WhatsApp Integration Banner */}
            <div className="rounded-2xl bg-gradient-to-r from-emerald-950/70 via-obsidian-900 to-obsidian-950 border border-emerald-500/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-400 text-xs font-mono uppercase">
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct WhatsApp Concierge</span>
                </div>
                <h4 className="text-lg font-bold text-white uppercase tracking-tight">
                  Instant Response via WhatsApp
                </h4>
                <p className="text-xs text-silver-400 max-w-sm">
                  Prefer chatting on WhatsApp? Message our front desk team directly for membership tours, guest passes, and schedule inquiries.
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg hover:shadow-emerald-900/50 shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CHAT ON WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Concierge Message Form */}
          <div className="lg:col-span-6 rounded-2xl glass-panel border border-white/10 p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-crimson uppercase tracking-widest">
                Direct Inquiry
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                CONTACT EXECUTIVE CONCIERGE
              </h3>
              <p className="text-xs text-silver-400">
                Have a specific question about facilities, corporate memberships, or VIP training?
              </p>
            </div>

            {status && (
              <div
                className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
                  status.success
                    ? "bg-emerald-950/80 border border-emerald-500/50 text-emerald-200"
                    : "bg-red-950/80 border border-red-500/50 text-red-200"
                }`}
              >
                {status.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                )}
                <span>{status.msg}</span>
              </div>
            )}

            <form onSubmit={handleEnquirySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-silver-400 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Christian Taylor"
                  className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-crimson transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-silver-400 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="christian@domain.com"
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-crimson transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-silver-400 mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-crimson transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-silver-400 mb-1">
                  Area of Interest
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-crimson transition-all"
                >
                  <option value="General Facility Inquiry">General Facility Inquiry</option>
                  <option value="Private VIP Coaching">Private VIP Coaching</option>
                  <option value="Corporate Executive Membership">Corporate Executive Membership</option>
                  <option value="Media & Commercial Shoots">Media & Commercial Shoots</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-silver-400 mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our concierge assist your fitness journey?"
                  className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-crimson transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-obsidian-800 hover:bg-obsidian-750 text-white font-bold text-xs uppercase tracking-wider border border-white/10 hover:border-crimson/40 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-crimson" />
                    <span>TRANSMITTING MESSAGE...</span>
                  </>
                ) : (
                  <>
                    <span>SUBMIT CONCIERGE INQUIRY</span>
                    <Send className="w-3.5 h-3.5 text-crimson" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
