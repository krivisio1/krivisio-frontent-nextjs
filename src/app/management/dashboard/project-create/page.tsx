// "use client";

// import { useState } from "react";
// import { Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import ProjectBreakdownCategories from "./partials/project-breakdown-category";
// import SRSGenerationDialog from "./partials/srs-generation";
// import ProjectHistory from "./partials/projects-history";

// type Step = "description" | "categories" | "srs";

// interface Project {
//   id: string;
//   title: string;
//   description: string;
//   category?: string;
//   createdAt: Date;
// }

// interface CategoryData {
//   category: string;
//   content: string;
// }

// export default function ProjectBreakdown() {
//   const [step, setStep] = useState<Step>("description");
//   const [description, setDescription] = useState("");
//   const [title, setTitle] = useState("");
//   const [categories, setCategories] = useState<CategoryData[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string>("");
//   const [selectedCategoryContent, setSelectedCategoryContent] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showSRSDialog, setShowSRSDialog] = useState(false);
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [srsGenerated, setSRSGenerated] = useState(false);
//   const [additionalInstructions, setAdditionalInstructions] = useState("");

//   const handleGenerateBreakdown = async () => {
//     if (!description.trim()) return;

//     setLoading(true);
//     try {
//       const mockResponse: CategoryData[] = [
//         {
//           category: "simple",
//           content:
//             "## Features\n- Add, edit, and delete books from the library catalog\n- Search for books by title, author, or category\n- Track book availability and borrowing status\n- Simple user authentication for librarians\n\n## Team\n- 1 Developer (full-stack)\n\n## Technologies\n- Frontend: HTML, CSS, JavaScript\n- Backend: Node.js with Express\n- Database: SQLite\n\n## Duration\n2-3 weeks",
//         },
//         {
//           category: "intermediate",
//           content:
//             "## Features\n- All simple features plus:\n- User registration and role management (librarian/borrower)\n- Borrowing and returning books with due dates\n- Fine calculation for overdue books\n- Email notifications for due dates and fines\n- Advanced search with filters and sorting\n\n## Team\n- 2 Developers (frontend and backend)\n- 1 UI/UX Designer\n\n## Technologies\n- Frontend: React.js with Bootstrap\n- Backend: Python with Django or Flask\n- Database: PostgreSQL\n- Email service: SendGrid or SMTP\n\n## Duration\n4-6 weeks",
//         },
//         {
//           category: "advanced",
//           content:
//             "## Features\n- All intermediate features plus:\n- Barcode/QR code scanning for book management\n- Multi-branch library support\n- Real-time inventory updates\n- Advanced reporting and analytics dashboard\n- Integration with external APIs (e.g., ISBN lookup)\n- Mobile app for borrowers\n- AI-powered book recommendations\n- Automated book reservation system\n\n## Team\n- 3-4 Developers (frontend, backend, mobile)\n- 1 UI/UX Designer\n- 1 DevOps/QA Engineer\n\n## Technologies\n- Frontend: React.js with Material-UI\n- Backend: Java with Spring Boot or .NET Core\n- Mobile: React Native or Flutter\n- Database: MySQL or MongoDB with Redis caching\n- Cloud: AWS or Azure\n- APIs: RESTful and GraphQL\n\n## Duration\n3-5 months",
//         },
//       ];

//       setCategories(mockResponse);
//       setStep("categories");
//       setSelectedCategory("");
//       setSelectedCategoryContent("");
//       setSRSGenerated(false);
//       setAdditionalInstructions("");
//     } catch (error) {
//       console.error("Error generating breakdown:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelectCategory = (category: string, content: string) => {
//     if (srsGenerated) return;
//     setSelectedCategory(category);
//     setSelectedCategoryContent(content);
//   };

//   const handleGenerateOther = async () => {
//     setDescription("");
//     setTitle("");
//     setCategories([]);
//     setSelectedCategory("");
//     setSelectedCategoryContent("");
//     setSRSGenerated(false);
//     setAdditionalInstructions("");
//     setStep("description");
//     setLoading(false);
//   };

//   const handleAddProject = (srsContent: string) => {
//     const newProject: Project = {
//       id: Date.now().toString(),
//       title: title || `Project ${projects.length + 1}`,
//       description,
//       category: selectedCategory,
//       createdAt: new Date(),
//     };
//     setProjects([...projects, newProject]);

//     setDescription("");
//     setTitle("");
//     setSelectedCategory("");
//     setSelectedCategoryContent("");
//     setCategories([]);
//     setStep("description");
//     setSRSGenerated(false);
//     setAdditionalInstructions("");
//   };

