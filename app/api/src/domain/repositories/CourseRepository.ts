import { Course } from "../entities/Course";
import { Task } from "../entities/Task";

export interface CourseRepository {
    findAll(): Promise<Course[]>;
    findById(id: string): Promise<Course | null>;
    findByTask(task: Task): Promise<Course[]>;
    create(course: Course): Promise<Course>;
    update(id: string, updates: Partial<Course>): Promise<Course>;
    delete(id: string): Promise<void>;
}