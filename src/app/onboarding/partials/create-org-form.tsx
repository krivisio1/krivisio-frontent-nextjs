"use client";

import { useTransition } from "react";
import { Loader } from "lucide-react";
import DecorativeHeading from "@/components/common/DecorativeHeading";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrgSchema, CreateOrgSchemaType } from "../new-org/org.schema";

export default function CreateOrg() {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrgSchemaType>({
    resolver: zodResolver(createOrgSchema),
  });

  const onSubmit = (data: CreateOrgSchemaType) => {
    startTransition(async () => {
      console.log("Submitted data:", data);
    });
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
          <DecorativeHeading text="Create" highlightText="Organization" />
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <img src="/logo2.svg" alt="logo" className="h-8" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Org Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization Name
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Krivisio"
                className={`w-full px-4 py-3 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-[#FB5711] focus:border-[#FB5711] outline-none text-gray-900 placeholder-gray-400`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Industry Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry Type
              </label>
              <input
                type="text"
                {...register("industry_type")}
                placeholder="Freelancer"
                className={`w-full px-4 py-3 border ${
                  errors.industry_type ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-[#FB5711] focus:border-[#FB5711] outline-none text-gray-900 placeholder-gray-400`}
              />
              {errors.industry_type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.industry_type.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FB5711] hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg text-center flex justify-center transition-colors mb-6"
            >
              {isLoading ? (
                <Loader className="animate-spin text-center" size={20} />
              ) : (
                "Create"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
