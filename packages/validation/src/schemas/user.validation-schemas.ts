import * as z from "zod";

const firstNameValidationSchema = z.string();
const lastNameValidationSchema = z.string();
const emailValidationSchema = z.email();
const passwordValidationSchema = z.string();

export {
  firstNameValidationSchema,
  lastNameValidationSchema,
  emailValidationSchema,
  passwordValidationSchema,
};
