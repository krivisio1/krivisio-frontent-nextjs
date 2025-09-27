import type React from "react";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

export interface ServiceConfig {
  name: string;
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface Axiostype {
  // Base axios instance with auth token
  axiosInstance: AxiosInstance;
  // Named axios instances
  userAxios: AxiosInstance;
  authAxios: AxiosInstance;
  apiAxios: AxiosInstance;
  // Method to create new axios instances
  createAxiosInstance: (
    name: string,
    config?: Partial<ServiceConfig>,
  ) => AxiosInstance;
  // Method to get existing instance by name
  getAxiosInstance: (name: string) => AxiosInstance | undefined;
  // Available instances
  instances: Map<string, AxiosInstance>;
  updateAllInstancesWithToken: (token: string | null) => void;
  setTokenRefreshCallback: (callback: () => Promise<string | null>) => void;
}

export interface AxiosProviderProps {
  children: React.ReactNode;
  services?: ServiceConfig[];
  defaultTimeout?: number;
  onUnauthorized?: () => void;
  onTokenRefresh?: () => Promise<string | null>;
}

export interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
  retryOnUnauthorized?: boolean;
}
