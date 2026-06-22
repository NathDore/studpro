import { useState } from "react"
import type { Note } from "../../../../types/Note";
import { useNoteStore } from "../../../../store/noteStore";

interface UseNoteItemProps {
    note: Note;
    taskId: string;
}

export const useNoteItem = ({ note }: UseNoteItemProps) => {
    const { updateNote } = useNoteStore();

    const [isChecked, setIsChecked] = useState<boolean>(note.isCompleted);

    const onChecked = () => {
        const isCompleted = !isChecked;
        setIsChecked(prev => !prev);
        updateNote({ ...note, isCompleted: isCompleted });
    }
    return {
        isChecked,
        onChecked
    }
}