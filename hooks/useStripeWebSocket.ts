import { useEffect, useCallback, useRef } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useStripeWebSocket() {
  const router = useRouter();
  const wsRef = useRef<WebSocket | null>(null);

  const handleStripeEvent = useCallback(
    (event: MessageEvent) => {
      try {
        const { type, data } = JSON.parse(event.data);
        console.log("Received WebSocket event:", type);

        switch (type) {
          case "checkout.session.completed":
            toast.success("Payment completed successfully!");
            router.refresh();
            break;
          case "invoice.paid":
            toast.success("Invoice paid successfully!");
            router.refresh();
            break;
          case "customer.subscription.updated":
            toast.success("Subscription updated successfully!");
            router.refresh();
            break;
          default:
            console.log("Unhandled event type:", type);
        }
      } catch (error) {
        console.error("Error handling WebSocket message:", error);
      }
    },
    [router]
  );

  useEffect(() => {
    const connectWebSocket = () => {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/api/stripe/webhook-socket`;

      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log("Connected to Stripe WebSocket");
      };

      wsRef.current.onmessage = handleStripeEvent;

      wsRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      wsRef.current.onclose = () => {
        console.log("WebSocket connection closed");
        // Attempt to reconnect after 3 seconds
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
