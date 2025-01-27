import React from "react";
import Logo from "@/assets/logo.png";
import Image from "next/image";

function Footer() {
  return (
    <footer className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0 p-6 lg:p-10 bg-white">
      {/* Logo and Company Name */}
      <div className="flex flex-col items-center lg:items-start w-full lg:w-auto">
        <Image
          src={Logo}
          alt="Logo"
          width={40}
          height={40}
          className="lg:w-[50px] lg:h-[50px]"
        />
        <h1 className="text-lg lg:text-xl font-bold mt-2">ResearchBy.ai</h1>
      </div>

      {/* Links Sections */}
      <div className="grid grid-cols-2 lg:flex lg:flex-row gap-8 lg:gap-16 w-full lg:w-auto">
        {/* Product Links */}
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-base lg:text-lg">Product</h2>
          <div className="flex flex-col gap-2">
            <a
              href="/home"
              className="text-gray-600 text-sm lg:text-base hover:text-[#F9DD4D]"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-gray-600 text-sm lg:text-base hover:text-[#F9DD4D]"
            >
              About
            </a>
            <a
              href="/pricing"
              className="text-gray-600 text-sm lg:text-base hover:text-[#F9DD4D]"
            >
              Pricing
            </a>
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-base lg:text-lg">Legal</h2>
          <div className="flex flex-col gap-2">
            <a
              href="/terms"
              className="text-gray-600 text-sm lg:text-base hover:text-[#F9DD4D]"
            >
              Terms of Privacy
            </a>
            <a
              href="/privacy"
              className="text-gray-600 text-sm lg:text-base hover:text-[#F9DD4D]"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex flex-col w-full lg:w-auto items-center lg:items-end">
        <p className="text-gray-600 text-sm lg:text-base text-center lg:text-right">
          All rights reserved. © 2025 ResearchBy.ai
        </p>
      </div>
    </footer>
  );
}

export default Footer;
