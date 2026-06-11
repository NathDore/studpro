import type { Task } from '../../../../types/Task';
import type { CalendarDay, CalendarTime } from '../../Calendar.types';
import { useTaskForm } from './hooks/useTaskForm';
import { TaskFormContent } from './components/TaskFormContent';
import { Overlay } from '../../../../components/modals/Overlay';
import { Modal } from '../../../../components/modals/Modal';

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
        onSubmit,
        onRemove,
        noteText,
        onNoteTextChanged
    } = useTaskForm({ day, initialStartTime, initialEndTime, onClose, task });

    const handleSubmit = () => {
        //const notes = noteSectionRef.current?.confirm() ?? [];
        //onSubmit(mode, task, notes);
    };

    return (
        <Overlay onClose={onClose}>
            <Modal title={mode === 'create' ? 'New task' : 'Edit task'}>
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
                    noteText={noteText}
                    onNoteTextChanged={onNoteTextChanged}
                />
            </Modal>
        </Overlay>
    );
};