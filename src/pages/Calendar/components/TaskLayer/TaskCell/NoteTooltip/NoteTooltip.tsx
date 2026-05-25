import { createPortal } from 'react-dom';
import './NoteTooltip.css';

interface NoteTooltipProps {
    description: string;
    top: number;
    left: number;
}

export const NoteTooltip = ({ description, top, left }: NoteTooltipProps) => {
    return createPortal(
        <div
            className='note-tooltip'
            style={{ top, left }}
        >
            {description}
        </div>,
        document.body
    );
};