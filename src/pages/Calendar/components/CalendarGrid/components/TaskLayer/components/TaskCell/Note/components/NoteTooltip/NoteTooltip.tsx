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
            className='note-tooltip absolute z-[1000] bg-[#1e2124] text-[#f0f0f0] text-[13px] leading-[1.5] px-3 py-2 rounded-[6px] max-w-[220px] shadow-[0_4px_12px_rgba(0,0,0,0.25)] pointer-events-none'
            style={{ top, left }}
        >
            {description}
        </div>,
        document.body
    );
};