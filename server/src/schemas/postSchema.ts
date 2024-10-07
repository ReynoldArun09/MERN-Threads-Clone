import { z } from "zod";

export const postSchema = z.object({
  body: z.object({
    text: z
      .string()
      .min(1, "Text is required")
      .max(400, "Text is too long")
      .optional(),
    img: z.string().optional(),
    postedById: z.string(),
  }),
});
