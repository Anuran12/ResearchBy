import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PlanService } from "@/services/PlanService";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = await PlanService.checkPlanValidity(user._id);

    return NextResponse.json({
      plan: updatedUser.plan,
      remainingCredits: updatedUser.usage.remainingCredits,
      subscriptionStatus: updatedUser.subscriptionStatus,
      nextBillingDate: updatedUser.billing?.nextBillingDate,
    });
  } catch (error) {
    console.error("Plan validity check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
