import { useState } from "react";
import type { Course } from "../../../../../../types/Course";
import { COURSE_GAP_CLASS, COURSE_PADDING_CLASS, COURSE_TEXT_CLASS } from "./styles-course-section";
import { BORDER_CLASS, TEXT_COLOR_CLASS, TEXT_SIZE_CLASS } from "../../../../../../styles/styles-class";
import { ColorCircle } from "../../../../../../components/buttons/ColorCircle";

interface DropDownProps {
    course: Course;
    onCourseChange: (course: Course) => void;
    courses: Course[];
}

export const CourseDropDown = ({ course, onCourseChange, courses }: DropDownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`flex-1 relative`}>
            <div className={`flex flex-row items-center h-full ${COURSE_GAP_CLASS} ${TEXT_SIZE_CLASS} font-medium ${TEXT_COLOR_CLASS} ${COURSE_PADDING_CLASS} ${BORDER_CLASS} rounded-[5px] cursor-pointer hover:border-gray-400`} onClick={() => setIsOpen(!isOpen)}>
                <div className={`flex flex-row items-center ${COURSE_GAP_CLASS}`}>
                    <ColorCircle color={course.color} />
                    <span className={COURSE_TEXT_CLASS}>{course.name}</span>
                </div>
                <span className={COURSE_TEXT_CLASS}>
                    {isOpen ? "▲" : "▼"}
                </span>
            </div>

            {isOpen && (
                <div className={`absolute top-full left-0 min-w-full bg-white border border-gray-300 rounded-[5px] z-10`}>
                    {courses.filter((c) => c.id !== course.id).map((c) => (
                        <div
                            key={c.id}
                            className={`flex flex-row items-center ${COURSE_GAP_CLASS} ${COURSE_PADDING_CLASS} cursor-pointer ${TEXT_SIZE_CLASS} ${TEXT_COLOR_CLASS} hover:bg-[#f5f5f5]`}
                            onClick={() => {
                                onCourseChange(c);
                                setIsOpen(false);
                            }}
                        >
                            <ColorCircle color={c.color} />
                            {c.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};