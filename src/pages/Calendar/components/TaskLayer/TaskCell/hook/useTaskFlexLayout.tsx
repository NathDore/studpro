import { fromDate, toMinutes } from '../../../../utils/timeUtils';
import type { Task } from '../../../../../../types/Task';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useTaskFlexLayout(task: Task) {
    const [displayInline, setDisplayInline] = useState(false);

    const refreshFlexLayoutRef = useRef<() => void>(() => { });

    useEffect(() => {
        let durationMinutes = toMinutes(fromDate(task.end)) - toMinutes(fromDate(task.start));
        setDisplayInline(durationMinutes <= 50);
    }, [])

    refreshFlexLayoutRef.current = () => {
        let durationMinutes = toMinutes(fromDate(task.end)) - toMinutes(fromDate(task.start));
        setDisplayInline(durationMinutes <= 50);
    }

    const refreshFlexLayout = useCallback(() => refreshFlexLayoutRef.current(), []);

    return { refreshFlexLayout, displayInline };
}