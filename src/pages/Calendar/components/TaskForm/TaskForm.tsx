import { useTaskForm } from '../../hook/useTaskForm';
import type { CalendarDay } from '../../types/CalendarDay';
import type { Time } from '../../types/Time';
import { CourseSection } from './components/CourseSection/CourseSection';
import { DateSection } from './components/DateSection/DateSection';
import { TimeSection } from './components/TimeSection/TimeSection';
import './TaskForm.css';

interface TaskFormProps {
    onClose: () => void;
    calendarDay: CalendarDay;
    initialStartTime: Time;
    initialEndTime: Time;
}

export const TaskForm = ({ calendarDay, initialStartTime, initialEndTime, onClose }: TaskFormProps) => {
    const {
        description,
        onDescriptionChange,
        course,
        onCourseChange,
        courses,
        date,
        onDateChange,
        startTime,
        onStartTimeChange,
        endTime,
        onEndTimeChange
    } = useTaskForm({ calendarDay, initialStartTime, initialEndTime });

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content modal" onClick={(e) => e.stopPropagation()}>
                <p className='modal-title'>New task</p>
                <CourseSection course={course} onCourseChange={onCourseChange} courses={courses} />
                <DescriptionSection description={description} onDescriptionChange={onDescriptionChange} />
                <DateSection date={date} onDateChange={onDateChange} />
                <TimeSection startTime={startTime} onStartTimeChange={onStartTimeChange} endTime={endTime} onEndTimeChange={onEndTimeChange} />
                <div className='section-button-container'>
                    <button className='section-label section-button' onClick={onClose}>Cancel</button>
                    <button className='section-label section-button'>Add task</button>
                </div>

            </div>
        </div>
    );
}

interface DescriptionSectionProps {
    description: string;
    onDescriptionChange: (description: string) => void;
}

const DescriptionSection = ({ description, onDescriptionChange }: DescriptionSectionProps) => {
    return (
        <div className='section-column'>
            <p className='section-label'>Description</p>
            <input className='section-input section-text' placeholder='e.g Sprint planning, Design meeting...' value={description} onChange={(e) => onDescriptionChange(e.target.value)} />
        </div>
    );
}