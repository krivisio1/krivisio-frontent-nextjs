import z from "zod";
export enum JoinStatus {
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}

export const inviteSchema = z.object({
  emails: z
    .array(z.string().email("Invalid email"))
    .min(1, "Please enter at least one valid email"),
});

export const joinSchema = z.object({
  status: z.nativeEnum(JoinStatus),
});

export type JoinForm = z.infer<typeof joinSchema>;

export type InviteForm = z.infer<typeof inviteSchema>;
