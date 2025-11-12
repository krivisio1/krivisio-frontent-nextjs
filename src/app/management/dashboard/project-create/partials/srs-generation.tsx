"use client";

import { useState, useEffect, useTransition } from "react";
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
import { useChatbot } from "@/app/providers/chatBotProvider/chatbot.context";

interface SRSGenerationDialogProps {
  additionalInstructions: string;
  onClose: () => void;
  onGenerate: () => void;
  generating: boolean;
}

export default function SRSGenerationDialog({
  additionalInstructions,
  onClose,
  onGenerate,
  generating,
}: SRSGenerationDialogProps) {
  const { srsContent, setSRSContent, generateSrs } = useChatbot();

  return (
    <Dialog open={true} onOpenChange={onClose}>
      {/* Increased dialog width and height */}
      <DialogContent className="w-[95%] max-w-7xl h-[90vh] flex flex-col">
        {generating ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-4">
            <Spinner />
            <p className="text-muted-foreground">Generating SRS document...</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#fb5711]">
                Generated SRS Document
              </DialogTitle>
            </DialogHeader>

            {/* Scrollable content area only */}
            <ScrollArea className="flex-1 border border-gray-200 p-4 bg-white/60 backdrop-blur-sm">
              <div className="pr-4">
                <MarkdownRenderer content={srsContent ?? ""} />
              </div>
            </ScrollArea>

            {/* Buttons remain fixed below content */}
            <div className="flex gap-3 pt-4 border-gray-200">
              <Button onClick={onClose} variant="outline">
                Cancel
              </Button>
              <Button
                onClick={onGenerate}
                className="bg-[#fb5711] hover:bg-[#fb5711]/90 text-white ml-auto"
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
