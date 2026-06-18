import { useTaskStore } from '../../store/taskStore';
import { COURSE_DATA } from './seedCourses';
import { getDays } from '../../utils/calendarDayUtils';
import type { Task } from '../../types/Task';
import type { Note } from '../../types/Note';
import type { CalendarTime, CalendarPeriod } from '../../pages/Calendar/Calendar.types';
import { useCourseStore } from '../../store/courseStore';

const ENABLE_SEED: boolean = true;

const createTime = (hour: number, minutes: number, period: CalendarPeriod): CalendarTime => ({
    id: crypto.randomUUID(),
    hour,
    minutes,
    period,
});

const createNote = (text: string): Note => ({
    id: crypto.randomUUID(),
    text,
    isCompleted: false,
});

interface TaskBlueprint {
    dayIndex: number;
    courseIndex: number;
    start: [number, number, CalendarPeriod];
    end: [number, number, CalendarPeriod];
    notes: string[];
}

const TASK_SEED_DATA: TaskBlueprint[] = [
    // MAT-130
    {
        dayIndex: 0, courseIndex: 0,
        start: [9, 0, 'AM'], end: [10, 30, 'AM'],
        notes: [
            'Read chapter 2 again before doing the exercises.',
            'Solve problems 2.1 to 2.4.',
            'Check answers with the solution guide.',
            'Other note',
            'Again other note for testing',
        ],
    },
    {
        dayIndex: 0, courseIndex: 0,
        start: [4, 0, 'PM'], end: [5, 0, 'PM'],
        notes: [
            'Print worksheet 7 before class.',
            'Bring calculator.',
        ],
    },
    {
        dayIndex: 2, courseIndex: 0,
        start: [1, 0, 'PM'], end: [2, 0, 'PM'],
        notes: [
            'Review formulas from lecture 5.',
            'Practice 5 sample quiz questions.',
        ],
    },
    // MAT-160
    {
        dayIndex: 1, courseIndex: 1,
        start: [10, 0, 'AM'], end: [11, 30, 'AM'],
        notes: [
            'Complete exercises 4.1 to 4.6.',
            'Show all steps and calculations.',
            "Due before Friday's class.",
        ],
    },
    {
        dayIndex: 3, courseIndex: 1,
        start: [3, 0, 'PM'], end: [4, 0, 'PM'],
        notes: [
            'Bring notes from chapter 3.',
            'Prepare 2 questions to discuss.',
        ],
    },
    {
        dayIndex: 4, courseIndex: 1,
        start: [2, 0, 'PM'], end: [3, 0, 'PM'],
        notes: [
            'Write down 3 questions about chapter 5.',
            'Bring graded homework for review.',
        ],
    },
    // IFT-2007
    {
        dayIndex: 0, courseIndex: 2,
        start: [2, 0, 'PM'], end: [3, 30, 'PM'],
        notes: [
            'Implement the sorting algorithm from lecture.',
            'Test with the provided dataset.',
            'Submit source code and a short report.',
        ],
    },
    {
        dayIndex: 2, courseIndex: 2,
        start: [4, 0, 'PM'], end: [5, 0, 'PM'],
        notes: [
            "Refactor last week's submission.",
            'Add comments explaining the logic.',
        ],
    },
    {
        dayIndex: 4, courseIndex: 2,
        start: [9, 0, 'AM'], end: [10, 0, 'AM'],
        notes: [
            'Read chapter 6 on data structures.',
            'Take notes on the key concepts.',
        ],
    },
    // IFT-1003
    {
        dayIndex: 1, courseIndex: 3,
        start: [1, 0, 'PM'], end: [2, 30, 'PM'],
        notes: [
            'Review the lecture slides from week 6.',
            'Write a short summary (1-2 paragraphs) on the differences between supervised and unsupervised learning.',
            'Include at least 2 examples for each.',
        ],
    },
    {
        dayIndex: 3, courseIndex: 3,
        start: [11, 0, 'AM'], end: [12, 0, 'PM'],
        notes: [
            'Outline the assignment requirements.',
            'List the libraries needed.',
        ],
    },
    {
        dayIndex: 5, courseIndex: 3,
        start: [10, 0, 'AM'], end: [11, 0, 'AM'],
        notes: [
            'Solve the practice set from the course website.',
            'Compare answers with a classmate.',
        ],
    },
    {
        dayIndex: 6, courseIndex: 3,
        start: [7, 0, 'PM'], end: [8, 0, 'PM'],
        notes: [
            "Review the week's lecture notes.",
            'Prepare questions for next week.',
        ],
    },
];

export const seedTasks = () => {
    const { courses } = useCourseStore.getState();
    const { tasks, addTask } = useTaskStore.getState();

    if (tasks.length > 0) return;
    if (!ENABLE_SEED) return;

    const days = getDays();

    TASK_SEED_DATA.forEach(({ dayIndex, courseIndex, start, end, notes }) => {
        const task: Task = {
            id: crypto.randomUUID(),
            day: days[dayIndex],
            startTime: createTime(...start),
            endTime: createTime(...end),
            course: courses[courseIndex],
            notes: notes.map(createNote),
            isCompleted: false,
        };

        addTask(task);
    });
};