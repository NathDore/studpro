import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { CourseRepository } from "../../domain/repositories/CourseRepository";
import { isValidInterval, isValidISODate, isValidTime } from "./validator";

interface UpdateTaskInput {
    taskId: string;
    day: string;
    startTime: string;
    endTime: string;
    courseId: string;
}

export class UpdateTask {
    constructor(
        private readonly taskRepository: TaskRepository,
        private readonly courseRepository: CourseRepository,
    ) { }

    async execute(input: UpdateTaskInput): Promise<Task> {
        const exist = await this.taskRepository.findById(input.taskId);
        if (!exist) {
            throw new Error("Task not found");
        }

        const course = await this.courseRepository.findById(input.courseId);
        if (!course) {
            throw new Error("Course not found");
        }

        if (!isValidISODate(input.day)) {
            throw new Error("day must be a valid ISO date (YYYY-MM-DD)");
        }

        if (!isValidTime(input.startTime) || !isValidTime(input.endTime)) {
            throw new Error("time must be in HH:mm format, between 00:00 and 23:59");
        }

        if (!isValidInterval(input.startTime, input.endTime)) {
            throw new Error("startTime must be before endTime");
        }

        return this.taskRepository.update(input.taskId, {
            day: input.day,
            startTime: input.startTime,
            endTime: input.endTime,
            courseId: input.courseId,
        });
    }
}