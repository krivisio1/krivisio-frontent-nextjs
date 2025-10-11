"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useSupabase } from "@/services/supabase/supabase.hook";
import { useRouter } from "next/navigation";

export default function TeamInvite() {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteEmails, setInviteEmails] = useState<string[]>([
    "abc@workgmail.com",
    "abc@workgmail.com",
  ]);

  const { userData } = useSupabase();
  const router = useRouter();

  const addInviteEmail = () => {
    if (inviteEmail.trim() && !inviteEmails.includes(inviteEmail.trim())) {
      setInviteEmails([...inviteEmails, inviteEmail.trim()]);
      setInviteEmail("");
    }
  };

  const removeInviteEmail = (emailToRemove: string) => {
    setInviteEmails(inviteEmails.filter((email) => email !== emailToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addInviteEmail();
    }
  };

  const handleCopyLink = () => {
    // TODO: Generate and copy invite link
    //
    console.log("Copy invite link");
  };

  const handleSkip = () => {
    if (!userData) return;
    if (userData.role == "DEVELOPER") {
      router.push("/management/developer");
    } else if (userData.role == "PROJECT_MANAGER") {
      router.push("/management/dashboard");
    }
    console.log("Skip team invite");
  };

  return (
    <>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Invite People
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {inviteEmails.map((email, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              <span>{email}</span>
              <button
                onClick={() => removeInviteEmail(email)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <input
          type="email"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter the email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB5711] focus:border-[#FB5711] outline-none text-gray-900 placeholder-gray-400"
        />
      </div>

      <button
        onClick={handleCopyLink}
        className="w-full bg-[#FB5711] hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors mb-4 flex items-center justify-center"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
        Send Invite Link
      </button>

      <button
        onClick={handleSkip}
        className="w-full text-[#FB5711] hover:text-orange-600 font-medium py-2 transition-colors"
      >
        Skip
      </button>
    </>
  );
}
