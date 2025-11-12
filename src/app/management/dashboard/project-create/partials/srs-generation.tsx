"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { MarkdownRenderer } from "./markdown-render";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SRSGenerationDialogProps {
  categoryContent: string;
  selectedCategory: string;
  additionalInstructions: string;
  onClose: () => void;
  onGenerate: () => void;
}

export default function SRSGenerationDialog({
  categoryContent,
  selectedCategory,
  additionalInstructions,
  onClose,
  onGenerate,
}: SRSGenerationDialogProps) {
  const [step, setStep] = useState<"generating" | "result">("generating");
  const [srsContent, setSRSContent] = useState("");

  const generateSRS = async () => {
    try {
      const mockSRS = `# Software Requirements Specification (SRS)

## 1. Introduction

### 1.1 Purpose
This document outlines the software requirements for a Library Management System (LMS)...

## 4. Additional Instructions
${additionalInstructions || "No additional instructions provided."}`;

      setSRSContent(mockSRS);
      setStep("result");
    } catch (error) {
      console.error("Error generating SRS:", error);
    }
  };

  useEffect(() => {
    generateSRS();
  }, []);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className="
          w-[90%]           /* base width */
          !max-w-[70vw]      /* responsive max width */
          h-[90vh]          /* large vertical space */
          p-0               /* remove default padding for custom layout */
          overflow-hidden   /* prevent layout shifts */
          flex flex-col
        "
      >
        {step === "generating" && (
          <div className="flex flex-col items-center justify-center flex-1 gap-4">
            <Spinner />
            <p className="text-muted-foreground">Generating SRS document...</p>
          </div>
        )}

        {step === "result" && (
          <>
            {/* Header */}
            <DialogHeader className="px-6 pt-5 pb-3 border-b border-gray-200 bg-white/70 backdrop-blur-sm">
              <DialogTitle className="text-2xl font-bold text-[#fb5711]">
                Generated SRS Document
              </DialogTitle>
            </DialogHeader>

            {/* Scrollable Markdown area */}
            <ScrollArea className="flex-1 px-8 py-6 bg-white/70 backdrop-blur-sm">
              <div className="w-full mx-auto pr-4">
                <MarkdownRenderer content={srsContent} />
              </div>
            </ScrollArea>

            {/* Sticky footer buttons */}
            <div className="flex justify-end gap-3 p-5 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
              <Button
                variant="outline"
                onClick={onClose}
                className="border-[#fb5711] text-[#fb5711]"
              >
                Cancel
              </Button>
              <Button
                onClick={onGenerate}
                className="bg-[#fb5711] hover:bg-[#fb5711]/90 text-white"
              >
                Submit SRS
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
