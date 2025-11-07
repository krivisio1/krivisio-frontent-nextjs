"use client";

import { useState } from "react";
import { ChatBotContext } from "./chatbot.context";
import { useAxios } from "@/services/axios/axios.hook";
import { projectBreakdownApi } from "./chatbot.api";
import {
  CategoryData,
  Project,
  Step,
  ChatBotContextType,
} from "./chatbot.types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function ChatBotProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<Step>("description");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryContent, setSelectedCategoryContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSRSDialog, setShowSRSDialog] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [srsGenerated, setSRSGenerated] = useState(false);
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editableDescription, setEditableDescription] = useState(description);

  const { axios } = useAxios();
  const router = useRouter();

  async function generateProjectBreakdown(message: string) {
    try {
      const res = await projectBreakdownApi(axios, message);
      setCategories(res);
      setStep("categories");
      setSelectedCategory("");
      setSelectedCategoryContent("");
      setSRSGenerated(false);
      setAdditionalInstructions("");

      setEditableDescription(description);
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate project breakdown. Please try again.");
    }
  }

  // --- Context Value ---
  const value: ChatBotContextType = {
    step,
    description,
    title,
    categories,
    selectedCategory,
    selectedCategoryContent,
    loading,
    showSRSDialog,
    projects,
    srsGenerated,
    additionalInstructions,
    isEditingDescription,
    editableDescription,

    setStep,
    setDescription,
    setTitle,
    setCategories,
    setSelectedCategory,
    setSelectedCategoryContent,
    setLoading,
    setShowSRSDialog,
    setProjects,
    setSRSGenerated,
    setAdditionalInstructions,
    setIsEditingDescription,
    setEditableDescription,

    generateProjectBreakdown,
  };

  return (
    <ChatBotContext.Provider value={value}>{children}</ChatBotContext.Provider>
  );
}
