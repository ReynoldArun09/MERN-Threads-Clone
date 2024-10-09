import { z } from "zod";

export const UpdateProfileSchema = z.object({
  username: z.string().min(1, "Username is required").trim().optional(),
  name: z.string().optional().optional(),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .transform((email) => email.toLowerCase())
    .optional(),
  bio: z.string().optional(),
  password: z.string().optional().nullable(),
  profilePicture: z.string().optional(),
  website: z.string().optional(),
});

export type ProfileSchemaType = z.infer<typeof UpdateProfileSchema>;
