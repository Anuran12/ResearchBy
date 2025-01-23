"use client";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "@/assets/logo.png";
import Link from "next/link";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="flex w-full items-center justify-between px-4 lg:px-[5vw] py-4">
        {/* Logo and Mobile Menu Button Container */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="flex items-center gap-2">
            <Image
              src={Logo}
              alt="logo"
              width={32}
              height={32}
              className="lg:w-[40px] lg:h-[40px]"
            />
            <h1 className="text-base lg:text-[1.2vw] font-bold">
              ResearchBy.ai
            </h1>
          </div>
          <div className="hidden lg:flex gap-10">
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

          {/* Mobile menu button */}
          <button
            className="lg:hidden z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <span className="text-xl">✕</span>
            ) : (
              <span className="text-xl">☰</span>
            )}
          </button>
        </div>

        {/* Auth buttons - desktop */}
        <div className="hidden lg:flex items-center gap-5">
          <Link
            className="text-[0.9vw] font-semibold hover:text-[#F9DD4D]"
            href="/login"
          >
            Login
          </Link>
          <Link
            className="bg-gradient-to-t from-[#F9DD4D] to-[#FCE38A] px-5 py-2.5 text-black font-semibold rounded-full text-[0.9vw]"
            href="/signup"
          >
            Start for free
          </Link>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex flex-col space-y-6 mt-16">
            <Link
              className="text-lg font-semibold hover:text-[#F9DD4D]"
              href="/home"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              className="text-lg font-semibold hover:text-[#F9DD4D]"
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              className="text-lg font-semibold hover:text-[#F9DD4D]"
              href="/pricing"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              className="text-lg font-semibold hover:text-[#F9DD4D]"
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>

          {/* Auth buttons - mobile */}
          <div className="mt-auto space-y-4">
            <Link
              className="block text-center font-semibold hover:text-[#F9DD4D]"
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              className="block text-center bg-gradient-to-t from-[#F9DD4D] to-[#FCE38A] px-5 py-2.5 text-black font-semibold rounded-full"
              href="/signup"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Start for free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
