export interface Trainer {
  id: string;
  name: string;
  role: string;
  experience: string;
  bio: string;
  specialties: string[];
  certifications: string[];
  image: string;
  instagram?: string;
  quote: string;
}

export interface Program {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  intensity: 'Medium' | 'High' | 'Extreme';
  frequency: string;
  focus: string[];
  features: string[];
  image: string;
}

export interface Facility {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  specs: string[];
  image: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  monthlyPrice: number;
  annualPricePerMonth: number;
  popular?: boolean;
  description: string;
  features: { text: string; included: boolean }[];
  highlight: string;
}

export interface ClientTestimonial {
  id: string;
  name: string;
  role: string;
  metric: string;
  timeframe: string;
  quote: string;
  program: string;
  image: string;
}

export interface GymConfig {
  brand: {
    name: string;
    brandTag: string;
    tagline: string;
    heroHeadline: string;
    heroSubtext: string;
    manifestoTitle: string;
    manifestoText: string;
    establishedYear: number;
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    email: string;
    whatsappNumber: string; // International format without + (e.g. 15551234567)
    whatsappDefaultMessage: string;
    address: {
      street: string;
      suite: string;
      city: string;
      state: string;
      zip: string;
      country: string;
      googleMapsUrl: string;
    };
  };
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
    holidayHours: string;
  };
  metrics: {
    facilitySqFt: string;
    coachesCount: string;
    equipmentPieces: string;
    clientSuccessRate: string;
  };
  socialLinks: {
    instagram: string;
    youtube: string;
    twitter: string;
    linkedin: string;
  };
  currency: {
    symbol: string;
    code: string;
  };
  programs: Program[];
  trainers: Trainer[];
  facilities: Facility[];
  membershipPlans: MembershipPlan[];
  testimonials: ClientTestimonial[];
}

