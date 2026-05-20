import type { Task } from '../../../../types/Task';
import { useTaskForm } from '../../hook/useTaskForm';
import type { CalendarDay } from '../../types/CalendarDay';
import type { Time } from '../../types/Time';
import { CourseSection } from './components/CourseSection/CourseSection';
import { DateSection } from './components/DateSection/DateSection';
import { TimeSection } from './components/TimeSection/TimeSection';
import './TaskForm.css';

interface TaskFormProps {
    mode: 'create' | 'update',
    task?: Task;
    onClose: () => void;
    calendarDay: CalendarDay;
    initialStartTime: Time;
    initialEndTime: Time;
}

export const TaskForm = ({ mode, task, calendarDay, initialStartTime, initialEndTime, onClose }: TaskFormProps) => {
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
        onEndTimeChange,
        minDate,
        maxDate,
        onSubmit,
        errors,
        onRemove
    } = useTaskForm({ calendarDay, initialStartTime, initialEndTime, onClose, task });

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content modal" onClick={(e) => e.stopPropagation()}>
                <p className='modal-title'>{mode === 'create' ? 'New task' : 'Edit task'}</p>
                <CourseSection course={course} onCourseChange={onCourseChange} courses={courses} />
                <DescriptionSection descriptionError={errors.description} description={description} onDescriptionChange={onDescriptionChange} />
                <DateSection date={date} onDateChange={onDateChange} minDate={minDate} maxDate={maxDate} />
                <TimeSection startTime={startTime} onStartTimeChange={onStartTimeChange} endTime={endTime} onEndTimeChange={onEndTimeChange} />
                <div className='section-button-container'>
                    <button className='section-label section-button' onClick={onClose}>Cancel</button>
                    <button className='section-label section-button' onClick={() => onSubmit(mode, task)}>Add task</button>
                    {
                        mode === 'update' && <button className='section-label section-button' onClick={() => { if (task) onRemove(task?.id) }}>Remove</button>
                    }
                </div>
            </div>
        </div>
    );
}

interface DescriptionSectionProps {
    description: string;
    onDescriptionChange: (description: string) => void;
    descriptionError?: string;
}

const DescriptionSection = ({ description, onDescriptionChange, descriptionError }: DescriptionSectionProps) => {
    return (
        <div className='section-column'>
            <p className='section-label'>Description</p>
            <input className={`section-input section-text ${descriptionError ? 'border-error' : ''}`} placeholder='e.g Sprint planning, Design meeting...' value={description} onChange={(e) => onDescriptionChange(e.target.value)} />
            {
                descriptionError ? <div className='section-error' style={{ height: 25 }}>{descriptionError}</div> : <div style={{ height: 25 }} />
            }
        </div>
    );
}