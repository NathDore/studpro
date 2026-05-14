import { CourseSection } from './components/CourseSection/CourseSection';
import { DateSection } from './components/DateSection/DateSection';
import './TaskForm.css';

interface TaskFormProps {
    onClose: () => void;
}

export const TaskForm = ({ onClose }: TaskFormProps) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content modal" onClick={(e) => e.stopPropagation()}>
                <p className='modal-title'>New task</p>
                <CourseSection />
                <DescriptionSection />
                <DateSection />
                <TimeSection />
                <div className='section-button-container'>
                    <button className='section-button section-label' onClick={onClose}>Cancel</button>
                    <button className='section-button section-label'>Add task</button>
                </div>

            </div>
        </div>
    );
}

interface DescriptionSectionProps { }

const DescriptionSection = ({ }: DescriptionSectionProps) => {
    return (
        <div className='section-container'>
            <p className='section-label'>Description</p>
            <input className='section-input' placeholder='e.g Sprint planning, Design meeting...' />
        </div>
    );
}

interface TimeSectionProps { }

const TimeSection = ({ }: TimeSectionProps) => {
    return (
        <div className='section-container'>
            <p className='section-label'>Time</p>
            <div className='section-row'>
                <input className='section-input' placeholder='start' />
                <input className='section-input' placeholder='end' />
            </div>
        </div>
    );
}