"use client";
import { useState, ChangeEvent } from "react";
import { X } from "lucide-react";

export default function SkillsInput() {

    const [skills, setSkills] = useState<string[]>([]);
    const [input, setInput] = useState<string>("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && input.trim() !== "") {
            e.preventDefault();
            const newSkill = input.trim();
            if (!skills.includes(newSkill)) {
                setSkills((prev) => [...prev, newSkill]);
            }
            setInput("");
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills
            </label>
            <input
                type="text"
                placeholder="Enter the skills"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB5711] focus:border-[#FB5711] outline-none text-gray-900 placeholder-gray-400"
            />

            {/* Skill tags */}
            <div className="flex flex-wrap gap-2 mt-3">
                {skills.map((skill, index) => (
                    <span
                        key={index}
                        className="flex items-center gap-2 border border-gray-300 text-gray-400 px-3 py-1 rounded-lg text-sm font-medium"
                    >
                        {skill}
                        <button onClick={() => removeSkill(skill)}>
                            <X size={14} />
                        </button>
                    </span>
                ))}
            </div>
        </div>
    )
}