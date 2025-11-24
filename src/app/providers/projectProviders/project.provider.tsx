"use client";

import { useEffect, useState } from "react";
import { ChatBotContext } from "./project.context";
import { useAxios } from "@/services/axios/axios.hook";
import {
  generateSrsApi,
  getAllProjectApi,
  getProjectDetailsApi,
  projectBreakdownApi,
  updateProjectApi,
} from "./project.api";
import {
  CategoryData,
  Project,
  Step,
  ChatBotContextType,
} from "./project.types";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

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
  const [srsContent, setSRSContent] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [perpage, setPerpage] = useState(10);

  const { axios } = useAxios();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    data: projectsData,
    isLoading,
    refetch: loadProjects,
  } = useQuery({
    queryKey: ["items", page, perpage],
    queryFn: async () => {
      const res = await getAllProjectApi(axios, page, perpage);
      console.log(res);

      return res;
    },
  });
  console.log({ projectsData });
  console.log("hello bro");

  async function generateProjectBreakdown(message: string, p_title: string) {
    if (!message.trim() || !p_title.trim()) {
      toast.error("Please provide both title and description.");
      return;
    }
    try {
      const res = await projectBreakdownApi(axios, p_title, message);
      setCategories(res.data);
      setStep("categories");
      setSelectedCategory("");
      setSelectedCategoryContent("");
      setSRSGenerated(false);
      setAdditionalInstructions("");
      setDescription(message);
      setTitle(p_title);
      router.replace("?project_id=" + res.project.id);
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate project breakdown. Please try again.");
    }
  }

  async function updateProjectData() {
    const projectId = searchParams.get("project_id");
    if (!projectId) return;

    try {
      const res = await updateProjectApi(axios, title, description, projectId);
      loadProject();
    } catch (err) {
      console.log(err);
      toast.error("Failed to load project.");
    }
  }

  async function generateSrs() {
    console.log({ selectedCategoryContent });
    if (!selectedCategoryContent.trim()) {
      toast.error("Please select a category to generate SRS.");
      return;
    }
    try {
      const res = await generateSrsApi(axios, selectedCategoryContent);

      if (res) {
        setSRSContent(res);
        setShowSRSDialog(true);
        setSRSGenerated(true);
      }
    } catch (err: any) {}
  }

  const handleSelectCategory = (category: string, content: string) => {
    if (srsGenerated) return;

    setSelectedCategory(category);
    setSelectedCategoryContent(content);
  };

  async function loadProject() {
    const projectId = searchParams.get("project_id");
    if (!projectId) return;
    try {
      const res = await getProjectDetailsApi(axios, projectId!);

      setTitle(res.project_title);
      setDescription(res.description);
      setCategories(JSON.parse(res.breakdown));
      setSelectedCategory("");
      setSelectedCategoryContent("");
      setStep("categories"); // Go directly to categories page
    } catch (err) {
      console.log(err);
      toast.error("Failed to load project.");
    }
  }

  useEffect(() => {
    loadProject();
  }, [searchParams]);

  const value: ChatBotContextType = {
    step,
    description,
    title,
    categories,
    selectedCategory,
    selectedCategoryContent,
    loading,
    showSRSDialog,
    handleSelectCategory,
    projects,
    srsGenerated,
    additionalInstructions,
    isEditingDescription,
    editableDescription,
    srsContent,

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
    setSRSContent,

    generateProjectBreakdown,
    generateSrs,
    updateProjectData,
  };

  return (
    <ChatBotContext.Provider value={value}>{children}</ChatBotContext.Provider>
  );
}
