import { useRef } from "react";
import { useTimeState } from "./useTimeState";
import { useCourseStore } from "../../../../store/courseStore";
import { useNoteState } from "./useNoteState";
import { useCreateTask } from "../../../../hooks/task/useCreateTask";
import type { CalendarDay, CalendarTime } from "../../../../pages/Calendar/Calendar.types";

export const useCreateTaskForm = (day: CalendarDay, initialStartTime: CalendarTime, initialEndTime: CalendarTime, onClose: () => void) => {
    const { courses, selectedCourse, selectCourse } = useCourseStore();
    const { submit: submitCreate } = useCreateTask();

    const taskIdRef = useRef(crypto.randomUUID());

    const timeState = useTimeState(taskIdRef.current, initialStartTime, initialEndTime, 'create');
    const noteState = useNoteState([], 'create');

    const courseState = { courses, selectedCourse, selectCourse };

    const onSubmit = () => {
        if (!selectedCourse) return;
        submitCreate(taskIdRef.current, selectedCourse.id, day, timeState.startTime, timeState.endTime);
        noteState.flushPendingNotes();
        onClose();
    };

    const onDelete = () => { };

    return {
        taskId: taskIdRef.current,
        timeState,
        noteState,
        courseState,
        onSubmit,
        onDelete
    };
};