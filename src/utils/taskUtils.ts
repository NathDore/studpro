export const getTaskDuration = (start: Date, end: Date): number => {
    const startDuration = (start.getHours() * 60) + start.getMinutes();
    const endDuration = (end.getHours() * 60) + end.getMinutes();

    return endDuration - startDuration;
}

export const getTaskHours = (start: Date, end: Date): number => {
    return Math.floor(getTaskDuration(start, end) / 60);
}