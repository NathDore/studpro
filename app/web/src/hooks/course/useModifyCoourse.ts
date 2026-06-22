import { useCourseStore } from "../../store/courseStore"

export const useModifyCourse = () => {

    const { updateCourse } = useCourseStore();

    const submit = (id: string, name: string, color: string) => {
        updateCourse({ id, name, color });
    }

    return {
        submit
    }
}