import { Router } from "express";
import {
    getAllTask,
    addTask,
    updateTask,
    deleteTask,
} from "../controllers/tasksController.js";

const taskRouter = Router();

taskRouter.get("/", getAllTask);

taskRouter.post("/add", addTask);

taskRouter.put("/update/:id", updateTask);

taskRouter.delete("/delete/:id", deleteTask);

export { taskRouter };
