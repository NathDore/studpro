import { useCalendarPage } from './hooks/useCalendarPage';
import { CalendarHeader } from './components/CalendarHeader/CalendarHeader';
import { CalendarGrid } from './components/CalendarGrid/CalendarGrid';
import { TaskForm } from './components/TaskForm/TaskForm';

export const CalendarPage = () => {
    const {
        days,
        tasks,
        displayForm,
        mode,
        selectedTask,
        onHourCellClick,
        onTaskCellClick,
        closeForm,
    } = useCalendarPage();

    return (
        <div className="flex-1 flex flex-col overflow-hidden pb-2 pt-8 px-20 md:pt-6 md:px-4 sm:pt-4 sm:px-1">
            <CalendarHeader days={days} />
            <CalendarGrid days={days} onHourCellClick={onHourCellClick} tasks={tasks} onTaskCellClick={onTaskCellClick} />
            {displayForm && (
                <TaskForm
                    mode={mode}
                    task={selectedTask}
                    calendarDay={displayForm.calendarDay}
                    initialStartTime={displayForm.time}
                    initialEndTime={displayForm.endTime}
                    onClose={closeForm}
                />
            )}
        </div>
    );
};