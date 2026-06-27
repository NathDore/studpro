import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

export function taskRoutes(controller: TaskController): Router {

    const router = Router();

    router.post("/tasks", controller.create);
    router.put("/tasks/:id", controller.update);
    router.delete("/tasks/:id", controller.delete);

    return router;
}