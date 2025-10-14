"use client";

import { useState, ChangeEvent, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function EmailsInput() {
  const { setValue, watch } = useFormContext();
  const user_emails: string[] = watch("user_emails") || [];
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      e.preventDefault();
      const newEmail = input.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(newEmail) && !user_emails.includes(newEmail)) {
        const updated = [...user_emails, newEmail];
        setValue("user_emails", updated, { shouldValidate: true });
      }
      setInput("");
    }
  };

  const removeEmail = (emailToRemove: string) => {
    const updated = user_emails.filter((e) => e !== emailToRemove);
    setValue("user_emails", updated, { shouldValidate: true });
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Invite People
      </label>

      <input
        type="text"
        placeholder="Enter an email and press Enter"
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB5711] focus:border-[#FB5711] outline-none text-gray-900 placeholder-gray-400"
      />

      <div className="flex flex-wrap gap-2 mt-3">
        {user_emails.map((email, index) => (
          <span
            key={index}
            className="flex items-center gap-2 border border-gray-300 bg-orange-50 text-orange-700 px-3 py-1 rounded-lg text-sm font-medium"
          >
            {email}
            <button type="button" onClick={() => removeEmail(email)}>
              <X size={14} className="hover:text-red-500" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
