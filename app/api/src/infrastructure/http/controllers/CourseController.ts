import { Request, Response } from "express";
import { CreateCourse } from "../../../application/course/CreateCourse";
import { UpdateCourse } from "../../../application/course/UpdateCourse";
import { DeleteCourse } from "../../../application/course/DeleteCourse";

export class CourseController {
    constructor(
        private readonly createCourse: CreateCourse,
        private readonly updateCourse: UpdateCourse,
        private readonly deleteCourse: DeleteCourse,
    ) { }

    create = async (req: Request, res: Response) => {
        try {
            const course = await this.createCourse.execute(req.body);
            res.status(201).json(course);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const course = await this.updateCourse.execute({
                courseId: req.params.id as string,
                ...req.body,
            });
            res.status(200).json(course);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            await this.deleteCourse.execute({ courseId: req.params.id as string });
            res.status(204).send();
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };
}