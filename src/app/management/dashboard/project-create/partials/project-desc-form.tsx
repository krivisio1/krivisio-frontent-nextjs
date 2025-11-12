"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useChatbot } from "@/app/providers/chatBotProvider/chatbot.context";

const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectDescForm() {
  const [loading, startTransition] = useTransition();

  const { generateProjectBreakdown } = useChatbot();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: ProjectFormValues) => {
    startTransition(async () => {
      await generateProjectBreakdown(data.description);
    });
  };

  return (
    <Card className="shadow-md border-[#fb5711]/20 bg-white/80 backdrop-blur-sm rounded-sm">
      <CardContent className="p-8 space-y-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Title Field */}
          <div>
            <label className="text-lg font-semibold text-gray-800 block mb-2">
              Project Title
            </label>
            <Input
              placeholder="Enter your project title"
              {...register("title")}
              className="text-base border-[#fb5711]/30 focus:border-[#fb5711] rounded-sm"
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="text-lg font-semibold text-gray-800 block mb-2">
              Project Description
            </label>
            <Textarea
              placeholder="Describe your project in detail..."
              {...register("description")}
              className="min-h-40 text-base border-[#fb5711]/30 focus:border-[#fb5711] rounded-sm"
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className="px-8 py-5 text-lg bg-[#fb5711] hover:bg-[#fb5711]/90 text-white font-semibold rounded-sm shadow-md"
            >
              {loading ? "Generating..." : "Generate Breakdown"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
