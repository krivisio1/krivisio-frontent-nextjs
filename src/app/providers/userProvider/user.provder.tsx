"use client";
import { ReactNode } from "react";
import { UserContext } from "./user.context";
import { useAxios } from "@/services/axios/axios.hook";
import { changeRole } from "./user.api";
import { toast } from "react-toastify";

export function UserProvider({ children }: { children: ReactNode }) {
  const { axios } = useAxios();

  async function updateUserRole(role: "PROJECT_MANAGER" | "DEVELOPER") {
    try {
      const res = await changeRole(axios, role);
      if (res.data) toast.success(res.data);
      else toast.info(res.meta.message);
      return res.data;
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err.message);
    }
  }

  return (
    <UserContext.Provider
      value={{
        updateUserRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
