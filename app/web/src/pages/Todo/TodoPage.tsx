import { COLORS } from "../../constants/colors-constant";
import { DayCard } from "./components/DayCard";
import { useTodoPage } from "./useTodoPage"

export const TodoPage = () => {
    const { todoDays } = useTodoPage();

    return (
        <div className={`${COLORS.background} flex flex-1 flex-col overflow-hidden pb-2 pt-8 px-20 md:pt-6 md:px-4 sm:pt-4 sm:px-1`}>
            <div className='flex flex-1 flex-row gap-3 px-2 py-2.5 overflow-x-auto thin-scrollbar'>      {
                todoDays.filter(d => (d.tasks?.length ?? 0) > 0).map(d => <DayCard key={d.id} todoDay={d} />)
            }
            </div>
        </div>
    )
}
