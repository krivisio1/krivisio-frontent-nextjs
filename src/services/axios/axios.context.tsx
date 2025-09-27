"use client";
import React from "react";
import type { Axiostype } from "./axios.type";
import type { AxiosInstance } from "axios";

export const AxiosContext = React.createContext<Axiostype>({
  axiosInstance: {} as AxiosInstance,
  userAxios: {} as AxiosInstance,
  authAxios: {} as AxiosInstance,
  apiAxios: {} as AxiosInstance,
  createAxiosInstance: () => ({}) as AxiosInstance,
  getAxiosInstance: () => undefined,
  instances: new Map(),
  updateAllInstancesWithToken: () => {},
  setTokenRefreshCallback: () => {},
});
