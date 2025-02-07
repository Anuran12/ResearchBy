import { type NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Research from "@/models/Research";
import User from "@/models/User";
import cloudinary from "@/lib/cloudinary";

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

export async function GET(request: NextRequest) {
  try {
    // Get requestId from the URL
    const requestId = request.nextUrl.pathname.split("/").pop();

    const response = await fetch(
      `http://ec2-54-177-139-194.us-west-1.compute.amazonaws.com:3000/api/research/status/${requestId}`
    );
    const data = await response.json();

    // Update research status in database
    await connectDB();
    if (data.status?.includes("COMPLETED")) {
      const research = await Research.findOne({ requestId });
      if (research) {
        // Fetch the document from the original API
        const docResponse = await fetch(
          `http://ec2-54-177-139-194.us-west-1.compute.amazonaws.com:3000/api/research/download/${requestId}`
        );
        const buffer = Buffer.from(await docResponse.arrayBuffer());

        // Upload to Cloudinary
        const result = await new Promise<CloudinaryUploadResult>(
          (resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                resource_type: "raw",
                folder: "research_documents",
                public_id: `research_${requestId}`,
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result as CloudinaryUploadResult);
              }
            );

            uploadStream.end(buffer);
          }
        );

        // Update research with document URL and status
        await Promise.all([
          Research.findOneAndUpdate(
            { requestId },
            {
              status: "completed",
              lastModified: new Date(),
              documentUrl: result.secure_url,
              documentPublicId: result.public_id,
            }
          ),
          User.findOneAndUpdate(
            { _id: research.userId },
            {
              $inc: {
                "usage.researchCount": 1,
                "usage.remainingCredits": -1,
              },
              $set: {
                "usage.lastResearchDate": new Date(),
              },
            }
          ),
        ]);
      }
    }

    return Response.json(data);
  } catch (error) {
    console.error("Status check error:", error);
    return Response.json({ error: "Failed to get status" }, { status: 500 });
  }
}
