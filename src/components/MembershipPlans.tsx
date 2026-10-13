"use client";

import React, { useState } from "react";
import { gymConfig, MembershipPlan } from "@/config/gymConfig";
import { Check, X, Sparkles, ArrowRight, Shield, Info } from "lucide-react";

interface MembershipPlansProps {
  onSelectPlan: (planName: string) => void;
}

export default function MembershipPlans({ onSelectPlan }: MembershipPlansProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <section id="memberships" className="relative py-24 lg:py-32 bg-obsidian-900 border-t border-white/5">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-800 border border-white/10 text-xs font-mono text-crimson uppercase tracking-widest">
            <span>05</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>Investment in Excellence</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            SELECT YOUR <span className="text-metal">MEMBERSHIP.</span>
          </h2>

          <p className="text-silver-400 text-sm sm:text-base">
            No long-term lock-in traps. Capped membership ensures uninterrupted access and zero crowds.
          </p>

          {/* Billing Toggle */}
          <div className="pt-4 flex items-center justify-center gap-4">
            <span
              className={`text-xs uppercase font-mono tracking-wider transition-colors ${
                billingCycle === "monthly" ? "text-white font-bold" : "text-silver-500"
              }`}
            >
              Monthly Billing
            </span>

            <button
              type="button"
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
              className="relative w-14 h-7 rounded-full bg-obsidian-800 border border-white/20 transition-colors p-1 flex items-center"
              aria-label="Toggle Billing Cycle"
            >
              <div
                className={`w-5 h-5 rounded-full bg-crimson shadow-glow-red transition-transform duration-300 ${
                  billingCycle === "annual" ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>

            <span
              className={`text-xs uppercase font-mono tracking-wider flex items-center gap-1.5 transition-colors ${
                billingCycle === "annual" ? "text-white font-bold" : "text-silver-500"
              }`}
            >
              Annual Billing
              <span className="px-2 py-0.5 rounded-full bg-crimson/20 border border-crimson/40 text-crimson text-[10px] font-bold">
                SAVE 20%
              </span>
            </span>
          </div>

          {/* Client Notice */}
          <div className="inline-flex items-center gap-1.5 text-[11px] text-silver-500 font-mono mt-2 bg-obsidian-950/60 px-3 py-1 rounded-md border border-white/5">
            <Info className="w-3.5 h-3.5 text-crimson" />
            <span>Configurable Client Pricing • Easily edited in gymConfig.ts</span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {gymConfig.membershipPlans.map((plan) => {
            const isPopular = plan.popular;
            const price =
              billingCycle === "annual" ? plan.annualPricePerMonth : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? "glass-panel-glow border-crimson/50 scale-100 md:-translate-y-2 z-20"
                    : "glass-panel border-white/10 hover:border-white/20"
                } p-6 sm:p-8`}
              >
                {/* Popular or Luxury Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-crimson text-white text-[10px] font-mono font-bold uppercase tracking-widest shadow-glow-red flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {plan.badge}
                  </div>
                )}

                {/* Plan Header */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-xs font-mono text-silver-400 mt-0.5">{plan.tagline}</p>
                  </div>

                  <p className="text-xs text-silver-400 leading-relaxed min-h-[36px]">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="pt-2 pb-4 border-b border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-silver-300 font-mono">
                        {gymConfig.currency.symbol}
                      </span>
                      <span className="text-5xl font-black text-white font-mono tracking-tight">
                        {price}
                      </span>
                      <span className="text-xs text-silver-400 font-mono uppercase tracking-wider">
                        / month
                      </span>
                    </div>
                    {billingCycle === "annual" && (
                      <p className="text-[11px] text-crimson font-mono mt-1">
                        Billed annually ({gymConfig.currency.symbol}
                        {price * 12}/yr)
                      </p>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-2">
                    <p className="text-[11px] font-mono text-silver-500 uppercase tracking-wider">
                      Included Privileges:
                    </p>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-silver-300">
                        {feat.included ? (
                          <Check className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-4 h-4 text-silver-600 shrink-0 mt-0.5" />
                        )}
                        <span className={feat.included ? "text-silver-200" : "text-silver-600 line-through"}>
                          {feat.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-8">
                  <button
                    onClick={() => onSelectPlan(plan.name)}
                    className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                      isPopular
                        ? "bg-crimson hover:bg-crimson-dark text-white shadow-glow-red hover:shadow-glow-red-lg"
                        : "bg-obsidian-800 hover:bg-obsidian-750 text-white border border-white/10 hover:border-crimson/40"
                    }`}
                  >
                    <span>SELECT {plan.name} MEMBERSHIP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-obsidian-950 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-crimson shrink-0" />
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-wide">
                14-Day Unconditional Performance Guarantee
              </p>
              <p className="text-xs text-silver-400">
                If your first 14 days do not elevate your training standard, receive an immediate 100% refund.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectPlan("General Trial")}
            className="px-5 py-2.5 rounded-lg bg-obsidian-800 hover:bg-obsidian-750 text-silver-200 hover:text-white text-xs font-mono tracking-wider border border-white/10 shrink-0"
          >
            REQUEST PRIVATE WALKTHROUGH
          </button>
        </div>
      </div>
    </section>
  );
}
