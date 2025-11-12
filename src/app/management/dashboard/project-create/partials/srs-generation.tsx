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
  onClose,
  onGenerate,
  generating,
}: SRSGenerationDialogProps) {
  const { srsContent, setSRSContent, generateSrs } = useChatbot();

  return (
    <Dialog open={true} onOpenChange={onClose}>
      {/* Increased dialog width and height */}
      <DialogContent
        className="
        w-[90%]
        !max-w-[70vw]
        h-[90vh]
        p-0
        overflow-hidden
        flex flex-col
      "
      >
        {generating ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-4">
            <Spinner />
            <p className="text-muted-foreground">Generating SRS document...</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <DialogHeader className="px-6 pt-5 pb-3 border-b border-gray-200 bg-white/70 backdrop-blur-sm">
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
