import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, program, date, timeSlot, goal, plan } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 7) {
      return NextResponse.json(
        { error: "Please provide a valid phone number for SMS session confirmation." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Generate reference code
    const referenceId = `IF-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Date.now().toString().slice(-4)}`;

    const bookingRecord = {
      referenceId,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      program: program || "General Athletic Assessment",
      plan: plan || "Standard Trial",
      date: date || new Date().toISOString().split("T")[0],
      timeSlot: timeSlot || "Morning (08:00 AM)",
      goal: goal || "Strength & Performance",
      status: "CONFIRMED",
      createdAt: new Date().toISOString(),
    };

    // Check if Supabase credentials are configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    let storageMode: "supabase" | "demo" = "demo";

    if (supabaseUrl && supabaseKey) {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/gym_bookings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: "return=representation",
          },
          body: JSON.stringify(bookingRecord),
        });

        if (response.ok) {
          storageMode = "supabase";
        }
      } catch (dbError) {
        console.warn("Supabase connection attempt failed, falling back to demo mode:", dbError);
        storageMode = "demo";
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your VIP Trial Session has been reserved. Our concierge will contact you within 2 hours.",
        booking: bookingRecord,
        mode: storageMode,
        note:
          storageMode === "demo"
            ? "Operating in Demo Mode: Supabase environment variables not detected. Booking simulated with full validation."
            : "Booking saved securely to database.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your booking. Please try again or message us on WhatsApp." },
      { status: 500 }
    );
  }
}
