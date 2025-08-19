"use client";
import React, { useEffect } from "react";
import { SupabaseContext } from "./supabase.context";
import { PropsHook } from "./supabase.types";
import { usePathname, useRouter } from "next/navigation";

export function useSupabase(props?: PropsHook) {
  const context = React.useContext(SupabaseContext);
  const pathname = usePathname();
  const router = useRouter();

  if (!context) {
    throw new Error("no context find");
  }

  console.log(props?.role);

  const authorised = !!(
    props?.role && props.role.includes(context?.userData?.role)
  );
  useEffect(() => {
    console.log("anisole", context?.userData?.role, context.isLoadingUserData);
    if (!props?.required || context.isLoading) return;
    if (context.isLoadingUserData) return;
    if (!context.session || !authorised) {
      router.replace(props?.redirect ?? "/");
    }
  }, [context.session, pathname, authorised, context.userData]);

  return { ...context, authorised };
}
