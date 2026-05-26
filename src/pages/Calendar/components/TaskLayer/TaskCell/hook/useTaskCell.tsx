import { useCallback, useEffect, useRef } from "react";
import type { Task } from "../../../../../../types/Task";
import { useTaskStore } from "../../../../../../store/taskStore";
import { CELL_HEIGHT } from "../../../../constants";
import { getTaskPosition, type TaskPosition } from "../utils/taskUtils";
import { useCellWidth } from "../../hook/useCellWidth";
import { TASK_GAP } from "../../constants";

type Direction = 'top' | 'bottom';

export const useTaskCell = () => {
    const isResizing = useRef(false);
    const direction = useRef<Direction>('top');
    const startY = useRef(0);
    const startHeight = useRef(0);
    const startTop = useRef(0);
    const activeTask = useRef<Task | null>(null);
    const adjacentTask = useRef<Task | null>(null);

    const { updateTask, tasks } = useTaskStore();
    const { cellWidth } = useCellWidth();

    const onMouseMoveRef = useRef<((e: MouseEvent) => void) | null>(null);
    const onMouseUpRef = useRef<(() => void) | null>(null);

    const onMouseUpCallbacks = useRef<Set<() => void>>(new Set());

    const registerOnMouseUp = useCallback((callback: () => void) => {
        onMouseUpCallbacks.current.add(callback);
        return () => { onMouseUpCallbacks.current.delete(callback); };
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            onMouseMoveRef.current?.(e);
        };

        const handleMouseUp = () => {
            onMouseUpRef.current?.();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const getAdjacentTask = (dir: Direction, tasks: Task[], currentTask: Task): Task | null => {
        const currentPos = getTaskPosition(currentTask, cellWidth);
        const sameDayTasks = tasks.filter(t =>
            t.start.getDate() === currentTask.start.getDate() && t.id !== currentTask.id
        );

        let closestTask: Task | null = null;
        let closestDistance = Infinity;

        sameDayTasks.forEach(candidate => {
            const candidatePos = getTaskPosition(candidate, cellWidth);
            const distance = dir === 'top'
                ? currentPos.top - (candidatePos.top + candidatePos.height)
                : candidatePos.top - (currentPos.top + currentPos.height);

            if (distance >= 0 && distance < closestDistance) {
                closestDistance = distance;
                closestTask = candidate;
            }
        });

        return closestTask;
    };

    const onResizeTop = (e: MouseEvent, task: Task, position: TaskPosition) => {
        e.preventDefault();
        e.stopPropagation();
        document.body.style.cursor = 'ns-resize';
        document.body.classList.add('is-resizing');
        startY.current = e.clientY;
        startHeight.current = position.height;
        startTop.current = position.top;
        activeTask.current = task;
        direction.current = 'top';
        isResizing.current = true;
        adjacentTask.current = getAdjacentTask('top', tasks, task);
    };

    const onResizeBottom = (e: MouseEvent, task: Task, position: TaskPosition) => {
        e.preventDefault();
        e.stopPropagation();
        document.body.style.cursor = 'ns-resize';
        document.body.classList.add('is-resizing');
        startY.current = e.clientY;
        startHeight.current = position.height;
        startTop.current = position.top;
        activeTask.current = task;
        direction.current = 'bottom';
        isResizing.current = true;
        adjacentTask.current = getAdjacentTask('bottom', tasks, task);
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!isResizing.current || !activeTask.current) return;

        const deltaY = e.clientY - startY.current;
        const newStart = new Date(activeTask.current.start);
        const newEnd = new Date(activeTask.current.end);
        const heightOf15min = CELL_HEIGHT / 4;

        if (direction.current === 'top') {
            let newTop = startTop.current + deltaY;
            const clampHeight = (startTop.current + startHeight.current) - heightOf15min;
            if (newTop > clampHeight) newTop = clampHeight;

            if (adjacentTask.current) {
                const adjacentTaskPos = getTaskPosition(adjacentTask.current, cellWidth);
                const clampPos = (adjacentTaskPos.top + adjacentTaskPos.height) + TASK_GAP;
                if (newTop < clampPos) newTop = clampPos;
            }

            const newHours = newTop / CELL_HEIGHT;
            newStart.setHours(Math.floor(newHours));
            newStart.setMinutes(Math.round((newHours % 1) * 60));
        }

        if (direction.current === 'bottom') {
            let newBottom = startTop.current + startHeight.current + deltaY;
            const clampHeight = (startTop.current + heightOf15min);
            if (newBottom < clampHeight) newBottom = clampHeight;

            if (adjacentTask.current) {
                const adjacentTaskPos = getTaskPosition(adjacentTask.current, cellWidth);
                const clampPos = adjacentTaskPos.top - TASK_GAP;
                if (newBottom > clampPos) newBottom = clampPos;
            }

            const newHours = newBottom / CELL_HEIGHT;
            newEnd.setHours(Math.floor(newHours));
            newEnd.setMinutes(Math.round((newHours % 1) * 60));
        }

        const startUnchanged =
            newStart.getHours() === activeTask.current.start.getHours() &&
            newStart.getMinutes() === activeTask.current.start.getMinutes();

        const endUnchanged =
            newEnd.getHours() === activeTask.current.end.getHours() &&
            newEnd.getMinutes() === activeTask.current.end.getMinutes();

        if (startUnchanged && endUnchanged) return;

        updateTask({ ...activeTask.current, start: newStart, end: newEnd });
    };

    const onMouseUp = () => {
        if (!isResizing.current) return;
        document.body.style.cursor = '';
        document.body.classList.remove('is-resizing');
        isResizing.current = false;
        activeTask.current = null;
        onMouseUpCallbacks.current.forEach(cb => cb());
    };

    onMouseMoveRef.current = onMouseMove;
    onMouseUpRef.current = onMouseUp;

    const getDarkerColor = (color: string): string => {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const darken = (c: number) => Math.max(0, Math.floor(c * 0.65));
        const toHex = (c: number) => darken(c).toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    return { getDarkerColor, onResizeTop, onResizeBottom, isResizing, registerOnMouseUp };
};