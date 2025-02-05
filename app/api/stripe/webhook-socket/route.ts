import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getStripeInstance } from "@/lib/stripe";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Stripe from "stripe";

// Store connected clients
const clients = new Set<ReadableStreamDefaultController>();

export const runtime = "edge";

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      clients.add(controller);

      // Send an initial ping to keep connection alive
      controller.enqueue(new TextEncoder().encode(": ping\n\n"));

      const pingInterval = setInterval(() => {
        try {
          controller.enqueue(new TextEncoder().encode(": ping\n\n"));
        } catch {
          clearInterval(pingInterval);
          clients.delete(controller);
        }
      }, 30000);

      return () => {
        clearInterval(pingInterval);
        clients.delete(controller);
      };
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      throw new Error("No stripe signature found");
    }

    const stripe = getStripeInstance();
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Process the event first
    await connectDB();
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const user = await User.findOne({ email: session.customer_email });
        if (!user) break;

        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        const planName = (
          subscription.items.data[0].price.product as Stripe.Product
        ).name.toLowerCase();

        user.plan = planName;
        user.stripeCustomerId = session.customer as string;
        user.subscriptionId = session.subscription as string;
        user.subscriptionStatus = "active";
        await user.save();
        break;
      }
      case "invoice.paid": {
        const invoice = event.data.object;
        const user = await User.findOne({ stripeCustomerId: invoice.customer });
        if (!user) break;

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
        const user = await User.findOne({ subscriptionId: subscription.id });
        if (!user) break;

        user.subscriptionStatus = subscription.status;
        await user.save();
        break;
      }
    }

    // Then broadcast to clients
    const message = JSON.stringify({
      type: event.type,
      data: event.data.object,
    });
    clients.forEach((client) => {
      client.enqueue(new TextEncoder().encode(`data: ${message}\n\n`));
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}
