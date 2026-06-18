import type { Task } from '../../../types/Task';
import type { CalendarDay, CalendarTime } from '../../../pages/Calendar/Calendar.types';
import { useTaskForm } from './hooks/useTaskForm';
import { Overlay } from '../../modal/Overlay';
import { Modal } from '../../modal/Modal';
import { CoursePicker } from './components/Course/CoursePicker';
import { TimePicker } from './components/Time/TimePicker';
import { NoteList } from './components/Note/NoteList';
import { NoteInput } from './components/Note/NoteInput';
import { MyButton } from '../../MyButton';
import { WarningIcon } from '../../icons/WarningIcon';

interface TaskFormProps {
    mode: 'create' | 'update';
    selectedTask?: Task;
    day: CalendarDay;
    initialStartTime: CalendarTime;
    initialEndTime: CalendarTime;
    onClose: () => void;
    onNewCourseClick: () => void;
}

const FLEX_TOP_CLASS = `flex flex-col sm:flex-col md:flex-row`;

export const TaskForm = ({ mode, selectedTask, day, initialStartTime, initialEndTime, onClose, onNewCourseClick }: TaskFormProps) => {
    const {
        selectedCourse,
        selectCourse,
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
        onCreateTask,
        onRemove,
        noteText,
        onNoteTextChanged,
        clearNoteInput
    } = useTaskForm({ day, initialStartTime, initialEndTime, onClose, selectedTask });

    const handleSubmit = () => {
        onCreateTask(mode, selectedCourse, notes, selectedTask ? selectedTask.id : crypto.randomUUID());
    };

    const handleDelete = () => {
        if (mode !== 'update' || !selectedTask) return;
        onRemove(selectedTask.id);
    };

    return (
        <Overlay>
            <Modal title={mode === 'create' ? 'New task' : 'Edit task'} onClose={onClose} width={850} height={600}>
                <div className="py-2 px-8 w-full h-full grid grid-rows-[auto_1fr_auto] gap-8">

                    {/* Top — course + time picker */}
                    <div className={`${FLEX_TOP_CLASS} justify-between items-center py-1 gap-1.5`}>
                        <CoursePicker selectedCourse={selectedCourse} selectCourse={selectCourse} courses={courses} onNewCourseClick={onNewCourseClick} />
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

                    {/* Middle — notes */}
                    <div className="flex flex-col rounded-lg py-1 gap-1.5 overflow-hidden">
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
                            onNoteTextChanged={onNoteTextChanged}
                            clearNoteInput={clearNoteInput}
                        />
                    </div>

                    {/* Bottom — actions */}
                    <div className="flex flex-row justify-start items-center gap-2.5 py-1">
                        <MyButton
                            onClick={handleSubmit}
                            disabled={selectedCourse === null}
                            className={`w-30 h-10 flex justify-center items-center bg-green-300 ${selectedCourse === null ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <p>{mode === 'create' ? 'Create' : 'Modify'}</p>
                        </MyButton>
                        {mode === 'update' && (
                            <MyButton onClick={handleDelete} className="w-30 h-10 flex justify-center items-center bg-red-200">
                                <WarningIcon className="w-3.75 h-3.75 block text-[#C0392B]" />
                                <p>Delete</p>
                            </MyButton>
                        )}
                    </div>

                </div>
            </Modal>
        </Overlay>
    );
};