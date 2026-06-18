import { useEffect, useState } from "react"
import type { Task } from "../../../../../../../types/Task";
import type { Note } from "../../../../../../../types/Note";
import { getTaskDuration, getTaskHours } from "../../../../../../../utils/taskUtils";

interface UseTaskCellProps {
    task: Task;
}

export const useTaskCell = ({ task }: UseTaskCellProps) => {
    const [layout, setLayout] = useState<'full' | 'inline' | 'minimal'>('full');
    const [iconships, setIconships] = useState<Note[]>([]);
    const [expandedNotes, setExpandedNotes] = useState<Note[]>([]);

    useEffect(() => {
        const taskDuration = getTaskDuration(task.startTime, task.endTime);
        const totalNotes = task.notes.length;

        if (taskDuration <= 30) {
            setLayout('minimal');
            setExpandedNotes([]);
            setIconships([]);
        } else if (taskDuration <= 120) {
            setLayout('inline');
            setExpandedNotes([]);
            setIconships(task.notes);
        } else {
            setLayout('full');

            const RESERVED_HOURS_TITLE = 1;
            const RESERVED_HOURS_ICONS = 1;
            const taskHours = getTaskHours(task.startTime, task.endTime);
            const availableHoursForNotes = taskHours - RESERVED_HOURS_TITLE - RESERVED_HOURS_ICONS;

            const expandedCount = Math.min(availableHoursForNotes, totalNotes);
            const expandedNotesArr = task.notes.slice(0, expandedCount);
            const iconshipsArr = task.notes.slice(expandedCount);

            setExpandedNotes(expandedNotesArr);
            setIconships(iconshipsArr);
        }


    }, [task]);

    return { layout, expandedNotes, iconships };
};