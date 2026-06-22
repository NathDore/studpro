import { useCourseStore } from "../../../../store/courseStore";
import { useTaskStore } from "../../../../store/taskStore";
import type { Course } from "../../../../types/Course";

export const useCourseState = (mode: 'create' | 'update', taskId?: string) => {
    const { courses, selectCourse, selectedCourse } = useCourseStore();
    const { updateCourse } = useTaskStore();

    const canPersist = mode === 'update' && taskId;

    const onSelectCourse = (course: Course) => {
        selectCourse(course);

        if (canPersist) {
            updateCourse(taskId, course.id);
        }
    }

    return {
        onSelectCourse,
        courses,
        selectedCourse,
    }
}