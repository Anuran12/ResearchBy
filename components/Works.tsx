import Image from "next/image";
import React from "react";
import Works1 from "@/assets/works1.png";
import Works2 from "@/assets/works2.png";

function TickIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="lg:w-[21px] lg:h-[21px]"
    >
      <path
        d="M10.6897 0.523438C5.1797 0.523438 0.689697 5.01344 0.689697 10.5234C0.689697 16.0334 5.1797 20.5234 10.6897 20.5234C16.1997 20.5234 20.6897 16.0334 20.6897 10.5234C20.6897 5.01344 16.1997 0.523438 10.6897 0.523438ZM15.4697 8.22344L9.7997 13.8934C9.6597 14.0334 9.4697 14.1134 9.2697 14.1134C9.0697 14.1134 8.8797 14.0334 8.7397 13.8934L5.9097 11.0634C5.6197 10.7734 5.6197 10.2934 5.9097 10.0034C6.1997 9.71344 6.6797 9.71344 6.9697 10.0034L9.2697 12.3034L14.4097 7.16344C14.6997 6.87344 15.1797 6.87344 15.4697 7.16344C15.7597 7.45344 15.7597 7.92344 15.4697 8.22344Z"
        fill="#FCE38A"
      />
    </svg>
  );
}

function Works() {
  return (
    <div className="flex flex-col items-center justify-start py-6 lg:py-10 px-4 lg:px-[10vw] gap-4 lg:gap-8">
      <h1 className="text-2xl lg:text-[3vw] font-bold text-center">
        How it Works?
      </h1>

      {/* First Section */}
      <div className="w-full flex flex-col lg:flex-row bg-[#F4F4F4] rounded-lg lg:rounded-[26px] p-6 lg:p-16">
        <div className="w-full lg:w-[50%] flex flex-col items-start justify-center gap-4 lg:gap-5">
          <h1 className="text-xl lg:text-[2vw] font-semibold">Enter Topic</h1>
          <p className="text-sm lg:text-base">
            Input your research subject and specify your requirements
          </p>
          <ul className="work-list space-y-2 lg:space-y-3">
            <li className="flex items-center gap-2">
              <TickIcon />
              <span className="text-sm lg:text-base">Define Topic</span>
            </li>
            <li className="flex items-center gap-2">
              <TickIcon />
              <span className="text-sm lg:text-base">Click Enter</span>
            </li>
            <li className="flex items-center gap-2">
              <TickIcon />
              <span className="text-sm lg:text-base">
                People and Business Supported
              </span>
            </li>
            <li className="flex items-center gap-2">
              <TickIcon />
              <span className="text-sm lg:text-base">
                Get comprehensive word document covering your topic
              </span>
            </li>
          </ul>
        </div>
        <div className="w-full lg:w-[50%] flex items-center justify-center mt-6 lg:mt-0">
          <Image
            src={Works1}
            alt="work1"
            className="w-full max-w-[300px] lg:max-w-none"
          />
        </div>
      </div>

      {/* Middle Section */}
      <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-8">
        <div className="w-full lg:w-[50%] bg-[#F4F4F4] rounded-lg lg:rounded-[26px] p-6 lg:p-16 flex flex-col items-start justify-center gap-4 lg:gap-5">
          <h1 className="text-xl lg:text-[2vw] font-semibold">AI Analysis</h1>
          <p className="text-sm lg:text-base">
            Our AI processes and analyzes information from multiple sources
          </p>
          <ul className="work-list space-y-2 lg:space-y-3">
            <li className="flex items-center gap-2">
              <TickIcon />
              <span className="text-sm lg:text-base">Full Internet Search</span>
            </li>
            <li className="flex items-center gap-2">
              <TickIcon />
              <span className="text-sm lg:text-base">LLM Knowledge</span>
            </li>
            <li className="flex items-center gap-2">
              <TickIcon />
              <span className="text-sm lg:text-base">
                Company and People Knowledge
              </span>
            </li>
            <li className="flex items-center gap-2">
              <TickIcon />
              <span className="text-sm lg:text-base">Media and Images</span>
            </li>
          </ul>
        </div>
        <div className="w-full lg:w-[50%] bg-[#F4F4F4] rounded-lg lg:rounded-[26px] p-6 lg:p-16 flex flex-col items-start justify-center gap-4 lg:gap-5">
          <h1 className="text-xl lg:text-[2vw] font-semibold">Generation</h1>
          <p className="text-sm lg:text-base">
            Creates a structured research document with cited sources
          </p>
          <ul className="work-list space-y-2 lg:space-y-3">
            <li className="flex items-center gap-2">
              <TickIcon />
              <span className="text-sm lg:text-base">Table of Contents</span>
            </li>
            <li className="flex items-center gap-2">
              <TickIcon />
              <span className="text-sm lg:text-base">
                Introduction, Extensive Research Details
              </span>
            </li>
            <li className="flex items-center gap-2">
              <TickIcon />
              <span className="text-sm lg:text-base">
                Media and Image references
              </span>
            </li>
            <li className="flex items-center gap-2">
              <TickIcon />
              <span className="text-sm lg:text-base">References</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Last Section */}
      <div className="w-full flex flex-col lg:flex-row bg-[#F4F4F4] rounded-lg lg:rounded-[26px] p-6 lg:p-16">
        <div className="w-full lg:w-[50%] flex flex-col items-start justify-center gap-4 lg:gap-5">
          <h1 className="text-xl lg:text-[2vw] font-semibold">
            Download & Edit
          </h1>
          <p className="text-sm lg:text-base">
            Get your complete research paper ready for final touches
          </p>
          <ul className="work-list space-y-2 lg:space-y-3">
            <li className="flex items-center gap-2">
              <TickIcon />
              <span className="text-sm lg:text-base">
                Download in Microsoft Word
              </span>
            </li>
            <li className="flex items-center gap-2">
              <TickIcon />
              <span className="text-sm lg:text-base">Edit and customize</span>
            </li>
            <li className="flex items-center gap-2">
              <TickIcon />
              <span className="text-sm lg:text-base">
                Share with colleagues
              </span>
            </li>
          </ul>
        </div>
        <div className="w-full lg:w-[50%] flex items-center justify-center mt-6 lg:mt-0">
          <Image
            src={Works2}
            alt="work2"
            className="w-full max-w-[300px] lg:max-w-none"
          />
        </div>
      </div>
    </div>
  );
}

export default Works;
