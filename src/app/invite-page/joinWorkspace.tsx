"use client";

import DecorativeHeading from "@/components/common/DecorativeHeading";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Zod schema
const joinSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

// ✅ Type inference
type JoinForm = z.infer<typeof joinSchema>;

export default function JoinWorkspace() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<JoinForm>({
        resolver: zodResolver(joinSchema),
    });

    const onSubmit = (data: JoinForm) => {
        console.log("Accepted:", data);
        setTimeout(() => {
            alert(`You joined with email: ${data.email}`);
            reset();
        }, 800);
    };

    const handleDecline = () => {
        console.log("Declined");
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
                    <DecorativeHeading text="Join The" highlightText="Workspace" />
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Logo */}
                    <div className="flex items-center justify-center mb-8">
                        <img src="/logo2.svg" alt="logo" className="h-8" />
                    </div>

                    {/* Organization Info */}
                    <div className="mb-6 text-center">
                        <div className="text-2xl font-semibold">Organization Name</div>
                        <div className="text-sm text-gray-600">sent you an invitation</div>
                    </div>

                    {/* ✅ Form */}
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        {/* Email Input */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm your email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
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

                        {/* Accept Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#FB5711] hover:bg-orange-600 disabled:opacity-70 text-white font-medium py-3 px-4 rounded-lg text-center flex justify-center transition-colors mb-4"
                        >
                            {isSubmitting ? "Joining..." : "Accept"}
                        </button>
                    </form>

                    {/* Decline Button */}
                    <button
                        type="button"
                        onClick={handleDecline}
                        className="w-full text-[#FB5711] font-medium py-3 px-4 rounded-lg text-center flex justify-center transition-colors"
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
}
