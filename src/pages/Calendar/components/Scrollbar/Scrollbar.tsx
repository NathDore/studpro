import React, { useEffect, useState } from 'react'
import './Scrollbar.css';

interface ScrollbarProps {
    calendarRef: React.RefObject<HTMLDivElement | null>;
}

export const Scrollbar = ({ calendarRef }: ScrollbarProps) => {
    const [scrollbarHeight, setScrollbarHeight] = useState(0);
    const [scrollbarTop, setScrollbarTop] = useState(0);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const el = calendarRef.current;
        if (!el) return;

        const update = () => {
            const el = calendarRef.current;
            if (!el) return;

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

    if (!isReady) return;

    return (
        <div
            className='scrollbar'
            style={{ height: scrollbarHeight, top: scrollbarTop }}
        />
    )
}
