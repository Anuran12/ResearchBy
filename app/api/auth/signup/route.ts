import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const user = new User({
      name,
      email,
      password,
      signupMethod: "credentials",
      avatar: "/default-avatar.png",
      plan: "free",
      billing: {
        paymentMethods: [],
        invoices: [],
        nextBillingDate: new Date(),
      },
      settings: {
        display: {
          theme: "light",
          fontSize: "medium",
          language: "en",
        },
        research: {
          defaultWordCount: 5000,
          defaultCitationStyle: "MLA",
          includeMetadata: false,
          saveHistory: true,
          autoSave: true,
        },
      },
      usage: {
        researchCount: 0,
        lastResearchDate: new Date(),
        remainingCredits: 1,
      },
      lastLogin: new Date(),
    });

    await user.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
