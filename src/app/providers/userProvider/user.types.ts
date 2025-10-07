export type UserContextType = {
  updateUserRole: (
    role: "PROJECT_MANAGER" | "DEVELOPER",
  ) => Promise<string | undefined>;
};
