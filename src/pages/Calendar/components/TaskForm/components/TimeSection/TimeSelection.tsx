import type { CalendarTime } from '../../../../../../Calendar.types';

const CONTAINER_CLASS = 'absolute w-full max-h-[155px] top-full left-0 flex flex-row bg-white border border-gray-300 z-10';
const COLUMN_CLASS = 'hide-scrollbar flex-1 flex flex-col items-center overflow-scroll';
const PERIOD_COLUMN_CLASS = 'flex-1 flex flex-col items-center';
const ITEM_BASE_CLASS = 'text-[15px] font-medium text-[#2C2C2A] select-none w-full flex items-center justify-center';
const ITEM_DEFAULT_CLASS = `${ITEM_BASE_CLASS} cursor-pointer hover:bg-[lightgray]`;
const ITEM_SELECTED_CLASS = `${ITEM_BASE_CLASS} cursor-pointer bg-[rgb(153,200,254)] outline outline-1 outline-[lightgray]`;
const ITEM_DISABLED_CLASS = `${ITEM_BASE_CLASS} opacity-30 cursor-not-allowed`;

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 61 }, (_, i) => i);

interface TimeSelectionProps {
    displaySelection: boolean;
    time: CalendarTime;
    setTime: (time: CalendarTime) => void;
    type: 'start' | 'end';
}

export const TimeSelection = ({ displaySelection, time, setTime, type }: TimeSelectionProps) => {
    const handleOnHourClick = (h: number) => {
        setTime({ id: time.id, hour: h, minutes: time.minutes, period: time.period });
    };

    const handleOnMinutesClick = (m: number) => {
        setTime({ id: time.id, hour: time.hour, minutes: m, period: time.period });
    };

    const handleOnPeriodClick = (period: 'AM' | 'PM') => {
        setTime({ id: time.id, hour: time.hour, minutes: time.minutes, period: period });
    };

    const isDisabled = (h: number) => type === 'end' && h === 12 && time.period === 'AM';

    if (!displaySelection) return null;

    return (
        <div className={CONTAINER_CLASS}>

            {/* Hours */}
            <div className={COLUMN_CLASS}>
                {hours.map((h) => (
                    <span
                        key={h}
                        onClick={() => { if (!isDisabled(h)) handleOnHourClick(h); }}
                        className={isDisabled(h) ? ITEM_DISABLED_CLASS : time.hour === h ? ITEM_SELECTED_CLASS : ITEM_DEFAULT_CLASS}
                    >
                        {String(h).padStart(2, '0')}
                    </span>
                ))}
            </div>

            {/* Minutes */}
            <div className={COLUMN_CLASS}>
                {minutes.map((m) => (
                    <span
                        key={m}
                        onClick={() => handleOnMinutesClick(m)}
                        className={time.minutes === m ? ITEM_SELECTED_CLASS : ITEM_DEFAULT_CLASS}
                    >
                        {String(m).padStart(2, '0')}
                    </span>
                ))}
            </div>

            {/* Period */}
            <div className={PERIOD_COLUMN_CLASS}>
                {(['AM', 'PM'] as const).map((period) => (
                    <span
                        key={period}
                        onClick={() => handleOnPeriodClick(period)}
                        className={time.period === period ? ITEM_SELECTED_CLASS : ITEM_DEFAULT_CLASS}
                    >
                        {period}
                    </span>
                ))}
            </div>

        </div>
    );
};