import './TimeSelection.css';
import type { CalendarTime } from '../../../../../../../Calendar.types';

interface TimeSelectionProps {
    displaySelection: boolean;
    time: CalendarTime;
    setTime: (time: CalendarTime) => void;
    type: 'start' | 'end';
}

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 61 }, (_, i) => i);

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
        <div className='absolute w-full max-h-[155px] top-full left-0 flex flex-row bg-white border border-gray-300 z-10'>

            {/* Hours */}
            <div className='hide-scrollbar flex-1 flex flex-col items-center overflow-scroll'>
                {hours.map((h) => (
                    <span
                        key={h}
                        onClick={() => { if (!isDisabled(h)) handleOnHourClick(h); }}
                        className={`text-[15px] font-medium text-[#2C2C2A] select-none
                            ${time.hour === h ? 'selected' : 'user-selection'}
                            ${isDisabled(h) ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        {String(h).padStart(2, '0')}
                    </span>
                ))}
            </div>

            {/* Minutes */}
            <div className='hide-scrollbar flex-1 flex flex-col items-center overflow-scroll'>
                {minutes.map((m) => (
                    <span
                        key={m}
                        onClick={() => handleOnMinutesClick(m)}
                        className={`text-[15px] font-medium text-[#2C2C2A] select-none cursor-pointer
                            ${time.minutes === m ? 'selected' : 'user-selection'}`}
                    >
                        {String(m).padStart(2, '0')}
                    </span>
                ))}
            </div>

            {/* Period */}
            <div className='flex-1 flex flex-col items-center'>
                {(['AM', 'PM'] as const).map((period) => (
                    <span
                        key={period}
                        onClick={() => handleOnPeriodClick(period)}
                        className={`text-[15px] font-medium text-[#2C2C2A] select-none cursor-pointer
                            ${time.period === period ? 'selected' : 'user-selection'}`}
                    >
                        {period}
                    </span>
                ))}
            </div>
        </div>
    );
};