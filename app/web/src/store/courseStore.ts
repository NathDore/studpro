import { create } from 'zustand';
import type { Course } from '../types/Course';

interface CourseStore {
    courses: Course[];
    selectedCourse: Course | null;
    addCourse: (course: Course) => void;
    updateCourse: (updatedCourse: Course) => void;
    removeCourse: (courseId: string) => void;
    selectCourse: (course: Course) => void;
}

export const useCourseStore = create<CourseStore>((set) => ({
    courses: [],
    selectedCourse: null,
    addCourse: (course: Course) => set((state) => ({
        courses: [...state.courses, course]
    })),
    updateCourse: (updatedCourse: Course) => set((state) => ({
        courses: state.courses.map((course) => course.id === updatedCourse.id ? updatedCourse : course)
    })),
    removeCourse: (courseId: string) => set((state) => ({
        courses: state.courses.filter((course) => course.id !== courseId)
    })),
    selectCourse: (course: Course) => set({ selectedCourse: course })
}))