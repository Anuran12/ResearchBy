"use client";
import AvatarDropdown from "@/components/AvatarDropdown";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { useResearch } from "@/app/contexts/ResearchContext";
import { toast, Toaster } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import ExtraDocModal from "@/app/components/ExtraDocModal";

export default function NewResearch() {
  const [query, setQuery] = useState("");
  const [wordCount, setWordCount] = useState<number | null>(null);
  const [isProfessional, setIsProfessional] = useState(false);
  const {
    isResearching,
    currentStatus,
    requestId,
    startResearch,
    checkStatus,
    downloadResult,
  } = useResearch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [extraDocCost, setExtraDocCost] = useState(0);
  const [currentPlan, setCurrentPlan] = useState("");
  const [displayQuery, setDisplayQuery] = useState("");

  // Load stored query on mount
  useEffect(() => {
    const storedQuery = localStorage.getItem("currentResearchQuery");
    if (storedQuery) {
      setDisplayQuery(storedQuery);
    }
  }, []);

  // Update display query when new research starts
  useEffect(() => {
    if (isResearching) {
      const storedQuery = localStorage.getItem("currentResearchQuery");
      if (storedQuery) {
        setDisplayQuery(storedQuery);
      }
    }
  }, [isResearching]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResearching) {
      interval = setInterval(checkStatus, 5000); // Check status every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isResearching]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get("success") === "true") {
      // Add a slight delay to ensure the toast is visible
      setTimeout(() => {
        toast.success("Plan upgraded successfully!");
      }, 100);
      // Clean up the URL
      window.history.replaceState({}, "", window.location.pathname);
    }

    const error = urlParams.get("error");
    if (error) {
      const errorMessages: Record<string, string> = {
        missing_session: "Invalid checkout session",
        invalid_session: "Invalid checkout session",
        user_not_found: "User not found",
        internal_error: "An error occurred during checkout",
      };
      toast.error(errorMessages[error] || "An error occurred");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Immediately update button state
    const button = e.currentTarget.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    if (button) {
      button.disabled = true;
      button.textContent = "Researching...";
    }

    try {
      const response = await fetch("/api/user/check-credits");
      const { remainingCredits, plan } = await response.json();
      setCurrentPlan(plan);

      if (remainingCredits <= 0) {
        // Reset button state if no credits
        if (button) {
          button.disabled = false;
          button.textContent = "Start Research";
        }

        const cost =
          plan === "starter"
            ? 12
            : plan === "professional"
            ? 11
            : plan === "premium"
            ? 10
            : 0;

        setExtraDocCost(cost);
        setIsModalOpen(true);
        return;
      }

      // Proceed with research if credits are available
      await startResearch(query, wordCount || undefined, isProfessional);
    } catch (error) {
      // Reset button state on error
      if (button) {
        button.disabled = false;
        button.textContent = "Start Research";
      }
      console.error(error);
      toast.error("Failed to check credits");
    }
  };

  const handlePurchaseExtraDoc = async () => {
    try {
      const checkoutResponse = await fetch(
        "/api/stripe/create-extra-doc-checkout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan: currentPlan }),
        }
      );

      const { sessionId } = await checkoutResponse.json();
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error(error);
      toast.error("Failed to initiate purchase");
    }
  };

  return (
    <ProtectedRoute>
      <Toaster position="top-center" />
      <div className="w-full py-4 lg:py-6 px-4 lg:px-5 flex flex-col gap-6 lg:gap-8">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-lg lg:text-2xl font-bold pl-12 lg:pl-0">
            Research Document Generator
          </h1>
          <AvatarDropdown />
        </div>
        <div className="bg-[#F9FAFB] p-4 rounded-lg flex flex-col gap-3 shadow-custom-1 hover:shadow-custom-2">
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your research topic..."
                className="w-full p-3 border rounded-lg"
                disabled={isResearching}
              />
            </div>
            {/* Sample Queries */}
            <div className="flex flex-wrap gap-2">
              {[
                "Detailed analysis of Apple ",
                "Future of AI Technology",
                "Blockchain in Finance",
                "Cloud Computing Trends",
                "Digital Transformation Strategy",
              ].map((sampleQuery, index) => (
                <span
                  key={index}
                  onClick={() => !isResearching && setQuery(sampleQuery)}
                  className={`px-4 py-2 rounded-full cursor-pointer transition-colors text-sm lg:text-base
                    ${
                      query === sampleQuery ? "bg-[#FFEB82]" : "bg-white border"
                    }
                    ${
                      isResearching
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-[#FFF6C6]"
                    }
                  `}
                >
                  {sampleQuery}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="w-[40%] sm:w-[20%]">
                <select
                  className="w-full p-3 py-4 border rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) =>
                    setWordCount(
                      e.target.value ? parseInt(e.target.value) : null
                    )
                  }
                  value={wordCount || ""}
                  disabled={isResearching}
                >
                  <option value="" className="text-gray-500">
                    Word Count
                  </option>
                  <option value="5000">5,000 words</option>
                  <option value="10000">10,000 words</option>
                  <option value="15000">15,000 words</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-2 lg:w-[70%] sm:w-auto bg-white px-8 py-3 lg:py-1 border rounded-lg w-full">
                <div className="flex items-center gap-7">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg
                      width="36"
                      height="41"
                      viewBox="0 0 36 41"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.9663 34.5402C25.8835 34.5402 32.3016 28.1236 32.3016 20.2084C32.3016 12.2931 25.8835 5.87659 17.9663 5.87659C10.0491 5.87659 3.63098 12.2931 3.63098 20.2084C3.63098 28.1236 10.0491 34.5402 17.9663 34.5402Z"
                        stroke="#2563EB"
                        strokeWidth="2.86636"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.9663 5.87659C14.2853 9.74066 12.2322 14.8723 12.2322 20.2084C12.2322 25.5445 14.2853 30.6761 17.9663 34.5402C21.6473 30.6761 23.7004 25.5445 23.7004 20.2084C23.7004 14.8723 21.6473 9.74066 17.9663 5.87659Z"
                        stroke="#2563EB"
                        strokeWidth="2.86636"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.63098 20.2083H32.3016"
                        stroke="#2563EB"
                        strokeWidth="2.86636"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-sm lg:text-lg font-semibold">
                      Professional Network Search
                    </h2>
                    <p className="text-gray-600 text-sm lg:text-base">
                      Include insights from professional networks in your
                      research
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsProfessional(!isProfessional);
                    }}
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                      isProfessional ? "bg-black" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                        isProfessional ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <div className="w-6 h-8">
                    <svg
                      width="35"
                      height="34"
                      viewBox="0 0 35 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        isProfessional ? "stroke-[#2563EB]" : "stroke-[#9CA3AF]"
                      }`}
                    >
                      <path
                        d="M28.6226 18.2436C28.6226 25.2604 23.7108 28.7688 17.8728 30.8037C17.5671 30.9073 17.2351 30.9023 16.9326 30.7897C11.0806 28.7688 6.16882 25.2604 6.16882 18.2436V8.42012C6.16882 8.04793 6.31668 7.69098 6.57986 7.4278C6.84304 7.16462 7.19999 7.01677 7.57218 7.01677C10.3789 7.01677 13.8873 5.33274 16.3291 3.19963C16.6264 2.94562 17.0046 2.80606 17.3957 2.80606C17.7867 2.80606 18.1649 2.94562 18.4622 3.19963C20.9181 5.34677 24.4125 7.01677 27.2192 7.01677C27.5914 7.01677 27.9483 7.16462 28.2115 7.4278C28.4747 7.69098 28.6226 8.04793 28.6226 8.42012V18.2436Z"
                        strokeWidth="2.80672"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              Start Research
            </button>
          </form>
        </div>
        {/* Status Section */}
        {(isResearching || currentStatus.length > 0) && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isResearching ? "bg-blue-500 animate-pulse" : "bg-green-500"
                  }`}
                />
                <h3 className="font-semibold text-gray-900">
                  {isResearching ? "Research in Progress" : "Research Status"}
                </h3>
              </div>
              <span className="text-sm text-gray-500">
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <div className="mb-4">
              <span className="text-sm text-gray-500">Query:</span>
              <span className="ml-2 font-medium">{displayQuery}</span>
            </div>

            {isResearching && (
              <div className="mb-4">
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full animate-progress"
                    style={{ width: "60%" }}
                  />
                </div>
              </div>
            )}

            <ul className="space-y-3">
              {currentStatus.map((status, index) => (
                <li
                  key={index}
                  className="text-gray-600 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  {status}
                </li>
              ))}
            </ul>
          </div>
        )}
        {requestId && !isResearching && currentStatus.includes("COMPLETED") && (
          <button
            onClick={() => downloadResult(requestId, displayQuery)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FiDownload />
            Download Result
          </button>
        )}
      </div>
      <ExtraDocModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPurchase={handlePurchaseExtraDoc}
        plan={currentPlan}
        extraDocCost={extraDocCost}
      />
    </ProtectedRoute>
  );
}
