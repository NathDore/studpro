import React from 'react';
import { useScrollbar } from './hooks/useScrollbar';
import './Scrollbar.css';

interface ScrollbarProps {
    calendarRef: React.RefObject<HTMLDivElement | null>;
}

export const Scrollbar = ({ calendarRef }: ScrollbarProps) => {
    const { scrollbarHeight, scrollbarTop, isReady, onMouseDown } = useScrollbar({ calendarRef });

    if (!isReady) return null;

    return (
        <div
            onMouseDown={onMouseDown}
            className='scrollbar'
            style={{ height: scrollbarHeight, top: scrollbarTop }}
        />
    );
};