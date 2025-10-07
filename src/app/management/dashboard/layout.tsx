// app/(dashboard)/layout.tsx
"use client";
import { ChatBotProvider } from "@/app/providers/chatBotProvider/chatbot.provider";
import { ExactSidebar } from "@/app/management/dashboard/partials/ExactSidebar";
import { useSupabase } from "@/services/supabase/supabase.hook";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authorised, isLoading } = useSupabase({
    required: true,
    redirect: "/auth/choose-role",
    role: ["PROJECT_MANAGER"],
  });

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
