import type { Task } from '../../../../types/Task';
import type { CalendarDay, CalendarTime } from '../../Calendar.types';
import { useTaskForm } from './hooks/useTaskForm';
import { Overlay } from '../../../../components/modals/Overlay';
import { Modal } from '../../../../components/modals/Modal';
import { CoursePicker } from './components/Course/CoursePicker';
import { TimePicker } from './components/Time/TimePicker';
import { NoteList } from './components/Note/NoteList';
import { NoteInput } from './components/Note/NoteInput';
import { MyButton } from '../../../../components/buttons/MyButton';
import { WarningIcon } from '../../../../components/icons/WarningIcon';

interface TaskFormProps {
    mode: 'create' | 'update';
    selectedTask?: Task;
    day: CalendarDay;
    initialStartTime: CalendarTime;
    initialEndTime: CalendarTime;
    onClose: () => void;
    onNewCourseClick: () => void;
}

const FLEX_TOP_CLASS = `flex flex-1 flex-col sm:flex-col md:flex-row`

export const TaskForm = ({ mode, selectedTask, day, initialStartTime, initialEndTime, onClose, onNewCourseClick }: TaskFormProps) => {
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
    } = useTaskForm({ day, initialStartTime, initialEndTime, onClose, selectedTask });

    const handleSubmit = () => {
        onSubmit(mode, course, notes, selectedTask ? selectedTask.id : crypto.randomUUID());
    };

    const handleDelete = () => {
        if (mode !== 'update' || !selectedTask) return;
        onRemove(selectedTask?.id);
    }

    return (
        <Overlay onClose={onClose}>
            <Modal title={mode === 'create' ? 'New task' : 'Edit task'} onClose={onClose}>
                <div className={`py-2 px-8 w-full h-full flex flex-1 flex-col gap-8`}>

                    {/* Top section */}
                    <div className={`${FLEX_TOP_CLASS} justify-between items-center  py-1`}>
                        <CoursePicker course={course} onCourseChange={onCourseChange} courses={courses} onNewCourseClick={onNewCourseClick} />
                        <TimePicker
                            startTime={startTime}
                            onStartTimeChange={onStartTimeChange}
                            endTime={endTime}
                            onEndTimeChange={onEndTimeChange}
                            timePickerInputs={timePickerInputs}
                            onHourInputChange={onHourInputChange}
                            onMinutesInputChange={onMinutesInputChange}
                        />
                    </div>

                    {/* Middle section */}
                    <div className={`flex flex-col flex-87 rounded-lg py-1 gap-1.5`}>
                        <NoteList
                            notes={notes}
                            onSelectNote={onSelectNote}
                            onRemoveNote={onRemoveNote}
                            selectedNote={selectedNote}
                        />

                        <NoteInput
                            selectedNote={selectedNote}
                            onAddNote={onAddNote}
                            onEditNote={onEditNote}
                            unSelectNote={unSelectNote}
                            noteText={noteText}
                            onNoteTextChanged={onNoteTextChanged} />
                    </div>

                    {/* Bottom section */}
                    <div className={`flex-10 flex flex-row justify-start items-center gap-2.5  py-1`}>
                        <MyButton onClick={handleSubmit} className={`w-30 h-10 flex justify-center items-center bg-green-300`}>
                            <p>{mode === 'create' ? 'Create' : 'Modify'}</p>
                        </MyButton>

                        {
                            mode === 'update' && <MyButton onClick={handleDelete} className={`w-30 h-10 flex justify-center items-cente bg-red-200`}>
                                <WarningIcon className={'w-3.75 h-3.75 block text-[#C0392B]'} />
                                <p>Delete</p>
                            </MyButton>
                        }
                    </div>
                </div>
            </Modal>
        </Overlay>
    );
};