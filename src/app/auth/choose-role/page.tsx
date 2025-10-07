"use client";

import { useEffect, useState } from "react";
import { Users, Code } from "lucide-react";
import { useRouter } from "next/navigation";
import DecorativeHeading from "@/components/common/DecorativeHeading";
import { UseUserContext } from "@/app/providers/userProvider/user.context";
import { useSupabase } from "@/services/supabase/supabase.hook";

export default function ChooseRolePage() {
  const [selectedRole, setSelectedRole] = useState<
    "PROJECT_MANAGER" | "DEVELOPER" | null
  >(null);

  const { session, refreshSession, userData, updateUserRole } = useSupabase();
  const router = useRouter();
  const handleContinue = async (role: "PROJECT_MANAGER" | "DEVELOPER") => {
    setSelectedRole(role);

    await updateUserRole(role);

    refreshSession();
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

      <div className="w-full max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <DecorativeHeading text="Choose Your" highlightText="Role" />
          <p className="text-gray-600 mt-4 text-lg">
            Select your role to access the tools and features designed
            specifically for you
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Project Manager Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-[#FB5711]" />
              </div>
            </div>

            {/* Title and Description */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Project Manager
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Manage projects, track progress, and coordinate teams
                effectively
              </p>
            </div>

            {/* Features List */}
            <div className="mb-8">
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-[#FB5711] rounded-full mr-3 flex-shrink-0"></div>
                  Project planning and tracking
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-[#FB5711] rounded-full mr-3 flex-shrink-0"></div>
                  Team collaboration tools
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-[#FB5711] rounded-full mr-3 flex-shrink-0"></div>
                  Progress reporting and analytics
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-[#FB5711] rounded-full mr-3 flex-shrink-0"></div>
                  Resource management
                </li>
              </ul>
            </div>

            {/* Continue Button */}
            <button
              onClick={() => handleContinue("PROJECT_MANAGER")}
              className="w-full bg-[#FB5711] hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Continue as Project Manager
            </button>
          </div>

          {/* Developer Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Code className="w-8 h-8 text-gray-900" />
              </div>
            </div>

            {/* Title and Description */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Developer
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Build, code, and deploy applications with powerful development
                tools
              </p>
            </div>

            {/* Features List */}
            <div className="mb-8">
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mr-3 flex-shrink-0"></div>
                  Code editor and IDE tools
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mr-3 flex-shrink-0"></div>
                  Version control integration
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mr-3 flex-shrink-0"></div>
                  Testing and debugging tools
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mr-3 flex-shrink-0"></div>
                  Deployment and CI/CD
                </li>
              </ul>
            </div>

            {/* Continue Button */}
            <button
              onClick={() => handleContinue("DEVELOPER")}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Continue as Developer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
