import type { CalendarDay } from '../../types/CalendarDay';
import type { Time } from '../CalendarGrid/CalendarGrid';
import { CourseSection } from './components/CourseSection/CourseSection';
import { DateSection } from './components/DateSection/DateSection';
import { TimeSection } from './components/TimeSection/TimeSection';
import './TaskForm.css';

interface TaskFormProps {
    onClose: () => void;
    calendarDay: CalendarDay;
    startTime: Time;
    endTime: Time;
}

export const TaskForm = ({ calendarDay, startTime, endTime, onClose }: TaskFormProps) => {

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content modal" onClick={(e) => e.stopPropagation()}>
                <p className='modal-title'>New task</p>
                <CourseSection />
                <DescriptionSection />
                <DateSection calendarDay={calendarDay} />
                <TimeSection startTime={startTime} endTime={endTime} />
                <div className='section-button-container'>
                    <button className='section-label section-button' onClick={onClose}>Cancel</button>
                    <button className='section-label section-button'>Add task</button>
                </div>

            </div>
        </div>
    );
}

interface DescriptionSectionProps { }

const DescriptionSection = ({ }: DescriptionSectionProps) => {
    return (
        <div className='section-column'>
            <p className='section-label'>Description</p>
            <input className='section-input section-text' placeholder='e.g Sprint planning, Design meeting...' />
        </div>
    );
}