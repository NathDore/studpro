import './DateSection.css';
import { DatePicker } from './DatePicker/DatePicker';

interface DateSectionProps { }

export const DateSection = ({ }: DateSectionProps) => {
    return (
        <div className='section-container'>
            <p className='section-label'>Date</p>
            <DatePicker />
        </div>
    );
}