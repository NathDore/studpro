import { useState } from "react";
import type { Course } from "../../../../../../types/Course";
import { COURSE_GAP_CLASS, COURSE_PADDING_CLASS, COURSE_TEXT_COLOR_CLASS, COURSE_TEXT_SIZE_CLASS } from "./course-section-config";

const DROPDOWN_CONTAINER_CLASS = `flex-1 relative`;

const PICKER_CLASS = `flex flex-row items-center h-full ${COURSE_GAP_CLASS} ${COURSE_TEXT_SIZE_CLASS} font-medium ${COURSE_TEXT_COLOR_CLASS} ${COURSE_PADDING_CLASS} border border-gray-300 rounded-[5px] cursor-pointer hover:border-gray-400`;
const PICKER_COURSE_SECTION_CLASS = `flex flex-row items-center ${COURSE_GAP_CLASS}`;
const PICKER_ARROW_CLASS = `${COURSE_TEXT_SIZE_CLASS} font-medium ${COURSE_TEXT_COLOR_CLASS} select-none`;

const PICKER_COURSE_NAME_CLASS = `${COURSE_TEXT_SIZE_CLASS} font-medium ${COURSE_TEXT_COLOR_CLASS} select-none`;
const DROPDOWN_LIST_CLASS = `absolute top-full left-0 min-w-full bg-white border border-gray-300 rounded-[5px] z-10`;
const DROPDOWN_ITEM_CLASS = `flex flex-row items-center ${COURSE_GAP_CLASS} ${COURSE_PADDING_CLASS} cursor-pointer ${COURSE_TEXT_SIZE_CLASS} ${COURSE_TEXT_COLOR_CLASS} hover:bg-[#f5f5f5]`;

interface DropDownProps {
    course: Course;
    onCourseChange: (course: Course) => void;
    courses: Course[];
}

export const CourseDropDown = ({ course, onCourseChange, courses }: DropDownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={DROPDOWN_CONTAINER_CLASS}>
            <div className={PICKER_CLASS} onClick={() => setIsOpen(!isOpen)}>
                <div className={PICKER_COURSE_SECTION_CLASS}>
                    <span style={{ width: 10, height: 10, borderRadius: 150, backgroundColor: course.color }} />
                    <span className={PICKER_COURSE_NAME_CLASS}>{course.name}</span>
                </div>
                <span className={PICKER_ARROW_CLASS}>
                    {isOpen ? "▲" : "▼"}
                </span>
            </div>

            {isOpen && (
                <div className={DROPDOWN_LIST_CLASS}>
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