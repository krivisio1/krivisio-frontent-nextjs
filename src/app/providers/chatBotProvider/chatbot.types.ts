// chatbot.types.ts
export type Step = "description" | "categories" | "srs";

export interface Project {
  id: string;
  title: string;
  description: string;
  category?: string;
  createdAt: Date;
}

export interface CategoryData {
  category: string;
  content: string;
}

export interface ChatBotContextType {
  // --- States ---
  step: Step;
  description: string;
  title: string;
  categories: CategoryData[];
  selectedCategory: string;
  selectedCategoryContent: string;
  loading: boolean;
  showSRSDialog: boolean;
  projects: Project[];
  srsGenerated: boolean;
  additionalInstructions: string;
  isEditingDescription: boolean;
  editableDescription: string;

  // --- Setters ---
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setCategories: React.Dispatch<React.SetStateAction<CategoryData[]>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCategoryContent: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSRSDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setSRSGenerated: React.Dispatch<React.SetStateAction<boolean>>;
  setAdditionalInstructions: React.Dispatch<React.SetStateAction<string>>;
  setIsEditingDescription: React.Dispatch<React.SetStateAction<boolean>>;
  setEditableDescription: React.Dispatch<React.SetStateAction<string>>;

  // --- Actions ---
  generateProjectBreakdown: (message: string) => Promise<void>;
}
