import DecorativeHeading from "@/components/common/DecorativeHeading";

export default function CreateOrganization() {
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
                <div className="text-center mb-12">
                    <DecorativeHeading text="Create" highlightText="Organization" />
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Logo */}
                    <div className="flex items-center justify-center mb-8">
                        <img src="/logo2.svg" alt="logo" className="h-8" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Organization Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB5711] focus:border-[#FB5711] outline-none text-gray-900 placeholder-gray-400"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                        </label>
                        <input
                            type="number"
                            placeholder="Enter 10 digit number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB5711] focus:border-[#FB5711] outline-none text-gray-900 placeholder-gray-400"
                        />
                    </div>

                    <div className="mb-4 flex gap-6">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Team Size <span className="text-gray-400 text-[10px]">(optional)</span>
                            </label>
                            <input
                                type="number"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB5711] focus:border-[#FB5711] outline-none text-gray-900 placeholder-gray-400"
                            />
                        </div>
                        <div className="">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Industry Type <span className="text-gray-400 text-[10px]">(optional)</span>
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB5711] focus:border-[#FB5711] outline-none text-gray-900 placeholder-gray-400"
                            />
                        </div>
                    </div>

                    <button
                        className="w-full bg-[#FB5711] hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg text-center flex justify-center transition-colors mb-2 mt-8"
                    >
                        Submit
                    </button>

                </div>
            </div>
        </div>
    )
}