import { Router } from "express";
import { login, passwordReset, refreshToken, signup } from "./auth.controller";

const authRouter = Router();

authRouter.post("/auth/signup", signup);
authRouter.post("/auth/login", login);
authRouter.post("/auth/password-reset", passwordReset);

authRouter.post("/auth/refresh-token", refreshToken);

export { authRouter };