export const gymConfig: GymConfig = {
  brand: {
    name: "IRONFORGE",
    brandTag: "ELITE FITNESS",
    tagline: "UNLEASH YOUR POTENTIAL.",
    heroHeadline: "BUILT BY DISCIPLINE.",
    heroSubtext: "More than a gym. A new standard of strength.",
    manifestoTitle: "FORGED IN FIRE. DRIVEN BY PRECISION.",
    manifestoText:
      "We do not cater to casual fitness or comfortable mediocrity. IRONFORGE was engineered as an uncompromising cathedral of human performance — where world-class biomechanics, calibrated steel, and relentless human discipline collide to transform the ambitious into the unstoppable.",
    establishedYear: 2021,
  },
  contact: {
    phone: "+1 (800) 476-6367",
    phoneDisplay: "+1 (800) IRON-FORGE",
    email: "concierge@ironforge-elite.com",
    whatsappNumber: "18004766367", // Gym client can replace with their actual WhatsApp number
    whatsappDefaultMessage: "Hello IRONFORGE Team, I'm interested in experiencing a VIP private tour and trial session.",
    address: {
      street: "740 Performance Way",
      suite: "Level 1-3, The Apex Pavilion",
      city: "Austin",
      state: "TX",
      zip: "78701",
      country: "United States",
      googleMapsUrl: "https://maps.google.com/?q=Austin+TX",
    },
  },
  hours: {
    weekdays: "05:00 AM – 11:00 PM",
    saturday: "06:00 AM – 10:00 PM",
    sunday: "07:00 AM – 08:00 PM",
    holidayHours: "08:00 AM – 06:00 PM (VIP 24/7 Keycard)",
  },
  metrics: {
    facilitySqFt: "45,000",
    coachesCount: "18",
    equipmentPieces: "240+",
    clientSuccessRate: "99.4%",
  },
  socialLinks: {
    instagram: "https://instagram.com/ironforge_elite",
    youtube: "https://youtube.com/@ironforge_elite",
    twitter: "https://twitter.com/ironforge_fit",
    linkedin: "https://linkedin.com/company/ironforge-fitness",
  },
  currency: {
    symbol: "$",
    code: "USD",
  },
  programs: [
    {
      id: "hypertrophy-strength",
      number: "01",
      title: "Hypertrophy & Strength Architecture",
      tagline: "Biomechanical precision for peak muscle volume & power output",
      description:
        "Engineered around progressive overload physics, mechanical tension profiling, and customized range-of-motion assessments. Build unyielding functional density and elite kinetic force.",
      intensity: "Extreme",
      frequency: "4-5 Days / Week",
      focus: ["Periodized Heavy Loading", "Biomechanical Muscle Alignment", "CNS Recovery Protocols"],
      features: [
        "1-on-1 Movement Pattern Screening",
        "Eleiko Calibrated Micro-loading Plan",
        "Weekly Volumetric Muscle Recovery Audits",
      ],
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "olympic-performance",
      number: "02",
      title: "Olympic Weightlifting & Power Dynamics",
      tagline: "Explosive triple extension, snatch velocity & clean-and-jerk mastery",
      description:
        "Taught by certified USAW master coaches on solid Swedish oak lifting platforms. Master velocity-based bar trajectories, hip-hinge snap, and bulletproof overhead shoulder stability.",
      intensity: "Extreme",
      frequency: "3-4 Days / Week",
      focus: ["Snatch & Clean Precision", "Rate of Force Development (RFD)", "High-Bar Squat Mechanics"],
      features: [
        "Video 240fps High-Speed Bar-Path Analysis",
        "Custom Eleiko IWF Competition Barbells",
        "Wrist & Ankle Dorsiflexion Mobility Labs",
      ],
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "metabolic-conditioning",
      number: "03",
      title: "High-Performance Metabolic Engine",
      tagline: "Elite anaerobic lactate threshold & VO2 max elevation",
      description:
        "High-density hybrid conditioning combining SkiErgs, assault runners, sled sprints, and kettlebell ballistic circuits. Engineered for stamina that endures under brutal fatigue.",
      intensity: "High",
      frequency: "3-5 Days / Week",
      focus: ["Lactate Shuttle Efficiency", "VO2 Max Expansion", "Work Capacity Conditioning"],
      features: [
        "Real-Time Heart Rate Biometric Tracking",
        "Sled Push & Echo Bike Interval Stations",
        "Cryo-Recovery Integration Post-Session",
      ],
      image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "athletic-mobility-combat",
      number: "04",
      title: "Athletic Mobility & Combat Movement",
      tagline: "Multi-planar rotational power, joint bulletproofing & agility",
      description:
        "Combining FRC (Functional Range Conditioning) with boxing footwork, rotational core torque, and fascial elasticity to keep heavy lifters agile, injury-resilient, and combat-ready.",
      intensity: "Medium",
      frequency: "3 Days / Week",
      focus: ["Deceleration & Rotational Power", "Fascial Elastic Recoil", "Active Joint End-Range Strength"],
      features: [
        "Full Ring & Heavy Bag Combat Area",
        "Kinstretch & CARs Routine Blueprint",
        "Dynamic Turf Footwork & Cone Drills",
      ],
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "vip-executive-coaching",
      number: "05",
      title: "VIP Executive Precision Concierge",
      tagline: "Discreet, bespoke longevity and body composition transformation",
      description:
        "The gold standard for executives, athletes, and leaders. Includes 1-on-1 private suite coaching, quarterly blood panel reviews, executive nutrition chef coordination, and 24/7 coach direct access.",
      intensity: "High",
      frequency: "Personalized",
      focus: ["Hormonal & Longevity Optimization", "Hyper-Tailored Time Efficiency", "Postural Restoration"],
      features: [
        "Private VIP Training Suite & Valet Access",
        "Dexa Body Scan & Biomarker Analytics",
        "Direct Encrypted Coach Hotline",
      ],
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop",
    },
  ],
  trainers: [
    {
      id: "marcus-vance",
      name: "Marcus Vance",
      role: "Head of Strength & Biomechanics",
      experience: "14+ Years Experience",
      bio: "Former Olympic strength coach and master biomechanist. Marcus has prepped elite powerlifters and pro athletes for global competition with razor-sharp lifting mechanics.",
      specialties: ["Biomechanics", "Deadlift Dynamics", "CNS Optimization"],
      certifications: ["CSCS (NSCA)", "USAW Master Level 3", "B.S. Exercise Physiology"],
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop",
      quote: "Technique is non-negotiable. When you master leverage, the weight becomes effortless.",
    },
    {
      id: "elena-rostova",
      name: "Elena Rostova",
      role: "Director of Hypertrophy & Physique",
      experience: "11+ Years Experience",
      bio: "Physique architect renowned for structural symmetry, neuromuscular re-education, and metabolic conditioning. Elena transforms clients with clinical precision.",
      specialties: ["Hypertrophy Mechanics", "Nutritional Periodization", "Postural Alignment"],
      certifications: ["ISSA Master Trainer", "FMS Level 2", "Precision Nutrition Level 2"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
      quote: "Discipline is choosing what you want most over what you want right now.",
    },
    {
      id: "david-chen",
      name: "David Chen",
      role: "Lead Performance & Mobility Specialist",
      experience: "9+ Years Experience",
      bio: "Specializing in athletic speed, rotational torque, and joint bulletproofing. David ensures lifters maintain explosive elasticity and injury-free longevity.",
      specialties: ["FRC Mobility", "Rotational Power", "Knee & Shoulder Bulletproofing"],
      certifications: ["FRC Certified Mobility Specialist", "EXOS Performance Specialist", "NASM-PES"],
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
      quote: "Mobility without strength is useless. Strength without mobility is hazardous.",
    },
    {
      id: "maya-torres",
      name: "Maya Torres",
      role: "Conditioning & Combat Systems Coach",
      experience: "10+ Years Experience",
      bio: "Golden Gloves combat athlete and endurance specialist. Maya leads our high-intensity anaerobic conditioning and athletic combat conditioning labs.",
      specialties: ["Metabolic Threshold", "Boxing Conditioning", "Kettlebell Ballistics"],
      certifications: ["StrongFirst SFG II", "USA Boxing Coach", "Oxygen Advantage Instructor"],
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop",
      quote: "When your lungs burn and the bar feels heavy, that is where your transformation begins.",
    },
  ],
  facilities: [
    {
      id: "olympic-strength-arena",
      name: "The Olympic Strength Arena",
      category: "Free Weight Sanctuary",
      tagline: "Eleiko calibrated IWF plates, custom deadlift platforms & mono-lifts",
      description:
        "12 flush Swedish oak lifting platforms, Eleiko IPF/IWF competition barbells, calibrated steel discs down to 0.25kg, and heavy-duty monolifts designed for zero bar whip or max precision.",
      specs: ["12 Swedish Oak Lifting Platforms", "Eleiko Calibrated Steel Plates", "Competition Bench & Monolifts"],
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "hammer-strength-isolateral",
      name: "Arsenal & Hammer Isolateral Wing",
      category: "Hypertrophy Precision",
      tagline: "Matte-black plate-loaded machinery with converging biomechanical axes",
      description:
        "Custom matte-black Arsenal Strength and Hammer Strength plate-loaded equipment. Engineered with exact converging arcs to eliminate sticking points and protect tendons under massive tension.",
      specs: ["60+ Heavy Isolateral Machines", "Converging Range-of-Motion Cams", "Zero Friction Ceramic Bearings"],
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "recovery-cryo-sauna",
      name: "The Thermal & Cryo Recovery Lounge",
      category: "Regeneration Lab",
      tagline: "Sub-zero whole-body cryotherapy, Finnish red-cedar dry sauna & cold plunges",
      description:
        "Accelerate muscular restoration with -140°C electric whole-body cryotherapy, 42°F filtered cold plunge pools, medical-grade infrared sauna pods, and NormaTec compression boots.",
      specs: ["Electric Sub-Zero Cryo Chamber", "42°F Filtered Cold Plunges", "Finnish Infrared Cedar Saunas"],
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "biometric-scan-lab",
      name: "Biometric Diagnostics & Dexa Suite",
      category: "Human Performance Analytics",
      tagline: "Medical-grade 3D body composition, VO2 max treadmill & force plates",
      description:
        "Objective scientific data driving your programming. Complete 3D body scanning, visceral fat tracking, dual-force plate jump testing, and metabolic cart breath analysis.",
      specs: ["Medical Grade 3D Body Scanner", "Dual Force Plate Jump Metrics", "Metabolic Cart VO2 Max System"],
      image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1200&auto=format&fit=crop",
    },
  ],
  membershipPlans: [
    {
      id: "starter",
      name: "STARTER",
      tagline: "The Foundation of Strength",
      monthlyPrice: 129,
      annualPricePerMonth: 99,
      description:
        "Full access to the main floor, calibrated free weights, and premium locker rooms. Ideal for self-directed athletes.",
      highlight: "Unrestricted access to all free weight and machine facilities.",
      features: [
        { text: "Full Access to Main Lifting Floor (All Hours)", included: true },
        { text: "Eleiko Barbells & Isolateral Equipment Access", included: true },
        { text: "Luxury Locker Suite with Rain Showers", included: true },
        { text: "Initial Biometric 3D Body Composition Scan", included: true },
        { text: "Access to Mobile Companion App & Workout Log", included: true },
        { text: "Thermal Sauna & Cold Plunge Lounge Access", included: false },
        { text: "Monthly Dedicated 1-on-1 Coaching Sessions", included: false },
        { text: "VIP Executive Guest Passes", included: false },
      ],
    },
    {
      id: "pro",
      name: "PRO",
      tagline: "The Athlete's Standard",
      badge: "MOST POPULAR",
      popular: true,
      monthlyPrice: 219,
      annualPricePerMonth: 175,
      description:
        "Our signature membership. Unlimited recovery lounge, monthly coaching checkpoints, and advanced performance testing.",
      highlight: "Includes unlimited Cold Plunge, Infrared Sauna, and 2 Monthly Coaching Sessions.",
      features: [
        { text: "Full Access to Main Lifting Floor (All Hours)", included: true },
        { text: "Eleiko Barbells & Isolateral Equipment Access", included: true },
        { text: "Luxury Locker Suite with Rain Showers", included: true },
        { text: "Monthly Biometric 3D Body Composition Scans", included: true },
        { text: "Access to Mobile Companion App & Workout Log", included: true },
        { text: "Unlimited Thermal Sauna & Cold Plunge Access", included: true },
        { text: "2 Monthly 1-on-1 Master Coach Sessions", included: true },
        { text: "2 VIP Guest Day Passes Per Month", included: true },
      ],
    },
    {
      id: "elite",
      name: "ELITE",
      tagline: "Uncompromising Mastery",
      badge: "ALL-INCLUSIVE LUXURY",
      monthlyPrice: 389,
      annualPricePerMonth: 310,
      description:
        "The pinnacle experience. Private locker suite, weekly personal coaching, Cryo chamber credits, and 24/7 VIP keycard access.",
      highlight: "Unlimited 1-on-1 coaching, Cryo chamber access, and 24/7 Private VIP Keycard.",
      features: [
        { text: "24/7 All-Hours Keycard Private Access", included: true },
        { text: "Reserved Permanent Private Executive Locker", included: true },
        { text: "Unlimited Thermal Sauna, Cold Plunge & Cryo", included: true },
        { text: "Weekly Dedicated 1-on-1 Master Coaching", included: true },
        { text: "Quarterly Comprehensive Biomarker & Dexa Scan", included: true },
        { text: "Customized Nutrition & Supplement Protocol", included: true },
        { text: "Complimentary Towel, Laundry & Beverage Service", included: true },
        { text: "Unlimited VIP Guest Access Privileges", included: true },
      ],
    },
  ],
  testimonials: [
    {
      id: "marcus-transformation",
      name: "Julian Sterling",
      role: "Venture Partner & Lifter",
      metric: "+65 KG TOTAL / -9% BODY FAT",
      timeframe: "8 Months at IRONFORGE",
      quote:
        "The standard at IRONFORGE is unmatched. No noise, no crowded machines, just calibrated equipment and coaches who understand anatomy. My squat went from 140kg to 210kg completely pain-free.",
      program: "Hypertrophy & Strength Architecture",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "elena-transformation",
      name: "Sophia Lindqvist",
      role: "Tech Executive & Endurance Athlete",
      metric: "VO2 MAX 58 / SUB-3 MARATHON",
      timeframe: "6 Months at IRONFORGE",
      quote:
        "The contrast recovery facilities alone are worth every cent. After heavy conditioning sessions, spending 20 minutes in the cold plunge and infrared sauna cuts soreness to zero. This place is an institution.",
      program: "High-Performance Metabolic Engine",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "alex-transformation",
      name: "Marcus Rodriguez",
      role: "Former Collegiate Athlete",
      metric: "315 LB BENCH / ZERO SHOULDER IMPINGEMENT",
      timeframe: "1 Year at IRONFORGE",
      quote:
        "I had chronic shoulder pain from generic gyms for four years. Coach Marcus analyzed my bench grip width and bar path on day one. Within 8 weeks, zero pain and setting personal records every month.",
      program: "Olympic & Biomechanical Strength",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    },
  ],
};
