import { getTaskDuration } from '../../../../../utils/timeUtils';
import type { Task } from '../../../../../../../types/Task';
import { useCallback, useEffect, useRef, useState } from 'react';

const DURATION_INLINE = 60;

export function useTaskFlexLayout(task: Task) {
    const [displayInline, setDisplayInline] = useState(false);

    const refreshFlexLayoutRef = useRef<() => void>(() => { });

    useEffect(() => {
        const durationMinutes = getTaskDuration(task.start, task.end);
        console.log(durationMinutes);
        setDisplayInline(durationMinutes <= DURATION_INLINE);
    }, [])

    refreshFlexLayoutRef.current = () => {
        const durationMinutes = getTaskDuration(task.start, task.end);
        setDisplayInline(durationMinutes <= DURATION_INLINE);
    }

    const refreshFlexLayout = useCallback(() => refreshFlexLayoutRef.current(), []);

    return { refreshFlexLayout, displayInline };
}