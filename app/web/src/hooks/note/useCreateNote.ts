import { useNoteStore } from "../../store/noteStore";

export const useCreateNote = () => {

    const { addNote } = useNoteStore();

    const submit = (id: string, taskId: string, text: string) => {
        addNote({ id, taskId, text, isCompleted: false });
    };

    return { submit };
}