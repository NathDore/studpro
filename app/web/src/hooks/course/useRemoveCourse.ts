import { useCourseStore } from "../../store/courseStore"

export const useRemoveCourse = () => {

    const { removeCourse } = useCourseStore();

    const submit = (courseId: string) => {
        removeCourse(courseId);
    }

    return {
        submit
    }
}