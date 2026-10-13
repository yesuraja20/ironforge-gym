import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, interest } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const ticketId = `ENQ-${Date.now().toString().slice(-6)}`;

    return NextResponse.json(
      {
        success: true,
        ticketId,
        message: "Enquiry received. Our executive concierge will reach out to you today.",
        enquiry: { name, email, phone, message, interest, ticketId, receivedAt: new Date().toISOString() },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Enquiry API Error:", error);
    return NextResponse.json(
      { error: "Failed to process enquiry. Please reach out via WhatsApp." },
      { status: 500 }
    );
  }
}
