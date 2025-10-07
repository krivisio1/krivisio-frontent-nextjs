import type React from "react";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

export interface ServiceConfig {
  name: string;
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface Axiostype {
  axiosInstance: AxiosInstance;
}
