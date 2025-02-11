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
    const requestId = request.nextUrl.pathname.split("/").pop();
    if (!requestId) {
      return Response.json({ error: "Invalid request ID" }, { status: 400 });
    }

    const response = await fetch(
      `http://ec2-54-177-139-194.us-west-1.compute.amazonaws.com:3000/api/research/status/${requestId}`
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Update research status in database
    await connectDB();

    if (data.status?.includes("COMPLETED")) {
      const research = await Research.findOne({ requestId });
      if (research) {
        try {
          // Fetch the document from the original API
          const docResponse = await fetch(
            `http://ec2-54-177-139-194.us-west-1.compute.amazonaws.com:3000/api/research/download/${requestId}`
          );

          if (!docResponse.ok) {
            // Update research status to failed if document fetch fails
            await Research.findOneAndUpdate(
              { requestId },
              { status: "failed", lastModified: new Date() }
            );
            return Response.json({
              error: "Failed to fetch document",
              status: ["Failed to process document"],
            });
          }

          const buffer = await docResponse.arrayBuffer();
          if (!buffer || buffer.byteLength === 0) {
            throw new Error("Empty document received");
          }

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

              uploadStream.end(Buffer.from(buffer));
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

          return Response.json({ status: ["COMPLETED"] });
        } catch (uploadError) {
          console.error("Document processing error:", uploadError);
          // Update research status to failed
          await Research.findOneAndUpdate(
            { requestId },
            { status: "failed", lastModified: new Date() }
          );
          return Response.json({
            error: "Failed to process document",
            status: ["Failed to process document"],
          });
        }
      }
    }

    return Response.json(data);
  } catch (error) {
    console.error("Status check error:", error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Failed to get status",
        status: ["Error checking research status"],
      },
      { status: 500 }
    );
  }
}
