"use client";
import { ReactNode } from "react";
import { UserContext } from "./user.context";
import { useAxios } from "@/services/axios/axios.hook";

import { toast } from "react-toastify";

export function UserProvider({ children }: { children: ReactNode }) {
  const { axios } = useAxios();

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
}
