"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandIntro from "@/components/BrandIntro";
import TrainingPrograms from "@/components/TrainingPrograms";
import TrainersSection from "@/components/TrainersSection";
import FacilitiesShowcase from "@/components/FacilitiesShowcase";
import MembershipPlans from "@/components/MembershipPlans";
import BookingSection from "@/components/BookingSection";
import CommunityStories from "@/components/CommunityStories";
import ContactAndHours from "@/components/ContactAndHours";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import TrialBookingModal from "@/components/TrialBookingModal";

export default function HomePage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [modalPlan, setModalPlan] = useState<string | undefined>(undefined);
  const [modalProgram, setModalProgram] = useState<string | undefined>(undefined);

  // Trigger modal with optional pre-selections
  const handleOpenBookingModal = (plan?: string, program?: string) => {
    setModalPlan(plan);
    setModalProgram(program);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setModalPlan(undefined);
    setModalProgram(undefined);
  };

  return (
    <main className="min-h-screen bg-obsidian-950 text-silver-200 selection:bg-crimson selection:text-white">
      {/* Fixed Luxury Navigation */}
      <Navbar onOpenBookingModal={() => handleOpenBookingModal()} />

      {/* 1. Cinematic Full-Screen Hero */}
      <Hero onOpenBookingModal={() => handleOpenBookingModal("Standard Trial")} />

      {/* 2. Premium Gym Introduction with Editorial Typography */}
      <BrandIntro />

      {/* 3. Training Programs with Custom Visual Treatments */}
      <TrainingPrograms
        onSelectProgramForTrial={(programTitle) =>
          handleOpenBookingModal("Program Trial", programTitle)
        }
      />

      {/* 4. Professional Trainer Profiles */}
      <TrainersSection
        onBookWithCoach={(coachName) =>
          handleOpenBookingModal("Coach Consultation", `Private Session with ${coachName}`)
        }
      />

      {/* 5. Equipment & Facilities Showcase (Includes 3D WebGL Inspector) */}
      <FacilitiesShowcase />

      {/* 6. Membership Plans with Configurable Pricing */}
      <MembershipPlans
        onSelectPlan={(planName) => handleOpenBookingModal(`${planName} Membership`)}
      />

      {/* 7. Free Trial Booking Form Station */}
      <BookingSection
        preselectedPlan={modalPlan}
        preselectedProgram={modalProgram}
      />

      {/* 8. Fitness Community & Genuine Client Stories */}
      <CommunityStories />

      {/* 9. Contact, Location, Opening Hours & WhatsApp Enquiry */}
      <ContactAndHours />

      {/* 10. Premium Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />

      {/* Priority Booking Modal (Controlled globally from any CTA) */}
      <TrialBookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        preselectedPlan={modalPlan}
        preselectedProgram={modalProgram}
      />
    </main>
  );
}
