import React from 'react'
import { MyButton } from '../MyButton';
import { CloseIcon } from '../icons/CloseIcon';
import { COLORS } from '../../constants/colors-constant';

interface ModalProps {
    children?: React.ReactNode;
    onClose?: () => void;
    title: string;
    width?: number;
    height?: number;
}

export const Modal = ({ children, title, onClose, width, height }: ModalProps) => {
    return (
        <div
            className={`bg-white rounded-xl flex flex-col max-w-[90vw] max-h-[90vh]`}
            style={{
                ...(width ? { width: `${width}px` } : {}),
                ...(height ? { height: `${height}px` } : {}),
            }}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className={`${COLORS.secondary} w-full rounded-t-xl px-8 py-2 flex items-center justify-between border-b border-gray-300 gap-4`}>
                <p className={`text-[18px] font-bold text-[#2C2C2A] select-none cursor-default`}>
                    {title}
                </p>
                <MyButton onClick={onClose} className={`w-8 flex justify-center items-center border-none`}>
                    <CloseIcon />
                </MyButton>
            </div>

            {/* Content — scroll */}
            <div className="overflow-auto flex-1">
                {children}
            </div>
        </div>
    )
}