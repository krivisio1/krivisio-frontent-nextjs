"use client";

import { useState } from "react";
import { ChatBotContext } from "./chatbot.context";
import { useAxios } from "@/services/axios/axios.hook";
import { fetchChatbotResponse } from "./chatbot.api";
import { ChatBotData } from "./chatbot.type";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function ChatBotProvider({ children }: { children: React.ReactNode }) {
  const [specsSheet, setspecsSheet] = useState<string | null>(null);
  const { axios } = useAxios();
  const router = useRouter();

  async function getChatbotResponse(data: ChatBotData) {
    try {
      const res = await fetchChatbotResponse(axios, data);

      setspecsSheet(res.structuredContent.document);
      router.push("/management/dashboard/specsheet");
    } catch (error) {
      toast.error("Failed to fetch chatbot response, try later");
      console.error(error);
    }
  }

  return (
    <ChatBotContext.Provider value={{ getChatbotResponse, specsSheet }}>
      {children}
    </ChatBotContext.Provider>
  );
}
