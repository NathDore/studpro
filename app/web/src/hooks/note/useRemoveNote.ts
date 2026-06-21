import { useNoteStore } from "../../store/noteStore";

export const useRemoveNote = () => {
    const { removeNote } = useNoteStore();

    const submit = (noteId: string) => {
        removeNote(noteId);
    };

    return { submit };
}