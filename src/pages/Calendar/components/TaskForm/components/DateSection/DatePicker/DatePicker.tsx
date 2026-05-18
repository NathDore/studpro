
import { useRef, useState } from 'react';
import './DatePicker.css';
import { CalendarIcon } from '../../../../../../../components/icons/CalendarIcon';
import type { CalendarDay } from '../../../../../types/CalendarDay';

interface DatePickerProps {
    calendarDay: CalendarDay
}

export const DatePicker = ({ calendarDay }: DatePickerProps) => {
    const [year, setYear] = useState(calendarDay.fullDate.getFullYear());
    const [month, setMonth] = useState(calendarDay.fullDate.getMonth() + 1);
    const [day, setDay] = useState(calendarDay.fullDate.getDate());
    const dateInputRef = useRef<HTMLInputElement>(null);

    const onCalendarClick = () => {
        if (!dateInputRef.current) return;
        dateInputRef.current.showPicker();
    }

    const onNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [y, m, d] = e.target.value.split('-').map(Number);
        setYear(y);
        setMonth(m);
        setDay(d);
    }

    return (
        <div onClick={onCalendarClick} className='section-input date-picker pointer-cursor'>
            <div className='date-picker-container'>
                <div className='default-cursor section-text'>
                    {year}
                </div>
                <span className='default-cursor section-text'>-</span>
                <div className='default-cursor section-text'>
                    {String(month).padStart(2, '0')}
                </div>
                <span className='default-cursor section-text'>-</span>
                <div className='default-cursor section-text'>
                    {String(day).padStart(2, '0')}
                </div>
            </div>

            <div className='section-icon'><CalendarIcon /></div>

            <input
                ref={dateInputRef}
                className='date-picker-input'
                type='date'
                value={`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`}
                onChange={onNativeChange}
            />
        </div>
    );
}