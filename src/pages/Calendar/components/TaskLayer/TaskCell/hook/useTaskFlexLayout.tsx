import { useEffect, useRef, useState } from 'react';
import type { TaskPosition } from '../utils/taskUtils';
import { fromDate, toMinutes } from '../../../../utils/timeUtils';
import type { Task } from '../../../../../../types/Task';

export function useTaskFlexLayout(task: Task, position: TaskPosition) {
    const textRef = useRef<HTMLParagraphElement>(null);
    const [maxLines, setMaxLines] = useState<number>(1);

    const durationMinutes =
        toMinutes(fromDate(task.end)) - toMinutes(fromDate(task.start));

    const showIcon = durationMinutes <= 60;
    const displayInline = durationMinutes <= 50;

    useEffect(() => {
        const el = textRef.current;
        if (!el) return;

        const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
        const container = el.parentElement;
        if (!container) return;

        const usedHeight = Array.from(container.children)
            .filter((child) => child !== el)
            .reduce((acc, child) => {
                const style = getComputedStyle(child);
                const marginTop = parseFloat(style.marginTop);
                const marginBottom = parseFloat(style.marginBottom);
                return acc + (child as HTMLElement).offsetHeight + marginTop + marginBottom;
            }, 0);

        const availableHeight = container.clientHeight - usedHeight;
        const computed = Math.floor(availableHeight / lineHeight);

        setMaxLines(computed > 0 ? computed : 1);
    }, [position]);

    return { textRef, maxLines, showIcon, displayInline };
}