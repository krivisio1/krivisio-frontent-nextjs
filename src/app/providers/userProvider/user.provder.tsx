"use client";
import { ReactNode } from "react";
import { UserContext } from "./user.context";
import { useAxios } from "@/services/axios/axios.hook";

import { toast } from "react-toastify";
import { getUser } from "./user.api";
import { useQuery } from "@tanstack/react-query";

export function UserProvider({ children }: { children: ReactNode }) {
  const { axios } = useAxios();

  const {
    data: userData = null,
    isFetching: isUserDataloading,
    refetch: refetchUserData,
  } = useQuery({
    queryKey: ["userdata-fetch"],
    queryFn: async () => {
      const res = await getUser(axios);
      return res;
    },
  });

  return (
    <UserContext.Provider
      value={{ userData, isUserDataloading, refetchUserData }}
    >
      {children}
    </UserContext.Provider>
  );
}
