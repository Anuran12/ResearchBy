"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FiMail } from "react-icons/fi";
import { toast } from "react-hot-toast";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "General Inquiry",
        message: "",
      });
    } catch (error) {
      console.error("Contact Error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <Header />

      {/* Hero Section */}
      <div className="py-16 pt-24 lg:py-24 px-4 lg:px-[15vw] bg-gradient-to-b from-[#FFF8D6] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-[5vw] font-bold mb-6 leading-[1]">
            Get in Touch
          </h1>
          <p className="text-lg lg:text-[1.2vw] text-gray-600 mb-8">
            Have questions about our AI-powered research platform? We&#39;re
            here to help.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-16 px-4 lg:px-[15vw]">
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-[#FFF8D6] rounded-lg flex items-center justify-center mb-4 mx-auto">
              <FiMail className="w-6 h-6 text-[#F9DD4D]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600">support@researchby.ai</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto">
          <form
            className="bg-white p-8 rounded-lg shadow-md"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full p-3 border rounded-lg"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">
                Subject
              </label>
              <select
                className="w-full p-3 border rounded-lg bg-white"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              >
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Billing Question</option>
                <option>Partnership Opportunity</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">
                Message
              </label>
              <textarea
                className="w-full p-3 border rounded-lg h-32"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-[#F9DD4D] text-black rounded-lg font-bold hover:bg-[#FCE38A] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
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
              How fast can I get my research paper?
            </h3>
            <p className="text-gray-600">
              Most research papers are generated within minutes, depending on
              the complexity and length of the requested content.
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
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">
              What subjects can I research on?
            </h3>
            <p className="text-gray-600">
              You can research on any topic, person or company, or comparison of
              people or companies!.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
