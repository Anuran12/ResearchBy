import { type NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Research from "@/models/Research";
import User from "@/models/User";

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
        await Promise.all([
          Research.findOneAndUpdate(
            { requestId },
            {
              status: "completed",
              lastModified: new Date(),
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
