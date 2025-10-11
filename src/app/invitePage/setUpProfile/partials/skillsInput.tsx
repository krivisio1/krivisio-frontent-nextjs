"use client";

import { useState, ChangeEvent, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function SkillsInput() {
    const { setValue, watch } = useFormContext();
    const skills: string[] = watch("skills") || [];
    const [input, setInput] = useState("");

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && input.trim() !== "") {
            e.preventDefault();
            const newSkill = input.trim();
            if (!skills.includes(newSkill)) {
                const updatedSkills = [...skills, newSkill];
                setValue("skills", updatedSkills, { shouldValidate: true });
            }
            setInput("");
        }
    };

    const removeSkill = (skillToRemove: string) => {
        const updated = skills.filter((s) => s !== skillToRemove);
        setValue("skills", updated, { shouldValidate: true });
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills
            </label>

            <input
                type="text"
                placeholder="Enter the skills and press Enter"
                value={input}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB5711] focus:border-[#FB5711] outline-none text-gray-900 placeholder-gray-400"
            />

            <div className="flex flex-wrap gap-2 mt-3">
                {skills.map((skill, index) => (
                    <span
                        key={index}
                        className="flex items-center gap-2 border border-gray-300 bg-orange-50 text-orange-700 px-3 py-1 rounded-lg text-sm font-medium"
                    >
                        {skill}
                        <button type="button" onClick={() => removeSkill(skill)}>
                            <X size={14} className="hover:text-red-500" />
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
}
