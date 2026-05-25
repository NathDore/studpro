import { useRef, useState, useCallback } from 'react';

interface TooltipPosition {
    top: number;
    left: number;
}

export function useNoteTooltip() {
    const iconRef = useRef<HTMLDivElement>(null);
    const [tooltipPos, setTooltipPos] = useState<TooltipPosition | null>(null);

    const handleMouseEnter = useCallback(() => {
        if (!iconRef.current) return;

        const rect = iconRef.current.getBoundingClientRect();

        setTooltipPos({
            top: rect.top + window.scrollY,
            left: rect.right + 8,
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setTooltipPos(null);
    }, []);

    return { iconRef, tooltipPos, handleMouseEnter, handleMouseLeave };
}