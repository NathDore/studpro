import { COLORS } from "../../constants/colors-constant";
import { DayCard } from "./components/DayCard";
import { useTodoPage } from "./hooks/useTodoPage"

export const TodoPage = () => {
    const { todoDays } = useTodoPage();

    return (
        <div className={`${COLORS.background} flex flex-1 overflow-hidden`}>
            <div className='flex flex-1 flex-row gap-3 px-2 py-2.5 overflow-x-auto'>
                {
                    todoDays.filter(d => d.tasks?.length !== 0).map(d => <DayCard key={d.id} todoDay={d} />)
                }
            </div>
        </div>
    )
}
