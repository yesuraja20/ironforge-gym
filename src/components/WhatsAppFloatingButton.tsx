"use client";

import React, { useState } from "react";
import { gymConfig } from "@/config/gymConfig";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppFloatingButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${gymConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    gymConfig.contact.whatsappDefaultMessage
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Optional luxury tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-obsidian-950/95 border border-white/10 text-xs text-silver-300 shadow-2xl backdrop-blur-md animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[11px]">Chat with VIP Concierge</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-silver-500 hover:text-white ml-1"
            aria-label="Dismiss WhatsApp hint"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl hover:shadow-emerald-900/50 transition-all duration-300 active:scale-95 border border-emerald-400/30"
        aria-label="WhatsApp Enquiry"
      >
        <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25 group-hover:opacity-40" />
        <MessageCircle className="w-7 h-7 relative z-10 transition-transform group-hover:scale-110" />
      </a>
    </div>
  );
}
