"use client";

import { createContext, useContext } from "react";
import { ChatBotContextType } from "./project.types";

export const ChatBotContext = createContext<ChatBotContextType | null>(null);

export function useChatbot() {
  const ctx = useContext(ChatBotContext);

  if (!ctx) throw new Error("Uset the context into the provider");

  return ctx;
}
