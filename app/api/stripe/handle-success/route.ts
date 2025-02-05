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
      expand: ["subscription"],
    });

    if (!checkoutSession.customer_email) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/research/profile?error=invalid_session`
      );
    }

    await connectDB();

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

    // Update user plan and billing info
    const payment = {
      invoiceId: sessionId,
      amount: checkoutSession.amount_total! / 100,
      date: new Date(),
      status: "paid",
      downloadUrl: "",
    };

    // Use updateOne instead of findOneAndUpdate
    const result = await User.updateOne(
      { email: checkoutSession.customer_email },
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
              ? 999999
              : 1,
          "billing.nextBillingDate": new Date(
            subscription.current_period_end * 1000
          ),
        },
        $push: {
          "billing.invoices": payment,
        },
      }
    );

    if (result.modifiedCount === 0) {
      console.error("Failed to update user:", checkoutSession.customer_email);
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/research/profile?error=update_failed`
      );
    }

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
