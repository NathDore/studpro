import { useEffect, useRef } from "react";
import type { Task } from "../../../../../../types/Task";
import { useTaskStore } from "../../../../../../store/taskStore";
import { CELL_HEIGHT } from "../../../../constants";
import type { TaskPosition } from "../utils/taskUtils";

interface useTaskCellProps { }

export const useTaskCell = () => {
    const isResizing = useRef(false);
    const direction = useRef<'top' | 'bottom'>('top');
    const startY = useRef(0);
    const startHeight = useRef(0);
    const startTop = useRef(0);
    const activeTask = useRef<Task | null>(null);

    const { updateTask } = useTaskStore();

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    const onResizeTop = (e: MouseEvent, task: Task, position: TaskPosition) => {
        e.preventDefault();
        e.stopPropagation();

        startY.current = e.clientY;
        startHeight.current = position.height;
        startTop.current = position.top;
        activeTask.current = task;
        direction.current = 'top';
        isResizing.current = true;
    };

    const onResizeBottom = (e: MouseEvent, task: Task, position: TaskPosition) => {
        e.preventDefault();
        e.stopPropagation();

        startY.current = e.clientY;
        startHeight.current = position.height;
        startTop.current = position.top;
        activeTask.current = task;
        direction.current = 'bottom';
        isResizing.current = true;
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!isResizing.current || !activeTask.current) return;

        const deltaY = e.clientY - startY.current;
        const newStart = new Date(activeTask.current.start);
        const newEnd = new Date(activeTask.current.end);

        if (direction.current === 'top') {
            const newTop = startTop.current + deltaY;
            const newHours = newTop / CELL_HEIGHT;
            newStart.setHours(Math.floor(newHours));
            newStart.setMinutes((newHours % 1) * 60);
        }

        if (direction.current === 'bottom') {
            const newBottom = startTop.current + startHeight.current + deltaY;
            const newHours = newBottom / CELL_HEIGHT;
            newEnd.setHours(Math.floor(newHours));
            newEnd.setMinutes((newHours % 1) * 60);
        }

        updateTask({ ...activeTask.current, start: newStart, end: newEnd });
    };

    const onMouseUp = () => {
        if (!isResizing.current) return;
        isResizing.current = false;
        activeTask.current = null;
    };

    const getDarkerColor = (color: string): string => {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const darken = (c: number) => Math.max(0, Math.floor(c * 0.65));
        const toHex = (c: number) => darken(c).toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    return { getDarkerColor, onResizeTop, onResizeBottom, isResizing };
};