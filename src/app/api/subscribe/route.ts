import { NextRequest, NextResponse } from "next/server";

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, segment, source } = body;

    // Validate required fields
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!source || typeof source !== "string") {
      return NextResponse.json(
        { error: "Source is required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Log the submission (for now)
    console.log("📧 Email subscription received:", {
      email: email.trim().toLowerCase(),
      segment: segment || "Not specified",
      source,
      timestamp: new Date().toISOString(),
    });

    // TODO: Integrate with Mailchimp
    // 1. Use Mailchimp API to add subscriber to appropriate list/segment
    // 2. Map 'source' to different audiences or tags
    // 3. Handle Mailchimp-specific errors (already subscribed, invalid, etc.)
    // 4. Consider implementing a queue for reliability (e.g., Vercel KV + background job)

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing subscription:", error);
    return NextResponse.json(
      { error: "Failed to process subscription. Please try again." },
      { status: 500 }
    );
  }
}
