import type { Course } from "./Course";
import type { Note } from "./Note";

export interface Task {
    id: string,
    course: Course,
    notes: Note[];
    start: Date;
    end: Date;
}