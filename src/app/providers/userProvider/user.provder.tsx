"use client";
import { ReactNode, useState, useTransition } from "react";
import { UserContext } from "./user.context";
import { useAxios } from "@/services/axios/axios.hook";

import { toast } from "react-toastify";
import { getUser, saveDevProfile } from "./user.api";
import { useQuery } from "@tanstack/react-query";
import { ProfileForm } from "@/app/onboarding/setup-profile/profile.schema";
import { useRouter } from "next/navigation";

export function UserProvider({ children }: { children: ReactNode }) {
  const { axios } = useAxios();
  const [userData, setUserData] = useState(null);
  const [isUserDataloading, startTransition] = useTransition();
  const router = useRouter();
  async function fetchUserData() {
    startTransition(async () => {
      try {
        const res = await getUser(axios);
        setUserData(res);
      } catch (error) {
        // toast.error();
        setUserData(null);
        return;
      }
    });
  }

  async function saveUserDevProfile(data: ProfileForm) {
    try {
      const res = await saveDevProfile(axios, data);
      if (!res) toast.error(res?.meta?.message);
      else {
        toast.success(res);
        router.replace("/developer/dashboard");
      }
    } catch (error: any) {
      toast.error("Something went wrong, try again later");
    } finally {
      fetchUserData();
    }
  }

  return (
    <UserContext.Provider
      value={{ userData, isUserDataloading, fetchUserData, saveUserDevProfile }}
    >
      {children}
    </UserContext.Provider>
  );
}
