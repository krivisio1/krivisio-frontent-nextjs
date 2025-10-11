import * as z from "zod";

export const createOrgSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  industry_type: z
    .string()
    .min(2, "Industry type must be at least 2 characters"),
});

export type CreateOrgSchemaType = z.infer<typeof createOrgSchema>;
