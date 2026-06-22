import { useState } from "react";
import { COURSE_PADDING_CLASS, COURSE_TEXT_CLASS } from "./styles-course-section";
import { BORDER_CLASS, TEXT_COLOR_CLASS, TEXT_SIZE_CLASS } from "../../../../../styles/styles-class";
import { ColorCircle } from "../../../../ColorCircle";
import type { Course } from "../../../../../types/Course";

interface DropDownProps {
    selectedCourse: Course;
    onSelectCourse: (course: Course) => void;
    courses: Course[];
}

export const CourseDropDown = ({ selectedCourse, onSelectCourse, courses }: DropDownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative w-56 min-w-0">
            <div
                className={`flex flex-row items-center justify-between h-full gap-0.5 ${TEXT_SIZE_CLASS} font-medium ${TEXT_COLOR_CLASS} ${COURSE_PADDING_CLASS} ${BORDER_CLASS} rounded-[5px] cursor-pointer hover:border-gray-400`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className={`flex flex-row items-center gap-1.5 min-w-0`}>
                    <ColorCircle color={selectedCourse.color} />
                    <span className={`${COURSE_TEXT_CLASS} truncate`}>{selectedCourse.name}</span>
                </div>
                <span className={`${COURSE_TEXT_CLASS} shrink-0`}>
                    {isOpen ? "▲" : "▼"}
                </span>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-[5px] z-10">
                    {courses.filter((c) => c.id !== selectedCourse.id).length === 0 ? (
                        <div className={`${COURSE_PADDING_CLASS} ${TEXT_SIZE_CLASS} text-gray-400 italic`}>
                            No other courses
                        </div>
                    ) : (
                        courses.filter((c) => c.id !== selectedCourse.id).map((c) => (
                            <div
                                key={c.id}
                                className={`flex flex-row items-center gap-1.5 ${COURSE_PADDING_CLASS} cursor-pointer ${TEXT_SIZE_CLASS} ${TEXT_COLOR_CLASS} hover:bg-[#f5f5f5]`}
                                onClick={() => {
                                    onSelectCourse(c);
                                    setIsOpen(false);
                                }}
                            >
                                <ColorCircle color={c.color} />
                                <span className="truncate">{c.name}</span>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};