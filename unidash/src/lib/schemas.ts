import z from "zod";

export const signUpSchema = z.object({
  name: z.string().min(6, "at least 6 characters"),
  email: z.email("invalid email"),
  password: z.string().min(8, "at least 8 characters"),
  role: z.enum(["admin", "teacher", "student"], {
    message: "role is required,choose between admin, teacher or student",
  }),
});
export const signInSchema = z.object({
  email: z.email("invalid email"),
  password: z.string().min(8, "at least 8 characters"),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type TSignInSchema = z.infer<typeof signInSchema>;
