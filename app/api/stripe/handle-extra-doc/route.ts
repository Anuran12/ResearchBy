import { NextResponse } from "next/server";
import { getStripeInstance } from "@/lib/stripe";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import Stripe from "stripe";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/research?error=missing_session`
      );
    }

    const stripe = getStripeInstance();
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent", "customer"],
    });

    if (!checkoutSession.metadata?.userId) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/research?error=invalid_session`
      );
    }

    await connectDB();

    // Get the payment details
    const paymentIntent =
      checkoutSession.payment_intent as Stripe.PaymentIntent;
    const amount = checkoutSession.amount_total! / 100;

    // Update user's remaining credits and add to billing history
    const updatedUser = await User.findByIdAndUpdate(
      checkoutSession.metadata.userId,
      {
        $inc: { "usage.remainingCredits": 1 },
        $push: {
          "billing.invoices": {
            invoiceId: sessionId,
            amount: amount,
            date: new Date(),
            status: paymentIntent.status === "succeeded" ? "paid" : "pending",
            downloadUrl: "", // You can add invoice URL if needed
            type: "extra_doc",
          },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/research?error=user_not_found`
      );
    }

    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/research?success=extra_doc`
    );
  } catch (error) {
    console.error("Handle extra doc error:", error);
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/research?error=internal_error`
    );
  }
}
