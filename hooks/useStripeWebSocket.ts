import { useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";

export function useStripeWebSocket() {
  const handleStripeEvent = useCallback((event: MessageEvent) => {
    const { type, data } = JSON.parse(event.data);

    switch (type) {
      case "checkout.session.completed":
        toast.success("Payment completed successfully!");
        break;
      case "invoice.paid":
        toast.success("Invoice paid successfully!");
        break;
      case "customer.subscription.updated":
        toast.success("Subscription updated successfully!");
        break;
      // Add more event handlers as needed
    }
  }, []);

  useEffect(() => {
    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}/api/stripe/webhook-socket`
    );

    ws.onopen = () => {
      console.log("Connected to Stripe WebSocket");
    };

    ws.onmessage = handleStripeEvent;

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, [handleStripeEvent]);
}
