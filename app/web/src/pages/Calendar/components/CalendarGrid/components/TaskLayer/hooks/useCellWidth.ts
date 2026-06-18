import { useRef, useState } from "react";
import { TIME_CELL_WIDTH } from "../../../../../../../constants/calendar-grid-constant";

export const useCellWidth = () => {
    const layerRef = useRef<HTMLDivElement>(null);
    const [cellWidth, setCellWidth] = useState<number>(0);
    const observerRef = useRef<ResizeObserver | null>(null);

    const setRef = (node: HTMLDivElement | null) => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }

        if (!node) return;

        (layerRef as React.MutableRefObject<HTMLDivElement>).current = node;

        const { width } = node.getBoundingClientRect();
        setCellWidth((width - TIME_CELL_WIDTH) / 7);

        const observer = new ResizeObserver(() => {
            const { width } = node.getBoundingClientRect();
            setCellWidth((width - TIME_CELL_WIDTH) / 7);
        });

        observer.observe(node);
        observerRef.current = observer;
    };

    return {
        setRef,
        cellWidth
    }
}