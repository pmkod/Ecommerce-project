import express from "express";
import { PORT } from "./core/configs/server.config";
import { prisma } from "./core/databases/postgres/prisma.client";
import { authRouter } from "./features/auth/auth.router";
import { userRouter } from "./features/user/user.router";
import { exceptionHandler } from "./core/exceptions/exception.handler";

const app = express();

app.get("/healthcheck", (_, res) => {
  res.send("Hello");
});

app.use(express.json());

app.use(authRouter);
app.use(userRouter);

app.use(exceptionHandler);

prisma
  .$connect()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();
    process.exit(1);
  });
