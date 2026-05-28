import type { Task } from "../../../../../../types/Task";
import { TIME_CELL_WIDTH, CELL_HEIGHT } from "../../../../constants";

export interface TaskPosition {
    left: number;
    top: number;
    height: number;
    width: number;
}

export const getTaskPosition = (task: Task, cellWidth: number): TaskPosition => {
    const dayIndex = task.start.getDay() === 0 ? 6 : task.start.getDay() - 1;

    const left = TIME_CELL_WIDTH + dayIndex * cellWidth;
    const top = (task.start.getHours() + task.start.getMinutes() / 60) * CELL_HEIGHT;

    const endTime = task.end.getHours() === 0
        ? task.end.getTime() + 24 * 60 * 60 * 1000
        : task.end.getTime();

    const durationInHours = (endTime - task.start.getTime()) / (1000 * 60 * 60);
    const height = durationInHours * CELL_HEIGHT;
    const width = cellWidth;

    return { left, top, height, width }
}