import type { Course } from "./Course";

export interface Task {
    id: string,
    course: Course,
    description: string;
    start: Date;
    end: Date;
}