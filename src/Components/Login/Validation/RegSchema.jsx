import * as yup from "yup";

export const registerSchema = (showEmail) =>
  yup
    .object({
      username: yup
        .string()
        .required("Username is required")
        .min(5, "Username must be at least 5 characters"),
      Email: showEmail
        ? yup.string().email("Invalid email").required("Email is required")
        : null,
      Password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    })
    .required();
