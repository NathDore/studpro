import React from 'react'
import { MyButton } from '../buttons/MyButton';
import { CloseIcon } from '../icons/CloseIcon';

interface ModalProps {
    children?: React.ReactNode;
    onClose?: () => void;
    title: string;
}

const WIDTH_CLASS = `max-w-[90%] sm:max-w-[80%] md:max-w-[80%] lg:max-w-[60%] xl:max-w-[60%] 2xl:max-w-[40%]`;
const HEIGHT_CLASS = `min-h-[60%] sm:max-h-[50%] md:max-h-[50%] lg-max-h-[50%] xl:max-h-[50%] 2xl:max-h-[50%]`;

export const Modal = ({ children, title, onClose }: ModalProps) => {
    return (
        <div className={`bg-white rounded-xl w-full flex flex-col ${WIDTH_CLASS} ${HEIGHT_CLASS}`} onClick={(e) => e.stopPropagation()}>
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
