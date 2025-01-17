import React from "react";
import Logo from "@/assets/logo.png";
import Image from "next/image";

function Footer() {
  return (
    <footer className="flex justify-between items-start p-10 bg-white">
      <div className="flex flex-col">
        <Image src={Logo} alt="Logo" width={50} height={50} />
        <h1 className="text-xl font-bold">ResearchBy.ai</h1>
      </div>
      <div className="flex flex-col">
        <h2 className="font-semibold">Product</h2>
        <a href="/home" className="text-gray-600">
          Home
        </a>
        <a href="/about" className="text-gray-600">
          About
        </a>
        <a href="/pricing" className="text-gray-600">
          Pricing
        </a>
      </div>
      <div className="flex flex-col">
        <h2 className="font-semibold">Legal</h2>
        <a href="/terms" className="text-gray-600">
          Terms of Privacy
        </a>
        <a href="/privacy" className="text-gray-600">
          Privacy Policy
        </a>
        <a href="/security" className="text-gray-600">
          Security
        </a>
      </div>
      <div className="flex flex-col">
        <p className="text-gray-600">
          All rights reserved. © 2025 ResearchBy.ai
        </p>
      </div>
    </footer>
  );
}

export default Footer;
