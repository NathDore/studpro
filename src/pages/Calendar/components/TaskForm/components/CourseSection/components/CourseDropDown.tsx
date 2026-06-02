import { useState } from "react";
import type { Course } from "../../../../../../../types/Course";

interface DropDownProps {
    course: Course;
    onCourseChange: (course: Course) => void;
    courses: Course[];
}

export const CourseDropDown = ({ course, onCourseChange, courses }: DropDownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='flex-1 relative'>
            <div
                className="flex justify-between items-center p-[10px] border border-gray-300 rounded-[5px] cursor-pointer hover:border-gray-400"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className='flex flex-row items-center gap-4'>
                    <span style={{ width: 10, height: 10, borderRadius: 150, backgroundColor: course.color }} />
                    <span className='text-[15px] font-medium text-[#2C2C2A]'>{course.name}</span>
                </div>
                <span className='text-[15px] font-medium text-[#2C2C2A] select-none'>
                    {isOpen ? "▲" : "▼"}
                </span>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-[5px] z-10">
                    {courses.filter((c) => c.id !== course.id).map((c) => (
                        <div
                            key={c.id}
                            className="flex flex-row items-center gap-4 p-[10px] cursor-pointer text-[#2C2C2A] hover:bg-[#f5f5f5]"
                            onClick={() => {
                                onCourseChange(c);
                                setIsOpen(false);
                            }}
                        >
                            <span style={{ width: 10, height: 10, borderRadius: 150, backgroundColor: c.color }} />
                            {c.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};