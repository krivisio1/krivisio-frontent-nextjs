"use client";
import React from "react";
import { AxiosContext } from "./axios.context";
import axios from "axios";

interface AxiosProviderProps {
  children: React.ReactNode;
}

export const AxiosProvider: React.FC<AxiosProviderProps> = ({ children }) => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://krivisio-api.localhost",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return (
    <AxiosContext.Provider value={{ axios: axiosInstance }}>
      {children}
    </AxiosContext.Provider>
  );
};
