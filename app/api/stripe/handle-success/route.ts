import { NextResponse } from "next/server";
import { getStripeInstance } from "@/lib/stripe";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Stripe from "stripe";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    console.log("Session ID:", sessionId);

    if (!sessionId) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/research/profile?error=missing_session`
      );
    }

    const stripe = getStripeInstance();
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    });

    console.log("Customer Email:", checkoutSession.customer_email);

    if (!checkoutSession.customer_email) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/research/profile?error=invalid_session`
      );
    }

    await connectDB();

    // First check if user exists
    const existingUser = await User.findOne({
      email: checkoutSession.customer_email,
    });
    console.log("Existing User:", existingUser?._id);

    if (!existingUser) {
      console.error("User not found in database");
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/research/profile?error=user_not_found`
      );
    }

    // Get subscription and plan details
    const subscription = await stripe.subscriptions.retrieve(
      checkoutSession.subscription as string,
      {
        expand: ["items.data.price.product"],
      }
    );

    const planName = (
      subscription.items.data[0].price.product as Stripe.Product
    ).name.toLowerCase();

    console.log("Plan Name:", planName);

    // Create update object
    const updateData = {
      plan: planName,
      stripeCustomerId: checkoutSession.customer as string,
      subscriptionId: subscription.id,
      subscriptionStatus: "active",
      "usage.remainingCredits":
        planName === "starter" ? 4 : planName === "professional" ? 999999 : 1,
      "billing.nextBillingDate": new Date(
        subscription.current_period_end * 1000
      ),
    };

    console.log("Update Data:", updateData);

    // Try direct update first
    const result = await User.findByIdAndUpdate(
      existingUser._id,
      {
        $set: updateData,
        $push: {
          "billing.invoices": {
            invoiceId: sessionId,
            amount: checkoutSession.amount_total! / 100,
            date: new Date(),
            status: "paid",
            downloadUrl: "",
          },
        },
      },
      { new: true }
    );

    console.log("Update Result:", result);

    if (!result) {
      console.error("Failed to update user");
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/research/profile?error=update_failed`
      );
    }

    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/research/profile?success=true`
    );
  } catch (error) {
    console.error("Success handler error:", error);
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/research/profile?error=internal_error`
    );
  }
}
