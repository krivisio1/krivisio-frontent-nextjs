"use client";
import { ReactNode, useState, useTransition } from "react";
import { UserContext } from "./user.context";
import { useAxios } from "@/services/axios/axios.hook";

import { toast } from "react-toastify";
import { getUser } from "./user.api";
import { useQuery } from "@tanstack/react-query";

export function UserProvider({ children }: { children: ReactNode }) {
  const { axios } = useAxios();
  const [userData, setUserData] = useState(null);
  const [isUserDataloading, startTransition] = useTransition();

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

  console.log({ isUserDataloading });
  return (
    <UserContext.Provider
      value={{ userData, isUserDataloading, fetchUserData }}
    >
      {children}
    </UserContext.Provider>
  );
}
