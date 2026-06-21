import { useTaskStore } from "../../store/taskStore";

export const useRemoveTask = () => {

    const { removeTask } = useTaskStore();

    const submit = (taskId: string) => {
        removeTask(taskId);
    }

    return {
        submit
    }
}