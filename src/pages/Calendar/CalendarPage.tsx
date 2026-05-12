import './CalendarPage.css';
import { CalendarHeader } from './components/CalendarHeader/CalendarHeader';
import { CalendarGrid } from './components/CalendarGrid/CalendarGrid';
import type { CalendarDay } from './types/CalendarDay';
import type { Time } from './components/CalendarGrid/CalendarGrid';
import { TASKS_DATA } from './data/Task_data';

interface CalendarPageProps { }

export const CalendarPage = ({ }: CalendarPageProps) => {

    const onHourCellClick = (calendarDay: CalendarDay, time: Time) => {
        console.log(
            `[Calendar] Hour cell click | Time: ${time.time} ${time.period} | Day: ${calendarDay.day} | Date: ${calendarDay.date}`
        );
    }

    return (
        <div className='page-container'>
            <CalendarHeader />
            <CalendarGrid onHourCellClick={onHourCellClick} tasks={TASKS_DATA} />
        </div>
    )
}
