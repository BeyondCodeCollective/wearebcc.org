import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

const MAX_SIZE = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const password = form.get("password");

    if (
      !process.env.DASHBOARD_PASSWORD ||
      password !== process.env.DASHBOARD_PASSWORD
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Image must be under 8MB" },
        { status: 400 }
      );
    }

    const blob = await put(`uploads/${file.name}`, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Admin upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
