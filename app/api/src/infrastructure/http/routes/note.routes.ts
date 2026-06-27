import { Router } from "express";
import { NoteController } from "../controllers/NoteController";

export function noteRoutes(controller: NoteController): Router {
    const router = Router();

    router.post("/notes", controller.create);
    router.put("/notes/:id", controller.update);
    router.delete("/notes/:id", controller.delete);

    return router;
}