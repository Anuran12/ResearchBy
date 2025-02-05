import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getStripeInstance } from "@/lib/stripe";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature") as string;
    const stripe = getStripeInstance();

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        await connectDB();

        // Update user with new plan details
        const user = await User.findOne({ email: session.customer_email });
        if (!user) break;

        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        const planName = (
          subscription.items.data[0].price.product as any
        ).name.toLowerCase();

        user.plan = planName;
        user.stripeCustomerId = session.customer as string;
        user.subscriptionId = session.subscription as string;
        user.subscriptionStatus = "active";

        // Add payment to billing history
        const payment = {
          invoiceId: session.id,
          amount: session.amount_total! / 100,
          date: new Date(),
          status: "paid",
          downloadUrl: "", // You can add invoice URL here if needed
        };

        user.billing.invoices.push(payment);
        await user.save();
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object;
        await connectDB();

        const user = await User.findOne({ stripeCustomerId: invoice.customer });
        if (!user) break;

        // Add payment to billing history
        const payment = {
          invoiceId: invoice.id,
          amount: invoice.amount_paid / 100,
          date: new Date(),
          status: "paid",
          downloadUrl: invoice.hosted_invoice_url,
        };

        user.billing.invoices.push(payment);
        await user.save();
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        await connectDB();

        const user = await User.findOne({ subscriptionId: subscription.id });
        if (!user) break;

        user.subscriptionStatus = subscription.status;
        await user.save();
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}
