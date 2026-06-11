import React from 'react'
import { BORDER_CLASS, TEXT_COLOR_CLASS, TEXT_SIZE_CLASS } from '../../styles/styles-class';

export const MyButton = ({ children }: React.PropsWithChildren) => {
    return (
        <button className={`flex flex-row items-center gap-0.5 ${TEXT_SIZE_CLASS} font-medium ${TEXT_COLOR_CLASS} px-1.25 ${BORDER_CLASS} rounded-[5px] cursor-pointer hover:border-gray-400`}>
            {children}
        </button>
    )
}
