"use client";

import { createContext, useContext } from "react";

export const ChatBotContext = createContext<null | any>(null);

export function useChatbot() {
  const ctx = useContext(ChatBotContext);

  if (!ctx) throw new Error("Uset the context into the provider");

  return ctx;
}
