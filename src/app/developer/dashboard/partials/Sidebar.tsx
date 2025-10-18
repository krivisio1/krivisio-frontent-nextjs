"use client";

import { useSupabase } from "@/services/supabase/supabase.hook";
import { Home, BarChart3, Calendar, User, LogOut, Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const sidebarIcons = [
  { icon: Home, url: "/developer/dashboard" },
  {icon: Bell, url: "/developer/dashboard/notification"},
  { icon: BarChart3, url: "/developer/dashboard/board" },
  { icon: Calendar, url: "/developer/dashboard/calendar" },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { logout } = useSupabase();
  const router = useRouter();
  function handleLogout() {
    logout();
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-[#161C28] flex flex-col justify-between items-center py-4">
      <div className="mb-6">
        <div className="bg-[#FB5711] rounded-full w-9 h-9 flex items-center justify-center shadow">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </div>
      </div>
      <nav className="flex flex-col gap-8 flex-1">
        {sidebarIcons.map(({ icon: Icon, url }, i) => {
          const isActive = pathname === url;

          return (
            <Link
              key={i}
              className={`${
                isActive
                  ? "text-[#FB5711] bg-[#fb57110d] rounded-lg"
                  : "text-[#FBFBFB]"
              } flex items-center justify-center p-2 text-2xl hover:text-[#FB5711] transition`}
              href={url}
            >
              <Icon size={20} />
            </Link>
          );
        })}
      </nav>
      <div className="flex flex-col gap-4">
        <button className="text-[#FBFBFB] text-2xl hover:text-[#FB5711] p-2">
          <User size={20} />
        </button>
        <button className="text-[#FBFBFB] text-2xl hover:text-[#FB5711] p-2">
          <LogOut size={20} onClick={handleLogout} />
        </button>
      </div>
    </aside>
  );
};
