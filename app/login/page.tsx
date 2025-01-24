"use client";
import { useState } from "react";
import Image from "next/image";
import LoginPageImg from "@/assets/LoginPage.png";
import Link from "next/link";
import GoogleIcon from "@/assets/Google.png";
import GithubIcon from "@/assets/GitHub.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Logging in...", { email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section with Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-[#FCE38A] to-[#F9DD4D] items-center justify-center p-12">
        <div className="max-w-md">
          <Image
            src={LoginPageImg}
            alt="ResearchBy.ai Logo"
            width={400}
            height={400}
          />
        </div>
      </div>

      {/* Right Section with Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <h1 className="text-2xl lg:text-3xl font-bold mb-8">Welcome Back</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email here"
                className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#F9DD4D]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password here"
                className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#F9DD4D]"
                required
              />
            </div>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-[#F9DD4D] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#F9DD4D] text-black font-semibold rounded-lg hover:bg-[#FCE38A] transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#F9DD4D] hover:underline">
              Sign up
            </Link>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full p-3 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <Image src={GoogleIcon} alt="Google" width={20} height={20} />
                Login with Google
              </button>
              <button className="w-full p-3 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <Image src={GithubIcon} alt="GitHub" width={20} height={20} />
                Login with GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
