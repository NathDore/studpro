import { Note } from "../../domain/entities/Note";
import { Task } from "../../domain/entities/Task";
import { NoteRepository } from "../../domain/repositories/NoteRepository";

export class InMemoryNoteRepository implements NoteRepository {
    private notes = new Map<string, Note>();

    async findAll(): Promise<Note[]> {
        return Array.from(this.notes.values());
    }

    async findById(id: string): Promise<Note | null> {
        return this.notes.get(id) ?? null;
    }

    async findByTask(task: Task): Promise<Note[]> {
        return (await this.findAll()).filter((n) => n.taskId === task.id);
    }

    async create(note: Note): Promise<Note> {
        this.notes.set(note.id, note);
        return note;
    }

    async update(id: string, updates: Partial<Note>): Promise<Note> {
        const existing = this.notes.get(id);
        if (!existing) throw new Error("Note not found");

        const updated = { ...existing, ...updates };
        this.notes.set(id, updated);
        return updated;
    }

    async delete(id: string): Promise<void> {
        this.notes.delete(id);
    }
}