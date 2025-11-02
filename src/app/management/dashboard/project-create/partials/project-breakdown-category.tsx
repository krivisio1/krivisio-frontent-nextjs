"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarkdownRenderer } from "./markdown-render";

interface Category {
  category: string;
  content: string;
}

interface ProjectBreakdownCategoriesProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string, content: string) => void;
}

export default function ProjectBreakdownCategories({
  categories,
  selectedCategory,
  onSelectCategory,
}: ProjectBreakdownCategoriesProps) {
  const categoryColors: Record<string, string> = {
    simple: "bg-slate-50 border-slate-200 hover:border-slate-300",
    intermediate: "bg-slate-50 border-slate-200 hover:border-slate-300",
    advanced: "bg-slate-50 border-slate-200 hover:border-slate-300",
  };

  const categoryBadgeColors: Record<string, string> = {
    simple: "bg-blue-100 text-blue-800",
    intermediate: "bg-amber-100 text-amber-800",
    advanced: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {categories.map((category) => (
        <Card
          key={category.category}
          className={`flex-shrink-0 w-80 cursor-pointer transition-all border-2 ${
            selectedCategory === category.category
              ? "border-[#fb5711] bg-[#fb5711]/5 shadow-md"
              : categoryColors[category.category]
          }`}
          onClick={() => onSelectCategory(category.category, category.content)}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground capitalize">
                {category.category}
              </h3>
              <Badge className={categoryBadgeColors[category.category]}>
                {category.category}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <MarkdownRenderer content={category.content} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
