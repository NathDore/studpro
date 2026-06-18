import { useCalendarPage } from './useCalendarPage';
import { CalendarHeader } from './components/CalendarHeader';
import { CalendarGrid } from './components/CalendarGrid/CalendarGrid';
import { TaskForm } from '../../components/Forms/TaskForm/TaskForm';
import { CourseForm } from '../../components/Forms/CourseForm/CourseForm';
import { COLORS } from '../../constants/colors-constant';

export const CalendarPage = () => {
    const {
        DAYS,
        DAY_TIMES,
        tasks,
        displayTaskForm,
        taskFormMode,
        selectedTask,
        onHourCellClick,
        onTaskCellClick,
        closeTaskForm,
        displayCourseForm,
        onNewCourseClick,
        closeCourseForm
    } = useCalendarPage();

    return (
        <div className={`${COLORS.background} flex-1 flex flex-col overflow-hidden pb-2 pt-8 px-20 md:pt-6 md:px-4 sm:pt-4 sm:px-1`}>
            <CalendarHeader days={DAYS} />
            <CalendarGrid days={DAYS} tasks={tasks} day_times={DAY_TIMES} onHourCellClick={onHourCellClick} onTaskCellClick={onTaskCellClick} />
            {displayTaskForm && (
                <TaskForm
                    mode={taskFormMode}
                    selectedTask={selectedTask}
                    day={displayTaskForm.day}
                    initialStartTime={displayTaskForm.startTime}
                    initialEndTime={displayTaskForm.endTime}
                    onClose={closeTaskForm}
                    onNewCourseClick={onNewCourseClick}
                />
            )}
            {displayCourseForm && (
                <CourseForm onClose={closeCourseForm} />
            )
            }
        </div>
    );
};