import z from "zod";

export const inviteSchema = z.object({
  emails: z
    .array(z.string().email("Invalid email"))
    .min(1, "Please enter at least one valid email"),
});
export type InviteForm = z.infer<typeof inviteSchema>;
