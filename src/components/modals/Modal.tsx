import React from 'react'
import { MyButton } from '../buttons/MyButton';
import { CloseIcon } from '../icons/CloseIcon';

interface ModalProps {
    children?: React.ReactNode;
    onClose?: () => void;
    title: string;
}

export const Modal = ({ children, title, onClose }: ModalProps) => {
    return (
        <div className={`bg-white rounded-xl w-full max-w-[90%] min-h-[90%] flex flex-col`} onClick={(e) => e.stopPropagation()}>
            <div className={`bg-[#8FAcbd] w-full rounded-t-xl px-8 py-2 flex items-center justify-between border-b border-gray-300 gap-4`}>
                <p className={`text-[18px] font-bold text-[#2C2C2A] select-none cursor-default`}>
                    {title}
                </p>
                <MyButton onClick={onClose} className={`w-8  flex justify-center items-center border-none`}><CloseIcon /></MyButton>
            </div>

            {children}
        </div>
    )
}
