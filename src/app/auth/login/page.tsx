"use client";

import { useState, useTransition } from "react";
import { Loader, X } from "lucide-react";
import Image from "next/image";
import DecorativeHeading from "@/components/common/DecorativeHeading";
import Link from "next/link";
import Oauth from "../partials/Oauth";
import { useSupabase } from "@/services/supabase/supabase.hook";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, startTransition] = useTransition();
  const { supabase, signInWithPassword } = useSupabase();
  const handleLogin = () => {
    startTransition(async () => {
      await signInWithPassword(email, password);
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative">
      {/* Dotted Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(156, 163, 175, 0.4) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          mask: "radial-gradient(circle at center, black 400px, transparent 800px)",
          WebkitMask:
            "radial-gradient(circle at center, black 400px, transparent 800px)",
        }}
      ></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <DecorativeHeading text="Welcome" highlightText="Back" />
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <img src="/logo2.svg" alt="logo" className="h-8" />
          </div>

          {/* Email Input */}
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
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-[#FB5711] hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg text-center flex justify-center transition-colors mb-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin text-center" size={20} />
            ) : (
              "Login"
            )}
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

          <Oauth />

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-[#FB5711] hover:text-orange-
600 font-medium hover:underline transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
