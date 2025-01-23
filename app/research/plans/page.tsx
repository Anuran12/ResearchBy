"use client";
import AvatarDropdown from "@/components/AvatarDropdown";

export default function Plans() {
  return (
    <div className="w-full py-4 lg:py-6 px-4 lg:px-5 flex flex-col gap-4 lg:gap-6">
      <div className="flex justify-between items-center w-full gap-4 lg:gap-0">
        <h1 className="text-xl lg:text-2xl font-bold">Upgrade your account</h1>
        <AvatarDropdown />
      </div>

      {/* Promotion Banner */}
      <div className="bg-[#FFEB82] p-4 rounded-lg flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 lg:gap-0">
        <div className="flex flex-col gap-2 w-full lg:w-[48%]">
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

        {/* Hide divider on mobile */}
        <svg
          className="hidden lg:block"
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

        <div className="w-full lg:w-[50%] flex flex-col justify-center items-center gap-1">
          <p className="text-sm text-[#838383] font-medium">Use Coupon Code</p>
          <p className="font-bold bg-white w-fit px-3 py-1.5 rounded-lg">
            EASTER20
          </p>
          <p className="text-xs text-[#838383] font-medium text-center">
            Valid until 14th Apr 17:59 PM UTC
          </p>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Free Plan */}
        <div className="border rounded-lg p-4 lg:p-6 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Free</h2>
          <p className="text-sm text-gray-700 mb-4 font-bold">
            Give ResearchBy a try for free
          </p>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Free trial of Writesonic features to help you get a taste of AI
            writing.
          </p>

          <div className="mb-6">
            <span className="text-3xl lg:text-5xl font-bold">$0</span>
          </div>

          <p className="text-sm text-gray-500 mb-6 text-center">
            Try out all features to determine what works best for you
          </p>

          <button className="w-full py-2 px-4 border border-black rounded-lg mb-6">
            Get Started Free
          </button>

          <ul className="space-y-3 text-sm lg:text-base">
            <li className="flex items-center gap-2">
              <span className="text-orange-500">✓</span>
              Generate 1 comprehensive research document
            </li>
            <li className="flex items-center gap-2">
              <span className="text-orange-500">✓</span>
              Standard queue processing
            </li>
            <li className="flex items-center gap-2">
              <span className="text-orange-500">✓</span>
              Basic research capabilities
            </li>
            <li className="flex items-center gap-2">
              <span className="text-orange-500">✓</span>
              Perfect for one-time users or evaluation purposes
            </li>
          </ul>
        </div>

        {/* Starter Plan */}
        <div className="border-2 border-yellow-300 rounded-lg p-4 lg:p-6 flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold mb-2">Starter</h2>
          <p className="text-sm text-gray-700 mb-4 text-center font-bold">
            For bloggers,freelancers businesses
          </p>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Awesome tools to help you write blog posts, books and more.
          </p>

          <div className="mb-6 flex flex-col justify-center items-center">
            <span className="text-3xl lg:text-5xl font-bold">$40</span>
            <span className="text-sm text-gray-500">/month</span>
          </div>

          <p className="text-sm text-gray-500 mb-6 text-center">
            Try out all features to determine what works best for you
          </p>

          <button className="w-full py-2 px-4 bg-yellow-300 text-black rounded-lg mb-6">
            Upgrade
          </button>

          <p className="font-medium mb-4">Everything in Free-trial,plus</p>
          <ul className="space-y-3 text-sm lg:text-base">
            <li className="flex items-center gap-2">
              <span className="text-orange-500">✓</span>4 research documents per
              month
            </li>
            <li className="flex items-center gap-2">
              <span className="text-orange-500">✓</span>
              Mixed research capability allocation
            </li>
            <li className="flex items-center gap-2">
              <span className="text-orange-500">✓</span>
              Additional documents: $12 each
            </li>
            <li className="flex items-center gap-2">
              <span className="text-orange-500">✓</span>
              Ideal for individuals and small teams with occasional research
              needs
            </li>
          </ul>
        </div>

        {/* Professional Plans */}
        {[95, 270].map((price) => (
          <div
            key={price}
            className="border rounded-lg p-4 lg:p-6 flex flex-col items-center"
          >
            <h2 className="text-xl font-bold mb-2">Professional</h2>
            <p className="text-sm text-gray-700 mb-4 font-bold">
              For teams and businesses
            </p>
            <p className="text-sm text-gray-500 mb-6 text-center">
              Take your business to the next level with custom packages, custom
              AI model development, onboarding and support.
            </p>

            <div className="mb-6 flex flex-col items-center">
              <span className="text-3xl lg:text-5xl font-bold">${price}</span>
              <span className="text-sm text-gray-500">/month</span>
            </div>

            <p className="text-sm text-gray-500 mb-6 text-center">
              Try out all features to determine what works best for you
            </p>

            <button className="w-full py-2 px-4 border border-black rounded-lg mb-6">
              Get Started Free
            </button>

            <p className="font-medium mb-4">Everything in Long-form, plus</p>
            <ul className="space-y-3 text-sm lg:text-base">
              <li className="flex items-center gap-2">
                <span className="text-orange-500">✓</span>
                Custom number of words
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">✓</span>
                Custom number of users
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
