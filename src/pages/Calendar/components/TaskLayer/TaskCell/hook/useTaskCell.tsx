import { useEffect, useState } from "react";

interface useTaskCellProps {
    initialHeight: number;
}

export const useTaskCell = ({ initialHeight }: useTaskCellProps) => {
    const [isResizing, setIsResizing] = useState<boolean>(false);
    const [cellHeight, setCellHeight] = useState<number>(initialHeight);

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
        if (!isResizing) return;

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [isResizing]);

    const onResizeTop = () => {
        if (isResizing) return;
        setIsResizing(true);
    }

    const onResizeBottom = () => {
        if (isResizing) return;
        setIsResizing(true);
    }

    const onMouseUp = () => {
        if (isResizing) {
            setIsResizing(false);
        }
    }

    const onMouseMove = () => {
        if (isResizing) {
            console.log("task is resizing using mouse.");
        }
    }

    return {
        getDarkerColor,
        onResizeTop,
        onResizeBottom,
        onMouseUp,
        onMouseMove,
        cellHeight,
        setCellHeight
    }
}