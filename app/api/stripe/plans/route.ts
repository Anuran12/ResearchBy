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
    return NextResponse.json(plans);
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Error fetching plans" },
      { status: 500 }
    );
  }
}
