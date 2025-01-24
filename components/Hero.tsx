import React from "react";
import Herobg from "@/assets/herobg.png";
import Image from "next/image";
import Link from "next/link";
// Import your logo images here
import Logo1 from "@/assets/logo1.png";
import Logo2 from "@/assets/logo1.png";
import Logo3 from "@/assets/logo1.png";
import Logo4 from "@/assets/logo1.png";
import Logo5 from "@/assets/logo1.png";

function Hero() {
  return (
    <div className="flex flex-col items-center justify-start min-h-[45vh] lg:min-h-screen lg:h-[110vh] relative px-4 lg:px-0">
      <div className="flex flex-col items-center gap-5 pt-[10vh] lg:pt-[7vw] text-center">
        <h1 className="text-4xl lg:text-[5.5vw] font-bold leading-tight">
          Research Powered by
        </h1>
        <h1 className="text-4xl lg:text-[5.5vw] font-bold bg-gradient-to-l from-[#F9DD4D] to-[#FCE38A] text-transparent bg-clip-text leading-[1]">
          AI Intelligence
        </h1>
        <p className="text-base lg:text-[1.2vw] text-[#5F5F5F] text-center max-w-[90%] lg:max-w-none">
          Generate comprehensive research documents in minutes.
        </p>
        <Link
          className="bg-gradient-to-t from-[#F9DD4D] to-[#FCE38A] px-5 py-2.5 text-black font-semibold rounded-full text-[0.9vw]"
          href="/signup"
        >
          Start for free
        </Link>
      </div>

      {/* Logos Section */}
      <div className="relative w-full max-w-[1200px] h-[400px] mt-16">
        {/* Left side logos */}
        <div className="absolute left-[25%] top-[25%] animate-float-slow">
          <Image
            src={Logo1}
            alt="Logo 1"
            width={60}
            height={60}
            className="rounded-xl"
          />
        </div>
        <div className="absolute left-[10%] top-[50%] animate-float-medium">
          <Image
            src={Logo2}
            alt="Logo 2"
            width={60}
            height={60}
            className="rounded-xl"
          />
        </div>
        <div className="absolute left-[10%] -top-[5%] animate-float-medium">
          <Image
            src={Logo2}
            alt="Logo 2"
            width={60}
            height={60}
            className="rounded-xl"
          />
        </div>

        {/* Right side logos */}
        <div className="absolute right-[25%] top-[40%] animate-float-fast">
          <Image
            src={Logo3}
            alt="Logo 3"
            width={60}
            height={60}
            className="rounded-xl"
          />
        </div>
        <div className="absolute right-[10%] top-[20%] animate-float-medium">
          <Image
            src={Logo4}
            alt="Logo 4"
            width={60}
            height={60}
            className="rounded-xl"
          />
        </div>
        <div className="absolute right-0 -top-[20%] animate-float-medium">
          <Image
            src={Logo4}
            alt="Logo 4"
            width={60}
            height={60}
            className="rounded-xl"
          />
        </div>
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
