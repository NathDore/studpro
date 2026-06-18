import { useCourseStore } from '../../store/courseStore';
import type { Course } from '../../types/Course';

const MAT130: Course = { id: "MAT-130", name: "MAT-130", color: "#5B8DB8" };
const MAT160: Course = { id: "MAT-160", name: "MAT-160", color: "#C97A3E" };
const IFT2007: Course = { id: "IFT-2007", name: "IFT-2007", color: "#8B6AAF" };
const IFT1003: Course = { id: "IFT-1003", name: "IFT-1003", color: "#4DA57A" };

const ENABLE_SEED: boolean = true;

export const COURSE_DATA: Course[] = [
    MAT130, MAT160, IFT2007, IFT1003
];

export const seedCourses = () => {
    const { courses, addCourse, selectCourse } = useCourseStore.getState();

    if (courses.length > 0) return;

    if (!ENABLE_SEED) return;

    COURSE_DATA.forEach(course => addCourse(course));
    selectCourse(COURSE_DATA[0]);
};