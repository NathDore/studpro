import { useEffect, useRef } from "react";
import { useTaskStore } from "../../../../../../../../../store/taskStore";
import { CELL_HEIGHT } from "../../../../../../../../../constants";
import { TASK_GAP } from "../../../../../../../../../constants";
import { getPeriodFromHour, getTaskPositionInCalendar } from "../../../../../../../../../utils/taskUtils";
import type { CalendarBounds } from "../../../../../CalendarGrid.types";
import type { Task } from "../../../../../../../../../types/Task";
import type { CalendarTime, TaskPosition } from "../../../../../../../Calendar.types";

type Direction = 'top' | 'bottom';

interface UseResizeBarProps {
    calendarBounds: CalendarBounds;
    cellWidth: number;
}

export const useResizeBar = ({ calendarBounds, cellWidth }: UseResizeBarProps) => {
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

    const getAdjacentTask = (dir: Direction, tasks: Task[], currentTask: Task): Task | null => {
        const currentPos = getTaskPositionInCalendar(currentTask, cellWidth);
        const sameDayTasks = tasks.filter(t =>
            t.day.fullDate === currentTask.day.fullDate && t.id !== currentTask.id
        );

        let closestTask: Task | null = null;
        let closestDistance = Infinity;

        sameDayTasks.forEach(candidate => {
            const candidatePos = getTaskPositionInCalendar(candidate, cellWidth);
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

    const clampToMinHeight = (direction: Direction, deltaY: number): number => {
        const heightOf15min = CELL_HEIGHT / 4;

        let position: number = direction === 'top' ? startTop.current + deltaY : startTop.current + startHeight.current + deltaY;

        if (direction === 'top') {
            const clampHeight = (startTop.current + startHeight.current) - heightOf15min;
            if (position > clampHeight) position = clampHeight;
        } else {
            const clampHeight = (startTop.current + heightOf15min);
            if (position < clampHeight) position = clampHeight;
        }

        return position;
    }

    const clampToAdjacentTask = (direction: Direction, position: number): number => {
        if (!adjacentTask.current) return position;

        const adjacentTaskPos = getTaskPositionInCalendar(adjacentTask.current, cellWidth);

        if (direction === 'top') {
            const clampPos = (adjacentTaskPos.top + adjacentTaskPos.height) + TASK_GAP;
            if (position < clampPos) position = clampPos;
        } else {
            const clampPos = adjacentTaskPos.top - TASK_GAP;
            if (position > clampPos) position = clampPos;
        }

        return position;
    }

    const clampToCalendarBounds = (direction: Direction, position: number) => {
        if (direction === 'top') {
            position = position <= 0 ? 0 : position;
        } else {
            position = position >= calendarBounds.height ? calendarBounds.height : position;
        }

        return position;
    }

    const onMouseMove = (e: MouseEvent) => {
        if (!isResizing.current || !activeTask.current) return;

        const deltaY = e.clientY - startY.current;
        let newStart: CalendarTime = { ...activeTask.current.startTime };
        let newEnd: CalendarTime = { ...activeTask.current.endTime };

        if (direction.current === 'top') {
            let newTop = clampToMinHeight('top', deltaY);
            newTop = clampToAdjacentTask('top', newTop);
            newTop = clampToCalendarBounds('top', newTop);

            const newHours = newTop / CELL_HEIGHT;
            newStart = {
                id: activeTask.current.startTime.id,
                period: getPeriodFromHour(Math.floor(newHours)),
                hour: Math.floor(newHours),
                minutes: Math.round((newHours % 1) * 60),
            };
        }

        if (direction.current === 'bottom') {
            let newBottom = clampToMinHeight('bottom', deltaY);
            newBottom = clampToAdjacentTask('bottom', newBottom);
            newBottom = clampToCalendarBounds('bottom', newBottom);

            const newHours = newBottom / CELL_HEIGHT;
            newEnd = {
                id: activeTask.current.endTime.id,
                period: getPeriodFromHour(Math.floor(newHours)),
                hour: Math.floor(newHours),
                minutes: Math.round((newHours % 1) * 60),
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
        document.body.style.cursor = '';
        document.body.classList.remove('is-resizing');
        isResizing.current = false;
        activeTask.current = null;
    };

    onMouseMoveRef.current = onMouseMove;
    onMouseUpRef.current = onMouseUp;

    return { onResizeTop, onResizeBottom, isResizing };
};