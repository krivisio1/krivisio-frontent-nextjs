"use client";
import { ScreenLoader } from "@/components/loader";
import { Sidebar } from "./partials/Sidebar";
import { useSupabase } from "@/services/supabase/supabase.hook";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authorised, isLoading } = useSupabase({
    required: true,
    redirect: "/auth/login",
    role: ["DEVELOPER"],
  });

  if (isLoading || !authorised) return <ScreenLoader />;

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-16">
        <main>{children}</main>
      </div>
    </div>
  );
}
