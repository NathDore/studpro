import { DatePicker } from './components/DatePicker';

interface DateSectionProps {
    date: Date;
    onDateChange: (date: Date) => void;
    minDate: Date;
    maxDate: Date;
}

export const DateSection = ({ date, onDateChange, minDate, maxDate }: DateSectionProps) => {
    return (
        <div className='flex flex-col gap-[1px]'>
            <p className='text-[14px] font-medium text-[#2C2C2A] select-none cursor-default'>Date</p>
            <DatePicker date={date} onDateChange={onDateChange} minDate={minDate} maxDate={maxDate} />
        </div>
    );
};