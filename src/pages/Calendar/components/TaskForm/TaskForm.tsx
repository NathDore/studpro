import type { Task } from '../../../../types/Task';
import { useTaskForm } from './hook/useTaskForm';
import type { CalendarDay } from '../../types/CalendarDay';
import type { Time } from '../../types/Time';
import { CourseSection } from './components/CourseSection/CourseSection';
import { DateSection } from './components/DateSection/DateSection';
import { TimeSection } from './components/TimeSection/TimeSection';
import './TaskForm.css';
import { NoteSection } from './components/NoteSection/NoteSection';
import type { NoteSectionHandle } from './components/NoteSection/NoteSection';
import { useRef } from 'react';

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

    const noteSectionRef = useRef<NoteSectionHandle>(null);

    const handleSubmit = () => {
        const notes = noteSectionRef.current?.confirm() ?? [];
        onSubmit(mode, task, notes);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>

            <div className="modal-content modal" onClick={(e) => e.stopPropagation()}>
                <div className='modal-title-container'>
                    <p className='modal-title'>{mode === 'create' ? 'New task' : 'Edit task'}</p>
                </div>
                <div className='modal-content-containter'>
                    <CourseSection course={course} onCourseChange={onCourseChange} courses={courses} />
                    <NoteSection ref={noteSectionRef} initialNotes={task?.notes} />
                    <DateSection date={date} onDateChange={onDateChange} minDate={minDate} maxDate={maxDate} />
                    <TimeSection startTime={startTime} onStartTimeChange={onStartTimeChange} endTime={endTime} onEndTimeChange={onEndTimeChange} />
                </div>
                <div className='section-button-container'>
                    <button className='section-label section-button confirm-button' onClick={handleSubmit} >
                        {
                            mode === 'update' ? "Modify" : "Add task"
                        }
                    </button>
                    {
                        mode === 'update' && <button className='section-label section-button remove-button' onClick={() => { if (task) onRemove(task?.id) }}>Remove</button>
                    }
                    <button className='section-label section-button' onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div >
    );
}