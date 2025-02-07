import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FiCheck } from "react-icons/fi";
import Link from "next/link";

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
          {/* Free Plan */}
          <div className="border rounded-lg p-8 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4">Free</h2>
            <p className="text-gray-600 mb-6">
              Perfect for one-time users or evaluation purposes
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-gray-600">/month</span>
            </div>
            <Link href="/research">
              <button className="w-full py-3 px-4 border-2 border-black rounded-lg mb-8 font-bold hover:bg-black hover:text-white transition-colors">
                Get Started Free
              </button>
            </Link>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                <span>Generate 1 comprehensive research document</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                <span>Standard queue processing</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                <span>Basic research capabilities</span>
              </li>
            </ul>
          </div>

          {/* Starter Plan */}
          <div className="border-2 border-[#F9DD4D] rounded-lg p-8 relative hover:shadow-xl transition-shadow">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F9DD4D] px-4 py-1 rounded-full text-sm font-bold">
              Most Popular
            </div>
            <h2 className="text-2xl font-bold mb-4">Starter</h2>
            <p className="text-gray-600 mb-6">
              Ideal for individuals and small teams with occasional research
              needs
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$40</span>
              <span className="text-gray-600">/month</span>
            </div>
            <Link href="/research/plans">
              <button className="w-full py-3 px-4 bg-[#F9DD4D] rounded-lg mb-8 font-bold hover:bg-[#FCE38A] transition-colors">
                Upgrade Now
              </button>
            </Link>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                <span>4 research documents per month</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                <span>Mixed research capability allocation</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                <span>2 documents with Web, Media, and LLM research</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                <span>2 documents with comprehensive research</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                <span>Additional documents: $12 each</span>
              </li>
            </ul>
          </div>

          {/* Professional Plan */}
          <div className="border rounded-lg p-8 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4">Professional</h2>
            <p className="text-gray-600 mb-6">
              Perfect for businesses with regular research requirements
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$95</span>
              <span className="text-gray-600">/month</span>
            </div>
            <Link href="/research/plans">
              <button className="w-full py-3 px-4 border-2 border-black rounded-lg mb-8 font-bold hover:bg-black hover:text-white transition-colors">
                Upgrade Now
              </button>
            </Link>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                <span>10 research documents per month</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                <span>Flexible research capability allocation</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                <span>3 documents with Web, Media, and LLM research</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                <span>7 documents with comprehensive research</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                <span>Additional documents: $11 each</span>
              </li>
            </ul>
          </div>

          {/* Premium Plan */}
          <div className="border rounded-lg p-8 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4">Premium</h2>
            <p className="text-gray-600 mb-6">
              Designed for enterprises and research-intensive organizations
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$270</span>
              <span className="text-gray-600">/month</span>
            </div>
            <Link href="/research/plans">
              <button className="w-full py-3 px-4 border-2 border-black rounded-lg mb-8 font-bold hover:bg-black hover:text-white transition-colors">
                Upgrade Now
              </button>
            </Link>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                <span>30 research documents per month</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                <span>Full access to all research capabilities</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                <span>Unlimited use of Web and Media research</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                <span>Unlimited use of LLM research</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                <span>Unlimited access to Professional Network data</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                <span>Additional documents: $10 each</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4 lg:px-[15vw] bg-[#F9FAFB]">
        <h2 className="text-3xl lg:text-[2.5vw] font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">
              How does the billing cycle work?
            </h3>
            <p className="text-gray-600">
              All plans are billed monthly and you can upgrade, downgrade, or
              cancel at any time.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">Can I switch plans anytime?</h3>
            <p className="text-gray-600">
              Yes, you can switch between plans at any time. The new rate will
              be prorated based on your billing cycle.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">
              What payment methods do you accept?
            </h3>
            <p className="text-gray-600">
              We accept all major credit cards, PayPal, and bank transfers for
              our services.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
