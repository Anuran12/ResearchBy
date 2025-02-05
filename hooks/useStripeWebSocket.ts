import { useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useStripeWebSocket() {
  const router = useRouter();

  const handleStripeEvent = useCallback(
    (data: string) => {
      try {
        const event = JSON.parse(data);
        console.log("Received SSE event:", event.type);

        switch (event.type) {
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
            console.log("Unhandled event type:", event.type);
        }
      } catch (error) {
        console.error("Error handling SSE message:", error);
      }
    },
    [router]
  );

  useEffect(() => {
    const eventSource = new EventSource("/api/stripe/webhook-socket");

    eventSource.onmessage = (event) => {
      handleStripeEvent(event.data);
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [handleStripeEvent]);
}
