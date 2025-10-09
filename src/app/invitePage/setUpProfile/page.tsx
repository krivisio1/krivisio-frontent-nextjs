"use client";

import DecorativeHeading from "@/components/common/DecorativeHeading";
import SkillsInput from "./partials/skillsInput";

export default function ProfileSetup() {
    

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
                    <DecorativeHeading text="Set Up" highlightText="Profile" />
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Logo */}
                    <div className="flex items-center justify-center mb-8">
                        <img src="/logo2.svg" alt="logo" className="h-8" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Position
                        </label>
                        <input
                            type="text"
                            placeholder="Frontend,backend,DevOps,etc..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB5711] focus:border-[#FB5711] outline-none text-gray-900 placeholder-gray-400"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bio
                        </label>
                        <textarea
                            rows={2}
                            placeholder="A short bio about yourself"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB5711] focus:border-[#FB5711] outline-none text-gray-900 placeholder-gray-400"
                        />
                    </div>

                    <div className="mb-4">
                        <SkillsInput/>
                    </div>

                    <button
                        className="w-full bg-[#FB5711] hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg text-center flex justify-center transition-colors mb-6"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
