"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectBreakdownCategories from "./partials/project-breakdown-category";
import SRSGenerationDialog from "./partials/srs-generation";
import ProjectHistory from "./partials/projects-history";
import ProjectDescForm from "./partials/project-desc-form";
import {
  CategoryData,
  Project,
  Step,
} from "@/app/providers/chatBotProvider/chatbot.types";
import { useChatbot } from "@/app/providers/chatBotProvider/chatbot.context";

export default function ProjectBreakdown() {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCategoryContent, setSelectedCategoryContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSRSDialog, setShowSRSDialog] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [srsGenerated, setSRSGenerated] = useState(false);
  const [additionalInstructions, setAdditionalInstructions] = useState("");

  // 🔥 Added for inline editing of project description
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  // const [editableDescription, setEditableDescription] = useState(description);

  const {
    step,
    setStep,
    categories,
    setCategories,
    editableDescription,
    setEditableDescription,
    generateProjectBreakdown,
  } = useChatbot();

  const handleGenerateBreakdown = async () => {
    if (!description.trim()) return;
    setLoading(true);
    try {
      const mockResponse: CategoryData[] = [
        {
          category: "simple",
          content:
            "## Features\n- Add, edit, and delete books from the library catalog\n- Search for books by title, author, or category\n- Track book availability and borrowing status\n- Simple user authentication for librarians\n\n## Team\n- 1 Developer (full-stack)\n\n## Technologies\n- Frontend: HTML, CSS, JavaScript\n- Backend: Node.js with Express\n- Database: SQLite\n\n## Duration\n2-3 weeks",
        },
        {
          category: "intermediate",
          content:
            "## Features\n- All simple features plus:\n- User registration and role management (librarian/borrower)\n- Borrowing and returning books with due dates\n- Fine calculation for overdue books\n- Email notifications for due dates and fines\n- Advanced search with filters and sorting\n\n## Team\n- 2 Developers (frontend and backend)\n- 1 UI/UX Designer\n\n## Technologies\n- Frontend: React.js with Bootstrap\n- Backend: Python with Django or Flask\n- Database: PostgreSQL\n- Email service: SendGrid or SMTP\n\n## Duration\n4-6 weeks",
        },
        {
          category: "advanced",
          content:
            "## Features\n- All intermediate features plus:\n- Barcode/QR code scanning for book management\n- Multi-branch library support\n- Real-time inventory updates\n- Advanced reporting and analytics dashboard\n- Integration with external APIs (e.g., ISBN lookup)\n- Mobile app for borrowers\n- AI-powered book recommendations\n- Automated book reservation system\n\n## Team\n- 3-4 Developers (frontend, backend, mobile)\n- 1 UI/UX Designer\n- 1 DevOps/QA Engineer\n\n## Technologies\n- Frontend: React.js with Material-UI\n- Backend: Java with Spring Boot or .NET Core\n- Mobile: React Native or Flutter\n- Database: MySQL or MongoDB with Redis caching\n- Cloud: AWS or Azure\n- APIs: RESTful and GraphQL\n\n## Duration\n3-5 months",
        },
      ];
      setCategories(mockResponse);
      setStep("categories");
      setSelectedCategory("");
      setSelectedCategoryContent("");
      setSRSGenerated(false);
      setAdditionalInstructions("");

      // sync editable description
      // setEditableDescription(description);
    } catch (error) {
      console.error("Error generating breakdown:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (category: string, content: string) => {
    if (srsGenerated) return;
    setSelectedCategory(category);
    setSelectedCategoryContent(content);
  };

  const handleGenerateOther = async () => {
    setDescription("");
    setTitle("");
    setCategories([]);
    setSelectedCategory("");
    setSelectedCategoryContent("");
    setSRSGenerated(false);
    setAdditionalInstructions("");
    setStep("description");
    setLoading(false);
  };

  const handleAddProject = (srsContent: string) => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: title || `Project ${projects.length + 1}`,
      description: editableDescription, // ✅ Save edited description
      category: selectedCategory,
      createdAt: new Date(),
    };
    setProjects([...projects, newProject]);
    setDescription("");
    setTitle("");
    setSelectedCategory("");
    setSelectedCategoryContent("");
    setCategories([]);
    setStep("description");
    setSRSGenerated(false);
    setAdditionalInstructions("");
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-white to-[#fff6f2]">
      {/* History Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed right-5 top-5 z-40 rounded-sm border border-[#fb5711]/20 hover:bg-[#fb5711]/10"
          >
            <Menu className="w-6 h-6 text-[#fb5711]" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-80 border-l border-[#fb5711]/20"
        >
          <ProjectHistory projects={projects} />
        </SheetContent>
      </Sheet>

      {/* Main Section */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-10">
          {step === "description" && (
            <div className="space-y-10 animate-fade-in">
              <div className="text-left space-y-1">
                <h1 className="text-[44px] font-extrabold text-[#FB5711]">
                  Let's Break Down Your Project
                </h1>
              </div>

              <ProjectDescForm />
            </div>
          )}

          {step === "categories" && categories.length > 0 && (
            <div className="space-y-10 animate-fade-in">
              <div className="text-left space-y-2">
                <h2 className="text-[44px] font-bold text-[#fb5711]">
                  Project Breakdown
                </h2>
                <p className="text-black">
                  Choose a category that best fits your project’s complexity
                </p>

                {/* ✅ Editable Project Description Section */}
                <div className="mt-4 bg-white/80 border border-[#fb5711]/20 rounded-md p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-[#fb5711]">
                      Project Description
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingDescription((prev) => !prev)}
                      className="text-[#fb5711] border-[#fb5711] hover:bg-[#fb5711]/10"
                    >
                      {isEditingDescription ? "Save" : "Edit"}
                    </Button>
                  </div>

                  {isEditingDescription ? (
                    <Textarea
                      value={editableDescription}
                      onChange={(e) => setEditableDescription(e.target.value)}
                      className="min-h-32 border-[#fb5711]/30 focus:border-[#fb5711] text-sm"
                    />
                  ) : (
                    <p className="text-gray-700 whitespace-pre-line">
                      {editableDescription || "No description provided."}
                    </p>
                  )}
                </div>
              </div>

              <ProjectBreakdownCategories
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
              />

              <div className="flex justify-center gap-4">
                <Button
                  onClick={handleGenerateOther}
                  variant="outline"
                  size="lg"
                  disabled={loading}
                  className="rounded-sm px-8 py-5 text-[#fb5711] border-[#fb5711] hover:bg-[#fb5711]/10"
                >
                  {loading ? "Generating..." : "Generate Other"}
                </Button>
              </div>

              <Card className="border border-[#fb5711]/30 shadow-sm bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-[#fb5711]/5 border-b border-[#fb5711]/20">
                  <CardTitle className="text-[#fb5711] text-xl">
                    Generate SRS Document
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-5">
                  <p className="text-gray-700">
                    You selected{" "}
                    <span className="font-semibold capitalize text-[#fb5711]">
                      {selectedCategory}
                    </span>{" "}
                    complexity. Add extra details before generating your SRS.
                  </p>

                  <div>
                    <label className="text-sm font-semibold text-gray-800 mb-2 block">
                      Additional Instructions
                    </label>
                    <Textarea
                      placeholder="Add specific requirements, technologies, or notes..."
                      value={additionalInstructions}
                      onChange={(e) =>
                        setAdditionalInstructions(e.target.value)
                      }
                      className="min-h-32 border-[#fb5711]/30 focus:border-[#fb5711]"
                    />
                  </div>

                  <Button
                    onClick={() => {
                      setSRSGenerated(true);
                      setShowSRSDialog(true);
                    }}
                    size="lg"
                    className="px-10 py-5 bg-[#fb5711] hover:bg-[#fb5711]/90 text-white font-semibold rounded-sm"
                  >
                    Generate SRS
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* SRS Dialog */}
      {showSRSDialog && (
        <SRSGenerationDialog
          categoryContent={selectedCategoryContent}
          selectedCategory={selectedCategory}
          additionalInstructions={additionalInstructions}
          onClose={() => setShowSRSDialog(false)}
          onGenerate={() => {
            setShowSRSDialog(false);
            handleAddProject("");
          }}
        />
      )}
    </div>
  );
}
