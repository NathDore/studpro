import type { Task } from '../../../../types/Task';
import type { NoteSectionHandle } from './components/NoteSection/NoteSection';
import type { CalendarDay, CalendarTime } from '../../Calendar.types';
import { useTaskForm } from './hooks/useTaskForm';
import { useRef } from 'react';
import { TaskFormContent } from './components/TaskFormContent';

const OVERLAY_CLASS = 'fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-[100]';
const MODAL_CLASS = 'bg-white rounded-[12px] w-full max-w-[90%] min-h-[90%] flex flex-col';
const HEADER_CLASS = 'bg-[#8FAcbd] w-full rounded-t-[12px] px-6 py-2 flex items-center border-b border-gray-300 gap-4';
const HEADER_TITLE_CLASS = 'text-[18px] font-bold text-[#2C2C2A] select-none cursor-default';

interface TaskFormProps {
    mode: 'create' | 'update';
    task?: Task;
    day: CalendarDay;
    initialStartTime: CalendarTime;
    initialEndTime: CalendarTime;
    onClose: () => void;
}

export const TaskForm = ({ mode, task, day, initialStartTime, initialEndTime, onClose }: TaskFormProps) => {
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
        timePickerInputs,
        onHourInputChange,
        onMinutesInputChange,
        notes,
        onAddNote,
        onRemoveNote,
        onEditNote,
        selectedNote,
        onSelectNote,
        unSelectNote,
        minDate,
        maxDate,
        onSubmit,
        onRemove
    } = useTaskForm({ day, initialStartTime, initialEndTime, onClose, task });

    const noteSectionRef = useRef<NoteSectionHandle>(null);

    const handleSubmit = () => {
        //const notes = noteSectionRef.current?.confirm() ?? [];
        //onSubmit(mode, task, notes);
    };

    return (
        <div className={OVERLAY_CLASS} onClick={onClose}>
            <div className={MODAL_CLASS} onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className={HEADER_CLASS}>
                    <p className={HEADER_TITLE_CLASS}>
                        {mode === 'create' ? 'New task' : 'Edit task'}
                    </p>
                </div>

                {/* Content */}
                <TaskFormContent
                    task={task}
                    course={course}
                    onCourseChange={onCourseChange}
                    courses={courses}
                    startTime={startTime}
                    onStartTimeChange={onStartTimeChange}
                    endTime={endTime}
                    onEndTimeChange={onEndTimeChange}
                    timePickerInputs={timePickerInputs}
                    onHourInputChange={onHourInputChange}
                    onMinutesInputChange={onMinutesInputChange}
                    notes={notes}
                    onAddNote={onAddNote}
                    onRemoveNote={onRemoveNote}
                    onEditNote={onEditNote}
                    selectedNote={selectedNote}
                    onSelectNote={onSelectNote}
                    unSelectNote={unSelectNote}
                />
            </div>
        </div>
    );
};

/* Content */
/*
<div className={CONTENT_CLASS}>
                    <CourseSection course={course} onCourseChange={onCourseChange} courses={courses} />
                    <NoteSection ref={noteSectionRef} initialNotes={task?.notes} />
                    <DateSection date={date} onDateChange={onDateChange} minDate={minDate} maxDate={maxDate} />
                    <TimeSection startTime={startTime} endTime={endTime} onStartTimeChange={onStartTimeChange} onEndTimeChange={onEndTimeChange} />
</div>
*/

/* Footer */
/*
<div className={FOOTER_CLASS}>
                    <button className={BUTTON_SUBMIT_CLASS} onClick={handleSubmit}>
                        {mode === 'update' ? 'Modify' : 'Add task'}
                    </button>
                    {mode === 'update' && (
                        <button className={BUTTON_REMOVE_CLASS} onClick={() => { if (task) onRemove(task.id); }}>
                            Remove
                        </button>
                    )}
                    <button className={BUTTON_BASE_CLASS} onClick={onClose}>
                        Cancel
                    </button>
</div>
*/