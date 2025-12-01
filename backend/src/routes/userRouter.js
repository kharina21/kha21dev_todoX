import { Router } from "express";
import { getInfoUserController } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/getInfo", getInfoUserController);

export { userRouter };
