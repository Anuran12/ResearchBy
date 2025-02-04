import React from "react";
import Herobg from "@/assets/herobg.png";
import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <div className="flex flex-col items-center justify-start min-h-[45vh] lg:min-h-screen lg:h-[110vh] relative px-4 lg:px-0">
      <div className="flex flex-col items-center gap-5 pt-[10vh] lg:pt-[7vw] text-center">
        <h1 className="text-4xl lg:text-[5.5vw] font-bold leading-tight">
          A Team of AI Agents
        </h1>
        <h1 className="text-4xl lg:text-[5.5vw] font-bold bg-gradient-to-l from-[#F9DD4D] to-[#FCE38A] text-transparent bg-clip-text leading-[1.2]">
          Doing Research
        </h1>
        <p className="text-base lg:text-[1.2vw] text-[#5F5F5F] text-center max-w-[90%] lg:max-w-none">
          Generate comprehensive research documents in minutes.
        </p>
        <Link
          className="bg-gradient-to-t from-[#F9DD4D] to-[#FCE38A] px-5 py-2.5 text-black font-semibold rounded-full text-[10px] md:text-[0.9vw]"
          href="/signup"
        >
          Start for free
        </Link>
      </div>

      <Image
        src={Herobg}
        alt="Hero Background"
        className="w-full absolute left-0 bottom-0 -z-20"
      />
    </div>
  );
}

export default Hero;
