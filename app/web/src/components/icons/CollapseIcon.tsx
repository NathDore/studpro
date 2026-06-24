interface CollapseIconProps {
    className?: string;
}

export function CollapseIcon({ className }: CollapseIconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M2 2 L12 10 L22 2" />
            <path d="M2 14 L12 22 L22 14" />
        </svg>
    );
}