import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  return (
    <div
      className={cn("prose prose-gray max-w-none dark:prose-invert", className)}
    >
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-[#FB5711] font-semibold mb-3 text-lg">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-[#FB5711] font-semibold mb-2">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="font-semibold text-gray-800 mb-2">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="text-sm text-gray-700 space-y-1 mb-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-1 text-sm text-gray-700">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-700 text-sm">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#FB5711] pl-4 italic mb-4 text-gray-600 bg-orange-50 py-2">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-orange-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800">
                  {children}
                </code>
              );
            }
            return (
              <code className="block bg-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto text-gray-800 mb-4">
                {children}
              </code>
            );
          },
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-[#FB5711] hover:text-orange-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          hr: () => <hr className="border-orange-200 my-6" />,
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-800">{children}</strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
