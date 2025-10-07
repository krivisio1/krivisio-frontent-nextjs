"use client";
import React, { useEffect, useState, useTransition } from "react";
import { SupabaseContext } from "./supabase.context";
import { useQuery } from "@tanstack/react-query";
import { AuthApiError, Session } from "@supabase/supabase-js";
import { useAxios } from "../axios/axios.hook";
import { AxiosError } from "axios";
import { supabaseClient } from "./supabaseClient";
import { toast } from "react-toastify";
import { UseUserContext } from "@/app/providers/userProvider/user.context";
import { useRouter } from "next/navigation";
import { signUpUser } from "./supabase.api";

export function SupabaseNewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [retryAttempts, setRetryAttempts] = useState(0);
  const { axios } = useAxios();
  const [userData, setUserData] = useState<null | any>(null);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const router = useRouter();

  const {
    data: { supabase, session } = {},
    isFetching: isloading,
    refetch: refetchClient,
  } = useQuery({
    queryKey: ["supabase", "session"],
    queryFn: async () => {
      const client = supabaseClient;
      const supabase = client;
      const { data } = await supabase.auth.getSession();
      return { session: data.session as Session, supabase };
    },
  });

  if (session?.access_token) {
    axios.interceptors.request.use(async (config) => {
      const client = supabaseClient;
      const { data } = await client.auth.getSession();
      const token = data?.session?.access_token;
      if (token) {
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
    axios.interceptors.response.use(
      async (response) => {
        return response;
      },
      async (error: AxiosError) => {
        if (error.response) {
          const statusCode = error.response.status;
          if (statusCode === 401 && retryAttempts < 4) {
            const newToken = await refetch();

            if (newToken) {
              axios.defaults.headers["Authorization"] = `Bearer ${newToken}`;

              setRetryAttempts((prev) => prev + 1);
              if (error.config) {
                return axios(error.config);
              }
            }
          }

          const customErrorMessage =
            (error.response?.data as { meta?: { message?: string } })?.meta
              ?.message ?? error.message;
          throw new AxiosError(customErrorMessage);
        }

        throw error;
      },
    );
  }

  const refetch = async () => {
    if (supabase) {
      await refetchClient();
      const { data } = await supabase.auth.refreshSession();
      return data?.session?.access_token;
    }
  };
  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut({
        scope: "global",
      });
      await refetch();
    }
  };

  async function signUpWithEmail(email: string, password: string) {
    if (!email.trim() || !password.trim()) {
      toast.warn("Credentials are missing");
      return;
    }

    try {
      const res = await signUpUser(email, password, axios);
      if (res.data) toast.success(res.data);
      else toast.info(res.data.message);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err.message);
    }
  }

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

  async function signInWithPassword(email: string, password: string) {
    if (!email.trim() || !password.trim()) {
      toast.warn("Credentials are missing");
      return;
    }
    if (!supabase) {
      toast.info("Try again later");
      return;
    }

    try {
      await getUserByEmail(email);
    } catch (error: any) {
      toast.error(error.message);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error instanceof AuthApiError) {
        toast.error(error.message); // Supabase-specific auth error
      } else {
        toast.error("Something went wrong"); // Generic error
      }
      return;
    }

    toast.success("Signed in successfully!");
    refetch();
  }

  async function signInWithGoogle() {
    const redirectTo = `${window.location.origin}/auth/callback`;
    if (!supabase) {
      toast.info("try again later");
      return;
    }
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });
  }
  async function signInWithGithub() {
    const redirectTo = `${window.location.origin}/auth/callback`;
    if (!supabase) {
      toast.info("try again later");
      return;
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo,
      },
    });
  }

  console.log({ session });

  useEffect(() => {
    async function getUser() {
      setIsLoadingUserData(true);
      try {
        const userId = session?.user?.id;
        if (!userId) return;

        console.log("userid", userId);
        try {
          const res = await getUserBySupabaseId(userId);
          setUserData(res);
        } catch (error: any) {
          await createIfNotExist(userId);
        }
      } catch (error) {}
      setIsLoadingUserData(false);
    }
    getUser();
  }, [session]);

  console.log({ userData });
  return (
    <SupabaseContext.Provider
      value={{
        session: session,
        supabase: supabase!,
        isLoading: isloading,
        logout,
        refreshSession: refetch,
        signInWithPassword,
        signInWithGoogle,
        signInWithGithub,
        signUpWithEmail,
        userData,
        isLoadingUserData,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
}
