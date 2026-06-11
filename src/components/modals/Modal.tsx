import React from 'react'

interface ModalProps {
    children?: React.ReactNode;
    title: string;
}

export const Modal = ({ children, title }: ModalProps) => {
    return (
        <div className={`bg-white rounded-xl w-full max-w-[90%] min-h-[90%] flex flex-col`} onClick={(e) => e.stopPropagation()}>
            <div className={`bg-[#8FAcbd] w-full rounded-t-xl px-6 py-2 flex items-center border-b border-gray-300 gap-4`}>
                <p className={`text-[18px] font-bold text-[#2C2C2A] select-none cursor-default`}>
                    {title}
                </p>
            </div>

            {children}
        </div>
    )
}
