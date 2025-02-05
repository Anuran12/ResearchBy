import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getStripeInstance } from "@/lib/stripe";

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
        } catch (e) {
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

    // Broadcast to all connected clients
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
