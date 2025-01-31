import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getStripeInstance } from "@/lib/stripe";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";

export async function POST() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user?.stripeCustomerId) {
      return NextResponse.json(
        { error: "No billing information found" },
        { status: 404 }
      );
    }

    const stripe = getStripeInstance();
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXTAUTH_URL}/research/profile`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("Error creating portal session:", error);
    return NextResponse.json(
      { error: "Error creating portal session" },
      { status: 500 }
    );
  }
}
