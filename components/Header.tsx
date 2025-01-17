import Image from "next/image";
import React from "react";
import Logo from "@/assets/logo.png";
import Link from "next/link";

function Header() {
  return (
    <div className="flex w-full items-center justify-between px-[5vw] py-4">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <Image src={Logo} alt="logo" width={40} height={40} />
          <h1 className="text-[1.2vw] font-bold">ResearchBy.ai</h1>
        </div>
        <div className="flex gap-10">
          <Link
            className="text-[0.9vw] font-semibold hover:text-[#F9DD4D]"
            href="/home"
          >
            Home
          </Link>
          <Link
            className="text-[0.9vw] font-semibold hover:text-[#F9DD4D]"
            href="/about"
          >
            About
          </Link>
          <Link
            className="text-[0.9vw] font-semibold hover:text-[#F9DD4D]"
            href="/pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-[0.9vw] font-semibold hover:text-[#F9DD4D]"
            href="/contact"
          >
            Contact
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <Link
          className="text-[0.9vw] font-semibold hover:text-[#F9DD4D]"
          href={"/login"}
        >
          Login
        </Link>
        <Link
          className="bg-gradient-to-t from-[#F9DD4D] to-[#FCE38A] px-5 py-2.5 text-white font-semibold rounded-full text-[0.9vw]"
          href={"/signup"}
        >
          Start for free
        </Link>
      </div>
    </div>
  );
}

export default Header;
