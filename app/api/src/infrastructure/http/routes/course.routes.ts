import { Router } from "express";
import { CourseController } from "../controllers/CourseController";

export function courseRoutes(controller: CourseController): Router {
    const router = Router();

    router.post("/courses", controller.create);
    router.put("/courses/:id", controller.update);
    router.delete("/courses/:id", controller.delete);

    return router;
}