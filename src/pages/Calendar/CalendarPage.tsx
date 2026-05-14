import './CalendarPage.css';
import { CalendarHeader } from './components/CalendarHeader/CalendarHeader';
import { CalendarGrid } from './components/CalendarGrid/CalendarGrid';
import type { CalendarDay } from './types/CalendarDay';
import type { Time } from './components/CalendarGrid/CalendarGrid';
import { TASKS_DATA } from './data/Task_data';
import type { Task } from '../../types/Task';
import { useCalendarDay } from './hook/useCalendarDay';

interface CalendarPageProps { }

export const CalendarPage = ({ }: CalendarPageProps) => {
    const { convertDateToCalendarDay } = useCalendarDay();

    const onHourCellClick = (calendarDay: CalendarDay, time: Time) => {
        console.log(
            `[Calendar] Hour cell click | Time: ${time.time} ${time.period} | Day: ${calendarDay.day} | Date: ${calendarDay.date}`
        );
    }

    const onTaskCellClick = (task: Task) => {
        const calendarDay: CalendarDay = convertDateToCalendarDay(task.start);
        console.log(
            `[Calendar] Hour task click | Time: ${task.start.getHours} | Day: ${calendarDay.day} | Date: ${calendarDay.date}`
        );
    }

    return (
        <div className='page-container'>
            <CalendarHeader />
            <CalendarGrid onHourCellClick={onHourCellClick} tasks={TASKS_DATA} onTaskCellClick={onTaskCellClick} />
        </div>
    )
}
