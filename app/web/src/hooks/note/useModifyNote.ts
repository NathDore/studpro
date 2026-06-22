import { useNoteStore } from "../../store/noteStore";

export const useModifyNote = () => {
    const { updateNote } = useNoteStore();

    const submit = (id: string, taskId: string, text: string, isCompleted: boolean) => {
        updateNote({
            id,
            taskId,
            text,
            isCompleted: isCompleted || false
        });
    };

    return { submit };
}