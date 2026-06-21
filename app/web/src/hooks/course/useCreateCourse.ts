import { useCourseStore } from "../../store/courseStore"

export const useCreateCourse = () => {

    const { addCourse } = useCourseStore();

    const submit = (id: string, name: string, color: string) => {
        addCourse({ id, name, color });
    }

    return {
        submit
    }
}