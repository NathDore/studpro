import { MyButton } from "../../../components/buttons/MyButton";
import { COLORS } from "../../../constants/colors-constant";
import { TEXT_COLOR_CLASS, TEXT_SIZE_CLASS } from "../../../styles/styles-class";
import { TaskCard } from "./TaskCard";
import type { TodoDay } from "../Todo.types"

interface DayCardProps {
    todoDay: TodoDay;
}

export const DayCard = ({ todoDay }: DayCardProps) => {
    return (
        <div className='flex flex-col w-75 max-h-screen'>

            <div className='flex w-full flex-row gap-1.5 bg-[#8FAcbd] rounded-t-xl px-2 py-2 items-center justify-between border-b border-gray-300 flex-shrink-0'>
                <span className={`${TEXT_COLOR_CLASS} ${TEXT_SIZE_CLASS} font-medium`} > <strong>{todoDay.day.day}</strong>, {todoDay.day.date}  {todoDay.day.fullDate.toLocaleDateString('en-US', { month: 'short' })}.</span>
            </div>

            <div className={`${COLORS.primary} flex flex-col rounded-b-sm border-b border-l border-r border-gray-300`}>
                <div className={`${COLORS.primary} flex flex-col  min-h-0 overflow-y-auto py-1.5 px-2.5 gap-1.5`}>
                    {
                        todoDay.tasks?.map(t => <TaskCard key={t.id} task={t} />)
                    }
                </div>

                <div className='flex flex-row w-full h-7 shrink-0'>
                    {
                        todoDay.isCompleted && <MyButton>Complete</MyButton>
                    }
                </div>
            </div>
        </div>
    )
}