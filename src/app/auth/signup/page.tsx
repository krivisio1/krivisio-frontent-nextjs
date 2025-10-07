"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import google from "@/assets/logos/google.svg";
import github from "@/assets/logos/github.svg";
import Image from "next/image";
import DecorativeHeading from "@/components/common/DecorativeHeading";
import Link from "next/link";
import Oauth from "../partials/Oauth";
import { useSupabase } from "@/services/supabase/supabase.hook";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, startTransition] = useTransition();
  const { signUpWithEmail } = useSupabase();

  const handleSignup = () => {
    startTransition(async () => {
      await signUpWithEmail(name, email, password);
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative">
      {/* Background Dots */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(156, 163, 175, 0.4) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          mask: "radial-gradient(circle at center, black 400px, transparent 800px)",
          WebkitMask:
            "radial-gradient(circle at center, black 400px, transparent 800px)",
        }}
      />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12">
          <DecorativeHeading text="Create An" highlightText="Account" />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <img src="/logo2.svg" alt="logo" className="h-8" />
          </div>
          {/* Email Input */}\
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter your name
            </label>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB5711] focus:border-[#FB5711] outline-none text-gray-900 placeholder-gray-400"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@work-email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB5711] focus:border-[#FB5711] outline-none text-gray-900 placeholder-gray-400"
              disabled={isLoading}
            />
          </div>
          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB5711] focus:border-[#FB5711] outline-none text-gray-900 placeholder-gray-400"
              disabled={isLoading}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSignup();
                }
              }}
            />
          </div>
          {/* Sign Up Button */}
          <button
            onClick={handleSignup}
            disabled={!email.trim() || !password.trim() || isLoading}
            className="w-full bg-[#FB5711] hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors mb-6"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
          {/* Social Login Buttons */}
          {/* <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => handleOAuthSignup("Google")}
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              <Image src={google} alt="google logo" className="w-5 h-5 mr-2" />
              <span className="text-gray-700 text-sm">Google</span>
            </button>
            <button
              onClick={() => handleOAuthSignup("GitHub")}
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              <Image src={github} alt="github logo" className="w-5 h-5 mr-2" />
              <span className="text-gray-700 text-sm">GitHub</span>
            </button>
          </div> */}
          <div className="mb-6">
            <Oauth />
          </div>
          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-[#FB5711] hover:text-orange-600 font-medium hover:underline transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
