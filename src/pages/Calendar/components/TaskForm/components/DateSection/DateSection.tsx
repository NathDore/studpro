import './DateSection.css';
import { DatePicker } from './components/DatePicker/DatePicker';

interface DateSectionProps {
    date: Date;
    onDateChange: (date: Date) => void;
    minDate: Date;
    maxDate: Date;
}

export const DateSection = ({ date, onDateChange, minDate, maxDate }: DateSectionProps) => {
    return (
        <div className='section-column'>
            <p className='section-label'>Date</p>
            <DatePicker date={date} onDateChange={onDateChange} minDate={minDate} maxDate={maxDate} />
        </div>
    );
}