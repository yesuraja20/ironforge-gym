"use client";

import React, { useEffect } from "react";
import BookingForm from "./BookingForm";
import { X, Shield } from "lucide-react";

interface TrialBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPlan?: string;
  preselectedProgram?: string;
}

export default function TrialBookingModal({
  isOpen,
  onClose,
  preselectedPlan,
  preselectedProgram,
}: TrialBookingModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-obsidian-950/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-obsidian-900 border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl my-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-obsidian-800 text-silver-400 hover:text-white transition-colors border border-white/10"
          aria-label="Close Booking Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 space-y-1 pr-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-crimson/20 border border-crimson/40 text-[10px] font-mono text-crimson uppercase">
            <Shield className="w-3 h-3" />
            <span>Priority VIP Scheduling</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            CLAIM YOUR VIP SESSION
          </h3>
          <p className="text-xs text-silver-400">
            {preselectedPlan
              ? `Initiating inquiry for ${preselectedPlan} Membership.`
              : "Reserve your complimentary walkthrough and biometric assessment."}
          </p>
        </div>

        {/* Form Body */}
        <BookingForm
          initialPlan={preselectedPlan}
          initialProgram={preselectedProgram}
          onSuccess={onClose}
        />
      </div>
    </div>
  );
}
