import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
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

    // Add logging to debug expiration check
    console.log("Checking plan validity:", {
      currentTime: new Date(),
      nextBillingDate: user.billing?.nextBillingDate,
      hasExpired:
        user.billing?.nextBillingDate &&
        new Date() > user.billing.nextBillingDate,
    });

    // Check if plan has expired
    if (
      user.billing?.nextBillingDate &&
      new Date() > user.billing.nextBillingDate &&
      user.plan !== "free" // Only reset if not already free
    ) {
      console.log("Plan expired, resetting to free plan");
      user.plan = "free";
      user.usage.remainingCredits = 1;
      user.subscriptionStatus = "canceled";
      await user.save();

      return NextResponse.json({
        plan: user.plan,
        remainingCredits: user.usage.remainingCredits,
        subscriptionStatus: user.subscriptionStatus,
        nextBillingDate: user.billing?.nextBillingDate,
        currentTime: new Date(),
        justExpired: true, // Flag to indicate this is the first time we're notifying
      });
    }

    return NextResponse.json({
      plan: user.plan,
      remainingCredits: user.usage.remainingCredits,
      subscriptionStatus: user.subscriptionStatus,
      nextBillingDate: user.billing?.nextBillingDate,
      currentTime: new Date(),
      justExpired: false,
    });
  } catch (error) {
    console.error("Plan check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
