import type { Task } from "../../../../../../../../types/Task";
import { getTaskPositionInCalendar } from "../../../../../../../../utils/taskUtils";
import type { Direction } from "../hooks/useResizeBar";

const TASK_GAP = 3;

export const getAdjacentTask = (dir: Direction, tasks: Task[], currentTask: Task, cellWidth: number): Task | null => {
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

export const clampToMinHeight = (direction: Direction, deltaY: number, startTop: number, startHeight: number, cellHeight: number): number => {
    const heightOf15min = cellHeight / 4;

    let position: number = direction === 'top' ? startTop + deltaY : startTop + startHeight + deltaY;

    if (direction === 'top') {
        const clampHeight = (startTop + startHeight) - heightOf15min;
        if (position > clampHeight) position = clampHeight;
    } else {
        const clampHeight = (startTop + heightOf15min);
        if (position < clampHeight) position = clampHeight;
    }

    return position;
}

export const clampToAdjacentTask = (direction: Direction, position: number, adjacentTask: Task, cellWidth: number): number => {
    const adjacentTaskPos = getTaskPositionInCalendar(adjacentTask, cellWidth);

    if (direction === 'top') {
        const clampPos = (adjacentTaskPos.top + adjacentTaskPos.height) + TASK_GAP;
        if (position < clampPos) position = clampPos;
    } else {
        const clampPos = adjacentTaskPos.top - TASK_GAP;
        if (position > clampPos) position = clampPos;
    }

    return position;
}

export const clampToCalendarBounds = (direction: Direction, position: number, heightBounds: number) => {
    if (direction === 'top') {
        position = position <= 0 ? 0 : position;
    } else {
        position = position >= heightBounds ? heightBounds : position;
    }

    return position;
}

const MIN_MINUTES = 0;
const MAX_MINUTES = 23 * 60 + 45;

export const snapTo15 = (totalMinutes: number): number => {
    return Math.min(
        Math.max(Math.round(totalMinutes / 15) * 15, MIN_MINUTES),
        MAX_MINUTES
    );
};