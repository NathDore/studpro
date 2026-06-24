import { useEffect, useState } from "react";
import { useTaskWithRelations } from "../../../../hooks/useTaskWithRelations";
import { useRemoveTask } from "../../../../hooks/task/useRemoveTask";

export const useTaskCard = (taskId: string) => {
    const task = useTaskWithRelations(taskId);

    const { submit: submitRemove } = useRemoveTask();

    const [isExpanded, setIsExpanded] = useState<boolean>(
        task ? !task.isCompleted : true
    );

    useEffect(() => {
        if (!task) return;
        setIsExpanded(!task.isCompleted);
    }, [task?.isCompleted]);

    if (!task || !task.course) return;

    const onExpand = (value: boolean) => setIsExpanded(value);

    const onRemove = () => {
        submitRemove(taskId);
    }

    return {
        task,
        isCompleted: task.isCompleted,
        course: task.course,
        isExpanded,
        onExpand,
        onRemove
    };
};