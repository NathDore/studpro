export const getMonday = (date: Date): Date => {
    const day = date.getDay();
    const diffToMonday = day === 0 ? 6 : day - 1;
    const monday = new Date(date);
    monday.setDate(date.getDate() - diffToMonday);
    return monday;
};