import { z } from "zod";

export const PostSchema = z.object({
  text: z.string(),
  image: z.string().optional(),
});

export type PostSchemaType = z.infer<typeof PostSchema>;
