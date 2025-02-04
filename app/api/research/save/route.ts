import { getServerSession } from "next-auth/next";
import connectDB from "@/lib/mongodb";
import Research from "@/models/Research";
import User from "@/models/User";
export async function POST(request: Request) {
  try {
    // 1. Check authentication
    const session = await getServerSession();
    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Connect to database
    try {
      await connectDB();
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return Response.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    // 3. Parse request data
    const data = await request.json();
    console.log("Received data:", data);

    // 4. Find user
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // 5. Create research document
    try {
      const research = await Research.create({
        userId: user._id,
        requestId: data.requestId,
        title: data.title || data.query,
        query: data.query,
        wordCount: data.wordCount || null,
        professional: Boolean(data.professional),
        status: "in_progress",
        networkType: data.professional ? "Professional Network" : "General",
        tags: [],
        favorite: false,
        lastModified: new Date(),
        createdAt: new Date(),
      });

      return Response.json(research);
    } catch (createError) {
      console.error("Research creation error:", createError);
      return Response.json(
        {
          error: "Failed to create research",
          details:
            createError instanceof Error
              ? createError.message
              : String(createError),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Save research error:", error);
    return Response.json(
      {
        error: "Failed to save research",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
