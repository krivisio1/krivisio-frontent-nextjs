"use client";

import React, { useEffect } from "react";
import { OrgContext } from "./org.context";
import { UseUserContext } from "../userProvider/user.context";
import { usePathname, useRouter } from "next/navigation";
import { USER_ROLES } from "@/app/constant";

export function useOrgHook() {
  const ctx = React.useContext(OrgContext);
  if (!ctx) throw new Error("OrgContext missing");
  return ctx;
}
