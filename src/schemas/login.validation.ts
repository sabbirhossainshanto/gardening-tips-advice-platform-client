import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email" }),
  password: z.string({ required_error: "Password id required" }),
});

export const changePasswordValidationSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string({ required_error: "New Password is required" }),
  confirmNewPassword: z.string({
    required_error: "Confirm password is required",
  }),
});
