
import { useRef, useState } from 'react';
import './DatePicker.css';
import { CalendarIcon } from '../../../../../../../components/icons/CalendarIcon';

interface DatePickerProps { }

export const DatePicker = ({ }: DatePickerProps) => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [day, setDay] = useState(new Date().getDate());
    const dateInputRef = useRef<HTMLInputElement>(null);

    const onCalendarIconClick = () => {
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
        <div className='section-input date-picker'>
            <div className='date-picker-container'>
                <input
                    className='default-cursor'
                    type='text'
                    value={year}
                    maxLength={4}
                    onChange={(e) => setYear(Number(e.target.value))}
                    onFocus={(e) => e.target.select()}
                />
                <span className='default-cursor'>-</span>
                <input
                    className='default-cursor'
                    type='text'
                    value={String(month).padStart(2, '0')}
                    maxLength={2}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    onFocus={(e) => e.target.select()}
                />
                <span className='default-cursor'>-</span>
                <input
                    className='default-cursor'
                    type='text'
                    value={String(day).padStart(2, '0')}
                    maxLength={2}
                    onChange={(e) => setDay(Number(e.target.value))}
                    onFocus={(e) => e.target.select()}
                />
            </div>

            <div className='date-calendar-icon' onClick={onCalendarIconClick}><CalendarIcon /></div>
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