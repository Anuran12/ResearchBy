import { getServerSession } from "next-auth/next";
import connectDB from "@/lib/mongodb";
import Research from "@/models/Research";
import User from "@/models/User";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const researches = await Research.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .select("-__v");

    return Response.json(researches);
  } catch (error) {
    console.error("List research error:", error);
    return Response.json(
      { error: "Failed to fetch researches" },
      { status: 500 }
    );
  }
}
