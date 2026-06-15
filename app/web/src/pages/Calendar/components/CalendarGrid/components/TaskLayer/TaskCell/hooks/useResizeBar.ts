import { useEffect, useRef } from "react";
import { useTaskStore } from "../../../../../../../../store/taskStore";
import { CELL_HEIGHT } from "../../../../../../../../constants";
import { getPeriodFromHour } from "../../../../../../../../utils/taskUtils";
import { clampToAdjacentTask, clampToCalendarBounds, clampToMinHeight, getAdjacentTask, snapTo15 } from "../utils/resizeBarUtils";
import type { CalendarBounds } from "../../../../../../Calendar.types";
import type { Task } from "../../../../../../../../types/Task";
import type { CalendarTime, TaskPosition } from "../../../../../../Calendar.types";

export type Direction = 'top' | 'bottom';

interface UseResizeBarProps {
    calendarBounds: CalendarBounds;
    cellWidth: number;
}

export const useResizeBar = ({ calendarBounds, cellWidth }: UseResizeBarProps) => {
    const startClampHourTime = useRef<CalendarTime | null>(null);
    const endClampHourTime = useRef<CalendarTime | null>(null);

    const isResizing = useRef(false);
    const direction = useRef<Direction>('top');
    const startY = useRef(0);
    const startHeight = useRef(0);
    const startTop = useRef(0);
    const activeTask = useRef<Task | null>(null);
    const adjacentTask = useRef<Task | null>(null);

    const { updateTask, tasks } = useTaskStore();

    const onMouseMoveRef = useRef<((e: MouseEvent) => void) | null>(null);
    const onMouseUpRef = useRef<(() => void) | null>(null);

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
        adjacentTask.current = getAdjacentTask('top', tasks, task, cellWidth);
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
        adjacentTask.current = getAdjacentTask('bottom', tasks, task, cellWidth);
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!isResizing.current || !activeTask.current) return;

        const deltaY = e.clientY - startY.current;
        let newStart: CalendarTime = { ...activeTask.current.startTime };
        let newEnd: CalendarTime = { ...activeTask.current.endTime };

        if (direction.current === 'top') {
            let newTop = clampToMinHeight('top', deltaY, startTop.current, startHeight.current, CELL_HEIGHT);
            if (adjacentTask.current) newTop = clampToAdjacentTask('top', newTop, adjacentTask.current, cellWidth);
            newTop = clampToCalendarBounds('top', newTop, calendarBounds.height);

            const newHour = newTop / CELL_HEIGHT;
            const snappedMinutes = snapTo15(newHour * 60);
            const snappedHour = Math.floor(snappedMinutes / 60);
            const snappedMin = snappedMinutes % 60;

            startClampHourTime.current = {
                id: activeTask.current.startTime.id,
                period: getPeriodFromHour(snappedHour),
                hour: snappedHour,
                minutes: snappedMin,
            };

            newStart = {
                id: activeTask.current.startTime.id,
                period: getPeriodFromHour(Math.floor(newHour)),
                hour: Math.floor(newHour),
                minutes: Math.round((newHour % 1) * 60),
            };
        }

        if (direction.current === 'bottom') {
            let newBottom = clampToMinHeight('bottom', deltaY, startTop.current, startHeight.current, CELL_HEIGHT);
            if (adjacentTask.current) newBottom = clampToAdjacentTask('bottom', newBottom, adjacentTask.current, cellWidth);
            newBottom = clampToCalendarBounds('bottom', newBottom, calendarBounds.height);

            const newHour = newBottom / CELL_HEIGHT;
            const snappedMinutes = snapTo15(newHour * 60);
            const snappedHour = Math.floor(snappedMinutes / 60);
            const snappedMin = snappedMinutes % 60;

            endClampHourTime.current = {
                id: activeTask.current.endTime.id,
                period: getPeriodFromHour(snappedHour),
                hour: snappedHour,
                minutes: snappedMin,
            };

            newEnd = {
                id: activeTask.current.endTime.id,
                period: getPeriodFromHour(Math.floor(newHour)),
                hour: Math.floor(newHour),
                minutes: Math.round((newHour % 1) * 60),
            };
        }

        const startUnchanged =
            newStart.hour === activeTask.current.startTime.hour &&
            newStart.minutes === activeTask.current.startTime.minutes;

        const endUnchanged =
            newEnd.hour === activeTask.current.endTime.hour &&
            newEnd.minutes === activeTask.current.endTime.minutes;

        if (startUnchanged && endUnchanged) return;

        updateTask({ ...activeTask.current, startTime: newStart, endTime: newEnd });
    };

    const onMouseUp = () => {
        if (!isResizing.current) return;

        const currentTask = activeTask.current;
        if (!currentTask) return;

        if (startClampHourTime.current) {
            updateTask({ ...currentTask, startTime: startClampHourTime.current });
            startClampHourTime.current = null;
        }

        if (endClampHourTime.current) {
            updateTask({ ...currentTask, endTime: endClampHourTime.current });
            endClampHourTime.current = null;
        }

        document.body.style.cursor = '';
        document.body.classList.remove('is-resizing');
        isResizing.current = false;
        activeTask.current = null;
    };

    onMouseMoveRef.current = onMouseMove;
    onMouseUpRef.current = onMouseUp;

    return { onResizeTop, onResizeBottom, isResizing };
};