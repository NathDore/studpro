import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import type { Note } from "../../../../../../../types/Note";
import type { TaskPosition } from "../../utils/taskUtils";
import type { Task } from "../../../../../../../types/Task";

export interface NoteLayout {
    expanded: Note[];
    collapsed: Note[];
}

interface UseNoteLayoutProps {
    task: Task;
    position: TaskPosition
}

const ICON_ROW_HEIGHT = 20;
const ICON_ROW_BOTTOM_PADDING = 5;

export const useNoteLayout = ({ task, position }: UseNoteLayoutProps) => {
    const titleRef = useRef<HTMLParagraphElement>(null);
    const noteRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    const refreshNoteLayoutRef = useRef<() => void>(() => { });

    const [layout, setLayout] = useState<NoteLayout>({ expanded: [], collapsed: [] });
    const [measured, setMeasured] = useState(false);
    const [stableHeight, setStableHeight] = useState(position.height);

    const refreshNoteLayout = useCallback(() => {
        refreshNoteLayoutRef.current();
    }, []);

    refreshNoteLayoutRef.current = () => {
        setStableHeight(position.height);
    };

    useEffect(() => {
        const currentIds = new Set(task.notes.map(n => n.id));
        for (const id of noteRefs.current.keys()) {
            if (!currentIds.has(id)) noteRefs.current.delete(id);
        }
        setMeasured(false);
    }, [stableHeight, task.notes]);

    useEffect(() => {
        if (!titleRef.current) return;
        if (measured) return;

        const titleStyle = getComputedStyle(titleRef.current);
        const titleHeight = titleRef.current.offsetHeight
            + parseFloat(titleStyle.marginTop)
            + parseFloat(titleStyle.marginBottom);

        const taskEl = titleRef.current.parentElement;
        if (!taskEl) return;
        const taskStyle = getComputedStyle(taskEl);
        const taskPadding = parseFloat(taskStyle.paddingTop) + parseFloat(taskStyle.paddingBottom);

        const containerEl = taskEl.querySelector('.expanded-container');
        const gap = containerEl
            ? parseFloat(getComputedStyle(containerEl).gap)
            : 0;

        let remaining = stableHeight - titleHeight - taskPadding - ICON_ROW_HEIGHT - ICON_ROW_BOTTOM_PADDING;
        const expanded: Note[] = [];
        const collapsed: Note[] = [];

        for (const note of task.notes) {
            const el = noteRefs.current.get(note.id);
            if (!el) continue;

            const gapNeeded = expanded.length > 0 ? gap : 0;
            const needed = el.offsetHeight + gapNeeded;

            if (needed <= remaining) {
                expanded.push(note);
                remaining -= needed;
            } else {
                collapsed.push(note);
            }
        }

        setLayout({ expanded, collapsed });
        setMeasured(true);

    }, [measured]);

    return { titleRef, noteRefs, layout, measured, refreshNoteLayout };
}

