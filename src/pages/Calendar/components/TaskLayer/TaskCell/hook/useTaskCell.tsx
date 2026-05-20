import { useEffect, useRef, useState } from "react";
import type { TaskPosition } from "../utils/taskUtils";
import type { Task } from "../../../../../../types/Task";
import { useTaskStore } from "../../../../../../store/taskStore";

interface useTaskCellProps {
    initialHeight: number;
    initialTopPosition: number;
}

interface resizingData {
    isResizing: boolean;
    direction: 'top' | 'bottom';
}

export const useTaskCell = ({ initialHeight, initialTopPosition }: useTaskCellProps) => {
    const [resizingData, setResizingData] = useState<resizingData>({ isResizing: false, direction: 'top' });
    const [cellHeight, setCellHeight] = useState<number>(initialHeight);
    const [cellTopPosition, setCellTopPosition] = useState<number>(initialTopPosition);

    const startY = useRef<number>(0);
    const startHeight = useRef<number>(0);
    const startTop = useRef<number>(0);
    const wasResizing = useRef<boolean>(false);
    const resizingTask = useRef<Task>(null);

    const { updateTask } = useTaskStore();

    const getDarkerColor = (color: string): string => {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        const darken = (c: number) => Math.max(0, Math.floor(c * 0.65));

        const toHex = (c: number) => darken(c).toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    useEffect(() => {
        if (!resizingData.isResizing) return;

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [resizingData]);

    const onResizeTop = (e: MouseEvent, position: TaskPosition, task: Task) => {
        e.preventDefault();
        e.stopPropagation();
        startY.current = e.clientY;
        startHeight.current = cellHeight;
        startTop.current = cellTopPosition;
        resizingTask.current = task;
        setResizingData({ isResizing: true, direction: 'top' });
    }

    const onResizeBottom = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setResizingData({ isResizing: true, direction: 'bottom' });
    }

    const onMouseUp = () => {
        if (!resizingData.isResizing) return;

        if (resizingTask.current) {
            updateTask(resizingTask.current);
            resizingTask.current = null;
        }

        resizingTask.current = null;
        wasResizing.current = true;
        setResizingData({ isResizing: false, direction: 'top' });
    }

    const onMouseMove = (e: MouseEvent) => {
        if (!resizingData.isResizing) return;

        const deltaY = e.clientY - startY.current;

        if (resizingData.direction === 'top') {
            const newHeight = startHeight.current - deltaY;
            const newTop = startTop.current + deltaY;
            setCellHeight(newHeight);
            setCellTopPosition(newTop);
        }
    }

    return {
        getDarkerColor,
        onResizeTop,
        onResizeBottom,
        onMouseUp,
        onMouseMove,
        cellHeight,
        setCellHeight,
        cellTopPosition,
        setCellTopPosition,
        wasResizing
    }
}