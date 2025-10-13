"use client";

import { Link2 } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form"; // ✅ import FormProvider
import { zodResolver } from "@hookform/resolvers/zod";
import DecorativeHeading from "@/components/common/DecorativeHeading";
import { useOrgHook } from "../providers/orgProvider/org.hook";
import { InviteForm, inviteSchema } from "./invite.schema";
import EmailsInput from "./partials/emailInput";

export default function Invitation() {
  const { skipInvitePage } = useOrgHook();

  const methods = useForm<InviteForm>({
    resolver: zodResolver(inviteSchema),
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = (data: InviteForm) => {
    // TODO: Handle API call to send invites
    console.log("Inviting team members:", data);
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

          {/* ✅ Wrap with FormProvider */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-4">
                <EmailsInput />
                {errors.emails && (
                  <p className="text-red-500 text-sm mt-1">
                    {(errors.emails as any).message}
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
                <span>{isSubmitting ? "Sending..." : "Send Invite Link"}</span>
              </button>
            </form>
          </FormProvider>

          {/* Skip Button */}
          <button
            type="button"
            className="w-full text-[#FB5711] font-medium py-3 px-4 text-center flex justify-center items-center gap-3 transition-colors"
            onClick={() => skipInvitePage()}
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
