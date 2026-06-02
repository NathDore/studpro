import React from 'react';
import { useScrollbar } from './hooks/useScrollbar';

interface ScrollbarProps {
    calendarRef: React.RefObject<HTMLDivElement | null>;
}

export const Scrollbar = ({ calendarRef }: ScrollbarProps) => {
    const { scrollbarHeight, scrollbarTop, isReady, onMouseDown } = useScrollbar({ calendarRef });

    if (!isReady) return null;

    return (
        <div
            onMouseDown={onMouseDown}
            className='scrollbar fixed right-[5px] w-2 bg-[rgb(143,143,143)] rounded-[4px]'
            style={{ height: scrollbarHeight, top: scrollbarTop }}
        />
    );
};