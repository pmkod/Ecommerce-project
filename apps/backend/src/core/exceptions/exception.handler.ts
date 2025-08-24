import { NextFunction, Request, Response } from "express";
import { ZodError } from "@repo/validation";

const exceptionHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorsToSend: any[] = [];

  if (err instanceof ZodError) {
    errorsToSend = err.issues;
  }

  if (errorsToSend.length === 0) {
    errorsToSend.push({ message: "Une erreur eest survennue" });
  }

  res.json({
    errors: errorsToSend,
  });
};

export { exceptionHandler };
