import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

/**
 * Token endpoint for client-side Blob uploads. The browser uploads the
 * file directly to Blob storage (bypassing the 4.5MB serverless body
 * limit); this route only checks the admin password and issues a
 * short-lived upload token.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (
          !process.env.DASHBOARD_PASSWORD ||
          clientPayload !== process.env.DASHBOARD_PASSWORD
        ) {
          throw new Error("Unauthorized — log out and back in, then retry");
        }
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "image/svg+xml",
          ],
          maximumSizeInBytes: 20 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // No post-upload bookkeeping needed; the URL is saved with the
        // article content when the editor hits Save.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Admin upload token error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
