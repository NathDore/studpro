interface ColorCircleProps {
    color: string;
    width?: number;
    height?: number;
    isSelected?: boolean
}

export const ColorCircle = ({ color, width = 10, height = 10, isSelected }: ColorCircleProps) => {
    return (
        <div
            className={`rounded-full flex-shrink-0 transition-all ${isSelected ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
            style={{ backgroundColor: color, width, height }} />
    )
}
