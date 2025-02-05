import { NextResponse } from "next/server";
import { getStripeInstance } from "@/lib/stripe";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Stripe from "stripe";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/research/profile?error=missing_session`
      );
    }

    const stripe = getStripeInstance();
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription", "subscription.items.data.price.product"],
    });

    if (!checkoutSession.customer_email) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/research/profile?error=invalid_session`
      );
    }

    await connectDB();
    const user = await User.findOne({ email: checkoutSession.customer_email });

    if (!user) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/research/profile?error=user_not_found`
      );
    }

    // Get subscription details
    const subscription = checkoutSession.subscription as Stripe.Subscription;
    const product = subscription.items.data[0].price.product as Stripe.Product;
    const planName = product.name.toLowerCase();

    // Update user plan and billing info
    user.plan = planName;
    user.stripeCustomerId = checkoutSession.customer as string;
    user.subscriptionId = subscription.id;
    user.subscriptionStatus = "active";

    // Update usage limits based on plan
    switch (planName) {
      case "starter":
        user.usage.remainingCredits = 4;
        break;
      case "professional":
        user.usage.remainingCredits = 999999; // Unlimited
        break;
      default:
        user.usage.remainingCredits = 1; // Free plan
    }

    // Add payment to billing history
    const payment = {
      invoiceId: sessionId,
      amount: checkoutSession.amount_total! / 100,
      date: new Date(),
      status: "paid",
      downloadUrl: "", // Initial payment doesn't have invoice URL
    };

    user.billing.invoices.push(payment);
    await user.save();

    // Redirect to profile with success message
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
