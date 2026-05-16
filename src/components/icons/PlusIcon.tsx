interface PlusIconProps {
    className?: string;
}

export function PlusIcon({ className }: PlusIconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5v14" />
            <path d="M5 12h14" />
        </svg>
    );
}