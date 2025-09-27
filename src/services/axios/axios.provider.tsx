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

export const AxiosProvider = ({ children }: AxiosProviderProps) => {
  const [instances, setInstances] = React.useState<Map<string, AxiosInstance>>(
    new Map(),
  );
  const [retryAttempts, setRetryAttempts] = React.useState(0);
  const [refreshTokenCallback, setRefreshTokenCallback] = React.useState<
    (() => Promise<string | null>) | null
  >(null);

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      timeout: DEFAULT_TIMEOUT,
      headers: DEFAULT_HEADERS,
    });

    return instance;
  }, []);

  const setupInterceptors = React.useCallback(
    (instance: AxiosInstance, serviceName?: string) => {
      // Clear existing interceptors
      instance.interceptors.request.clear();
      instance.interceptors.response.clear();
      instance.interceptors.request.use(
        async (config) => {
          // Token will be set by updateAllInstancesWithToken method
          return config;
        },
        (error) => Promise.reject(error),
      );

      instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
          if (
            error.response?.status === 401 &&
            retryAttempts < 3 &&
            refreshTokenCallback
          ) {
            console.log(
              `[v0] Token expired, attempting refresh for ${serviceName || "base"} service`,
            );

            try {
              const newToken = await refreshTokenCallback();

              if (newToken && error.config) {
                // Update the failed request with new token
                error.config.headers.Authorization = `Bearer ${newToken}`;

                setRetryAttempts((prev) => prev + 1);

                // Retry the original request
                return instance(error.config);
              }
            } catch (refreshError) {
              console.error(
                `[v0] Token refresh failed for ${serviceName || "base"} service:`,
                refreshError,
              );
              setRetryAttempts(0);
              return Promise.reject(error);
            }
          }

          // Reset retry attempts on successful response or non-401 errors
          if (error.response?.status !== 401) {
            setRetryAttempts(0);
          }

          return Promise.reject(error);
        },
      );
    },
    [retryAttempts, refreshTokenCallback],
  );

  const createAxiosInstance = React.useCallback(
    (name: string, config?: Partial<ServiceConfig>) => {
      const serviceConfig =
        DEFAULT_SERVICES.find((s) => s.name === name) || config;

      if (!serviceConfig) {
        throw new Error(`Service configuration not found for: ${name}`);
      }

      const instance = axios.create({
        baseURL: serviceConfig.baseURL,
        timeout: serviceConfig.timeout || DEFAULT_TIMEOUT,
        headers: {
          ...DEFAULT_HEADERS,
          ...serviceConfig.headers,
        },
      });

      setupInterceptors(instance, name);
      return instance;
    },
    [setupInterceptors],
  );

  useEffect(() => {
    const newInstances = new Map<string, AxiosInstance>();

    DEFAULT_SERVICES.forEach((service) => {
      const instance = createAxiosInstance(service.name, service);
      newInstances.set(service.name, instance);
    });

    setInstances(newInstances);
  }, [createAxiosInstance]);

  useEffect(() => {
    setupInterceptors(axiosInstance);
  }, [axiosInstance, setupInterceptors]);

  const getAxiosInstance = React.useCallback(
    (name: string) => {
      return instances.get(name);
    },
    [instances],
  );

  const updateAllInstancesWithToken = React.useCallback(
    (token: string | null) => {
      if (token) {
        axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
      } else {
        delete axiosInstance.defaults.headers.Authorization;
      }

      instances.forEach((instance) => {
        if (token) {
          instance.defaults.headers.Authorization = `Bearer ${token}`;
        } else {
          delete instance.defaults.headers.Authorization;
        }
      });
    },
    [axiosInstance, instances],
  );

  const setTokenRefreshCallback = React.useCallback(
    (callback: () => Promise<string | null>) => {
      setRefreshTokenCallback(() => callback);
    },
    [],
  );

  const userAxios = instances.get("user") || axiosInstance;
  const authAxios = instances.get("auth") || axiosInstance;
  const apiAxios = instances.get("api") || axiosInstance;

  const contextValue = {
    axiosInstance,
    userAxios,
    authAxios,
    apiAxios,
    createAxiosInstance,
    getAxiosInstance,
    instances,
    updateAllInstancesWithToken,
    setTokenRefreshCallback, // Added method to set refresh callback
  };

  return (
    <AxiosContext.Provider value={contextValue}>
      {children}
    </AxiosContext.Provider>
  );
};
