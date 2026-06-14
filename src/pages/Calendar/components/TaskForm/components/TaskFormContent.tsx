import { MyButton } from '../../../../../components/buttons/MyButton';
import { WarningIcon } from '../../../../../components/icons/WarningIcon';
import type { Course } from '../../../../../types/Course';
import type { Note } from '../../../../../types/Note';
import type { CalendarMode, CalendarTime, TimePickerInputs, TimePickerInputType } from '../../../Calendar.types';
import { CoursePicker } from './Course/CoursePicker';
import { NoteInput } from './Note/NoteInput';
import { NoteList } from './Note/NoteList';
import { TimePicker } from './Time/TimePicker';

interface TaskFormContentProps {
    course: Course;
    onCourseChange: (course: Course) => void;
    courses: Course[];
    startTime: CalendarTime;
    onStartTimeChange: (time: CalendarTime) => void;
    endTime: CalendarTime;
    onEndTimeChange: (time: CalendarTime) => void;
    timePickerInputs: TimePickerInputs;
    onHourInputChange: (timePickerInputType: TimePickerInputType, hour: number) => void;
    onMinutesInputChange: (timePickerInputType: TimePickerInputType, minutes: number) => void;
    notes: Note[];
    onAddNote: (note: Note) => void;
    onRemoveNote: (noteId: string) => void;
    onEditNote: (updatedNote: Note) => void;
    selectedNote?: Note;
    onSelectNote: (note: Note) => void;
    unSelectNote: () => void;
    noteText: string;
    onNoteTextChanged: (text: string) => void;
    handleSubmit: () => void;
    handleDelete: () => void;
    mode: CalendarMode;
    onNewCourseClick: () => void;
}

const FLEX_TOP_CLASS = `flex flex-1 flex-col sm:flex-col md:flex-row`

export const TaskFormContent = ({
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
    noteText,
    onNoteTextChanged,
    handleSubmit,
    handleDelete,
    mode,
    onNewCourseClick
}: TaskFormContentProps) => {
    return (
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
    )
}
