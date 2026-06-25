import { randomUUID } from "crypto";
import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";

interface CreateTaskInput {
    day: string;
    startTime: string;
    endTime: string;
    courseId: string;
}

function isValidTime(time: string): boolean {
    const [hourStr, minuteStr] = time.split(":");
    const hour = Number(hourStr);
    const minutes = Number(minuteStr);
    return hour >= 0 && hour <= 23 && minutes >= 0 && minutes <= 59;
}

function isValidISODate(day: string): boolean {
    const iso = /^\d{4}-\d{2}-\d{2}$/.test(day);
    if (!iso) return false;
    const date = new Date(day);
    return !isNaN(date.getTime());
}

export class CreateTask {
    constructor(private readonly taskRepository: TaskRepository) { }

    async execute(input: CreateTaskInput): Promise<Task> {
        if (!input.courseId) {
            throw new Error("courseId is required");
        }

        if (!isValidISODate(input.day)) {
            throw new Error("day must be a valid ISO date (YYYY-MM-DD)");
        }

        if (!isValidTime(input.startTime) || !isValidTime(input.endTime)) {
            throw new Error("time must be in HH:mm format, between 00:00 and 23:59");
        }

        if (input.startTime >= input.endTime) {
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