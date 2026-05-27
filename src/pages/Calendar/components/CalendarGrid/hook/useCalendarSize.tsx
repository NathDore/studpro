import { useEffect, useState, type RefObject } from "react"

interface UseCalendarProps {
    calendarRef: RefObject<HTMLDivElement | null>;
}

export interface CalendarBounds {
    top: number;
    bottom: number;
    height: number;
}

export const useCalendarSize = ({ calendarRef }: UseCalendarProps) => {
    const [calendarBounds, setCalendarBounds] = useState<CalendarBounds>({ top: 0, bottom: 0, height: 0 });

    const updateBounds = () => {
        if (!calendarRef.current) return;

        const bounds = calendarRef.current.getBoundingClientRect();
        const { top, bottom } = bounds;
        setCalendarBounds({ top, bottom, height: calendarRef.current.scrollHeight });
    }

    useEffect(() => {
        if (!calendarRef.current) return;

        updateBounds();

        const observer = new ResizeObserver(updateBounds);

        observer.observe(calendarRef.current);

        return () => observer.disconnect();
    }, [])

    return { calendarBounds }
}