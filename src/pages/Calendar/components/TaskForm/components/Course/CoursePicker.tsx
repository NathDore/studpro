import { PlusIcon } from '../../../../../../components/icons/PlusIcon';
import { CourseDropDown } from './CourseDropDown';
import type { Course } from '../../../../../../types/Course';
import { COURSE_GAP_CLASS, COURSE_HEIGHT_CLASS, COURSE_PADDING_CLASS, COURSE_TEXT_COLOR_CLASS, COURSE_TEXT_SIZE_CLASS } from './course-section-config';

const CONTAINER_CLASS = `flex flex-col ${COURSE_GAP_CLASS}`;
const LABEL_CLASS = `${COURSE_TEXT_SIZE_CLASS} font-medium ${COURSE_TEXT_COLOR_CLASS} select-none cursor-default`;
const ROW_CLASS = `flex flex-row ${COURSE_GAP_CLASS} ${COURSE_HEIGHT_CLASS}`;
const NEW_COURSE_BUTTON_CLASS = `flex flex-row items-center ${COURSE_GAP_CLASS} ${COURSE_TEXT_SIZE_CLASS} font-medium ${COURSE_TEXT_COLOR_CLASS} ${COURSE_PADDING_CLASS} border border-gray-300 rounded-[5px] cursor-pointer hover:border-gray-400`;
const NEW_COURSE_ICON_CLASS = `w-3 stroke-[1.1px] ${COURSE_TEXT_COLOR_CLASS} cursor-pointer`;

interface CoursePickerProps {
    course: Course;
    onCourseChange: (course: Course) => void;
    courses: Course[];
}

export const CoursePicker = ({ course, onCourseChange, courses }: CoursePickerProps) => {
    return (
        <div className={CONTAINER_CLASS}>
            <p className={LABEL_CLASS}>Course</p>
            <div className={ROW_CLASS}>
                <CourseDropDown course={course} onCourseChange={onCourseChange} courses={courses} />
                <button className={NEW_COURSE_BUTTON_CLASS}>
                    <PlusIcon className={NEW_COURSE_ICON_CLASS} />
                    New course
                </button>
            </div>
        </div>
    );
};