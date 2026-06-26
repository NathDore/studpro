import { randomUUID } from "crypto";
import { Note } from "../../domain/entities/Note";
import { NoteRepository } from "../../domain/repositories/NoteRepository";
import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { isValidText } from "./validator";

interface CreateNoteInput {
    taskId: string;
    text: string;
}

export class CreateNote {
    constructor(
        private readonly noteRepository: NoteRepository,
        private readonly taskRepository: TaskRepository,
    ) { }

    async execute(input: CreateNoteInput): Promise<Note> {
        const task = await this.taskRepository.findById(input.taskId);
        if (!task) {
            throw new Error("Task not found");
        }

        if (!isValidText(input.text)) {
            throw new Error("text cannot be empty");
        }

        const note: Note = {
            id: randomUUID(),
            taskId: input.taskId,
            text: input.text,
            isCompleted: false,
        };

        return this.noteRepository.create(note);
    }
}