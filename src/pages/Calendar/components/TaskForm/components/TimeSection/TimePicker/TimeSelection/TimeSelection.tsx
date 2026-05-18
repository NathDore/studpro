import React, { useState, type Dispatch, type SetStateAction } from 'react';
import type { TimePickerValue } from '../../TimeSection';
import './TimeSelection.css';

interface TimeSelectionProps {
    displaySelection: boolean;
    timePickerValue: TimePickerValue;
    setTimePickerValue: Dispatch<SetStateAction<TimePickerValue>>;
}

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 61 }, (_, i) => i);

export const TimeSelection = ({ displaySelection, timePickerValue, setTimePickerValue }: TimeSelectionProps) => {
    const [currentHour, setCurrentHour] = useState(timePickerValue.hour);
    const [currentMinutes, setCurrentMinutes] = useState(timePickerValue.minutes);
    const [currentPeriod, setCurrentPeriod] = useState(timePickerValue.period);

    const handleOnHourClick = (h: number) => {
        setCurrentHour(h);
        setTimePickerValue({ hour: h, minutes: currentMinutes, period: currentPeriod }); // ✅
    }

    const handleOnMinutesClick = (m: number) => {
        setCurrentMinutes(m);
        setTimePickerValue({ hour: currentHour, minutes: m, period: currentPeriod });
    }

    const handleOnPeriodClick = (period: 'AM' | 'PM') => {
        setCurrentPeriod(period);
        setTimePickerValue({ hour: currentHour, minutes: currentMinutes, period: period });
    }

    return (
        <div className={`time-selection-container ${!displaySelection ? 'time-selection-hidden' : ''}`}>
            <div className='time-section-commun hide-scrollbar hour-section'>
                {
                    hours.map((h) =>
                        <span onClick={() => handleOnHourClick(h)} className={`section-text pointer-cursor ${currentHour === h ? 'selected' : ''} user-selection`} key={h}>{String(h).padStart(2, '0')}</span>
                    )
                }
            </div>
            <div className='time-section-commun hide-scrollbar minutes-section'>
                {
                    minutes.map((m) =>
                        <span onClick={() => handleOnMinutesClick(m)} className={`section-text pointer-cursor ${currentMinutes === m ? 'selected' : ''} user-selection`} key={m}>{String(m).padStart(2, '0')}</span>
                    )
                }
            </div>
            <div className='time-section-commun period-section'>
                <span onClick={() => handleOnPeriodClick('AM')} className={`section-text pointer-cursor ${currentPeriod === 'AM' ? 'selected' : ''} user-selection`} >AM</span>
                <span onClick={() => handleOnPeriodClick('PM')} className={`section-text pointer-cursor ${currentPeriod === 'PM' ? 'selected' : ''} user-selection`} >PM</span>
            </div>
        </div>
    )
}