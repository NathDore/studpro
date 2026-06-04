import { useEffect, useRef, useState } from 'react';
import { getTimes } from '../../../utils/timeUtils';
import type { Time } from '../../../../../types/Time';
import type { CalendarBounds } from '../CalendarGrid.types';

const TIMES: Time[] = getTimes();

export const useCalendarGrid = () => {
    const [calendarBounds, setCalendarBounds] = useState<CalendarBounds>({ top: 0, bottom: 0, height: 0 });

    const calendarRef = useRef<HTMLDivElement>(null);

    const updateBounds = () => {
        if (!calendarRef.current) return;

        const bounds = calendarRef.current.getBoundingClientRect();
        const { top, bottom } = bounds;
        setCalendarBounds({ top, bottom, height: (calendarRef.current.scrollHeight - 1) });
    }

    useEffect(() => {
        if (!calendarRef.current) return;

        updateBounds();

        const observer = new ResizeObserver(updateBounds);

        observer.observe(calendarRef.current);

        return () => observer.disconnect();
    }, [])

    return { TIMES, calendarRef, calendarBounds };
};