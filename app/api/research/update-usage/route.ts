import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $inc: {
          "usage.researchCount": 1,
          "usage.remainingCredits": -1,
        },
        $set: {
          "usage.lastResearchDate": new Date(),
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Failed to update usage" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      remainingCredits: updatedUser.usage.remainingCredits,
      researchCount: updatedUser.usage.researchCount,
    });
  } catch (error) {
    console.error("Update usage error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
