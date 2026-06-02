import { PlusIcon } from '../../../../../../components/icons/PlusIcon';
import { CourseDropDown } from './components/CourseDropDown';
import type { Course } from '../../../../../../types/Course';

interface CourseSectionProps {
    course: Course;
    onCourseChange: (course: Course) => void;
    courses: Course[];
}

export const CourseSection = ({ course, onCourseChange, courses }: CourseSectionProps) => {
    return (
        <div className='flex flex-col gap-[1px]'>
            <p className='text-[14px] font-medium text-[#2C2C2A] select-none cursor-default'>Course</p>
            <div className='flex flex-row gap-4'>
                <CourseDropDown course={course} onCourseChange={onCourseChange} courses={courses} />
                <button className='flex flex-row items-center gap-[5px] text-[15px] font-medium text-[#2C2C2A] py-[5px] px-[10px] border border-gray-300 rounded-[5px] cursor-pointer hover:border-gray-400'>
                    <PlusIcon className='w-5 stroke-[1.1px] text-[#2C2C2A] cursor-pointer' />
                    New course
                </button>
            </div>
        </div>
    );
};