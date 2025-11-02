"use client";

import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Project {
  id: string;
  title: string;
  description: string;
  category?: string;
  createdAt: Date;
}

interface ProjectHistoryProps {
  projects: Project[];
}

export default function ProjectHistory({ projects }: ProjectHistoryProps) {
  const categoryColors: Record<string, string> = {
    simple: "bg-blue-100 text-blue-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-foreground">Project History</h2>
        <p className="text-sm text-muted-foreground">
          {projects.length} project{projects.length !== 1 ? "s" : ""} created
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground text-center">
            No projects yet. Create your first project to get started!
          </p>
        </div>
      ) : (
        <ScrollArea className="flex-1">
          <div className="space-y-3 pr-4">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="p-4 hover:bg-muted cursor-pointer transition-colors"
              >
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground truncate">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    {project.category && (
                      <Badge
                        className={
                          categoryColors[project.category] ||
                          "bg-gray-100 text-gray-800"
                        }
                      >
                        {project.category}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {format(project.createdAt, "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
