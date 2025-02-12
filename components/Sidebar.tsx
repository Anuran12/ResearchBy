"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import New from "@/assets/new.svg";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<{
    email: string;
    plan: string;
  } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/user/profile");
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden font-bold text-2xl bg-white rounded-full py-2 px-3 shadow-md"
      >
        {isMobileMenuOpen ? "✕" : "☰"}
      </button>

      <div
        className={`
        fixed left-0 top-0 h-screen bg-[#FCE38A] p-4 flex flex-col
        transition-transform duration-300 ease-in-out
        lg:w-[20%] lg:transform-none
        ${isMobileMenuOpen ? "w-[80%]" : "-translate-x-full"}
        z-40
      `}
      >
        {/* Logo section */}
        <div className="flex flex-col justify-center items-center mb-8">
          <Image src={Logo} alt="logo" width={60} height={60} />
          <h1 className="text-2xl font-bold">ResearchBy.ai</h1>
        </div>

        {/* Navigation items */}
        <nav className="flex-1">
          <Link
            href="/research"
            className="flex justify-center items-center gap-2 p-3 mb-2 bg-black text-white rounded-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Image src={New} alt="logo" width={20} height={20} />
            <span className="font-bold">New Research</span>
          </Link>

          <Link
            href="/research/favorites"
            className={`flex items-center gap-2 p-3 mb-2 rounded-lg transition-colors duration-200 hover:bg-black/10 ${
              pathname === "/research/favorites" ? "bg-black/10" : ""
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={
                pathname === "/research/favorites"
                  ? "stroke-black"
                  : "stroke-[#777777]"
              }
            >
              <path
                d="M9.99999 1.66666L12.575 6.88332L18.3333 7.72499L14.1667 11.7833L15.15 17.5167L9.99999 14.8083L4.84999 17.5167L5.83332 11.7833L1.66666 7.72499L7.42499 6.88332L9.99999 1.66666Z"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className={`font-semibold ${
                pathname === "/research/favorites"
                  ? "text-black"
                  : "text-[#777777]"
              }`}
            >
              Favorites
            </span>
          </Link>

          <Link
            href="/research/history"
            className={`flex items-center gap-2 p-3 mb-2 rounded-lg transition-colors duration-200 hover:bg-black/10 ${
              pathname === "/research/history" ? "bg-black/10" : ""
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={
                pathname === "/research/history"
                  ? "stroke-black"
                  : "stroke-[#777777]"
              }
            >
              <path
                d="M9.99999 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 9.99999C18.3333 5.39762 14.6024 1.66666 9.99999 1.66666C5.39762 1.66666 1.66666 5.39762 1.66666 9.99999C1.66666 14.6024 5.39762 18.3333 9.99999 18.3333Z"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 5V10L13.3333 11.6667"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className={`font-semibold ${
                pathname === "/research/history"
                  ? "text-black"
                  : "text-[#777777]"
              }`}
            >
              History
            </span>
          </Link>

          <Link
            href="/research/settings"
            className={`flex items-center gap-2 p-3 mb-2 rounded-lg transition-colors duration-200 hover:bg-black/10 ${
              pathname === "/research/settings" ? "bg-black/10" : ""
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={
                pathname === "/research/settings"
                  ? "stroke-black"
                  : "stroke-[#777777]"
              }
            >
              <path
                d="M10.1833 1.66666H9.81667C9.37464 1.66666 8.95072 1.84225 8.63816 2.15481C8.3256 2.46737 8.15 2.8913 8.15 3.33332V3.48332C8.1497 3.77559 8.07255 4.06265 7.92628 4.31569C7.78002 4.56873 7.56978 4.77885 7.31667 4.92499L6.95834 5.13332C6.70497 5.2796 6.41756 5.35661 6.125 5.35661C5.83244 5.35661 5.54503 5.2796 5.29167 5.13332L5.16667 5.06666C4.78422 4.84604 4.32987 4.78619 3.90334 4.90025C3.47681 5.0143 3.11296 5.29294 2.89167 5.67499L2.70833 5.99166C2.48772 6.3741 2.42787 6.82846 2.54192 7.25499C2.65598 7.68152 2.93461 8.04536 3.31667 8.26666L3.44167 8.34999C3.69356 8.49542 3.90302 8.70423 4.04921 8.95568C4.1954 9.20713 4.27325 9.49247 4.275 9.78332V10.2083C4.27617 10.502 4.19971 10.7908 4.05337 11.0454C3.90703 11.3 3.69601 11.5115 3.44167 11.6583L3.31667 11.7333C2.93461 11.9546 2.65598 12.3185 2.54192 12.745C2.42787 13.1715 2.48772 13.6259 2.70833 14.0083L2.89167 14.325C3.11296 14.707 3.47681 14.9857 3.90334 15.0997C4.32987 15.2138 4.78422 15.1539 5.16667 14.9333L5.29167 14.8667C5.54503 14.7204 5.83244 14.6434 6.125 14.6434C6.41756 14.6434 6.70497 14.7204 6.95834 14.8667L7.31667 15.075C7.56978 15.2211 7.78002 15.4313 7.92628 15.6843C8.07255 15.9373 8.1497 16.2244 8.15 16.5167V16.6667C8.15 17.1087 8.3256 17.5326 8.63816 17.8452C8.95072 18.1577 9.37464 18.3333 9.81667 18.3333H10.1833C10.6254 18.3333 11.0493 18.1577 11.3618 17.8452C11.6744 17.5326 11.85 17.1087 11.85 16.6667V16.5167C11.8503 16.2244 11.9275 15.9373 12.0737 15.6843C12.22 15.4313 12.4302 15.2211 12.6833 15.075L13.0417 14.8667C13.295 14.7204 13.5824 14.6434 13.875 14.6434C14.1676 14.6434 14.455 14.7204 14.7083 14.8667L14.8333 14.9333C15.2158 15.1539 15.6701 15.2138 16.0967 15.0997C16.5232 14.9857 16.887 14.707 17.1083 14.325L17.2917 14C17.5123 13.6175 17.5721 13.1632 17.4581 12.7367C17.344 12.3101 17.0654 11.9463 16.6833 11.725L16.5583 11.6583C16.304 11.5115 16.093 11.3 15.9466 11.0454C15.8003 10.7908 15.7238 10.502 15.725 10.2083V9.79166C15.7238 9.49797 15.8003 9.2092 15.9466 8.95457C16.093 8.69994 16.304 8.4885 16.5583 8.34166L16.6833 8.26666C17.0654 8.04536 17.344 7.68152 17.4581 7.25499C17.5721 6.82846 17.5123 6.3741 17.2917 5.99166L17.1083 5.67499C16.887 5.29294 16.5232 5.0143 16.0967 4.90025C15.6701 4.78619 15.2158 4.84604 14.8333 5.06666L14.7083 5.13332C14.455 5.2796 14.1676 5.35661 13.875 5.35661C13.5824 5.35661 13.295 5.2796 13.0417 5.13332L12.6833 4.92499C12.4302 4.77885 12.22 4.56873 12.0737 4.31569C11.9275 4.06265 11.8503 3.77559 11.85 3.48332V3.33332C11.85 2.8913 11.6744 2.46737 11.3618 2.15481C11.0493 1.84225 10.6254 1.66666 10.1833 1.66666Z"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className={`font-semibold ${
                pathname === "/research/settings"
                  ? "text-black"
                  : "text-[#777777]"
              }`}
            >
              Settings
            </span>
          </Link>

          <Link
            href="/research/plans"
            className={`flex items-center gap-2 p-3 mb-2 rounded-lg transition-colors duration-200 hover:bg-black/10 ${
              pathname === "/research/plans" ? "bg-black/10" : ""
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={
                pathname === "/research/plans"
                  ? "stroke-black"
                  : "stroke-[#777777]"
              }
            >
              <path
                d="M4 6H2M4 14H2M4 10H1M5 2.51555C6.4301 1.55827 8.1499 1 10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19C8.1499 19 6.4301 18.4417 5 17.4845M12 7.49991C11.5 7.37589 10.6851 7.37133 10 7.37589M10 7.37589C9.7709 7.37742 9.9094 7.36768 9.6 7.37589C8.7926 7.40108 8.0016 7.73666 8 8.6874C7.99825 9.7002 9 9.9999 10 9.9999C11 9.9999 12 10.2311 12 11.3124C12 12.125 11.1925 12.4811 10.1861 12.599C10.1216 12.599 10.0597 12.5991 10 12.5994M10 7.37589V6M10 12.5994C9.3198 12.6022 8.9193 12.6148 8 12.4999M10 12.5994V14"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className={`font-semibold ${
                pathname === "/research/plans" ? "text-black" : "text-[#777777]"
              }`}
            >
              Plans
            </span>
          </Link>
        </nav>

        {/* Footer section */}
        <div className="mt-auto">
          <div className="bg-[#FEF9E7] p-4 rounded-lg mb-4">
            <div className="mb-4">
              <h3 className="font-medium text-lg">
                {userProfile?.plan
                  ? `${userProfile.plan
                      .charAt(0)
                      .toUpperCase()}${userProfile.plan.slice(1)} Plan`
                  : "Loading..."}
              </h3>
              <div className="relative mt-2">
                <select
                  disabled
                  className="w-full p-2 bg-white rounded border appearance-none cursor-not-allowed"
                >
                  <option>{userProfile?.email || "Loading..."}</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <Link
                href="/terms"
                className="block mb-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                terms & condition
              </Link>
              {/* <Link href="/support" className="block">
                support
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
