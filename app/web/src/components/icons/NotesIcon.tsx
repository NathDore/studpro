interface NotesIconProps {
    className?: string;
}

export const NotesIcon = ({ className }: NotesIconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6h16" />
            <path d="M4 12h10" />
            <path d="M4 18h14" />
        </svg>
    )
}
