"use client";

import DecorativeHeading from "@/components/common/DecorativeHeading";


export default function JoinWorkspace() {
    const handleAccept = () => {
        console.log("Accepted");
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

                    {/* Organization Invitation */}
                    <div className="mb-6">
                        <div className="text-center text-2xl font-semibold ">
                            Organization Name
                        </div>
                        <div className="text-center text-sm">
                            Send you invitation
                        </div>
                    </div>

                    <button
                        onClick={handleAccept}
                        className="w-full bg-[#FB5711] hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg text-center flex justify-center transition-colors mb-6"
                    >
                        Accept
                    </button>
                    <button
                        onClick={handleDecline}
                        className="w-full  text-[#FB5711] font-medium py-3 px-4 rounded-lg text-center flex justify-center transition-colors mb-6"
                    >
                        Decline
                    </button>

                </div>
            </div>
        </div>
    );
}
