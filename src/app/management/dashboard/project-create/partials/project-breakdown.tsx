"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectBreakdownCategories from "./project-breakdown-category";
import SRSGenerationDialog from "./srs-generation";
import ProjectHistory from "./projects-history";

type Step = "description" | "categories" | "srs";

interface Project {
  id: string;
  title: string;
  description: string;
  category?: string;
  createdAt: Date;
}

interface CategoryData {
  category: string;
  content: string;
}

export default function ProjectBreakdown() {
  const [step, setStep] = useState<Step>("description");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCategoryContent, setSelectedCategoryContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSRSDialog, setShowSRSDialog] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [srsGenerated, setSRSGenerated] = useState(false);
  const [additionalInstructions, setAdditionalInstructions] = useState("");

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
      description,
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
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - History */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-40"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <ProjectHistory projects={projects} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-8">
          {step === "description" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Shantanu
                </h1>
                <p className="text-lg text-muted-foreground">
                  Welcome back! Let's create your next project.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-lg font-semibold text-foreground mb-2 block">
                    Project Title
                  </label>
                  <Input
                    placeholder="Enter project title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-base"
                  />
                </div>

                <div>
                  <label className="text-lg font-semibold text-foreground mb-2 block">
                    Project Description
                  </label>
                  <Textarea
                    placeholder="Describe your project in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-48 text-base"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleGenerateBreakdown}
                    disabled={!description.trim() || loading}
                    size="lg"
                    className="bg-[#fb5711] hover:bg-[#fb5711]/90 text-white"
                  >
                    {loading ? "Generating..." : "Generate Breakdown"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === "categories" && categories.length > 0 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Project Breakdown Categories
                </h2>
                <p className="text-muted-foreground">
                  Choose a category that best fits your project scope
                </p>
              </div>

              {/* Categories Cards - Remove max-h-48 to show all content */}
              <ProjectBreakdownCategories
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
              />

              {!srsGenerated && (
                <div className="flex justify-start">
                  <Button
                    onClick={handleGenerateOther}
                    variant="outline"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Generating..." : "Generate Other"}
                  </Button>
                </div>
              )}

              {selectedCategory && !srsGenerated && (
                <Card className="border-2 border-[#fb5711]">
                  <CardHeader className="bg-[#fb5711]/5">
                    <CardTitle className="text-[#fb5711]">
                      Generate SRS Document
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <p className="text-muted-foreground">
                      You have selected{" "}
                      <span className="font-semibold text-foreground capitalize">
                        {selectedCategory}
                      </span>{" "}
                      complexity. Add any additional instructions for the SRS
                      generation.
                    </p>
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-2 block">
                        Add More Instruction
                      </label>
                      <Textarea
                        placeholder="Add specific requirements, technologies, or preferences..."
                        value={additionalInstructions}
                        onChange={(e) =>
                          setAdditionalInstructions(e.target.value)
                        }
                        className="min-h-32"
                      />
                    </div>
                    <Button
                      onClick={() => {
                        setSRSGenerated(true);
                        setShowSRSDialog(true);
                      }}
                      size="lg"
                      className="bg-[#fb5711] hover:bg-[#fb5711]/90 text-white"
                    >
                      Generate SRS
                    </Button>
                  </CardContent>
                </Card>
              )}

              {srsGenerated && selectedCategory && (
                <Card className="border-2 border-[#fb5711]/50 bg-[#fb5711]/2">
                  <CardHeader className="bg-[#fb5711]/5">
                    <CardTitle className="text-[#fb5711]">
                      SRS Generated
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground">
                      SRS document has been generated for{" "}
                      <span className="font-semibold text-foreground capitalize">
                        {selectedCategory}
                      </span>{" "}
                      complexity. The category selection is now locked.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SRS Generation Dialog */}
      {showSRSDialog && (
        <SRSGenerationDialog
          categoryContent={selectedCategoryContent}
          selectedCategory={selectedCategory}
          additionalInstructions={additionalInstructions}
          onClose={() => {
            setShowSRSDialog(false);
          }}
          onGenerate={() => {
            setShowSRSDialog(false);
            handleAddProject("");
          }}
        />
      )}
    </div>
  );
}
