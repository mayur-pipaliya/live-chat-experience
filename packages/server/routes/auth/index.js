import { Router } from "express";
import {
  logOut,
  login,
  register,
  getToken,
} from "../../controllers/user/index.js";

const authRouter = () => {
  const router = Router();

  router.post("/login", login);
  router.post("/token", getToken);
  router.post("/register", register);
  router.get("/logout/:id", logOut);

  return router;
};

export { authRouter };
