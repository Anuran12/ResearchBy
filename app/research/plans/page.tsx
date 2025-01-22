"use client";
import AvatarDropdown from "@/components/AvatarDropdown";

export default function Plans() {
  return (
    <div className="w-[80%] py-6 px-5 flex flex-col gap-6">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Upgrade your account</h1>
        <AvatarDropdown />
      </div>

      {/* Promotion Banner */}
      <div className="bg-[#FFEB82] p-4 rounded-lg flex justify-between items-center">
        <div className="flex flex-col gap-2 w-[48%]">
          <span className="text-sm font-bold bg-white w-fit px-3 py-1.5 rounded-lg">
            ⭐ New Offer
          </span>
          <div>
            <h3 className="font-bold">Easter Offer-Get up to 50%Off</h3>
            <p className="text-sm text-[#838383]">
              20%off on all existing 30%off on Annual plans*
            </p>
          </div>
        </div>
        <svg
          width="5"
          height="86"
          viewBox="0 0 5 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="2.5"
            y1="8.74227e-08"
            x2="2.5"
            y2="86"
            stroke="white"
            strokeWidth="4"
            strokeDasharray="4 4"
          />
        </svg>

        <div className="w-[50%] flex flex-col justify-center items-center gap-1">
          <p className="text-sm text-[#838383] font-medium">Use Coupon Code</p>
          <p className="font-bold bg-white w-fit px-3 py-1.5 rounded-lg">
            EASTER20
          </p>
          <p className="text-xs text-[#838383] font-medium">
            Valid until 14th Apr 17:59 PM UTC
          </p>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-4 gap-6">
        {/* Free Plan */}
        <div className="border rounded-lg p-6 flex flex-col">
          <h2 className="text-xl font-bold mb-2">Free</h2>
          <p className="text-sm text-gray-600 mb-4">
            Give ResearchBy a try for free
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Free trial of Research features to help you get taste of AI writing
          </p>

          <div className="mb-6">
            <span className="text-4xl font-bold">$0</span>
          </div>

          <button className="w-full py-2 px-4 border border-black rounded-lg mb-6">
            Get Started Free
          </button>

          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Generate 1 comprehensive research document
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Standard queue processing
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Basic research capabilities
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Perfect for one-time users or evaluation purposes
            </li>
          </ul>
        </div>

        {/* Starter Plan */}
        <div className="border-2 border-black rounded-lg p-6 flex flex-col">
          <h2 className="text-xl font-bold mb-2">Starter</h2>
          <p className="text-sm text-gray-600 mb-4">
            For bloggers,freelancers businesses
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Research tools to help you write blog posts, articles and more
          </p>

          <div className="mb-6">
            <span className="text-4xl font-bold">$40</span>
            <span className="text-sm text-gray-500">/month</span>
          </div>

          <button className="w-full py-2 px-4 bg-black text-white rounded-lg mb-6">
            Upgrade
          </button>

          <p className="font-medium mb-4">Everything in Free-trial, plus</p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>4 research documents per
              month
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Mixed research capability allocation
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Additional documents: $12 each
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Ideal for individuals and small teams with occasional research
              needs
            </li>
          </ul>
        </div>

        {/* Professional Plans */}
        {[1, 2].map((i) => (
          <div key={i} className="border rounded-lg p-6 flex flex-col">
            <h2 className="text-xl font-bold mb-2">Professional</h2>
            <p className="text-sm text-gray-600 mb-4">
              For teams and businesses
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Take your business to AI level with custom package. System AI
              model development, onboarding and support.
            </p>

            <div className="mb-6">
              <span className="text-4xl font-bold">
                ${i === 1 ? "95" : "270"}
              </span>
              <span className="text-sm text-gray-500">/month</span>
            </div>

            <button className="w-full py-2 px-4 border border-black rounded-lg mb-6">
              Get Started Free
            </button>

            <p className="font-medium mb-4">Everything in Long-form, plus</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Custom number of words
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Custom number of users
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
