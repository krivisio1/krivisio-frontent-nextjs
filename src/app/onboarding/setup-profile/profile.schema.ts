import z from "zod";

export const profileSchema = z.object({
  position: z.string().min(2, "Position must be at least 2 characters long"),
  bio: z.string().min(10, "Bio should be at least 10 characters long"),
  skills: z
    .array(z.string().min(1, "Skill cannot be empty"))
    .min(1, "Please add at least one skill"),
});

export type ProfileForm = z.infer<typeof profileSchema>;
