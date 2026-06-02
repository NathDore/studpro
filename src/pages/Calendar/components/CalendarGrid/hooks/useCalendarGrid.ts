import { useRef } from 'react';
import { getTimes } from '../../../utils/timeUtils';
import { useCalendarSize } from './useCalendarSize';
import type { Time } from '../../../../../types/Time';

export const useCalendarGrid = () => {
    const times: Time[] = getTimes();
    const calendarRef = useRef<HTMLDivElement>(null);
    const { calendarBounds } = useCalendarSize({ calendarRef });

    return { times, calendarRef, calendarBounds };
};