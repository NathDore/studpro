import { useState } from "react";
import type { Course } from "../../../../../../../types/Course";

const CONTAINER_CLASS = 'flex-1 relative';
const TRIGGER_CLASS = 'flex justify-between items-center p-[10px] border border-gray-300 rounded-[5px] cursor-pointer hover:border-gray-400';
const TRIGGER_LEFT_CLASS = 'flex flex-row items-center gap-4';
const TRIGGER_ARROW_CLASS = 'text-[15px] font-medium text-[#2C2C2A] select-none';
const COURSE_NAME_CLASS = 'text-[15px] font-medium text-[#2C2C2A]';
const DROPDOWN_CLASS = 'absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-[5px] z-10';
const DROPDOWN_ITEM_CLASS = 'flex flex-row items-center gap-4 p-[10px] cursor-pointer text-[#2C2C2A] hover:bg-[#f5f5f5]';

interface DropDownProps {
    course: Course;
    onCourseChange: (course: Course) => void;
    courses: Course[];
}

export const CourseDropDown = ({ course, onCourseChange, courses }: DropDownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={CONTAINER_CLASS}>
            <div className={TRIGGER_CLASS} onClick={() => setIsOpen(!isOpen)}>
                <div className={TRIGGER_LEFT_CLASS}>
                    <span style={{ width: 10, height: 10, borderRadius: 150, backgroundColor: course.color }} />
                    <span className={COURSE_NAME_CLASS}>{course.name}</span>
                </div>
                <span className={TRIGGER_ARROW_CLASS}>
                    {isOpen ? "▲" : "▼"}
                </span>
            </div>

            {isOpen && (
                <div className={DROPDOWN_CLASS}>
                    {courses.filter((c) => c.id !== course.id).map((c) => (
                        <div
                            key={c.id}
                            className={DROPDOWN_ITEM_CLASS}
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