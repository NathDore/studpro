import './TimeSelection.css';
import type { Time } from '../../../../../../types/Time';

interface TimeSelectionProps {
    displaySelection: boolean;
    time: Time;
    setTime: (time: Time) => void;
    type: 'start' | 'end';
}

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 61 }, (_, i) => i);

export const TimeSelection = ({ displaySelection, time, setTime, type }: TimeSelectionProps) => {
    const handleOnHourClick = (h: number) => {
        setTime({ id: time.id, hour: h, minutes: time.minutes, period: time.period });
    }

    const handleOnMinutesClick = (m: number) => {
        setTime({ id: time.id, hour: time.hour, minutes: m, period: time.period });
    }

    const handleOnPeriodClick = (period: 'AM' | 'PM') => {
        setTime({ id: time.id, hour: time.hour, minutes: time.minutes, period: period });
    }

    const isDisabled = (h: number) => type === 'start' && h === 12 && time.period === 'AM';

    return (
        <div className={`time-selection-container ${!displaySelection ? 'time-selection-hidden' : ''}`}>
            <div className='time-section-commun hide-scrollbar hour-section'>
                {
                    hours.map((h) => {
                        return <span onClick={() => { if (!isDisabled(h)) handleOnHourClick(h) }} className={`section-text pointer-cursor ${time.hour === h ? 'selected' : ''}  ${isDisabled(h) ? 'disable-selection' : 'user-selection'}`} key={h}>{String(h).padStart(2, '0')}</span>
                    }
                    )
                }
            </div>
            <div className='time-section-commun hide-scrollbar minutes-section'>
                {
                    minutes.map((m) =>
                        <span onClick={() => handleOnMinutesClick(m)} className={`section-text pointer-cursor ${time.minutes === m ? 'selected' : ''} user-selection`} key={m}>{String(m).padStart(2, '0')}</span>
                    )
                }
            </div>
            <div className='time-section-commun period-section'>
                <span onClick={() => handleOnPeriodClick('AM')} className={`section-text pointer-cursor ${time.period === 'AM' ? 'selected' : ''} user-selection`} >AM</span>
                <span onClick={() => handleOnPeriodClick('PM')} className={`section-text pointer-cursor ${time.period === 'PM' ? 'selected' : ''} user-selection`} >PM</span>
            </div>
        </div>
    )
}