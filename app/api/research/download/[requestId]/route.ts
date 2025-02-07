import { type NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Research from "@/models/Research";

export async function GET(request: NextRequest) {
  try {
    const requestId = request.nextUrl.pathname.split("/").pop();

    await connectDB();
    const research = await Research.findOne({ requestId });

    if (!research || !research.documentUrl) {
      return Response.json({ error: "Document not found" }, { status: 404 });
    }

    // Redirect to Cloudinary URL
    return Response.redirect(research.documentUrl);
  } catch (error) {
    console.error("Download error:", error);
    return Response.json({ error: "Failed to download" }, { status: 500 });
  }
}
