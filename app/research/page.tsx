import Image from "next/image";
import Avatar from "@/assets/avatar.png";

export default function NewResearch() {
  return (
    <div className="w-[80%] py-6 px-5">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Research Document Generator</h1>
        <Image src={Avatar} alt="avatar" className="w-12 h-12 rounded-full" />
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Enter your research topic..."
          className="w-full p-3 border rounded-lg"
        />
      </div>
      {/* Keywords/Topics */}
      <div className="flex flex-wrap gap-2">
        <span className="px-4 py-2 bg-[#FFEB82] rounded-full">Technology</span>
        <span className="px-4 py-2 bg-white border rounded-full">Business</span>
        <span className="px-4 py-2 bg-white border rounded-full">Science</span>
        <span className="px-4 py-2 bg-white border rounded-full">
          Healthcare
        </span>
        <span className="px-4 py-2 bg-white border rounded-full">
          Environment
        </span>
      </div>
      {/* Professional Network Search Section */}
      <div className="border rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                  stroke="currentColor"
                  strokeWidth="2"
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
            <div className="w-12 h-6 bg-gray-200 rounded-full">
              <div className="w-6 h-6 bg-white rounded-full shadow"></div>
            </div>
            <div className="w-6 h-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 16V12M12 8H12.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* Research Settings Section */}
      <div className="border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Research Settings</h2>
        <div className="grid grid-cols-3 gap-8">
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
