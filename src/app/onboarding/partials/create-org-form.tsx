"use client";

import { useState, useTransition } from "react";
import { Loader, X } from "lucide-react";
import Image from "next/image";
import DecorativeHeading from "@/components/common/DecorativeHeading";
import Link from "next/link";
import { useSupabase } from "@/services/supabase/supabase.hook";
import { useRouter } from "next/navigation";

export default function CreateOrg() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isLoading, startTransition] = useTransition();
  const handleLogin = () => {
    startTransition(async () => {});
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
          <DecorativeHeading text="Create" highlightText="Organization" />
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
              Organization name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Freelancer"
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
              "Create"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
