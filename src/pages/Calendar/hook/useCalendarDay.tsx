import { useEffect, useState } from "react"
import type { CalendarDay } from "../types/CalendarDay"

const getMonday = (date: Date): Date => {
    const day = date.getDay();
    const diffToMonday = day === 0 ? 6 : day - 1;
    const monday = new Date(date);
    monday.setDate(date.getDate() - diffToMonday);
    return monday;
};

const DAY_NAMES: CalendarDay['day'][] = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

export const useCalendarDay = () => {
    const [days, setDays] = useState<CalendarDay[]>([]);

    useEffect(() => {
        const currentDate = new Date();
        const monday = getMonday(currentDate);

        const newDays: CalendarDay[] = [];

        for (let i = 0; i < 7; i++) {
            const currentDay = new Date(monday);
            currentDay.setDate(monday.getDate() + i);

            newDays.push({
                id: currentDay.toISOString().split('T')[0],
                day: DAY_NAMES[i],
                date: currentDay.getDate().toString(),
                fullDate: currentDay,
                isCurrentDay: currentDate.getDate() === currentDay.getDate()
            });
        }

        setDays(newDays);
    }, []);

    const convertDateToCalendarDay = (date: Date): CalendarDay => {
        const currentDate = new Date();
        const dayIndex = date.getDay();
        const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;

        return {
            id: date.toISOString().split('T')[0],
            day: DAY_NAMES[adjustedIndex],
            date: date.getDate().toString(),
            fullDate: date,
            isCurrentDay: date.getDate() === currentDate.getDate()
        }
    }
    return {
        days,
        convertDateToCalendarDay
    }
}