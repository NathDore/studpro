import { PlusIcon } from '../../../../../../components/icons/PlusIcon';
import { CourseDropDown } from './CourseDropDown';
import type { Course } from '../../../../../../types/Course';
import { COURSE_HEIGHT_CLASS } from './styles-course-section';
import { TEXT_COLOR_CLASS, TEXT_SIZE_CLASS } from '../../../../../../styles/styles-class';
import { MyButton } from '../../../../../../components/MyButton';

interface CoursePickerProps {
    selectedCourse: Course | null;
    selectCourse: (course: Course) => void;
    courses: Course[];
    onNewCourseClick: () => void;
}

export const CoursePicker = ({ selectedCourse, selectCourse, courses, onNewCourseClick }: CoursePickerProps) => {
    return (
        <div className={`flex flex-col gap-0.5`}>
            <p className={`${TEXT_SIZE_CLASS} font-medium ${TEXT_COLOR_CLASS} select-none cursor-default`}>Course</p>
            <div className={`flex flex-row gap-0.5 ${COURSE_HEIGHT_CLASS}`}>
                {
                    courses.length > 0 && <CourseDropDown selectedCourse={selectedCourse ?? courses[0]} selectCourse={selectCourse} courses={courses} />
                }
                <MyButton onClick={onNewCourseClick}>
                    <PlusIcon className={`w-3 stroke-[1.1px] ${TEXT_COLOR_CLASS} cursor-pointer`} />
                    New course
                </MyButton>
            </div>
        </div>
    );
};