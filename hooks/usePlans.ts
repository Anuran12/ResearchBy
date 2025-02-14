import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

// Add these types at the top of the file
type PlanFeature = string | { title: string; subFeatures: string[] };
type PlanFeatures = Record<string, PlanFeature[]>;

export const planFeatures: PlanFeatures = {
  free: [
    "Generate 1 comprehensive research document",
    "Standard queue processing",
    "Basic research capabilities",
  ],
  starter: [
    "4 research documents per month",
    {
      title: "Mixed research capability allocation",
      subFeatures: [
        "2 documents with Web, Media, and LLM research",
        "2 documents with comprehensive research",
      ],
    },
    "Additional documents: $12 each",
  ],
  professional: [
    "10 research documents per month",
    {
      title: "Flexible research capability allocation",
      subFeatures: [
        "3 documents with Web, Media, and LLM research",
        "7 documents with comprehensive research",
      ],
    },
    "Additional documents: $11 each",
  ],
  premium: [
    "30 research documents per month",
    "Full access to all research capabilities",
    {
      title: "Research capabilities include",
      subFeatures: [
        "Unlimited use of Web and Media research",
        "Unlimited use of LLM research",
        "Unlimited access to Professional Network data",
      ],
    },
    "Additional documents: $10 each",
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

  const transformedPlans = plans.map((plan) => ({
    ...plan,
    features:
      planFeatures[plan.name.toLowerCase() as keyof typeof planFeatures] || [],
  }));

  return {
    plans: transformedPlans,
    loading,
    handleSubscribe,
    currentPlan,
  };
}
