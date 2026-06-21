import type { CalendarTime } from "../../pages/Calendar/Calendar.types"
import { useTaskStore } from "../../store/taskStore"

export const useModifyTaskEndtime = () => {

    const { updateEndTime } = useTaskStore();

    const submit = (taskId: string, endTime: CalendarTime) => {
        updateEndTime(taskId, endTime);
    }

    return {
        submit
    }
}