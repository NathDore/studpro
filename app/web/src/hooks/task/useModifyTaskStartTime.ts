import type { CalendarTime } from "../../pages/Calendar/Calendar.types"
import { useTaskStore } from "../../store/taskStore"

export const useModifyTaskStartTime = () => {

    const { updateStartTime } = useTaskStore();

    const submit = (taskId: string, startTime: CalendarTime) => {
        updateStartTime(taskId, startTime);
    }

    return {
        submit
    }
}