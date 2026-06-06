import { DatePicker } from './DatePicker';

const CONTAINER_CLASS = 'flex flex-col gap-[1px]';
const LABEL_CLASS = 'text-[14px] font-medium text-[#2C2C2A] select-none cursor-default';

interface DateSectionProps {
    date: Date;
    onDateChange: (date: Date) => void;
    minDate: Date;
    maxDate: Date;
}

export const DateSection = ({ date, onDateChange, minDate, maxDate }: DateSectionProps) => {
    return (
        <div className={CONTAINER_CLASS}>
            <p className={LABEL_CLASS}>Date</p>
            <DatePicker date={date} onDateChange={onDateChange} minDate={minDate} maxDate={maxDate} />
        </div>
    );
};