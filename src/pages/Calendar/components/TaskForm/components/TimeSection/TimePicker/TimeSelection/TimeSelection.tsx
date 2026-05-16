import type { TimePickerValue } from '../../TimeSection';
import './TimeSelection.css';

interface TimeSelectionProps {
    displaySelection: boolean;
    timePickerValue: TimePickerValue;
}

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 61 }, (_, i) => i);

export const TimeSelection = ({ displaySelection, timePickerValue }: TimeSelectionProps) => {
    return (
        <div className={`time-selection-container ${!displaySelection ? 'time-selection-hidden' : ''}`}>
            <div className='time-section-commun hide-scrollbar hour-section'>
                {hours.map((h) => <span className={`section-text pointer-cursor ${timePickerValue.hour === h ? 'selected' : ''}`} key={h}>{String(h).padStart(2, '0')}</span>)}
            </div>
            <div className='time-section-commun hide-scrollbar minutes-section'>
                {minutes.map((m) => <span className={`section-text pointer-cursor ${timePickerValue.minutes === m ? 'selected' : ''}`} key={m}>{String(m).padStart(2, '0')}</span>)}
            </div>
            <div className='time-section-commun period-section'>
                <span className={`section-text pointer-cursor ${timePickerValue.period === 'AM' ? 'selected' : ''}`} >AM</span>
                <span className={`section-text pointer-cursor ${timePickerValue.period === 'PM' ? 'selected' : ''}`} >PM</span>
            </div>
        </div>
    )
}