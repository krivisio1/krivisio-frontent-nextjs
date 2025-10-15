"use client";
import { ScreenLoader } from "@/components/loader";
import { Sidebar } from "./partials/Sidebar";
import { useSupabase } from "@/services/supabase/supabase.hook";
import { UseUserContext } from "@/app/providers/userProvider/user.context";
import { useEffect } from "react";
import { USER_ROLES } from "@/app/constant";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-16">
        <main>{children}</main>
      </div>
    </div>
  );
}
