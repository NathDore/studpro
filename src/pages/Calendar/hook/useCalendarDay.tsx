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
        const currentDay = new Date(monday);

        for (let i = 0; i < 7; i++) {
            newDays.push({
                id: currentDay.toISOString().split('T')[0],
                day: DAY_NAMES[i],
                date: currentDay.getDate().toString(),
                isCurrentDay: currentDate.getDate() === currentDay.getDate() ? true : false
            });
            currentDay.setDate(monday.getDate() + i + 1);
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
            isCurrentDay: date.getDate() === currentDate.getDate()
        }
    }
    return {
        days,
        convertDateToCalendarDay
    }
}