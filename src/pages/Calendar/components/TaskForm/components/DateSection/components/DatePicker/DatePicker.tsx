import { useRef } from 'react';
import './DatePicker.css';
import { CalendarIcon } from '../../../../../../../../components/icons/CalendarIcon';

interface DatePickerProps {
    date: Date;
    onDateChange: (date: Date) => void;
    minDate: Date;
    maxDate: Date;
}

export const DatePicker = ({ date, onDateChange, minDate, maxDate }: DatePickerProps) => {
    const dateInputRef = useRef<HTMLInputElement>(null);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const onCalendarClick = () => {
        if (!dateInputRef.current) return;
        dateInputRef.current.showPicker();
    }

    const onNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [y, m, d] = e.target.value.split('-').map(Number);
        onDateChange(new Date(y, m - 1, d));
    }

    return (
        <div onClick={onCalendarClick} className='section-input date-picker pointer-cursor'>
            <div className='date-picker-container'>
                <div className='default-cursor section-text pointer-cursor user-select-none'>
                    {year}
                </div>
                <span className='default-cursor section-text pointer-cursor user-select-none'>-</span>
                <div className='default-cursor section-text pointer-cursor user-select-none'>
                    {month}
                </div>
                <span className='default-cursor section-text pointer-cursor user-select-none'>-</span>
                <div className='default-cursor section-text pointer-cursor user-select-none'>
                    {day}
                </div>
            </div>

            <div className='section-icon'><CalendarIcon /></div>

            <input
                ref={dateInputRef}
                className='date-picker-input'
                type='date'
                value={`${year}-${month}-${day}`}
                onChange={onNativeChange}
                min={minDate.toISOString().split('T')[0]}
                max={maxDate.toISOString().split('T')[0]}
            />
        </div>
    );
}