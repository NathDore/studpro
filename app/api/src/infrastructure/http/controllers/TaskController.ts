import { Request, Response } from "express";
import { CreateTask } from "../../../application/task/CreateTask";
import { DeleteTask } from "../../../application/task/DeleteTask";
import { UpdateTask } from "../../../application/task/UpdateTask";

export class TaskController {
    constructor(
        private readonly createTask: CreateTask,
        private readonly updateTask: UpdateTask,
        private readonly deleteTask: DeleteTask,
    ) { }

    create = async (req: Request, res: Response) => {
        try {
            const task = await this.createTask.execute(req.body);
            res.status(201).json(task);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const task = await this.updateTask.execute({ taskId: req.params.id as string, ...req.body });
            res.status(200).json(task);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            await this.deleteTask.execute({ taskId: req.params.id as string });
            res.status(204).send();
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };
}