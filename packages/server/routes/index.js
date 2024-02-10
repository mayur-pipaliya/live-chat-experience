import { Router } from "express";
import { userRouter } from "./user/index.js";
import { authRouter } from "./auth/index.js";
import { messageRouter } from "./message/index.js";
import authCheck from "../middleware/authCheck.js";

export const v1Router = () => {
  const router = Router();

  router.use("/auth", authRouter());

  router.use(authCheck);

  router.use("/user", userRouter());
  router.use("/messages", messageRouter());

  return router;
};
