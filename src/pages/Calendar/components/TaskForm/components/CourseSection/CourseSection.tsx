import { PlusIcon } from '../../../../../../components/icons/PlusIcon';
import { CourseDropDown } from './components/CourseDropDown';
import type { Course } from '../../../../../../types/Course';

const CONTAINER_CLASS = 'flex flex-col gap-[1px]';
const LABEL_CLASS = 'text-[14px] font-medium text-[#2C2C2A] select-none cursor-default';
const ROW_CLASS = 'flex flex-row gap-4';
const BUTTON_CLASS = 'flex flex-row items-center gap-[5px] text-[15px] font-medium text-[#2C2C2A] py-[5px] px-[10px] border border-gray-300 rounded-[5px] cursor-pointer hover:border-gray-400';
const ICON_CLASS = 'w-5 stroke-[1.1px] text-[#2C2C2A] cursor-pointer';

interface CourseSectionProps {
    course: Course;
    onCourseChange: (course: Course) => void;
    courses: Course[];
}

export const CourseSection = ({ course, onCourseChange, courses }: CourseSectionProps) => {
    return (
        <div className={CONTAINER_CLASS}>
            <p className={LABEL_CLASS}>Course</p>
            <div className={ROW_CLASS}>
                <CourseDropDown course={course} onCourseChange={onCourseChange} courses={courses} />
                <button className={BUTTON_CLASS}>
                    <PlusIcon className={ICON_CLASS} />
                    New course
                </button>
            </div>
        </div>
    );
};