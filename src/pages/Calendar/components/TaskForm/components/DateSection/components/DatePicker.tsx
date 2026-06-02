import { useRef } from 'react';
import { CalendarIcon } from '../../../../../../../components/icons/CalendarIcon';

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
    };

    const onNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [y, m, d] = e.target.value.split('-').map(Number);
        onDateChange(new Date(y, m - 1, d));
    };

    return (
        <div
            onClick={onCalendarClick}
            className='relative flex flex-row justify-between items-center p-[10px] border border-gray-300 rounded-[5px] cursor-pointer hover:border-gray-400'
        >
            <div className='flex flex-row'>
                <span className='text-[15px] font-medium text-[#2C2C2A] select-none cursor-default'>{year}</span>
                <span className='text-[15px] font-medium text-[#2C2C2A] select-none cursor-default'>-</span>
                <span className='text-[15px] font-medium text-[#2C2C2A] select-none cursor-default'>{month}</span>
                <span className='text-[15px] font-medium text-[#2C2C2A] select-none cursor-default'>-</span>
                <span className='text-[15px] font-medium text-[#2C2C2A] select-none cursor-default'>{day}</span>
            </div>

            <CalendarIcon className='w-5 stroke-[1.1px] text-[#2C2C2A] cursor-pointer' />

            <input
                ref={dateInputRef}
                className='absolute top-full left-0 w-0 h-0 opacity-0 pointer-events-none'
                type='date'
                value={`${year}-${month}-${day}`}
                onChange={onNativeChange}
                min={minDate.toISOString().split('T')[0]}
                max={maxDate.toISOString().split('T')[0]}
            />
        </div>
    );
};