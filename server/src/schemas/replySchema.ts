import { z } from "zod";

export const replySchema = z.object({
  body: z.object({
    text: z
      .string()
      .min(1)
      .max(20, { message: "Text length cannot exist more then 20 charc" }),
  }),
});
