import type { Course } from '../../../../../types/Course';
import type { Note } from '../../../../../types/Note';
import type { Task } from '../../../../../types/Task'
import type { CalendarTime, TimePickerInputs, TimePickerInputType } from '../../../Calendar.types';
import { CoursePicker } from './Course/CoursePicker';
import { NoteInput } from './Note/NoteInput';
import { NoteList } from './Note/NoteList';
import { TimePicker } from './Time/TimePicker';

interface TaskFormContentProps {
    task?: Task;
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
}

export const TaskFormContent = ({
    task,
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
    onNoteTextChanged
}: TaskFormContentProps) => {
    return (
        <div className={`p-2 w-full h-full flex flex-1 flex-col gap-8`}>

            {/* Top section */}
            <div className={`flex flex-1 flex-row justify-between items-center px-5 py-1`}>
                <CoursePicker course={course} onCourseChange={onCourseChange} courses={courses} />
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
            <div className={`flex flex-col flex-87 rounded-lg px-5 py-1 gap-1.5`}>
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
            <div className={`bg-blue-500 flex-10 px-5 py-1`}>Bottom section</div>
        </div>
    )
}
