"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DecorativeHeading from "@/components/common/DecorativeHeading";
import ProfileSetup from "@/components/onboarding/ProfileSetup";
import TeamInvite from "@/components/onboarding/TeamInvite";
import { useSupabase } from "@/services/supabase/supabase.hook";

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const [userRole, setUserRole] = useState<
    "PROJECT_MANAGER" | "DEVELOPER" | null
  >(null);
  const { userData } = useSupabase();
  useEffect(() => {
    if (!userData) return;
    setUserRole(userData.role);
  }, [userData]);

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
          <DecorativeHeading
            text={userRole === "DEVELOPER" ? "Set Up" : "Team Members"}
            highlightText={
              userRole === "PROJECT_MANAGER" ? "Profile" : "Invite"
            }
          />
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <img src="/logo2.svg" alt="logo" className="h-8" />
          </div>

          {/* Contextual Content */}
          {userRole === "DEVELOPER" ? <ProfileSetup /> : <TeamInvite />}
        </div>
      </div>
    </div>
  );
}
