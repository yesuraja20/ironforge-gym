# IRONFORGE ELITE FITNESS — Ultra-Premium 3D Cinematic Gym Platform

> **Tagline:** UNLEASH YOUR POTENTIAL.  
> **Headline:** BUILT BY DISCIPLINE.  
> **Supporting Text:** More than a gym. A new standard of strength.

An ultra-premium, cinematic digital experience created for high-performance athletic fitness brands. Built with Next.js 14, TypeScript, Tailwind CSS, and Three.js (WebGL).

---

## ⚡ Key Features

1. **Cinematic Hero Experience:**
   - Real-time 3D metallic forged steel emblem with dynamic lighting, mouse parallax, and floating forge embers.
   - Cinematic athletic environment with side spotlights and subtle fog depth.
   - Staggered editorial headline typography with metallic text clipping.
2. **10 Complete Editorial Sections:**
   - **01 Cinematic Hero** (3D emblem, dual CTAs, credentials ticker)
   - **02 The Ironforge Manifesto** (brand pillars and facility metrics)
   - **03 Elite Training Programs** (interactive discipline tabs with intensity indicators)
   - **04 Master Coaches** (coach dossiers, credentials, and consultation booking)
   - **05 Facilities & 3D Hardware Inspector** (interactive 3D WebGL viewer for calibrated Olympic discs and barbells)
   - **06 Membership Plans** (Starter, Pro, Elite with Monthly/Annual 20% discount toggle)
   - **07 Free Trial Booking Station** (client-side validation, reference pass generation, confetti animation, Supabase readiness)
   - **08 Fitness Community Stories** (verified athletic metric transformations)
   - **09 Sanctuary Location & Hours** (opening schedules, 24/7 keycard access, map, and WhatsApp concierge)
   - **10 Premium Footer** (newsletter dispatch, quick links, and client ready notice)
3. **Interactive 3D Hardware Inspector:**
   - Real-time WebGL orbit inspection (360° drag rotation)
   - Switchable presets: Eleiko IWF Competition Disc, Ironforge Crimson Edition, and Swedish Spring Steel Power Barbell.
4. **Direct WhatsApp Concierge:**
   - Floating VIP WhatsApp badge and inline CTAs with prefilled messages.
5. **Centralized Client Configuration:**
   - All business details, prices, contact information, hours, and branding can be modified in a single file: `src/config/gymConfig.ts`.
6. **Server-Side API Routes:**
   - `/api/booking`: Handles trial session bookings with validation and database integration.
   - `/api/enquiry`: Handles executive concierge messages.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/yesuraja20/ironforge-gym.git

# Enter the project directory
cd ironforge-gym

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience the site.

### Production Build
```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & Vanilla CSS Design Tokens
- **3D Graphics:** Three.js / WebGL
- **Icons:** Lucide React
- **Celebration Effects:** Canvas-Confetti

---

## 📄 License
MIT License. Crafted for luxury athletic fitness facilities.
