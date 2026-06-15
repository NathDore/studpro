import { Overlay } from '../../../../components/modals/Overlay'
import { Modal } from '../../../../components/modals/Modal'
import { ColorCircle } from '../../../../components/ColorCircle';
import { MyButton } from '../../../../components/buttons/MyButton';
import { BORDER_CLASS, TEXT_COLOR_CLASS, TEXT_SIZE_CLASS } from '../../../../styles/styles-class';
import { COLORS } from '../../../../constants';
import { useCourseForm } from './hooks/useCourseForm';

interface CourseFormProps {
    onClose: () => void;
}

export const CourseForm = ({ onClose }: CourseFormProps) => {

    const {
        courseName,
        onCourseNameChange,
        selectedColor,
        onSelectColor,
        onCreateCourse
    } = useCourseForm({ initialColor: COLORS[0], onClose });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onCourseNameChange(e.target.value);
    }

    const handleOnCreateCourse = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onCreateCourse();
    }

    return (
        <Overlay>
            <Modal title='Add course' onClose={onClose} width={550} >
                <div className='flex flex-1 flex-col gap-2.5 p-1.5 px-2.5'>
                    <div className='flex flex-1 flex-col gap-1.5'>
                        <span className={`${TEXT_SIZE_CLASS} ${TEXT_COLOR_CLASS} font-medium`}>Course name</span>
                        <input
                            className={`${BORDER_CLASS} ${TEXT_COLOR_CLASS} ${TEXT_SIZE_CLASS} focus:border-gray-500 rounded-md w-62.5 outline-none px-3 py-1.5`}
                            type='text'
                            placeholder='Enter course name'
                            value={courseName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <hr className="w-full border-t border-gray-300" />
                    <div className='flex flex-wrap'>
                        {COLORS.map(c => (
                            <div
                                key={c}
                                onClick={() => onSelectColor(c)}
                                className={`cursor-pointer p-1.5 rounded-md hover:bg-gray-100 ${selectedColor === c ? 'bg-gray-100' : ''}`}
                            >
                                <ColorCircle color={c} width={30} height={30} isSelected={selectedColor === c} />
                            </div>
                        ))}
                    </div>
                    <div className='h-3.5' />
                    <MyButton onClick={handleOnCreateCourse} className='w-16 h-7 flex justify-center items-center'>
                        <p className={`${TEXT_SIZE_CLASS} ${TEXT_COLOR_CLASS}`}>Create</p>
                    </MyButton>
                </div>
            </Modal>
        </Overlay>
    )
}
