export function isValidTime(time: string): boolean {
    const [hourStr, minuteStr] = time.split(":");
    const hour = Number(hourStr);
    const minutes = Number(minuteStr);
    return hour >= 0 && hour <= 23 && minutes >= 0 && minutes <= 59;
}

export function isValidISODate(day: string): boolean {
    const iso = /^\d{4}-\d{2}-\d{2}$/.test(day);
    if (!iso) return false;
    const date = new Date(day);
    return !isNaN(date.getTime());
}

export function isValidInterval(startTime: string, endTime: string) {
    return startTime < endTime
}