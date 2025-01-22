import Link from "next/link";
import React from "react";
import Herobg from "@/assets/herobg.png";
import Image from "next/image";

function Hero() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen lg:h-[110vh] relative px-4 lg:px-0">
      <div className="flex flex-col items-center gap-5 pt-[10vh] lg:pt-[7vw] text-center">
        <h1 className="text-4xl lg:text-[5.5vw] font-bold leading-tight">
          Research Powered by
        </h1>
        <h1 className="text-4xl lg:text-[5.5vw] font-bold bg-gradient-to-l from-[#F9DD4D] to-[#FCE38A] text-transparent bg-clip-text">
          AI Intelligence
        </h1>
        <p className="text-base lg:text-[1.2vw] text-[#5F5F5F] text-center max-w-[90%] lg:max-w-none">
          Generate comprehensive research documents in minutes.
        </p>
      </div>
      <Image
        src={Herobg}
        alt="Hero Background"
        className="w-full absolute left-0 bottom-0 -z-10"
      />
      <div className="w-full flex justify-between ">
        <div className="w-[30%] relative">logo1</div>
        <div>logo2</div>
      </div>
    </div>
  );
}

export default Hero;
