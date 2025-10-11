import React from "react";
import { OrgContext } from "./org.context";

export function useOrgHook() {
  const ctx = React.useContext(OrgContext);

  if (!ctx) if (!ctx) throw new Error("use the hook inside the provider");

  return ctx;
}
