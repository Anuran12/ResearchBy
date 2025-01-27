import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="flex flex-col">
      <Header />

      {/* Hero Section */}
      <div className="py-16 pt-24 lg:py-24 px-4 lg:px-[15vw] bg-gradient-to-b from-[#FFF8D6] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-[5vw] font-bold mb-6 leading-[1]">
            Terms and Conditions
          </h1>
          <p className="text-lg lg:text-[1.2vw] text-gray-600 mb-8">
            Please read these terms and conditions carefully before using
            ResearchBy.ai
          </p>
        </div>
      </div>

      {/* Terms Content */}
      <div className="py-16 px-4 lg:px-[15vw]">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using ResearchBy.ai, you accept and agree to be
              bound by the terms and conditions outlined here. If you disagree
              with any part of these terms, you may not access the service.
            </p>
          </section>

          {/* Service Usage */}
          <section>
            <h2 className="text-2xl font-bold mb-4">2. Service Usage</h2>
            <p className="text-gray-600 mb-4">
              Our services are intended for legitimate research purposes only.
              Users must:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Be at least 18 years old or have parental consent</li>
              <li>
                Provide accurate and complete information when creating an
                account
              </li>
              <li>Maintain the confidentiality of their account credentials</li>
              <li>
                Use the service in compliance with all applicable laws and
                regulations
              </li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              3. Intellectual Property
            </h2>
            <p className="text-gray-600 mb-4">
              The content generated through our service is subject to the
              following terms:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Users retain rights to their original input content</li>
              <li>
                Generated content must be properly cited when used in academic
                work
              </li>
              <li>
                Redistribution of generated content is prohibited without proper
                authorization
              </li>
              <li>
                Our platform&#39;s interface and technology remain our exclusive
                property
              </li>
            </ul>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-bold mb-4">4. Payment Terms</h2>
            <p className="text-gray-600 mb-4">
              Subscription and payment terms include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>All fees are charged in advance on a monthly basis</li>
              <li>Refunds are processed according to our refund policy</li>
              <li>
                Subscription cancellations must be made 24 hours before renewal
              </li>
              <li>Price changes will be notified 30 days in advance</li>
            </ul>
          </section>

          {/* Privacy & Data */}
          <section>
            <h2 className="text-2xl font-bold mb-4">5. Privacy & Data</h2>
            <p className="text-gray-600 mb-4">
              We are committed to protecting your privacy and handling your data
              responsibly. Our data practices include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                Collecting only necessary information for service provision
              </li>
              <li>Implementing industry-standard security measures</li>
              <li>Never selling personal data to third parties</li>
              <li>Providing data access and deletion options</li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold mb-4">6. Termination</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to terminate or suspend access to our service
              immediately, without prior notice, for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Violations of these terms</li>
              <li>Fraudulent or illegal activities</li>
              <li>Non-payment of fees</li>
              <li>Behavior that harms other users or our service</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold mb-4">7. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              For any questions about these terms, please contact us at:
            </p>
            <p className="text-gray-600">Email: legal@researchby.ai</p>
            <p className="text-gray-600">
              Address: 123 AI Avenue, New York, NY 10001
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
