import { useState } from 'react';
import './CourseSection.css';

interface CourseSectionProps { }

export const CourseSection = ({ }: CourseSectionProps) => {
    return (
        <div className='section-container'>
            <p className='section-label'>Course</p>
            <div className='section-row'>
                <DropDown />
                <button className='section-button section-label'>+ New course</button>
            </div>
        </div>
    );
}

interface DropDownProps { }

const DropDown = ({ }: DropDownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("MAT-130");

    const options = ["MAT-130", "MAT-160", "IFT-2007", "IFT-1003"];

    return (
        <div className='dropdown-container'>
            <div className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
                <span>{selected}</span>
                <span>{isOpen ? "▲" : "▼"}</span>
            </div>

            {isOpen && (
                <div className="dropdown-list">
                    {options.map((option) => (
                        <div
                            key={option}
                            className="dropdown-item"
                            onClick={() => {
                                setSelected(option);
                                setIsOpen(false);
                            }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}