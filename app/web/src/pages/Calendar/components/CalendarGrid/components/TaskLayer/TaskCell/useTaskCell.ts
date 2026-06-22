import { useEffect, useState } from "react"
import { TASK_LAYOUT_THRESHOLDS, CALENDAR_ROW_HEIGHT, TASK_CELL_TITLE_HEIGHT, TASK_CELL_ICONS_HEIGHT, TASK_CELL_NOTE_HEIGHT, TASK_CELL_PADDING } from "../../../../../../../config/calendar-configs";
import { getTaskDuration } from "../../../../../../../utils/taskUtils";
import type { Task } from "../../../../../../../types/Task";
import type { Note } from "../../../../../../../types/Note";

export const useTaskCell = (task: Task | null, notes: Note[]) => {
    const [layout, setLayout] = useState<'full' | 'inline' | 'minimal'>('full');
    const [iconships, setIconships] = useState<Note[]>([]);
    const [expandedNotes, setExpandedNotes] = useState<Note[]>([]);

    useEffect(() => {
        if (!task) return;

        const taskDuration = getTaskDuration(task.startTime, task.endTime);
        const totalNotes = notes.length;

        if (taskDuration <= TASK_LAYOUT_THRESHOLDS.MINIMAL) {
            setLayout('minimal');
            setExpandedNotes([]);
            setIconships([]);
        } else if (taskDuration <= TASK_LAYOUT_THRESHOLDS.INLINE) {
            setLayout('inline');
            setExpandedNotes([]);
            setIconships(notes);
        } else {
            setLayout('full');

            const taskHeightPx = (taskDuration / 60) * CALENDAR_ROW_HEIGHT;
            const availablePx = taskHeightPx - (TASK_CELL_PADDING * 2) - TASK_CELL_TITLE_HEIGHT - TASK_CELL_ICONS_HEIGHT;
            const expandedCount = Math.min(Math.floor(availablePx / TASK_CELL_NOTE_HEIGHT), totalNotes);

            const expandedNotesArr = notes.slice(0, expandedCount);
            const iconshipsArr = notes.slice(expandedCount);

            setExpandedNotes(expandedNotesArr);
            setIconships(iconshipsArr);
        }

    }, [task]);

    return { layout, expandedNotes, iconships };
};