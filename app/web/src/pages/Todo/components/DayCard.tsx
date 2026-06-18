import { MyButton } from '../../../components/buttons/MyButton';
import { COLORS } from "../../../constants/colors-constant";
import {
    TEXT_COLOR_CLASS,
    TEXT_SIZE_CLASS,
} from "../../../styles/styles-class";
import { TaskCard } from "./TaskCard";
import type { TodoDay } from "../Todo.types";

interface DayCardProps {
    todoDay: TodoDay;
}

export const DayCard = ({ todoDay }: DayCardProps) => {
    return (
        <div className='w-70 h-137.5 grid grid-rows-[5%_90%_3%] shrink-0'>
            {/* Header */}
            <div className={`flex flex-row gap-1.5 ${COLORS.secondary} rounded-t-xl px-2 py-2 items-center justify-between border-b border-gray-300`}>
                <span
                    className={`${TEXT_COLOR_CLASS} ${TEXT_SIZE_CLASS} font-medium`}
                >
                    <strong>{todoDay.day.day}</strong>, {todoDay.day.date}{' '}
                    {todoDay.day.fullDate.toLocaleDateString('en-US', {
                        month: 'short',
                    })}
                    .
                </span>
            </div>

            {/* Task List */}
            <div
                className={`${COLORS.primary} flex flex-col overflow-y-auto py-1.5 px-2.5 gap-1.5 border-l border-r border-gray-300 min-h-0 thin-scrollbar`}
            >
                {todoDay.tasks?.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>

            {/* Footer */}
            <div
                className={`${COLORS.primary} flex items-center border-b border-l border-r border-gray-300 rounded-b-sm`}
            >
                {todoDay.isCompleted && (
                    <MyButton>
                        Complete
                    </MyButton>
                )}
            </div>
        </div>
    );
};