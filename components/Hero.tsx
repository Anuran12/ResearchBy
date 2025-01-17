import Link from "next/link";
import React from "react";
import Herobg from "@/assets/herobg.png";
import Image from "next/image";

function Hero() {
  return (
    <div className="flex flex-col items-center justify-start h-[110vh] relative">
      <div className="flex flex-col items-center gap-5 pt-[7vw]">
        <h1 className="text-[5.5vw] font-bold leading-7">
          Research Powered by
        </h1>
        <h1 className="text-[5.5vw] font-bold bg-gradient-to-l from-[#F9DD4D] to-[#FCE38A] text-transparent bg-clip-text">
          AI Intelligence
        </h1>
        <p className="text-[1.2vw] text-[#5F5F5F] text-center">
          Generate comprehensive research documents in minutes. Powered by
          advanced AI and professional networks.
        </p>
        <Link
          className="bg-gradient-to-t from-[#F9DD4D] to-[#FCE38A] px-5 py-2.5 text-white font-semibold rounded-full text-[0.9vw]"
          href={"/signup"}
        >
          Start for free
        </Link>
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
