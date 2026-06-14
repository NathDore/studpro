import { Overlay } from '../../../../components/modals/Overlay'
import { Modal } from '../../../../components/modals/Modal'

interface CourseFormProps {
    onClose: () => void;
}

export const CourseForm = ({ onClose }: CourseFormProps) => {
    return (
        <Overlay onClose={onClose}>
            <Modal title='Add course' onClose={onClose}>
                <p>Course form</p>
            </Modal>
        </Overlay>
    )
}
