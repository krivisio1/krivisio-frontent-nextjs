export type userData = {};
export type UserContextType = {
  userData: any;
  isUserDataloading: boolean;
  // refetchUserData: () => void;
  fetchUserData: () => void;
};

export type Propshook = {
  role?: string;
  redirect?: string;
  required?: boolean;
};
