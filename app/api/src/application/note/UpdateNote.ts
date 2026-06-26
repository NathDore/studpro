import { Note } from "../../domain/entities/Note";
import { NoteRepository } from "../../domain/repositories/NoteRepository";
import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { isValidText } from "./validator";

interface UpdateNoteInput {
    noteId: string;
    taskId: string;
    text: string;
    isCompleted: boolean;
}

export class UpdateNote {
    constructor(
        private readonly noteRepository: NoteRepository,
        private readonly taskRepository: TaskRepository,
    ) { }

    async execute(input: UpdateNoteInput): Promise<Note> {
        const task = await this.taskRepository.findById(input.taskId);
        if (!task) {
            throw new Error("Task not found");
        }

        const exist = await this.noteRepository.findById(input.noteId);
        if (!exist) {
            throw new Error("Note not found");
        }

        if (!isValidText(input.text)) {
            throw new Error("text cannot be empty");
        }

        return this.noteRepository.update(input.noteId, {
            text: input.text,
            isCompleted: input.isCompleted,
        });
    }
}