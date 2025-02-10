import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

export const planFeatures = {
  free: [
    "Generate 1 comprehensive research document",
    "Standard queue processing",
    "Basic research capabilities",
    "Perfect for one-time users or evaluation purposes",
  ],
  starter: [
    "4 research documents per month",
    "Mixed research capability allocation",
    "2 documents with Web, Media, and LLM research",
    "2 documents with comprehensive research (including Professional Network data)",
    "Additional documents: $12 each",
    "Ideal for individuals and small teams with occasional research needs",
  ],
  professional: [
    "10 research documents per month",
    "Flexible research capability allocation",
    "3 documents with Web, Media, and LLM research",
    "7 documents with comprehensive research (including Professional Network data)",
    "Additional documents: $11 each",
    "Perfect for businesses with regular research requirements",
  ],
  premium: [
    "30 research documents per month",
    "Full access to all research capabilities",
    "Unlimited use of Web and Media research",
    "Unlimited use of LLM research",
    "Unlimited access to Professional Network data",
    "Additional documents: $10 each",
    "Designed for enterprises and research-intensive organizations",
  ],
};

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: string;
  features: string[];
}

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState<string>("");

  useEffect(() => {
    fetchPlans();
    fetchCurrentPlan();
  }, []);

  const fetchCurrentPlan = async () => {
    try {
      const response = await fetch("/api/user/check-credits");
      const data = await response.json();
      setCurrentPlan(data.plan || "free");
    } catch (error) {
      console.error("Error fetching current plan:", error);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await fetch("/api/stripe/plans");
      const data = await response.json();

      // Merge Stripe data with local features
      const plansWithFeatures = data.map((plan: Plan) => ({
        ...plan,
        features:
          planFeatures[plan.name.toLowerCase() as keyof typeof planFeatures] ||
          [],
      }));

      setPlans(plansWithFeatures);
    } catch (error) {
      toast.error("Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (priceId: string) => {
    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const { sessionId } = await response.json();
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      toast.error("Failed to initiate checkout");
    }
  };

  return { plans, loading, handleSubscribe, currentPlan };
}
