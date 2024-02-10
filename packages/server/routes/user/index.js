import { Router } from "express";
import { getAllUsers, setAvatar } from "../../controllers/user/index.js";

export const userRouter = () => {
  const router = Router();

  router.get("/allusers/:id", getAllUsers);
  router.post("/setavatar/:id", setAvatar);

  return router;
};
