import { Request, Response } from "express";
import {
  loginValidationSchema,
  signupValidationSchema,
} from "@repo/validation";
import { prisma } from "../../core/databases/postgres/prisma.client";
import { hashPassword } from "./functions/password.function";
import { generateUserVerificationToken } from "./functions/token.function";
import { generateOtp } from "./functions/otp.function";

const signup = async (req: Request, res: Response) => {
  const signupData = await signupValidationSchema.parseAsync(req.body);

  const userWithGivenMail = await prisma.user.findUnique({
    where: { email: signupData.email },
  });

  if (userWithGivenMail !== null) {
    throw Error("L'email est déjà prise");
  }

  signupData.password = await hashPassword(signupData.password);

  const userVerificationToken = generateUserVerificationToken();

  const otp = await generateOtp();

  const userVerification = await prisma.userVerification.create({
    data: {
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      email: signupData.email,
      password: signupData.password,
      token: userVerificationToken,
      agent: "",
      purpose: "",
      ip: "",
      otp,
    },
    select: {
      id: true,
      token: true,
    },
  });

  //   res.cookie("userVerificationId", userVerification.id, {});
  //   res.cookie("userVerificationToken", userVerification.token, {});
  res.json({
    userVerification,
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = await loginValidationSchema.parseAsync(req.body);

  const userWithGivenMail = await prisma.user.findUnique({
    where: { email },
  });

  if (userWithGivenMail === null) {
    throw Error("Email ou mot de passe incorrect");
  }
};

const passwordReset = (req: Request, res: Response) => {};

const refreshToken = (req: Request, res: Response) => {};

export { login, signup, passwordReset, refreshToken };
