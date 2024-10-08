import { z } from "zod";

export const ReplySchema = z.object({
  text: z.string().min(4, "Reply must be at least 4 characters long"),
});

export type ReplySchemaType = z.infer<typeof ReplySchema>;
