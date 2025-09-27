"use client";
import { ReactNode } from "react";
import { UserContext } from "./user.context";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "@/services/axios/axios.hook";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export function UserProvider({ children }: { children: ReactNode }) {
  const { axios } = useAxios();

  async function updateUserRole(role: "PROJECT_MANAGER" | "DEVELOPER") {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API_URL}/api/v1/auth/change-role`,
        {
          role,
        },
      );
      if (res) toast.success("Role updated successfully");
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        throw new Error(
          err.response.data?.failures?.message || "Unknown error",
        );
      }
      throw new Error("Something went wrong while fetching user");
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
