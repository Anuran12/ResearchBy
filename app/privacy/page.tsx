import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col">
      <Header />

      {/* Hero Section */}
      <div className="py-16 pt-24 lg:py-24 px-4 lg:px-[15vw] bg-gradient-to-b from-[#FFF8D6] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-[5vw] font-bold mb-6 leading-[1]">
            Privacy Policy
          </h1>
          <p className="text-lg lg:text-[1.2vw] text-gray-600 mb-8">
            We are committed to protecting your privacy and personal data
          </p>
        </div>
      </div>

      {/* Privacy Content */}
      <div className="py-16 px-4 lg:px-[15vw]">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-600 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Payment information</li>
              <li>Research topics and preferences</li>
              <li>Usage data and interaction with our services</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600 mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Provide and maintain our services</li>
              <li>Process your payments and transactions</li>
              <li>Send you important service updates</li>
              <li>Improve and personalize your experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold mb-4">3. Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate security measures to protect your
              personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Secure data storage practices</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-bold mb-4">4. Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Service providers and business partners</li>
              <li>Legal authorities when required by law</li>
              <li>Third-party analytics services</li>
              <li>Payment processors for transactions</li>
            </ul>
          </section>

          {/* Cookie Policy */}
          <section>
            <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking</h2>
            <p className="text-gray-600 mb-4">
              We use cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Remember your preferences</li>
              <li>Analyze usage patterns</li>
              <li>Provide personalized content</li>
              <li>Improve our services</li>
            </ul>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
            <p className="text-gray-600 mb-4">
              You have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Access your personal information</li>
              <li>Request data correction or deletion</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              For any privacy-related questions or concerns, please contact us
              at:
            </p>
            <p className="text-gray-600">Email: privacy@researchby.ai</p>
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
