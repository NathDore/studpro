import { useState } from "react"
import type { Note } from "../../../../types/Note";
import { useTaskStore } from "../../../../store/taskStore";

interface UseNoteItemProps {
    note: Note;
    taskId: string;
}

export const useNoteItem = ({ note, taskId }: UseNoteItemProps) => {
    const { updateNote } = useTaskStore();

    const [isChecked, setIsChecked] = useState<boolean>(note.isCompleted);

    const onChecked = () => {
        const isCompleted = !isChecked;
        setIsChecked(prev => !prev);
        updateNote(taskId, { ...note, isCompleted: isCompleted });
    }
    return {
        isChecked,
        onChecked
    }
}