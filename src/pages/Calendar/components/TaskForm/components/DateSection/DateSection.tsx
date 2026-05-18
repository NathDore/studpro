import './DateSection.css';
import { DatePicker } from './DatePicker/DatePicker';

interface DateSectionProps {
    date: Date;
    onDateChange: (date: Date) => void;
}

export const DateSection = ({ date, onDateChange }: DateSectionProps) => {
    return (
        <div className='section-column'>
            <p className='section-label'>Date</p>
            <DatePicker date={date} onDateChange={onDateChange} />
        </div>
    );
}