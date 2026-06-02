import type { Task } from '../../../../types/Task';
import { useTaskForm } from './hooks/useTaskForm';
import type { CalendarDay } from '../../../../types/CalendarDay';
import type { Time } from '../../../../types/Time';
import { CourseSection } from './components/CourseSection/CourseSection';
import { DateSection } from './components/DateSection/DateSection';
import { TimeSection } from './components/TimeSection/TimeSection';
import { NoteSection } from './components/NoteSection/NoteSection';
import type { NoteSectionHandle } from './components/NoteSection/NoteSection';
import { useRef } from 'react';

interface TaskFormProps {
    mode: 'create' | 'update';
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
        onRemove
    } = useTaskForm({ calendarDay, initialStartTime, initialEndTime, onClose, task });

    const noteSectionRef = useRef<NoteSectionHandle>(null);

    const handleSubmit = () => {
        const notes = noteSectionRef.current?.confirm() ?? [];
        onSubmit(mode, task, notes);
    };

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-[100]" onClick={onClose}>
            <div className="bg-white rounded-[12px] w-full max-w-[440px] flex flex-col" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="bg-[#8FAcbd] w-full rounded-t-[12px] px-6 py-2 flex items-center border-b border-gray-300 gap-4">
                    <p className="text-[18px] font-bold text-[#2C2C2A] select-none cursor-default">
                        {mode === 'create' ? 'New task' : 'Edit task'}
                    </p>
                </div>

                {/* Content */}
                <div className="px-6 py-4 flex flex-col gap-2">
                    <CourseSection course={course} onCourseChange={onCourseChange} courses={courses} />
                    <NoteSection ref={noteSectionRef} initialNotes={task?.notes} />
                    <DateSection date={date} onDateChange={onDateChange} minDate={minDate} maxDate={maxDate} />
                    <TimeSection startTime={startTime} onStartTimeChange={onStartTimeChange} endTime={endTime} onEndTimeChange={onEndTimeChange} />
                </div>

                {/* Footer */}
                <div className="flex flex-row justify-end items-center gap-[10px] px-6 py-4">
                    <button
                        className="text-[14px] font-medium text-[#2C2C2A] py-[5px] px-[10px] border border-gray-300 rounded-[5px] cursor-pointer hover:border-gray-400 bg-[#4A7C99]"
                        onClick={handleSubmit}
                    >
                        {mode === 'update' ? 'Modify' : 'Add task'}
                    </button>
                    {mode === 'update' && (
                        <button
                            className="text-[14px] font-medium text-[#2C2C2A] py-[5px] px-[10px] border border-gray-300 rounded-[5px] cursor-pointer hover:border-gray-400 bg-[#C0392B]"
                            onClick={() => { if (task) onRemove(task.id); }}
                        >
                            Remove
                        </button>
                    )}
                    <button
                        className="text-[14px] font-medium text-[#2C2C2A] py-[5px] px-[10px] border border-gray-300 rounded-[5px] cursor-pointer hover:border-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};