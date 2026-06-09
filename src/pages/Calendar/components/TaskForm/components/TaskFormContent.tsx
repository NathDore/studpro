import type { Course } from '../../../../../types/Course';
import type { Task } from '../../../../../types/Task'
import type { CalendarTime, TimePickerInputs, TimePickerInputType } from '../../../Calendar.types';
import { CoursePicker } from './Course/CoursePicker';
import { TimePicker } from './Time/TimePicker';

const enableBGColor = false;

const CONTENT_CONTAINER_CLASS = 'p-2 w-full h-full flex flex-1 flex-col';
const TOP_SECTION_CLASS = `${enableBGColor ? 'bg-red-500' : ''} flex-[3] flex flex-row justify-between px-[20px]`;
const MIDDLE_SECTION_CLASS = 'bg-green-500 flex-[87]';
const BOTTOM_SECTION_CLASS = 'bg-blue-500 flex-[10]';

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
    onMinutesInputChange
}: TaskFormContentProps) => {
    return (
        <div className={CONTENT_CONTAINER_CLASS}>
            <div className={TOP_SECTION_CLASS}>
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
            <div className={MIDDLE_SECTION_CLASS}>Middle section</div>
            <div className={BOTTOM_SECTION_CLASS}>Bottom section</div>
        </div>
    )
}
