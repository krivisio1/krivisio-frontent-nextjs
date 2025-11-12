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
          // Headings
          h1: ({ node, ...props }) => (
            <h1
              className="text-3xl font-extrabold mt-10 mb-6 text-[#fb5711] border-b border-muted pb-2"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="text-2xl font-bold mt-8 mb-4 text-foreground border-b border-border pb-1"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="text-xl font-semibold mt-6 mb-3 text-[#fb5711]"
              {...props}
            />
          ),
          h4: ({ node, ...props }) => (
            <h4
              className="text-lg font-semibold mt-5 mb-2 text-foreground italic"
              {...props}
            />
          ),

          // Text elements
          p: ({ node, ...props }) => (
            <p className="text-foreground mb-3 leading-relaxed" {...props} />
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
          ol: ({ node, ...props }) => (
            <ol
              className="list-decimal list-inside space-y-2 mb-4 text-foreground"
              {...props}
            />
          ),
          li: ({ node, ...props }) => (
            <li className="text-foreground leading-relaxed" {...props} />
          ),

          // Tables
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6 border border-border rounded-lg">
              <table
                className="min-w-full border-collapse text-sm text-left text-foreground"
                {...props}
              />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead
              className="bg-muted text-[#fb5711] font-semibold"
              {...props}
            />
          ),
          th: ({ node, ...props }) => (
            <th
              className="px-4 py-2 border-b border-border text-sm font-semibold"
              {...props}
            />
          ),
          tbody: ({ node, ...props }) => (
            <tbody className="divide-y divide-border" {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr className="hover:bg-muted/50 transition-colors" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-2 align-top" {...props} />
          ),

          // Code blocks (optional enhancement)
          code: ({ node, ...props }) => (
            <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-sm text-foreground">
              <code {...props} />
            </pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
