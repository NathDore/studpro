import { useState } from "react";
import type { Course } from "../../../../../../../types/Course";
import { COURSE_DATA } from "../../../../../data/Task_data";
import './CourseDropDown.css';

interface DropDownProps { }


const courses: Course[] = COURSE_DATA;

export const CourseDropDown = ({ }: DropDownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<Course>(courses[0]);

    return (
        <div className='dropdown-container'>
            <div className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
                <div className='section-row row-container'>
                    <span style={{ width: 10, height: 10, borderRadius: 150, backgroundColor: selected.color }} />
                    <span className='section-text'>{selected.name}</span>
                </div>

                <span className='section-text'>{isOpen ? "▲" : "▼"}</span>
            </div>

            {isOpen && (
                <div className="dropdown-list">
                    {courses.filter((c) => c.id !== selected.id).map((course) => (
                        <div
                            key={course.id}
                            className="dropdown-item"
                            onClick={() => {
                                setSelected(course);
                                setIsOpen(false);
                            }}
                        >
                            <span style={{ width: 10, height: 10, borderRadius: 150, backgroundColor: course.color }} />
                            {course.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}