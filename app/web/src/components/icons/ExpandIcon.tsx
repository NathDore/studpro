interface ExpandIconProps {
    className?: string;
}

export function ExpandIcon({ className }: ExpandIconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M2 10 L12 2 L22 10" />
            <path d="M2 22 L12 14 L22 22" />
        </svg>
    );
}