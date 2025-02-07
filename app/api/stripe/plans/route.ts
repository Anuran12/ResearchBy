import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getStripeInstance } from "@/lib/stripe";

export async function GET() {
  try {
    const stripe = getStripeInstance();
    console.log("Fetching Stripe prices...");

    const prices = await stripe.prices.list({
      active: true,
      expand: ["data.product"],
    });

    console.log("Stripe prices:", prices.data);

    const plans = prices.data.map((price) => ({
      id: price.id,
      name: (price.product as Stripe.Product).name,
      description: (price.product as Stripe.Product).description,
      price: price.unit_amount! / 100,
      currency: price.currency,
      interval: price.recurring?.interval,
      features: (price.product as Stripe.Product).metadata.features
        ? JSON.parse((price.product as Stripe.Product).metadata.features)
        : [],
    }));

    console.log("Processed plans:", plans);

    // Free Plan features
    const freePlanFeatures = [
      "Generate 1 comprehensive research document",
      "Standard queue processing",
      "Basic research capabilities",
      "Perfect for one-time users or evaluation purposes",
    ];

    // Starter Plan features
    const starterPlanFeatures = [
      "4 research documents per month",
      "Mixed research capability allocation",
      "2 documents with Web, Media, and LLM research",
      "2 documents with comprehensive research (including Professional Network data)",
      "Additional documents: $12 each",
      "Ideal for individuals and small teams with occasional research needs",
    ];

    // Professional Plan features
    const professionalPlanFeatures = [
      "10 research documents per month",
      "Flexible research capability allocation",
      "3 documents with Web, Media, and LLM research",
      "7 documents with comprehensive research (including Professional Network data)",
      "Additional documents: $11 each",
      "Perfect for businesses with regular research requirements",
    ];

    // Premium Plan features
    const premiumPlanFeatures = [
      "30 research documents per month",
      "Full access to all research capabilities",
      "Unlimited use of Web and Media research",
      "Unlimited use of LLM research",
      "Unlimited access to Professional Network data",
      "Additional documents: $10 each",
      "Designed for enterprises and research-intensive organizations",
    ];

    return NextResponse.json(plans);
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Error fetching plans" },
      { status: 500 }
    );
  }
}
