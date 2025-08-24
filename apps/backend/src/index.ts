import express from "express";
import { PORT } from "./core/configs/server.config";

const app = express();

app.get("/healthcheck", (_, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
