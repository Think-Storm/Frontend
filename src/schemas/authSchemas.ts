import { z } from "zod";

const emailSchema = z
  .string()
  .email({ message: "Please enter a valid email address" })
  .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
    message: "Please enter a valid email address",
  })
  .refine((val) => !val.includes(" "), {
    message: "Email cannot include spaces",
  });

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(16, { message: "Password must be at most 16 characters long" })
  .regex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?~-]).{8,16}$/,
    {
      message:
        "Password must include at least one uppercase letter, one lowercase letter, one number and one special character",
    }
  )
  .refine((val) => !val.includes(" "), {
    message: "Password cannot include spaces",
  });

const usernameSchema = z
  .string()
  .min(4, { message: "Username must be at least 4 characters long" })
  .max(15, { message: "Username must be at most 15 characters long" })
  .regex(/^[A-Za-z0-9_]+$/, {
    message: "Username can only contain letters, numbers and underscores",
  })
  .refine((val) => !val.includes(" "), {
    message: "Username cannot include spaces",
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signupSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});
