"use client";

import { Link2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DecorativeHeading from "@/components/common/DecorativeHeading";

// ✅ Zod schema for form validation
const inviteSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

// ✅ Type inference from schema
type InviteForm = z.infer<typeof inviteSchema>;

export default function Invitation() {
    // Initialize react-hook-form with zod
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<InviteForm>({
        resolver: zodResolver(inviteSchema),
    });

    // Handle form submission
    const onSubmit = (data: InviteForm) => {
        console.log("✅ Form submitted:", data);
        // Simulate async operation
        setTimeout(() => {
            alert(`Invite sent to ${data.email}`);
            reset();
        }, 1000);
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
                    <DecorativeHeading text="Invite" highlightText="Team Members" />
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Logo */}
                    <div className="flex items-center justify-center mb-8">
                        <img src="/logo2.svg" alt="logo" className="h-8" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        {/* Email Input */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Invite People
                            </label>
                            <input
                                type="email"
                                placeholder="Enter the email"
                                {...register("email")}
                                className={`w-full px-4 py-3 border ${errors.email ? "border-red-500" : "border-gray-300"
                                    } rounded-lg focus:ring-2 focus:ring-[#FB5711] focus:border-[#FB5711] outline-none text-gray-900 placeholder-gray-400`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Send Invite Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#FB5711] hover:bg-orange-600 disabled:opacity-70 text-white font-medium py-3 px-4 rounded-lg text-center flex justify-center items-center gap-3 transition-colors mb-6"
                        >
                            <Link2 className="w-4 h-4" />
                            <span>
                                {isSubmitting ? "Sending..." : "Send Invite Link"}
                            </span>
                        </button>
                    </form>

                    {/* Skip Button */}
                    <button
                        type="button"
                        className="w-full text-[#FB5711] font-medium py-3 px-4 text-center flex justify-center items-center gap-3 transition-colors"
                        onClick={() => console.log("Skipped")}
                    >
                        Skip
                    </button>
                </div>
            </div>
        </div>
    );
}
