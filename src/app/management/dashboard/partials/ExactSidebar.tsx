"use client";
import { useSupabase } from "@/services/supabase/supabase.hook";
import {
  Home,
  BarChart3,
  Calendar,
  User,
  Users,
  LogOut,
  UserSquareIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarIcons = [
  { icon: Home, route: "/management/dashboard" },
  { icon: BarChart3, route: "/management/dashboard/board" },
  { icon: Calendar, route: "/management/dashboard/calendar" },
  { icon: Users, route: "/management/dashboard/team" },
];

export const ExactSidebar = () => {
  const pathname = usePathname();
  const { logout } = useSupabase();

  return (
    <aside className="fixed left-0 top-0 h-screen w-18 bg-[#161C28] flex flex-col justify-between items-center py-6 px-4">
      <div className="mb-8">
        <Link href="/">
          <div className="bg-[#FB5711] rounded-full w-9 h-9 flex items-center justify-center shadow mb-8 cursor-pointer">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
        </Link>
      </div>

      <nav className="flex flex-col gap-8 flex-1">
        {sidebarIcons.map(({ icon: Icon, route }, i) => {
          const isActive = pathname === route;

          return (
            <Link key={i} href={route}>
              <button
                className={`${
                  isActive
                    ? "text-[#FB5711] bg-[#fb57110d] rounded-lg"
                    : "text-[#FBFBFB]"
                } flex items-center justify-center p-2 text-2xl hover:text-[#FB5711] transition`}
              >
                <Icon size={20} />
              </button>
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-8">
        <Link href="/profile">
          <button className="text-[#FBFBFB] text-2xl hover:text-[#FB5711] p-2">
            <User size={20} />
          </button>
        </Link>

        <button
          onClick={() => {
            logout();
          }}
          className="text-[#FBFBFB] text-2xl hover:text-[#FB5711] p-2"
        >
          <LogOut size={20} color="white" />
        </button>
      </div>
    </aside>
  );
};
