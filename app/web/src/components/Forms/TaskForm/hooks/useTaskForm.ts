import type { CalendarDay, CalendarTime } from "../../../../pages/Calendar/Calendar.types";
import type { Task } from "../../../../types/Task";
import { getMonday } from "../../../../utils/dateUtils";
import { useTimeState } from "./useTimeState";
import { useTaskActions } from "./useTaskAction";
import { useNoteState } from "./useNoteState";
import { useCourseStore } from "../../../../store/courseStore";

const monday = getMonday(new Date());
const maxDate = new Date(monday);
maxDate.setDate(monday.getDate() + 6);

interface UseTaskFormProps {
    selectedTask?: Task;
    day: CalendarDay;
    initialStartTime: CalendarTime;
    initialEndTime: CalendarTime;
    onClose: () => void;
}

export const useTaskForm = ({ day, initialStartTime, initialEndTime, onClose, selectedTask }: UseTaskFormProps) => {

    const { courses, selectedCourse, selectCourse } = useCourseStore();

    const timeState = useTimeState({ initialStartTime, initialEndTime, selectedTask });
    const noteState = useNoteState({ initialNotes: selectedTask?.notes });
    const actions = useTaskActions({ day, startTime: timeState.startTime, endTime: timeState.endTime, isCompleted: selectedTask ? selectedTask.isCompleted : false, onClose });

    return {
        selectedCourse,
        selectCourse,
        courses,
        ...timeState,
        ...noteState,
        ...actions
    };
};