import { useEffect, useState } from 'react';
import type React from 'react';

interface UseScrollbarProps {
    calendarRef: React.RefObject<HTMLDivElement | null>;
}

export const useScrollbar = ({ calendarRef }: UseScrollbarProps) => {
    const [scrollbarHeight, setScrollbarHeight] = useState(0);
    const [scrollbarTop, setScrollbarTop] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartY, setDragStartY] = useState(0);

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
        setDragStartY(e.clientY);
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const deltaY = e.clientY - dragStartY;
        const el = calendarRef.current;
        if (!el) return;
        const ratio = el.clientHeight / el.scrollHeight;
        el.scrollTop += deltaY / ratio;
        setDragStartY(e.clientY);
    };

    const onMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
    };

    useEffect(() => {
        const el = calendarRef.current;
        if (!el) return;

        const update = () => {
            const ratio = el.clientHeight / el.scrollHeight;
            const calendarTop = el.getBoundingClientRect().top;
            setScrollbarHeight(el.clientHeight * ratio);
            setScrollbarTop(calendarTop + el.scrollTop * ratio);
        };

        update();
        el.addEventListener('scroll', update);
        window.addEventListener('resize', update);
        setIsReady(true);

        return () => {
            el.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [isDragging, dragStartY]);

    return { scrollbarHeight, scrollbarTop, isReady, onMouseDown };
};