const COURSE_COLORS = [
    // Blues
    "#5B8DB8", "#3A6F9F", "#7BAFD4", "#2E5F8A", "#A8C8E8",
    // Oranges & reds
    "#C97A3E", "#E8955A", "#B05C2A", "#D4A574", "#C0392B",
    // Purples
    "#8B6AAF", "#6A4E8F", "#A98CC8", "#4A3470", "#C4A8E0",
    // Greens
    "#4DA57A", "#2E8A5F", "#6FC494", "#1A6B45", "#9ADBB4",
    // Neutrals & others
    "#E8A0B4", "#F0C040", "#7A9E7E", "#D4726A", "#5C7A9F",
];

export const MAX_COURSE_NAME_LENGTH = 50;

export function isValidColor(color: string): boolean {
    return COURSE_COLORS.includes(color);
}

export function isValidName(name: string): boolean {
    const trimmed = name.trim();
    return trimmed.length > 0 && trimmed.length <= MAX_COURSE_NAME_LENGTH;
}