import { Note } from "../entities/Note";
import { Task } from "../entities/Task";

export interface NoteRepository {
    findAll(): Promise<Note[]>;
    findById(id: string): Promise<Note | null>;
    findByTask(task: Task): Promise<Note[]>;
    create(note: Note): Promise<Note>;
    update(id: string, updates: Partial<Note>): Promise<Note>;
    delete(id: string): Promise<void>;
}