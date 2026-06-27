import { Request, Response } from "express";
import { CreateNote } from "../../../application/note/CreateNote";
import { UpdateNote } from "../../../application/note/UpdateNote";
import { DeleteNote } from "../../../application/note/DeleteNote";

export class NoteController {
    constructor(
        private readonly createNote: CreateNote,
        private readonly updateNote: UpdateNote,
        private readonly deleteNote: DeleteNote,
    ) { }

    create = async (req: Request, res: Response) => {
        try {
            const note = await this.createNote.execute(req.body);
            res.status(201).json(note);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const note = await this.updateNote.execute({
                noteId: req.params.id as string,
                ...req.body,
            });
            res.status(200).json(note);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            await this.deleteNote.execute({ noteId: req.params.id as string });
            res.status(204).send();
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    };
}