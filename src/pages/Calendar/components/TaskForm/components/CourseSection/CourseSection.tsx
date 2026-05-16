import './CourseSection.css';
import { PlusIcon } from '../../../../../../components/icons/PlusIcon';
import { CourseDropDown } from './CourseDropDown/CourseDropDown';

interface CourseSectionProps { }

export const CourseSection = ({ }: CourseSectionProps) => {
    return (
        <div className='section-column'>
            <p className='section-label'>Course</p>
            <div className='section-row'>
                <CourseDropDown />
                <button className='section-button section-text add-course-button'><PlusIcon className='section-icon' /> New course</button>
            </div>
        </div>
    );
}