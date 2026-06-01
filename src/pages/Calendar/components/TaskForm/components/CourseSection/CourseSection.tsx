import './CourseSection.css';
import { PlusIcon } from '../../../../../../components/icons/PlusIcon';
import { CourseDropDown } from './components/CourseDropDown/CourseDropDown';
import type { Course } from '../../../../../../types/Course';

interface CourseSectionProps {
    course: Course;
    onCourseChange: (course: Course) => void;
    courses: Course[];
}

export const CourseSection = ({ course, onCourseChange, courses }: CourseSectionProps) => {
    return (
        <div className='section-column'>
            <p className='section-label'>Course</p>
            <div className='section-row'>
                <CourseDropDown course={course} onCourseChange={onCourseChange} courses={courses} />
                <button className='section-button section-text add-course-button'><PlusIcon className='section-icon' /> New course</button>
            </div>
        </div>
    );
}