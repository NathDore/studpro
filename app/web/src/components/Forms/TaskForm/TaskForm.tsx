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
    mode?: 'create' | 'update';
    selectedTask?: Task;
    day: CalendarDay;
    initialStartTime: CalendarTime;
    initialEndTime: CalendarTime;
    onClose: () => void;
    onNewCourseClick: () => void;
}

export const TaskForm = ({ mode = 'create', selectedTask, day, initialStartTime, initialEndTime, onClose, onNewCourseClick }: TaskFormProps) => {

    const { taskId, courseState, timeState, noteState, onSubmit, onDelete } = useTaskForm(mode, selectedTask, day, initialStartTime, initialEndTime, onClose);

    const handleSubmit = () => {
        onSubmit();
    };

    const handleDelete = () => {
        if (mode !== 'update' || !selectedTask) return;
        onDelete();
    };

    return (
        <Overlay>
            <Modal title={mode === 'create' ? 'New task' : 'Edit task'} onClose={onClose} width={850} height={600}>
                <div className='py-2 px-8 w-full h-full grid grid-rows-[auto_1fr_auto] gap-8'>

                    <div className='flex flex-col sm:flex-col md:flex-row justify-between items-center py-1 gap-1.5'>
                        <CoursePicker {...courseState} onNewCourseClick={onNewCourseClick} />
                        <TimePicker {...timeState} />
                    </div>

                    <div className='flex flex-col rounded-lg py-1 gap-1.5 overflow-hidden'>
                        <NoteList
                            notes={noteState.notes}
                            selectedNote={noteState.selectedNote}
                            onSelectNote={noteState.onSelectNote}
                            onRemoveNote={noteState.onRemoveNote}
                        />
                        <NoteInput
                            taskId={taskId}
                            selectedNote={noteState.selectedNote}
                            noteText={noteState.noteText}
                            onAddNote={noteState.onAddNote}
                            onEditNote={noteState.onEditNote}
                            unSelectNote={noteState.unSelectNote}
                            onNoteTextChanged={noteState.onNoteTextChanged}
                            clearNoteInput={noteState.clearNoteInput}
                        />
                    </div>

                    <div className='flex flex-row justify-start items-center gap-2.5 py-1'>
                        <MyButton
                            onClick={handleSubmit}
                            disabled={courseState.selectedCourse === null}
                            className={`w-30 h-10 flex justify-center items-center bg-green-300 ${courseState.selectedCourse === null ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <p>{mode === 'create' ? 'Create' : 'Continue'}</p>
                        </MyButton>
                        {mode === 'update' && (
                            <MyButton onClick={handleDelete} className='w-30 h-10 flex justify-center items-center bg-red-200'>
                                <WarningIcon className='w-3.75 h-3.75 block text-[#C0392B]' />
                                <p>Delete</p>
                            </MyButton>
                        )}
                    </div>

                </div>
            </Modal>
        </Overlay>
    );
};