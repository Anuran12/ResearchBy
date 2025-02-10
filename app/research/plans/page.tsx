"use client";
import { usePlans } from "@/hooks/usePlans";
import ProtectedRoute from "@/components/ProtectedRoute";
import AvatarDropdown from "@/components/AvatarDropdown";
import { FiCheck } from "react-icons/fi";

export default function Plans() {
  const { plans, loading, handleSubscribe, currentPlan } = usePlans();

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

        {/* Pricing Grid */}
        <div className="py-16 px-4 lg:px-[1vw]">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            {plans.map((plan, index) => {
              const isCurrentPlan =
                plan.name.toLowerCase() === currentPlan.toLowerCase();
              const isPlanHighlighted = index === 1;

              return (
                <div
                  key={plan.id}
                  className={`${
                    isPlanHighlighted ? "border-2 border-[#F9DD4D]" : "border"
                  } ${
                    isCurrentPlan
                      ? "bg-[#F9FAFB] border-blue-600 border-2 shadow-lg"
                      : ""
                  } rounded-lg py-8 px-4 hover:shadow-xl transition-shadow relative`}
                >
                  {isPlanHighlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F9DD4D] px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  )}
                  {isCurrentPlan && (
                    <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                      Current Plan
                    </div>
                  )}
                  <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
                  <p className="text-gray-600 mb-6 text-sm">
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: plan.currency,
                      }).format(plan.price)}
                    </span>
                    <span className="text-gray-600">/{plan.interval}</span>
                  </div>
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={isCurrentPlan}
                    className={`w-full py-3 px-4 rounded-lg mb-8 font-bold transition-colors ${
                      isCurrentPlan
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : index === 1
                        ? "bg-[#F9DD4D] hover:bg-[#FCE38A]"
                        : "border-2 border-black hover:bg-black hover:text-white"
                    }`}
                  >
                    {isCurrentPlan
                      ? "Current Plan"
                      : index === 0
                      ? "Get Started Free"
                      : "Upgrade Now"}
                  </button>
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <FiCheck className="text-[#F9DD4D] w-5 h-5" />
                        <span className="text-[13px] w-[90%]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
