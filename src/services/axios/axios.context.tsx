"use client";
import React from "react";
import type { Axiostype } from "./axios.type";
import type { AxiosInstance } from "axios";

export const AxiosContext = React.createContext<Axiostype | null>(null);
