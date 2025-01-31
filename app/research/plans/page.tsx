"use client";
import { usePlans } from "@/hooks/usePlans";
import ProtectedRoute from "@/components/ProtectedRoute";
import AvatarDropdown from "@/components/AvatarDropdown";

export default function Plans() {
  const { plans, loading, handleSubscribe } = usePlans();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="w-full py-4 lg:py-6 px-4 lg:px-5 flex flex-col gap-4 lg:gap-6">
        <div className="flex justify-between items-center w-full gap-4 lg:gap-0">
          <h1 className="text-xl lg:text-2xl font-bold">
            Upgrade your account
          </h1>
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
            <p className="text-sm text-[#838383] font-medium">
              Use Coupon Code
            </p>
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
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="border rounded-lg p-4 lg:p-6 flex flex-col items-center"
            >
              <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
              <p className="text-sm text-gray-700 mb-4 text-center">
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="text-3xl lg:text-5xl font-bold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: plan.currency,
                  }).format(plan.price)}
                </span>
                <span className="text-sm text-gray-500">/{plan.interval}</span>
              </div>

              <button
                onClick={() => handleSubscribe(plan.id)}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg mb-6 font-bold hover:bg-blue-700"
              >
                Subscribe
              </button>

              <ul className="space-y-3 text-sm lg:text-base">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-orange-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
