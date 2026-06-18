import React from 'react'

type OverlayProps = {
    children?: React.ReactNode
    onClose?: () => void
}

export const Overlay: React.FC<OverlayProps> = ({ children, onClose }) => {
    return (
        <div className={'fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-100'} onClick={onClose}>
            {children}
        </div>
    )
}
