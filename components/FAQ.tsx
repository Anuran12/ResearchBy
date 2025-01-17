"use client";
import React, { useState } from "react";

const faqs = [
  {
    question: "What is Webflow and why is it the best website builder?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "What is your favorite template from BRIX Templates?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    question: "How do you clone a Webflow Template from the Showcase?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    question: "Why is BRIX Templates the best Webflow agency out there?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-10 px-[15vw] space-y-8 flex flex-col items-center justify-center">
      <h1 className="text-[3vw] font-bold">FAQs</h1>
      <div className="space-y-4 w-full">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border-2 rounded-lg p-4 transition-all duration-300 bg-white drop-shadow-xl ${
              openIndex === index ? "border-[#FCE38A]" : ""
            }`}
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <span
                className={`transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </div>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
