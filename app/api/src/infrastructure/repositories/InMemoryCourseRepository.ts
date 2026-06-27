import { Course } from "../../domain/entities/Course";
import { Task } from "../../domain/entities/Task";
import { CourseRepository } from "../../domain/repositories/CourseRepository";

export class InMemoryCourseRepository implements CourseRepository {
    private courses = new Map<string, Course>();

    async findAll(): Promise<Course[]> {
        return Array.from(this.courses.values());
    }

    async findById(id: string): Promise<Course | null> {
        return this.courses.get(id) ?? null;
    }

    async findByTask(task: Task): Promise<Course[]> {
        if (!task.courseId) return [];
        const course = this.courses.get(task.courseId);
        return course ? [course] : [];
    }

    async findByName(name: string): Promise<Course | null> {
        return (await this.findAll()).find((c) => c.name === name) ?? null;
    }

    async create(course: Course): Promise<Course> {
        this.courses.set(course.id, course);
        return course;
    }

    async update(id: string, updates: Partial<Course>): Promise<Course> {
        const existing = this.courses.get(id);
        if (!existing) throw new Error("Course not found");

        const updated = { ...existing, ...updates };
        this.courses.set(id, updated);
        return updated;
    }

    async delete(id: string): Promise<void> {
        this.courses.delete(id);
    }
}