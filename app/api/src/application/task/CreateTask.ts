import { randomUUID } from "crypto";
import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { isValidInterval, isValidISODate, isValidTime } from "./validator";
import { CourseRepository } from "../../domain/repositories/CourseRepository";

interface CreateTaskInput {
    day: string;
    startTime: string;
    endTime: string;
    courseId: string;
}

export class CreateTask {
    constructor(
        private readonly taskRepository: TaskRepository,
        private readonly courseRepository: CourseRepository,
    ) { }

    async execute(input: CreateTaskInput): Promise<Task> {
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

        const task: Task = {
            id: randomUUID(),
            day: input.day,
            startTime: input.startTime,
            endTime: input.endTime,
            courseId: input.courseId,
        };

        return this.taskRepository.create(task);
    }
}