import React from 'react';
import { useScrollbar } from './hooks/useScrollbar';

const SCROLLBAR_CLASS = 'fixed right-[5px] w-2 bg-[rgb(143,143,143)] rounded-[4px]';

interface ScrollbarProps {
    calendarRef: React.RefObject<HTMLDivElement | null>;
}

export const Scrollbar = ({ calendarRef }: ScrollbarProps) => {
    const { scrollbarHeight, scrollbarTop, isReady, onMouseDown } = useScrollbar({ calendarRef });

    if (!isReady) return null;

    return (
        <div
            onMouseDown={onMouseDown}
            className={SCROLLBAR_CLASS}
            style={{ height: scrollbarHeight, top: scrollbarTop }}
        />
    );
};