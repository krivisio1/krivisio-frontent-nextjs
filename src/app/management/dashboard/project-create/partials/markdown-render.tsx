"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  return (
    <div
      className={`prose prose-sm dark:prose-invert max-w-none text-foreground ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1
              className="text-3xl font-bold mt-8 mb-4 text-[#fb5711]"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="text-2xl font-bold mt-6 mb-4 text-foreground"
              {...props}
            />
          ),
          strong: ({ node, ...props }) => (
            <strong className="text-[#fb5711] font-bold" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul
              className="list-disc list-inside space-y-2 mb-4 text-foreground"
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p className="text-foreground mb-3 leading-relaxed" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="text-foreground" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
