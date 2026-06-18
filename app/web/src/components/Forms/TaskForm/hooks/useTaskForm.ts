import type { CalendarDay, CalendarTime } from "../../../../pages/Calendar/Calendar.types";
import type { Task } from "../../../../types/Task";
import { useTimeState } from "./useTimeState";
import { useTaskActions } from "./useTaskAction";
import { useNoteState } from "./useNoteState";
import { useCourseStore } from "../../../../store/courseStore";

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
    const actions = useTaskActions({
        day,
        startTime: timeState.startTime,
        endTime: timeState.endTime,
        isCompleted: selectedTask ? selectedTask.isCompleted : false,
        onClose
    });

    const courseState = { courses, selectedCourse, selectCourse };

    return { courseState, timeState, noteState, actions };
};