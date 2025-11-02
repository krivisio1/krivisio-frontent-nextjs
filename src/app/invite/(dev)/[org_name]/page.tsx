"use client";

import DecorativeHeading from "@/components/common/DecorativeHeading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useOrgHook } from "@/app/providers/orgProvider/org.hook";
import { ScreenLoader } from "@/components/loader";
import { useRouter } from "next/navigation";
import { JoinForm, joinSchema, JoinStatus } from "../../invite.schema";

export default function JoinWorkspace() {
  const [showDeclineConfirm, setShowDeclineConfirm] = useState(false);
  const router = useRouter();

  const { devInvitation, respondToInvitation } = useOrgHook();

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<JoinForm>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      status: JoinStatus.ACCEPTED,
    },
  });

  const onSubmit = (data: JoinForm) => {
    if (!devInvitation) return;
    respondToInvitation(data);
    reset();
  };

  const confirmDecline = () => {
    handleSubmit(() => onSubmit({ status: JoinStatus.DECLINED }))();
    setShowDeclineConfirm(false);
  };
  const status = devInvitation?.status;

  const alreadyResponded = status && status !== JoinStatus.PENDING;

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
            <div className="text-2xl font-semibold">
              {devInvitation?.organization?.name ?? ""}
            </div>
            <div className="text-sm text-gray-600">
              Owned by{" "}
              <strong>{devInvitation?.organization?.manager?.name}</strong>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              You have been invited to join.
            </div>
          </div>

          {/* ✅ Conditional Rendering Based on Invitation Status */}
          {!alreadyResponded ? (
            <div className="flex gap-4">
              <button
                onClick={() => onSubmit({ status: JoinStatus.ACCEPTED })}
                disabled={isSubmitting}
                className="w-1/2 bg-[#FB5711] hover:bg-orange-600 disabled:opacity-70 text-white font-medium py-3 px-4 rounded-lg text-center flex justify-center transition-colors"
              >
                {isSubmitting ? "Joining..." : "Accept"}
              </button>

              <button
                onClick={() => setShowDeclineConfirm(true)}
                type="button"
                className="w-1/2 text-[#FB5711] font-medium py-3 px-4 rounded-lg border border-[#FB5711] text-center flex justify-center transition-colors"
              >
                Decline
              </button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-gray-700 font-medium">
                You have already responded to this invitation.
              </p>
              <button
                onClick={() => router.push("/developer/dashboard")}
                className="bg-[#FB5711] hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>

        {/* 🔻 Decline Confirmation Modal */}
        {showDeclineConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-20">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
              <h3 className="text-lg font-semibold mb-4">
                Are you sure you want to decline?
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Declining this invite will remove your access to the workspace.
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setShowDeclineConfirm(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDecline}
                  className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                  Yes, Decline
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
