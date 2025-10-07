"use client";
import { ReactNode } from "react";
import { UserContext } from "./user.context";
import { useAxios } from "@/services/axios/axios.hook";

import { toast } from "react-toastify";
import { getUser } from "./user.api";

export function UserProvider({ children }: { children: ReactNode }) {
  const { axios } = useAxios();

  async function getUserDetails() {
    const res = await getUser(axios);

    return res;
  }

  return (
    <UserContext.Provider value={{ getUserDetails }}>
      {children}
    </UserContext.Provider>
  );
}
