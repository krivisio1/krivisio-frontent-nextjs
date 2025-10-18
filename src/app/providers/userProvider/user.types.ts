import { ProfileForm } from "@/app/onboarding/setup-profile/profile.schema";

export type userData = {};
export type UserContextType = {
  userData: any;
  isUserDataloading: boolean;
  // refetchUserData: () => void;
  saveUserDevProfile: (data: ProfileForm) => void;
  fetchUserData: () => void;
};

export type Propshook = {
  role?: string;
  redirect?: string;
  required?: boolean;
};
