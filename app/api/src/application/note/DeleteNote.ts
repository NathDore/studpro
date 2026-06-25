import { NoteRepository } from "../../domain/repositories/NoteRepository";

interface DeleteNoteInput {
    noteId: string;
}

export class DeleteNote {
    constructor(private readonly noteRepository: NoteRepository) { }

    async execute(input: DeleteNoteInput): Promise<void> {

        const existing = await this.noteRepository.findById(input.noteId);
        if (!existing) throw new Error("note must exist to be deleted");

        await this.noteRepository.delete(input.noteId);
    }
}