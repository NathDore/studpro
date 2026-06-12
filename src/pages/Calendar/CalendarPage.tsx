import { useCalendarPage } from './hooks/useCalendarPage';
import { CalendarHeader } from './components/CalendarHeader';
import { CalendarGrid } from './components/CalendarGrid/CalendarGrid';
import { TaskForm } from './components/TaskForm/TaskForm';

const CONTAINER_CLASS = 'flex-1 flex flex-col overflow-hidden pb-2 pt-8 px-20 md:pt-6 md:px-4 sm:pt-4 sm:px-1';

export const CalendarPage = () => {
    const {
        DAYS,
        DAY_TIMES,
        tasks,
        displayForm,
        mode,
        selectedTask,
        onHourCellClick,
        onTaskCellClick,
        closeForm,
    } = useCalendarPage();

    return (
        <div className={CONTAINER_CLASS}>
            <CalendarHeader days={DAYS} />
            <CalendarGrid days={DAYS} tasks={tasks} day_times={DAY_TIMES} onHourCellClick={onHourCellClick} onTaskCellClick={onTaskCellClick} />
            {displayForm && (
                <TaskForm
                    mode={mode}
                    selectedTask={selectedTask}
                    day={displayForm.day}
                    initialStartTime={displayForm.startTime}
                    initialEndTime={displayForm.endTime}
                    onClose={closeForm}
                />
            )}
        </div>
    );
};