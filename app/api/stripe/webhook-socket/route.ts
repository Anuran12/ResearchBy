import { WebSocket, WebSocketServer } from "ws";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getStripeInstance } from "@/lib/stripe";

const wss = new WebSocketServer({ noServer: true });
const clients = new Set<WebSocket>();

wss.on("connection", (ws) => {
  clients.add(ws);

  ws.on("close", () => {
    clients.delete(ws);
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

    // Broadcast the event to all connected clients
    const message = JSON.stringify({
      type: event.type,
      data: event.data.object,
    });

    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
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

export function GET(req: Request) {
  const upgrade = req.headers.get("upgrade")?.toLowerCase();
  if (upgrade === "websocket") {
    return new Response(null, {
      status: 101,
      headers: {
        Upgrade: "websocket",
        Connection: "Upgrade",
      },
    });
  }
  return new Response(null, { status: 426 });
}
