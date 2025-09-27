"use client";
import React, { useEffect, useMemo } from "react";
import { AxiosContext } from "./axios.context";
import axios, { type AxiosInstance } from "axios";
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

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      timeout: DEFAULT_TIMEOUT,
      headers: DEFAULT_HEADERS,
    });

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.warn("[v0] Unauthorized request detected");
        }
        return Promise.reject(error);
      },
    );

    return instance;
  }, []);

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

      instance.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response?.status === 401) {
            console.warn(
              `[v0] Unauthorized request detected in ${name} service`,
            );
          }
          return Promise.reject(error);
        },
      );

      return instance;
    },
    [],
  );

  useEffect(() => {
    const newInstances = new Map<string, AxiosInstance>();

    DEFAULT_SERVICES.forEach((service) => {
      const instance = createAxiosInstance(service.name, service);
      newInstances.set(service.name, instance);
    });

    setInstances(newInstances);
  }, [createAxiosInstance]);

  const getAxiosInstance = React.useCallback(
    (name: string) => {
      return instances.get(name);
    },
    [instances],
  );

  const updateAllInstancesWithToken = React.useCallback(
    (token: string | null) => {
      // Update base instance
      axiosInstance.interceptors.request.clear();
      axiosInstance.interceptors.request.use(
        (config) => {
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error),
      );

      // Update all service instances
      instances.forEach((instance) => {
        instance.interceptors.request.clear();
        instance.interceptors.request.use(
          (config) => {
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
          },
          (error) => Promise.reject(error),
        );
      });
    },
    [axiosInstance, instances],
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
    updateAllInstancesWithToken, // Added method to context
  };

  return (
    <AxiosContext.Provider value={contextValue}>
      {children}
    </AxiosContext.Provider>
  );
};
