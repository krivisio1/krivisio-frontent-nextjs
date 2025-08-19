"use client";
import { ReactNode } from "react";
import { UserContext } from "./user.context";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "@/services/axios/axios.hook";
import { isAxiosError } from "axios";

export function UserProvider({ children }: { children: ReactNode }) {
  const { axios } = useAxios();

  async function saveUser(supabase_id: string, email: string) {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_SERVICE_API_URL}/api/v1/users`,
      { email, supabase_id },
    );

    console.log(res.data);
  }

  async function getUserByEmail(email: string) {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_SERVICE_API_URL}/api/v1/users/get-user`,
        { email },
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        throw new Error(
          err.response.data?.failures?.message || "Unknown error",
        );
      }
      throw new Error("Something went wrong while fetching user");
    }
  }

  async function getUserBySupabaseId(supabase_id: string) {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_USER_SERVICE_API_URL}/api/v1/users/get-user?supabase_id=` +
          supabase_id,
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        throw new Error(
          err.response.data?.failures?.message || "Unknown error",
        );
      }
      throw new Error("Something went wrong while fetching user");
    }
  }

  async function createIfNotExist(supabase_id: string) {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_SERVICE_API_URL}/api/v1/users/create-by-supabase_id`,
      { supabase_id },
    );

    console.log(res.data);
    return res.data;
  }
  async function updateUserRole(
    supabase_id: string,
    role: "PROJECT_MANAGER" | "DEVELOPER",
  ) {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_USER_SERVICE_API_URL}/api/v1/users?supabase_id=` +
          supabase_id,
        {
          role,
        },
      );

      return res.data;
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
        createIfNotExist,
        saveUser,
        getUserByEmail,
        getUserBySupabaseId,
        updateUserRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
