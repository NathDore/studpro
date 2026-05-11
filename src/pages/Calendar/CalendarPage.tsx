import './CalendarPage.css';
import { CalendarHeader } from './components/CalendarHeader/CalendarHeader';
import { CalendarGrid } from './components/CalendarGrid/CalendarGrid';

interface CalendarPageProps { }

export const CalendarPage = ({ }: CalendarPageProps) => {
    return (
        <div className='page-container'>
            <CalendarHeader />
            <CalendarGrid />
        </div>
    )
}
