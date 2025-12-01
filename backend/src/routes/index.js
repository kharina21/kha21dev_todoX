import { userRouter } from "./userRouter.js";
import { taskRouter } from "./taskRouter.js";

export const router = (app) => {
    app.use("/api/users", userRouter);
    app.use("/api/tasks", taskRouter);
};
