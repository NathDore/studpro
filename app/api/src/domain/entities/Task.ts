export interface Task {
    id: string;
    day: string;       // ISO date
    startTime: string; // "HH:mm"
    endTime: string;
    courseId: string | null;
}