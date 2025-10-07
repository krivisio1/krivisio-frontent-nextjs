import { Session, SupabaseClient } from "@supabase/supabase-js";

export type SupabaseContextType = {
  session?: Session;
  supabase: SupabaseClient;
  isLoading: boolean;
  logout: () => void;
  refreshSession: () => void;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  userData: any;
  isLoadingUserData: boolean;
  accessToken?: string;
  updateUserRole: (role: "PROJECT_MANAGER" | "DEVELOPER") => Promise<void>;
  // isAuthorized: (requiredRoles?: string | string[]) => boolean;
};

export type PropsHook = {
  required: boolean;
  redirect?: string;
  role?: string | string[];
};
