import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getStripeInstance } from "@/lib/stripe";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });

    const { plan } = await request.json();
    const stripe = getStripeInstance();

    // Get price based on plan
    const amount =
      plan === "starter"
        ? 1200 // $12
        : plan === "professional"
        ? 1100 // $11
        : plan === "premium"
        ? 1000 // $10
        : 0;

    // Create or get customer
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.user.email,
        metadata: {
          userId: user._id.toString(),
        },
      });
      customerId = customer.id;

      // Update user with new customer ID
      await User.findByIdAndUpdate(user._id, {
        stripeCustomerId: customerId,
      });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Extra Research Document",
              description: `Additional research document for ${plan} plan`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/api/stripe/handle-extra-doc?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/research?extra_doc=cancelled`,
      metadata: {
        type: "extra_doc",
        userEmail: session.user.email,
        plan: plan,
        userId: user._id.toString(),
      },
    });

    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    console.error("Create extra doc checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
