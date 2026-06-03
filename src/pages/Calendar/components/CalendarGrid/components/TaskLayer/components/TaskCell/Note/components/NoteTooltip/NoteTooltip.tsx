import { createPortal } from 'react-dom';

interface NoteTooltipProps {
    description: string;
    top: number;
    left: number;
}

const TOOLTIP_CLASS = 'animate-tooltip-fade-in absolute z-[1000] bg-[#1e2124] text-[#f0f0f0] text-[13px] leading-[1.5] px-3 py-2 rounded-[6px] max-w-[220px] shadow-[0_4px_12px_rgba(0,0,0,0.25)] pointer-events-none';

export const NoteTooltip = ({ description, top, left }: NoteTooltipProps) => {
    return createPortal(
        <div
            className={TOOLTIP_CLASS}
            style={{ top, left }}
        >
            {description}
        </div>,
        document.body
    );
};