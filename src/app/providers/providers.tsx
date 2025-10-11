"use client";

import { AxiosProvider } from "@/services/axios/axios.provider";
import { SupabaseNewProvider } from "@/services/supabase/supabase.provider";
import { QueryProvider } from "./query-provider";
import { UserProvider } from "./userProvider/user.provder";
import { OrganizationProvider } from "./orgProvider/org.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AxiosProvider>
        <UserProvider>
          <SupabaseNewProvider>
            <OrganizationProvider>{children}</OrganizationProvider>
          </SupabaseNewProvider>
        </UserProvider>
      </AxiosProvider>
    </QueryProvider>
  );
}
