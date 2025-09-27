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
import { useAxios } from "../axios/axios.hook";

export function SupabaseNewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { saveUser, getUserByEmail, createIfNotExist, getUserBySupabaseId } =
    UseUserContext();
  const [userData, setUserData] = useState<null | any>(null);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const router = useRouter();

  const { updateAllInstancesWithToken, setTokenRefreshCallback, userAxios } =
    useAxios();

  const updateTokenRef = useRef(updateAllInstancesWithToken);
  const refetchClientRef = useRef<(() => Promise<any>) | null>(null);

  useEffect(() => {
    updateTokenRef.current = updateAllInstancesWithToken;
  }, [updateAllInstancesWithToken]);

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

  useEffect(() => {
    refetchClientRef.current = refetchClient;
  }, [refetchClient]);

  const refreshTokenCallback = useCallback(async (): Promise<string | null> => {
    if (!supabase) return null;

    try {
      console.log("[v0] Refreshing Supabase session...");
      const { data, error } = await supabase.auth.refreshSession();

      if (error) {
        console.error("[v0] Token refresh failed:", error.message);
        return null;
      }

      const newToken = data?.session?.access_token;
      if (newToken) {
        console.log("[v0] Token refreshed successfully");
        updateTokenRef.current(newToken);
        if (refetchClientRef.current) {
          await refetchClientRef.current();
        }
      }

      return newToken || null;
    } catch (error) {
      console.error("[v0] Token refresh error:", error);
      return null;
    }
  }, [supabase]);

  useEffect(() => {
    if (supabase) {
      setTokenRefreshCallback(refreshTokenCallback);
    }
  }, [supabase, setTokenRefreshCallback, refreshTokenCallback]);

  useEffect(() => {
    const token = session?.access_token || null;
    updateAllInstancesWithToken(token);
  }, [session?.access_token, updateAllInstancesWithToken]);

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
      updateAllInstancesWithToken(null);
      await refetch();
    }
  };

  async function signUpWithEmail(email: string, password: string) {
    if (!email.trim() || !password.trim()) {
      toast.warn("Credentials are missing");
      return;
    }
    if (!supabase) {
      toast.info("Try again later");
      return;
    }

    try {
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        toast.error("User already exists. Please log in.");
        return;
      }
    } catch (error: any) {}

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast.error(error.message);
      return;
    }

    try {
      await saveUser(data.user?.id, data?.user?.email);
      toast.success("User created! Proceed to login.");
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
      toast.error("Error creating user. Try again later.");
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
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
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

  useEffect(() => {
    async function getUser() {
      setIsLoadingUserData(true);
      try {
        const userId = session?.user?.id;
        if (!userId) return;

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
  }, [session, getUserBySupabaseId, createIfNotExist]);

  console.log({ session });
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
        accessToken: session?.access_token || undefined,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
}
