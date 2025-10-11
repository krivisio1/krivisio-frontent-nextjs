import React from "react";
import { orgContextType } from "./org.types";

export const OrgContext = React.createContext<orgContextType | null>(null);
