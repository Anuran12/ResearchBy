import { useEffect, useCallback, useRef } from "react";
import { toast } from "react-hot-toast";

export function useStripeWebSocket() {
  const wsRef = useRef<WebSocket | null>(null);

  const handleStripeEvent = useCallback((event: MessageEvent) => {
    try {
      const { type, data } = JSON.parse(event.data);

      switch (type) {
        case "checkout.session.completed":
          toast.success("Payment completed!");
          break;
        case "invoice.paid":
          toast.success("Invoice paid!");
          break;
        case "customer.subscription.updated":
          toast.success("Subscription updated!");
          break;
      }
    } catch (error) {
      console.error("WebSocket message error:", error);
    }
  }, []);

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket(
        `${process.env.NEXT_PUBLIC_WS_URL}/api/stripe/webhook-socket?type=websocket`
      );
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.onmessage = handleStripeEvent;

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket closed, attempting to reconnect...");
        setTimeout(connectWebSocket, 3000);
      };
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [handleStripeEvent]);
}
