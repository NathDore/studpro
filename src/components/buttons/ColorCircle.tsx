interface ColorCircleProps {
    color: string;
}

export const ColorCircle = ({ color }: ColorCircleProps) => {
    return (
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
    )
}
