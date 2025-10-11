"use client";

import DecorativeHeading from "@/components/common/DecorativeHeading";
import SkillsInput from "./partials/skillsInput";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileForm, profileSchema } from "./profile.schema";
import { UseUserContext } from "@/app/providers/userProvider/user.context";

export default function ProfileSetup() {
  const { saveUserDevProfile } = UseUserContext();

  const methods = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      position: "",
      bio: "",
      skills: [],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = (data: ProfileForm) => {
    saveUserDevProfile(data);
  };

  console.log({ errors });

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

          {/* ✅ Form Start */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Position */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position
                </label>
                <input
                  type="text"
                  placeholder="Frontend, Backend, DevOps, etc..."
                  {...register("position")}
                  className={`w-full px-4 py-3 border ${
                    errors.position ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-[#FB5711] focus:border-[#FB5711] outline-none text-gray-900 placeholder-gray-400`}
                />
                {errors.position && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.position.message}
                  </p>
                )}
              </div>

              {/* Bio */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  rows={2}
                  placeholder="A short bio about yourself"
                  {...register("bio")}
                  className={`w-full px-4 py-3 border ${
                    errors.bio ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-[#FB5711] focus:border-[#FB5711] outline-none text-gray-900 placeholder-gray-400`}
                />
                {errors.bio && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              {/* Skills Input */}
              <div className="mb-4">
                <SkillsInput />
                {errors.skills && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.skills.message as string}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FB5711] hover:bg-orange-600 disabled:opacity-70 text-white font-medium py-3 px-4 rounded-lg text-center flex justify-center transition-colors mb-6"
              >
                {isSubmitting ? "Saving..." : "Continue"}
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