//   return (
//     <div className="flex h-screen bg-background">
//       {/* Left Sidebar - History */}
//       <Sheet>
//         <SheetTrigger asChild>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="fixed right-4 top-4 z-40"
//           >
//             <Menu className="w-6 h-6" />
//           </Button>
//         </SheetTrigger>
//         <SheetContent side="right" className="w-80">
//           <ProjectHistory projects={projects} />
//         </SheetContent>
//       </Sheet>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto">
//         <div className="max-w-7xl mx-auto p-8">
//           {step === "description" && (
//             <div className="space-y-8">
//               <div>
//                 <h1 className="text-[42px] text-[#FB5711] font-bold mt-1">
//                   Shantanu
//                 </h1>
//                 <p className="text-lg text-black">
//                   Welcome back! Let's create your next project.
//                 </p>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <label className="text-2xl font-semibold text-foreground/80 mb-2 block">
//                     Project Title
//                   </label>
//                   <Input
//                     placeholder="Enter project title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="text-base"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-2xl font-semibold text-foreground/80 mb-2 block">
//                     Project Description
//                   </label>
//                   <Textarea
//                     placeholder="Describe your project in detail..."
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     className="min-h-48 text-base"
//                   />
//                 </div>

//                 <div className="flex gap-4">
//                   <Button
//                     onClick={handleGenerateBreakdown}
//                     disabled={!description.trim() || loading}
//                     size="lg"
//                     className="bg-[#fb5711] hover:bg-[#fb5711]/90 text-white"
//                   >
//                     {loading ? "Generating..." : "Generate Breakdown"}
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {step === "categories" && categories.length > 0 && (
//             <div className="space-y-8">
//               <div>
//                 <h2 className="text-3xl font-bold text-foreground mb-2">
//                   Project Breakdown Categories
//                 </h2>
//                 <p className="text-muted-foreground">
//                   Choose a category that best fits your project scope
//                 </p>
//               </div>

//               {/* Categories Cards - Remove max-h-48 to show all content */}
//               <ProjectBreakdownCategories
//                 categories={categories}
//                 selectedCategory={selectedCategory}
//                 onSelectCategory={handleSelectCategory}
//               />

//               {!srsGenerated && (
//                 <div className="flex justify-start">
//                   <Button
//                     onClick={handleGenerateOther}
//                     variant="outline"
//                     size="lg"
//                     disabled={loading}
//                   >
//                     {loading ? "Generating..." : "Generate Other"}
//                   </Button>
//                 </div>
//               )}

//               {/*{selectedCategory && !srsGenerated && (*/}
//               <Card className="border-2 border-[#fb5711]">
//                 <CardHeader className="bg-[#fb5711]/5">
//                   <CardTitle className="text-[#fb5711]">
//                     Generate SRS Document
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="pt-6 space-y-4">
//                   <p className="text-muted-foreground">
//                     You have selected{" "}
//                     <span className="font-semibold text-foreground capitalize">
//                       {selectedCategory}
//                     </span>{" "}
//                     complexity. Add any additional instructions for the SRS
//                     generation.
//                   </p>
//                   <div>
//                     <label className="text-sm font-semibold text-foreground mb-2 block">
//                       Add More Instruction
//                     </label>
//                     <Textarea
//                       placeholder="Add specific requirements, technologies, or preferences..."
//                       value={additionalInstructions}
//                       onChange={(e) =>
//                         setAdditionalInstructions(e.target.value)
//                       }
//                       className="min-h-32"
//                     />
//                   </div>
//                   <Button
//                     onClick={() => {
//                       setSRSGenerated(true);
//                       setShowSRSDialog(true);
//                     }}
//                     size="lg"
//                     className="bg-[#fb5711] hover:bg-[#fb5711]/90 text-white"
//                   >
//                     Generate SRS
//                   </Button>
//                 </CardContent>
//               </Card>
//               {/*)}*/}

//               {/*{srsGenerated && selectedCategory && (*/}
//               {/*<Card className="border-2 border-[#fb5711]/50 bg-[#fb5711]/2">
//                 <CardHeader className="bg-[#fb5711]/5">
//                   <CardTitle className="text-[#fb5711]">
//                     SRS Generated
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="pt-6">
//                   <p className="text-muted-foreground">
//                     SRS document has been generated for{" "}
//                     <span className="font-semibold text-foreground capitalize">
//                       {selectedCategory}
//                     </span>{" "}
//                     complexity. The category selection is now locked.
//                   </p>
//                 </CardContent>
//               </Card>*/}
//               {/*)}*/}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* SRS Generation Dialog */}
//       {showSRSDialog && (
//         <SRSGenerationDialog
//           categoryContent={selectedCategoryContent}
//           selectedCategory={selectedCategory}
//           additionalInstructions={additionalInstructions}
//           onClose={() => {
//             setShowSRSDialog(false);
//           }}
//           onGenerate={() => {
//             setShowSRSDialog(false);
//             handleAddProject("");
//           }}
//         />
//       )}
//     </div>
//   );
// }
"use client";

import { useState, useTransition } from "react";
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
import { Description } from "@radix-ui/react-dialog";

export default function ProjectBreakdown() {
  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [additionalInstructions, setAdditionalInstructions] = useState("");

<<<<<<< HEAD
  const [generating, startTransition] = useTransition();

  const [showProceedConfirm, setShowProceedConfirm] = useState(false);
  const [proceeded, setProceeded] = useState(false); // true after user confirms proceed
  const [showNavigateConfirm, setShowNavigateConfirm] = useState(false); // confirm before Generate Other navigation

  const {
    step,
    setStep,
    categories,
    setCategories,
    editableDescription,
    setDescription,
    description,
    selectedCategory,
    setTitle,
    setSelectedCategory,
    setSelectedCategoryContent,
    generateProjectBreakdown,
    setSRSGenerated,
    setShowSRSDialog,
    setIsEditingDescription,
    isEditingDescription,
    showSRSDialog,
    generateSrs,
    title,
  } = useChatbot();
=======
  // 🔥 Added for inline editing of project description
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editableDescription, setEditableDescription] = useState(description);

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
      setEditableDescription(description);
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
>>>>>>> ad3cca1f930f05b90a1e7226abf68ba9ed0b8ed6

  const handleGenerateOther = async () => {
    // original behavior: clear and go to project create page (we keep same state reset)
    setDescription("");
    setTitle("");
    setCategories([]);
    setSelectedCategory("");
    setSelectedCategoryContent("");
    setSRSGenerated(false);
    setAdditionalInstructions("");
    setStep("description");
    setLoading(false);
    // reset proceed state because user left to create new project
    setProceeded(false);
  };

  function generateAgainHandler() {
    startTransition(async () => {
      setIsEditingDescription(false);
      generateProjectBreakdown(description);
    });
  }

  const handleGenerateOtherConfirmed = () => {
    // user confirmed navigating/creating new project
    setShowNavigateConfirm(false);
    handleGenerateOther();
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
    setProceeded(false);
    setIsEditingDescription(false);
  };

  function generateSrsHandler() {
    startTransition(async () => {
      generateSrs();
    });
  }
  return (
<<<<<<< HEAD
    <div className="flex h-screen w-full bg-gradient-to-b from-white to-[#fff6f2]">
=======
    <div className="flex h-screen bg-gradient-to-b from-white to-[#fff6f2]">
>>>>>>> ad3cca1f930f05b90a1e7226abf68ba9ed0b8ed6
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
<<<<<<< HEAD
        <SheetContent
          side="right"
          className="w-80 border-l border-[#fb5711]/20"
        >
=======
        <SheetContent side="right" className="w-80 border-l border-[#fb5711]/20">
>>>>>>> ad3cca1f930f05b90a1e7226abf68ba9ed0b8ed6
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
<<<<<<< HEAD
                  Let's Break Down Your Project
                </h1>
              </div>

              <ProjectDescForm />
=======
                  Shantanu
                </h1>
                <p className="text-black text-base">
                  Welcome back Let’s create your next project!
                </p>
              </div>

              <Card className="shadow-md border-[#fb5711]/20 bg-white/80 backdrop-blur-sm rounded-sm">
                <CardContent className="p-8 space-y-8">
                  <div>
                    <label className="text-lg font-semibold text-gray-800 block mb-2">
                      Project Title
                    </label>
                    <Input
                      placeholder="Enter your project title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="text-base border-[#fb5711]/30 focus:border-[#fb5711] rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="text-lg font-semibold text-gray-800 block mb-2">
                      Project Description
                    </label>
                    <Textarea
                      placeholder="Describe your project in detail..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-40 text-base border-[#fb5711]/30 focus:border-[#fb5711] rounded-sm"
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={handleGenerateBreakdown}
                      disabled={!description.trim() || loading}
                      size="lg"
                      className="px-8 py-5 text-lg bg-[#fb5711] hover:bg-[#fb5711]/90 text-white font-semibold rounded-sm shadow-md"
                    >
                      {loading ? "Generating..." : "Generate Breakdown"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
>>>>>>> ad3cca1f930f05b90a1e7226abf68ba9ed0b8ed6
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
<<<<<<< HEAD
                      disabled={isEditingDescription}
                      onClick={generateAgainHandler}
                      className="text-[#fb5711] border-[#fb5711] hover:bg-[#fb5711]/10"
                    >
                      {isEditingDescription ? "Generate Again" : "Edit"}
                    </Button>
                  </div>

                  {description ? (
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
=======
                      onClick={() =>
                        setIsEditingDescription((prev) => !prev)
                      }
                      className="text-[#fb5711] border-[#fb5711] hover:bg-[#fb5711]/10"
                    >
                      {isEditingDescription ? "Save" : "Edit"}
                    </Button>
                  </div>

                  {isEditingDescription ? (
                    <Textarea
                      value={editableDescription}
                      onChange={(e) =>
                        setEditableDescription(e.target.value)
                      }
>>>>>>> ad3cca1f930f05b90a1e7226abf68ba9ed0b8ed6
                      className="min-h-32 border-[#fb5711]/30 focus:border-[#fb5711] text-sm"
                    />
                  ) : (
                    <p className="text-gray-700 whitespace-pre-line">
<<<<<<< HEAD
                      {description || "No description provided."}
=======
                      {editableDescription || "No description provided."}
>>>>>>> ad3cca1f930f05b90a1e7226abf68ba9ed0b8ed6
                    </p>
                  )}
                </div>
              </div>

<<<<<<< HEAD
              <ProjectBreakdownCategories categories={categories} />

              <div className="flex justify-center gap-4">
                {/* Generate Other: show confirmation modal before performing */}
                {!proceeded && (
                  <Button
                    onClick={() => setShowNavigateConfirm(true)}
                    variant="outline"
                    size="lg"
                    disabled={loading}
                    className="rounded-sm w-[180px] px-8 py-5 text-[#fb5711] border-[#fb5711] hover:bg-[#fb5711]/10"
                  >
                    {loading ? "Generating..." : "Generate Other"}
                  </Button>
                )}

                {/* Proceed button (right to Generate Other) */}
                {!proceeded && (
=======
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

>>>>>>> ad3cca1f930f05b90a1e7226abf68ba9ed0b8ed6
                  <Button
                    onClick={() => setShowProceedConfirm(true)}
                    size="lg"
<<<<<<< HEAD
                    className="rounded-sm w-[180px] px-8 py-5 bg-[#fb5711] hover:bg-[#fb5711]/90 text-white font-semibold"
=======
                    className="px-10 py-5 bg-[#fb5711] hover:bg-[#fb5711]/90 text-white font-semibold rounded-sm"
>>>>>>> ad3cca1f930f05b90a1e7226abf68ba9ed0b8ed6
                  >
                    Proceed
                  </Button>
<<<<<<< HEAD
                )}
              </div>

              {/* Generate SRS Card is hidden until user confirms Proceed */}
              {proceeded && (
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
              )}
=======
                </CardContent>
              </Card>
>>>>>>> ad3cca1f930f05b90a1e7226abf68ba9ed0b8ed6
            </div>
          )}
        </div>
      </div>

      {/* SRS Dialog */}
      {showSRSDialog && (
        <SRSGenerationDialog
          generating={generating}
          additionalInstructions={additionalInstructions}
          onClose={() => setShowSRSDialog(false)}
          onGenerate={() => {
            setShowSRSDialog(false);
            handleAddProject("");
          }}
        />
      )}

      {/* Proceed Confirmation Modal */}
      {showProceedConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowProceedConfirm(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-[#fb5711] mb-3">
              Confirm Proceed
            </h3>
            <p className="text-sm text-gray-700 mb-6">
              Are you really want to proceed? After confirming you will not be
              able to edit the description or use "Generate Other". The SRS
              section will be available.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowProceedConfirm(false)}
                className="border-[#fb5711] text-[#fb5711]"
              >
                No
              </Button>
              <Button
                onClick={() => {
                  setProceeded(true);
                  setShowProceedConfirm(false);
                  setIsEditingDescription(false);
                  setShowSRSDialog(true);
                  generateSrsHandler();
                }}
                className="bg-[#fb5711] hover:bg-[#fb5711]/90 text-white"
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Navigate (Generate Other) Confirmation Modal */}
      {showNavigateConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowNavigateConfirm(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-[#fb5711] mb-3">
              Confirm Navigation
            </h3>
            <p className="text-sm text-gray-700 mb-6">
              Are you sure you want to go to the project create page? Unsaved
              changes may be lost.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowNavigateConfirm(false)}
                className="border-[#fb5711] text-[#fb5711]"
              >
                No
              </Button>
              <Button
                onClick={handleGenerateOtherConfirmed}
                className="bg-[#fb5711] hover:bg-[#fb5711]/90 text-white"
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
