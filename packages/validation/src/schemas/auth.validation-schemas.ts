import * as z from "zod";
import {
  emailValidationSchema,
  firstNameValidationSchema,
  lastNameValidationSchema,
  passwordValidationSchema,
} from "./user.validation-schemas";

const loginValidationSchema = z.object({
  email: emailValidationSchema,
  password: passwordValidationSchema,
});

const signupValidationSchema = z.object({
  firstName: firstNameValidationSchema,
  lastName: lastNameValidationSchema,
  email: emailValidationSchema,
  password: passwordValidationSchema,
});

export { signupValidationSchema, loginValidationSchema };
