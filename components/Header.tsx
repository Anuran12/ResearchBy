"use client";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "@/assets/logo.png";
import Link from "next/link";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex w-full items-center justify-between px-4 lg:px-[5vw] py-4">
      <div className="flex items-center gap-4 lg:gap-10">
        <div className="flex items-center gap-2">
          <Image src={Logo} alt="logo" width={40} height={40} />
          <h1 className="text-lg lg:text-[1.2vw] font-bold">ResearchBy.ai</h1>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>

        {/* Navigation links */}
        <div
          className={`
          fixed top-0 left-0 w-full h-screen bg-white p-4 lg:p-0
          lg:static lg:h-auto lg:bg-transparent
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:flex lg:gap-10
        `}
        >
          <Link
            className="block py-2 lg:py-0 text-base lg:text-[0.9vw] font-semibold hover:text-[#F9DD4D]"
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

      {/* Auth buttons */}
      <div className="hidden lg:flex items-center gap-5">
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
