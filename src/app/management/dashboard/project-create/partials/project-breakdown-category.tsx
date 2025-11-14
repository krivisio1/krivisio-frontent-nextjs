"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarkdownRenderer } from "./markdown-render";
import { useChatbot } from "@/app/providers/chatBotProvider/chatbot.context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import React from "react";

interface Category {
  category: string;
  content: string;
}

interface ProjectBreakdownCategoriesProps {
  categories: Category[] | string | any;
}

export default function ProjectBreakdownCategories({
  categories,
}: ProjectBreakdownCategoriesProps) {
  const { handleSelectCategory, selectedCategory } = useChatbot();
  const [showErrorDialog, setShowErrorDialog] = React.useState(false);

  // ✅ Check if categories is valid array
  const validCategories =
    Array.isArray(categories) && categories.length > 0
      ? categories.filter(
          (cat) =>
            cat &&
            typeof cat.category === "string" &&
            typeof cat.content === "string" &&
            cat.category.trim() !== "" &&
            cat.content.trim() !== "",
        )
      : [];

  // ✅ Show error modal if categories is not an array or empty
  React.useEffect(() => {
    if (!Array.isArray(categories) || validCategories.length === 0) {
      setShowErrorDialog(true);
    } else {
      setShowErrorDialog(false);
    }
  }, [categories]);

  const categoryColors: Record<string, string> = {
    simple: "bg-white border-slate-200 hover:border-slate-300",
    intermediate: "bg-white border-slate-200 hover:border-slate-300",
    advanced: "bg-white border-slate-200 hover:border-slate-300",
  };

  const categoryBadgeColors: Record<string, string> = {
    simple: "bg-blue-100 text-blue-800",
    intermediate: "bg-amber-100 text-amber-800",
    advanced: "bg-purple-100 text-purple-800",
  };

  return (
    <>
      {/* ✅ Error Dialog using ShadCN */}
      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#fb5711]">Generate Again</DialogTitle>
            <DialogDescription>
              Some error occurred or invalid data was received. Please try
              generating again.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end">
            <Button
              className="bg-[#fb5711] hover:bg-[#fb5711]/90 text-white"
              onClick={() => {
                setShowErrorDialog(false);
                // Optionally trigger a regenerate function from context
              }}
            >
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ✅ Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {validCategories.map((category) => {
          const colorClass =
            categoryColors[category.category] ||
            "bg-white border-gray-200 hover:border-gray-300";
          const badgeColor =
            categoryBadgeColors[category.category] ||
            "bg-gray-100 text-gray-800";

          return (
            <Card
              key={category.category}
              className={`cursor-pointer transition-all border-2 duration-300 ${
                selectedCategory === category.category
                  ? "border-[#fb5711] bg-[#fb5711]/5 shadow-md scale-[1.02]"
                  : colorClass
              }`}
              onClick={() =>
                handleSelectCategory(category.category, category.content)
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground capitalize">
                    {category.category}
                  </h3>
                  <Badge className={badgeColor}>{category.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <MarkdownRenderer content={category.content} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
