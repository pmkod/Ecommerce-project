import { Router } from "express";
import { getMe } from "./user.controller";

const userRouter = Router();

userRouter.get("/users/me", getMe);

export { userRouter };
