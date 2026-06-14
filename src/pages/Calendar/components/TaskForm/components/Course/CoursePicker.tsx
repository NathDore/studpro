import { PlusIcon } from '../../../../../../components/icons/PlusIcon';
import { CourseDropDown } from './CourseDropDown';
import type { Course } from '../../../../../../types/Course';
import { COURSE_GAP_CLASS, COURSE_HEIGHT_CLASS } from './styles-course-section';
import { TEXT_COLOR_CLASS, TEXT_SIZE_CLASS } from '../../../../../../styles/styles-class';
import { MyButton } from '../../../../../../components/buttons/MyButton';

interface CoursePickerProps {
    course: Course;
    onCourseChange: (course: Course) => void;
    courses: Course[];
    onNewCourseClick: () => void;
}

export const CoursePicker = ({ course, onCourseChange, courses, onNewCourseClick }: CoursePickerProps) => {
    return (
        <div className={`flex flex-col ${COURSE_GAP_CLASS}`}>
            <p className={`${TEXT_SIZE_CLASS} font-medium ${TEXT_COLOR_CLASS} select-none cursor-default`}>Course</p>
            <div className={`flex flex-row ${COURSE_GAP_CLASS} ${COURSE_HEIGHT_CLASS}`}>
                <CourseDropDown course={course} onCourseChange={onCourseChange} courses={courses} />
                <MyButton onClick={onNewCourseClick}>
                    <PlusIcon className={`w-3 stroke-[1.1px] ${TEXT_COLOR_CLASS} cursor-pointer`} />
                    New course
                </MyButton>
            </div>
        </div>
    );
};