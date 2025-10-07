"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/services/supabase/supabase.hook";
import { UseUserContext } from "@/app/providers/userProvider/user.context";

export default function CallbackPage() {
  const router = useRouter();
  const { session, supabase } = useSupabase();

  useEffect(() => {
    const postAuthOperation = async () => {
      if (!session) {
        router.replace("/auth/login");
        return;
      }

      // router.replace("/auth/choose-role");
    };

    postAuthOperation();
  }, [router, session, supabase]);

  return <p>Loading...</p>;
}
