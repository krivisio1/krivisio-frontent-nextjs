"use client";

import type React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  const parseMarkdown = (text: string): React.ReactNode[] => {
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Headers
      if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={`h2-${i}`}
            className="text-2xl font-bold mt-6 mb-4 text-foreground"
          >
            {line.replace("## ", "")}
          </h2>,
        );
        i++;
        continue;
      }

      if (line.startsWith("# ")) {
        elements.push(
          <h1
            key={`h1-${i}`}
            className="text-3xl font-bold mt-8 mb-4 text-[#fb5711]"
          >
            {line.replace("# ", "")}
          </h1>,
        );
        i++;
        continue;
      }

      // Bold text with ** **
      if (line.includes("**")) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        const nodes = parts.map((part, idx) =>
          idx % 2 === 1 ? (
            <strong key={idx} className="text-[#fb5711] font-bold">
              {part}
            </strong>
          ) : (
            part
          ),
        );
        elements.push(
          <p key={`p-${i}`} className="text-foreground mb-3">
            {nodes}
          </p>,
        );
        i++;
        continue;
      }

      // Bullet points
      if (line.trim().startsWith("- ")) {
        const bulletItems: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith("- ")) {
          bulletItems.push(lines[i].trim().replace("- ", ""));
          i++;
        }
        elements.push(
          <ul key={`ul-${i}`} className="list-disc list-inside space-y-2 mb-4">
            {bulletItems.map((item, idx) => (
              <li key={`li-${idx}`} className="text-foreground">
                {item}
              </li>
            ))}
          </ul>,
        );
        continue;
      }

      // Empty lines
      if (line.trim() === "") {
        i++;
        continue;
      }

      // Paragraphs
      elements.push(
        <p key={`p-${i}`} className="text-foreground mb-3">
          {line}
        </p>,
      );
      i++;
    }

    return elements;
  };

  return (
    <div className={`prose prose-sm max-w-none text-foreground ${className}`}>
      {parseMarkdown(content)}
    </div>
  );
}
