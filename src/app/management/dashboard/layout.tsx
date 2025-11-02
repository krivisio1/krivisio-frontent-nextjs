// app/(dashboard)/layout.tsx
"use client";
import { ChatBotProvider } from "@/app/providers/chatBotProvider/chatbot.provider";
import { ExactSidebar } from "@/app/management/dashboard/partials/ExactSidebar";
import { useSupabase } from "@/services/supabase/supabase.hook";
import { ScreenLoader } from "@/components/loader";
import { UseUserContext } from "@/app/providers/userProvider/user.context";
import { useOrgHook } from "@/app/providers/orgProvider/org.hook";
import { useRedirect } from "@/app/providers/redirectProvider/redirect.provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, authorised } = useRedirect({
    role: ["PROJECT_MANAGER"],
    redirectTo: "/unauthorized",
  });
  if (isLoading || !authorised) return <ScreenLoader />;

  return (
    <div className="flex bg-gray-50">
      <ExactSidebar />
      <main className="ml-18 flex-1 min-h-screen">
        <div>
          <ChatBotProvider>{children}</ChatBotProvider>
        </div>
      </main>
    </div>
  );
}
