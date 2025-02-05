import { WebSocket, WebSocketServer } from "ws";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getStripeInstance } from "@/lib/stripe";

const wss = new WebSocketServer({ noServer: true });

// Store active connections using a Map to track client IDs
const clients = new Map<string, WebSocket>();

wss.on("connection", (ws) => {
  // Generate a unique ID for each connection
  const connectionId = Math.random().toString(36).substring(2);
  clients.set(connectionId, ws);

  ws.on("close", () => {
    clients.delete(connectionId);
  });
});

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

    // Broadcast to connected clients
    const message = JSON.stringify({
      type: event.type,
      data: event.data.object,
    });

    clients.forEach((client) => {
      if (client.readyState === 1) {
        // WebSocket.OPEN
        client.send(message);
      }
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("WebSocket webhook error:", error);
    return NextResponse.json(
      { error: "WebSocket webhook handler failed" },
      { status: 400 }
    );
  }
}

export async function GET(req: Request) {
  if (new URL(req.url).searchParams.get("type") === "websocket") {
    return new Response(null, {
      status: 101,
      headers: {
        Upgrade: "websocket",
        Connection: "Upgrade",
        "Sec-WebSocket-Accept": "accepted",
      },
    });
  }
  return new Response(null, { status: 426 });
}
