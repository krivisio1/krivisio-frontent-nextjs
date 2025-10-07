"use client";

import React, { useContext } from "react";
import type { Axiostype } from "./axios.type";
import type { AxiosInstance } from "axios";

// Provide default value with a dummy instance to satisfy TypeScript
export const AxiosContext = React.createContext<Axiostype>({
  axios: {} as AxiosInstance,
});

// Custom hook for easier access
export const useAxios = () => {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error("useAxios must be used within an AxiosProvider");
  }
  return context;
};
