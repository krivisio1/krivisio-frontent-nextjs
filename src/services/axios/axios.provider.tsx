"use client";
import React, { useEffect, useMemo } from "react";
import { AxiosContext } from "./axios.context";
import axios, { type AxiosInstance, type AxiosError } from "axios";
import {
  DEFAULT_SERVICES,
  DEFAULT_HEADERS,
  DEFAULT_TIMEOUT,
} from "./axiox.constant";
import type { ServiceConfig } from "./axios.type";

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
    <AxiosContext.Provider value={{ axiosInstance: axios }}>
      {children}
    </AxiosContext.Provider>
  );
};
