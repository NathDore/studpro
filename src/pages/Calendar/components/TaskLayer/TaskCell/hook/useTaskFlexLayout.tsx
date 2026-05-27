import { fromDate, getDuration, toMinutes } from '../../../../utils/timeUtils';
import type { Task } from '../../../../../../types/Task';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useTaskFlexLayout(task: Task) {
    const [displayInline, setDisplayInline] = useState(false);

    const refreshFlexLayoutRef = useRef<() => void>(() => { });

    useEffect(() => {
        const durationMinutes = getDuration(task.start, task.end);
        setDisplayInline(durationMinutes <= 50);
    }, [])

    refreshFlexLayoutRef.current = () => {
        const durationMinutes = getDuration(task.start, task.end);
        setDisplayInline(durationMinutes <= 50);
        console.log(durationMinutes);
    }

    const refreshFlexLayout = useCallback(() => refreshFlexLayoutRef.current(), []);

    return { refreshFlexLayout, displayInline };
}