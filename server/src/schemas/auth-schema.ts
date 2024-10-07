import { z } from "zod";

export const signinSchema = z.object({
  body: z.object({
    username: z.string().min(1, "Username is required").trim(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});

export const signupSchema = z.object({
  body: z.object({
    username: z.string().min(1, "Username is required").trim(),
    name: z.string().optional(),
    email: z
      .string()
      .email("Please enter a valid email address.")
      .transform((email) => email.toLowerCase()),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character."
      ),
  }),
});
