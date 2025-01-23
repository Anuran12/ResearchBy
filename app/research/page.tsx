"use client";
import AvatarDropdown from "@/components/AvatarDropdown";
import { useState } from "react";

export default function NewResearch() {
  const [isProf, setIsProf] = useState(false);
  return (
    <div className="w-full py-4 lg:py-6 px-4 lg:px-5 flex flex-col gap-6 lg:gap-8">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl lg:text-2xl font-bold">
          Research Document Generator
        </h1>
        <AvatarDropdown />
      </div>
      <div className="bg-[#F9FAFB] p-4 rounded-lg flex flex-col gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter your research topic..."
            className="w-full p-3 border rounded-lg"
          />
        </div>
        {/* Keywords/Topics */}
        <div className="flex flex-wrap gap-2">
          <span className="px-4 py-2 bg-[#FFEB82] rounded-full">
            Technology
          </span>
          <span className="px-4 py-2 bg-white border rounded-full">
            Business
          </span>
          <span className="px-4 py-2 bg-white border rounded-full">
            Science
          </span>
          <span className="px-4 py-2 bg-white border rounded-full">
            Healthcare
          </span>
          <span className="px-4 py-2 bg-white border rounded-full">
            Environment
          </span>
        </div>
      </div>
      {/* Professional Network Search Section */}
      <div className="border rounded-lg p-6 shadow-custom-1 hover:shadow-custom-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-7">
            <div className="w-6 h-6">
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
              <h2 className="text-lg font-semibold">
                Professional Network Search
              </h2>
              <p className="text-gray-600">
                Include insights from professional networks in your research
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsProf(!isProf)}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                isProf ? "bg-black" : "bg-gray-200"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                  isProf ? "translate-x-6" : "translate-x-0"
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
                  isProf ? "stroke-[#2563EB]" : "stroke-[#9CA3AF]"
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
      {/* Research Settings Section */}
      <div className="border rounded-lg p-6 shadow-custom-1 hover:shadow-custom-2">
        <h2 className="text-lg font-semibold mb-6">Research Settings</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Word count
            </label>
            <select className="w-full p-3 border rounded-lg bg-white">
              <option>5,000</option>
              <option>10,000</option>
              <option>15,000</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Research Depth
            </label>
            <select className="w-full p-3 border rounded-lg bg-white">
              <option>Comprehensive</option>
              <option>Basic</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Citations
            </label>
            <select className="w-full p-3 border rounded-lg bg-white">
              <option>MLA</option>
              <option>APA</option>
              <option>Chicago</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
