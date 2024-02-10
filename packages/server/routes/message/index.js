import { Router } from "express";
import { addMessage, getMessages } from "../../controllers/message/index.js";

const messageRouter = () => {
  const router = Router();

  router.post("/addmsg/", addMessage);
  router.post("/getmsg/", getMessages);

  return router;
};

export { messageRouter };
