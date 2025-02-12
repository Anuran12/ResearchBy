"use client";
import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginPageImg from "@/assets/LoginPage.png";
import Link from "next/link";
import GoogleIcon from "@/assets/Google.png";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials");
      } else {
        router.push("/research");
      }
    } catch {
      setError("An error occurred during login");
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/research" });
  };

  return (
    <div className="min-h-screen flex">
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 p-3 hover:bg-gray-100 rounded-full transition-colors bg-white shadow-xl"
        aria-label="Go back"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 12H5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 19L5 12L12 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
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

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-6">
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

            <button
              type="submit"
              className="w-full py-3 bg-[#F9DD4D] text-black font-semibold rounded-lg hover:bg-[#FCE38A] transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-gray-600">
            Don&#39;t have an account?{" "}
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
              <button
                onClick={handleGoogleLogin}
                className="w-full p-3 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <Image src={GoogleIcon} alt="Google" width={20} height={20} />
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
