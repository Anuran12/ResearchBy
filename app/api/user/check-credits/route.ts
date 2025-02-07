import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      remainingCredits: user.usage.remainingCredits,
      plan: user.plan,
    });
  } catch (error) {
    console.error("Check credits error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
