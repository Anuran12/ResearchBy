import { NextResponse } from "next/server";
import { getStripeInstance } from "@/lib/stripe";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Stripe from "stripe";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    console.log("1. Session ID:", sessionId);

    if (!sessionId) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/research/profile?error=missing_session`
      );
    }

    const stripe = getStripeInstance();
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    console.log("2. Checkout Session:", {
      customer_email: checkoutSession.customer_email,
      subscription: checkoutSession.subscription,
    });

    if (!checkoutSession.customer_email) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/research/profile?error=invalid_session`
      );
    }

    await connectDB();

    // First verify user exists
    const existingUser = await User.findOne({
      email: checkoutSession.customer_email,
    });
    console.log("3. Found User:", existingUser?._id);

    if (!existingUser) {
      console.error("User not found:", checkoutSession.customer_email);
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/research/profile?error=user_not_found`
      );
    }

    // Get subscription details
    const subscription = await stripe.subscriptions.retrieve(
      checkoutSession.subscription as string
    );

    console.log("4. Subscription:", {
      id: subscription.id,
      status: subscription.status,
      current_period_end: subscription.current_period_end,
    });

    // Get the price and product details
    const priceId = subscription.items.data[0].price.id;
    const price = await stripe.prices.retrieve(priceId, {
      expand: ["product"],
    });

    const planName = (
      (price.product as Stripe.Product).name || "free"
    ).toLowerCase();
    console.log("5. Plan Name:", planName);

    const nextBillingDate = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours from now

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: existingUser._id },
        {
          $set: {
            plan: planName,
            stripeCustomerId: checkoutSession.customer as string,
            subscriptionId: subscription.id,
            subscriptionStatus: "active",
            "usage.remainingCredits":
              planName === "starter"
                ? 4
                : planName === "professional"
                ? 10
                : planName === "premium"
                ? 30
                : 1,
            "usage.researchCount": 0,
            "billing.nextBillingDate": nextBillingDate,
          },
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

      console.log("6. Updated User:", {
        id: updatedUser?._id,
        plan: updatedUser?.plan,
        credits: updatedUser?.usage?.remainingCredits,
      });

      if (!updatedUser) {
        throw new Error("Update failed");
      }

      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/research?success=true`
      );
    } catch (updateError) {
      console.error("Update error:", updateError);
      throw updateError;
    }
  } catch (error) {
    console.error("Full error details:", error);
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/research/profile?error=internal_error`
    );
  }
}
