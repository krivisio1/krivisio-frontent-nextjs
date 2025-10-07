import type { ServiceConfig } from "./axios.type";

export const DEFAULT_SERVICES: ServiceConfig[] = [
  {
    name: "auth",
    baseURL:
      process.env.NEXT_PUBLIC_AUTH_SERVICE_API_URL || "https://auth.api.com",
    timeout: 10000,
  },
  {
    name: "user",
    baseURL:
      process.env.NEXT_PUBLIC_USER_SERVICE_API_URL || "https://user.api.com",
    timeout: 10000,
  },
  {
    name: "api",
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.com",
    timeout: 15000,
  },
];

// Default headers
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const DEFAULT_TIMEOUT = 10000;

// Retry configuration
export const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000,
  retryOn401: true,
};
