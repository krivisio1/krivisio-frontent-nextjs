"use client";
import type React from "react";
import { useEffect, useState, useCallback, useRef } from "react";
import { SupabaseContext } from "./supabase.context";
import { useQuery } from "@tanstack/react-query";
import { AuthApiError, type Session } from "@supabase/supabase-js";
import { supabaseClient } from "./supabaseClient";
import { toast } from "react-toastify";
import { UseUserContext } from "@/app/providers/userProvider/user.context";
import { useRouter } from "next/navigation";
import { changeRole, signUpUser } from "./supabase.api";
import { useAxios } from "../axios/axios.hook";
import { AxiosError } from "axios";

export function SupabaseNewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [retryAttempts, setRetryAttempts] = useState(0);
  const { axios } = useAxios();
  const { userData, isUserDataloading, fetchUserData } = UseUserContext();
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

  const refetch = async () => {
    if (supabase) {
      await refetchClient();
      const { data } = await supabase.auth.refreshSession();
      return data?.session?.access_token;
    }
  };

  const logout = useCallback(async () => {
    try {
      const client = supabaseClient; // use a fresh instance directly
      const { error } = await client.auth.signOut({ scope: "global" });

      if (error) {
        toast.error(error.message);
        return;
      }

      // Clear react-query session data
      await refetchClient();
      await fetchUserData();

      // Optional: clear any axios tokens
      delete axios.defaults.headers["Authorization"];

      toast.success("Logged out successfully!");
      router.replace("/auth/login"); // redirect user to login
    } catch (err: any) {
      console.error("Logout failed:", err);
      toast.error("Logout failed. Please try again.");
    }
  }, [router, axios, refetchClient, fetchUserData]);

  async function signUpWithEmail(
    name: string,
    email: string,
    password: string,
  ) {
    if (!email.trim() || !password.trim() || !name.trim()) {
      toast.warn("Credentials are missing");
      return;
    }

    try {
      const res = await signUpUser(name, email, password, axios);
      fetchUserData();
      if (res.data) {
        toast.success(res.data);
        router.replace("/auth/login");
      } else toast.info(res.meta.message);
    } catch (err: any) {
      toast.error(err?.response?.data?.meta?.message || err.message);
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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (
        error instanceof AuthApiError &&
        error.message ===
          "A user with this email address has already been registered"
      ) {
        toast.error("You already have an account. Please sign in instead.");
      } else if (error instanceof AuthApiError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
      return;
    } else {
      toast.success("Signed in successfully!");
      refetch();
    }
    fetchUserData();
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

  useEffect(() => {
    if (!session?.access_token) return;

    const requestInterceptor = axios.interceptors.request.use(
      async (config) => {
        const client = supabaseClient;
        const { data } = await client.auth.getSession();
        const token = data?.session?.access_token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const statusCode = error.response?.status;

        if (statusCode === 401 && retryAttempts < 2) {
          const newToken = await refetch();
          if (newToken) {
            axios.defaults.headers["Authorization"] = `Bearer ${newToken}`;
            setRetryAttempts((prev) => prev + 1);
            if (error.config) {
              error.config.headers.Authorization = `Bearer ${newToken}`;
              return axios(error.config);
            }
          }
        }

        const customErrorMessage =
          (error.response?.data as { meta?: { message?: string } })?.meta
            ?.message ?? error.message;
        throw new AxiosError(customErrorMessage);
      },
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [session?.access_token]);

  useEffect(() => {
    if (!session) null;
    fetchUserData();
  }, [session]);

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
        isUserDataloading,
        updateUserRole,
        accessToken: session?.access_token || undefined,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
}
