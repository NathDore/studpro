import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";

export class InMemoryTaskRepository implements TaskRepository {
    private tasks = new Map<string, Task>();

    async findAll(): Promise<Task[]> {
        return Array.from(this.tasks.values());
    }

    async findById(id: string): Promise<Task | null> {
        return this.tasks.get(id) ?? null;
    }

    async findByDay(day: string): Promise<Task[]> {
        return (await this.findAll()).filter((t) => t.day === day);
    }

    async create(task: Task): Promise<Task> {
        this.tasks.set(task.id, task);
        return task;
    }

    async update(id: string, updates: Partial<Task>): Promise<Task> {
        const existing = this.tasks.get(id);
        if (!existing) throw new Error("Task not found");

        const updated = { ...existing, ...updates };
        this.tasks.set(id, updated);
        return updated;
    }

    async delete(id: string): Promise<void> {
        this.tasks.delete(id);
    }
}