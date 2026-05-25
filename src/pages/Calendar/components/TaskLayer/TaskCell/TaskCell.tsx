import type { Task } from '../../../../../types/Task';
import type { TaskPosition } from './utils/taskUtils';
import { NotesIcon } from '../../../../../components/icons/NotesIcon';
import { useTaskDisplay } from './hook/useTaskDisplay';
import { useNoteTooltip } from './NoteTooltip/hook/useNoteTooltip';
import { NoteTooltip } from './NoteTooltip/NoteTooltip';
import './TaskCell.css';

interface TaskCellProps {
    position: TaskPosition;
    task: Task;
    onTaskCellClick: (task: Task) => void;
    isResizing: React.RefObject<boolean>;
    onResizeTop: (e: MouseEvent, task: Task, position: TaskPosition) => void;
    onResizeBottom: (e: MouseEvent, task: Task, position: TaskPosition) => void;
}

export const TaskCell = ({
    position,
    task,
    onTaskCellClick,
    isResizing,
    onResizeTop,
    onResizeBottom,
}: TaskCellProps) => {
    const { textRef, maxLines, showIcon, displayInline } = useTaskDisplay(task, position);
    const { iconRef, tooltipPos, handleMouseEnter, handleMouseLeave } = useNoteTooltip();

    const handleClick = (e: React.MouseEvent) => {
        if (isResizing.current) return;
        onTaskCellClick(task);
    };

    return (
        <div
            className='task-wrapper'
            style={{ left: position.left, top: position.top, height: position.height, width: position.width }}
            onMouseUp={handleClick}
        >
            <div
                className='resize-bar resize-bar-top'
                onMouseDown={(e) => onResizeTop(e.nativeEvent, task, position)}
            >
                <div className='visual-resize-bar' />
            </div>

            <div
                className={`task ${displayInline ? 'task-inline' : ''}`}
                style={{ backgroundColor: task.course.color }}
            >
                <p className={`task-text task-name user-select-none ${displayInline ? 'task-name-inline' : ''}`}>
                    {task.course.name}
                </p>

                {!showIcon && (
                    <p
                        ref={textRef}
                        className="task-text task-description user-select-none"
                        style={{ WebkitLineClamp: maxLines }}
                    >
                        {task.description}
                    </p>
                )}

                {showIcon && (
                    <div
                        ref={iconRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className={`notes-icon-wrapper ${displayInline ? 'notes-icon-wrapper-inline' : ''}`}
                    >
                        <NotesIcon className="notes-icon" />
                        {tooltipPos && (
                            <NoteTooltip
                                description={task.description}
                                top={tooltipPos.top}
                                left={tooltipPos.left}
                            />
                        )}
                    </div>
                )}
            </div>

            <div
                className='resize-bar resize-bar-bottom'
                onMouseDown={(e) => onResizeBottom(e.nativeEvent, task, position)}
            >
                <div className='visual-resize-bar' />
            </div>
        </div>
    );
};