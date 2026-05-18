import { useState } from "react";
import type { Course } from "../../../../../../../types/Course";
import './CourseDropDown.css';

interface DropDownProps {
    course: Course;
    onCourseChange: (course: Course) => void;
    courses: Course[];
}

export const CourseDropDown = ({ course, onCourseChange, courses }: DropDownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='dropdown-container'>
            <div className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
                <div className='section-row row-container'>
                    <span style={{ width: 10, height: 10, borderRadius: 150, backgroundColor: course.color }} />
                    <span className='section-text'>{course.name}</span>
                </div>

                <span className='section-text'>{isOpen ? "▲" : "▼"}</span>
            </div>

            {isOpen && (
                <div className="dropdown-list">
                    {courses.filter((c) => c.id !== course.id).map((c) => (
                        <div
                            key={c.id}
                            className="dropdown-item"
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
}