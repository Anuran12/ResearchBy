import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FiCheck } from "react-icons/fi";
import { BiCircle } from "react-icons/bi";
import Link from "next/link";

const plans = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for one-time users or evaluation purposes",
    price: 0,
    currency: "USD",
    interval: "month",
    features: [
      "Generate 1 comprehensive research document",
      "Standard queue processing",
      "Basic research capabilities",
      "Perfect for one-time users or evaluation purposes",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    description:
      "Ideal for individuals and small teams with occasional research needs",
    price: 40,
    currency: "USD",
    interval: "month",
    features: [
      "4 research documents per month",
      {
        title: "Mixed research capability allocation",
        subFeatures: [
          "2 documents with Web, Media, and LLM research",
          "2 documents with comprehensive research (including Professional Network data)",
        ],
      },
      "Additional documents: $12 each",
      "Ideal for individuals and small teams with occasional research needs",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    description: "Perfect for businesses with regular research requirements",
    price: 95,
    currency: "USD",
    interval: "month",
    features: [
      "10 research documents per month",
      {
        title: "Flexible research capability allocation",
        subFeatures: [
          "3 documents with Web, Media, and LLM research",
          "7 documents with comprehensive research (including Professional Network data)",
        ],
      },
      "Additional documents: $11 each",
      "Perfect for businesses with regular research requirements",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    description:
      "Designed for enterprises and research-intensive organizations",
    price: 270,
    currency: "USD",
    interval: "month",
    features: [
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
      "Designed for enterprises and research-intensive organizations",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      <Header />

      {/* Hero Section */}
      <div className="py-16 pt-24 lg:py-24 px-4 lg:px-[5vw] bg-gradient-to-b from-[#FFF8D6] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-[5vw] font-bold mb-6 leading-[1]">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg lg:text-[1.2vw] text-gray-600 mb-8">
            Choose the perfect plan for your research needs
          </p>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="py-16 px-4 lg:px-[5vw]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {plans.map((plan, index) => {
            const isPlanHighlighted = index === 1;

            return (
              <div
                key={plan.id}
                className={`${
                  isPlanHighlighted ? "border-2 border-[#F9DD4D]" : "border"
                } rounded-lg p-8 hover:shadow-xl transition-shadow relative`}
              >
                {isPlanHighlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F9DD4D] px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-600">/{plan.interval}</span>
                </div>
                <Link
                  href={plan.id === "free" ? "/research" : "/research/plans"}
                >
                  <button
                    className={`w-full py-3 px-4 rounded-lg mb-8 font-bold transition-colors ${
                      index === 1
                        ? "bg-[#F9DD4D] hover:bg-[#FCE38A]"
                        : "border-2 border-black hover:bg-black hover:text-white"
                    }`}
                  >
                    {plan.id === "free" ? "Get Started Free" : "Upgrade Now"}
                  </button>
                </Link>
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) =>
                    typeof feature === "string" ? (
                      <li key={idx} className="flex items-center gap-3">
                        <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                        <span className="text-[13px] w-[90%]">{feature}</span>
                      </li>
                    ) : (
                      <React.Fragment key={idx}>
                        <li className="flex items-center gap-3">
                          <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                          <span className="text-[13px] w-[90%]">
                            {feature.title}
                          </span>
                        </li>
                        <ul className="space-y-2 ml-8 mt-2">
                          {feature.subFeatures.map((subFeature, subIdx) => (
                            <li
                              key={subIdx}
                              className="flex items-center gap-3"
                            >
                              <BiCircle className="text-[#F9DD4D] w-4 h-4" />
                              <span className="text-sm">{subFeature}</span>
                            </li>
                          ))}
                        </ul>
                      </React.Fragment>
                    )
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
