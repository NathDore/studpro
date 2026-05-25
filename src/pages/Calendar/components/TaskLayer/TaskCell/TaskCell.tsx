import type { Task } from '../../../../../types/Task';
import type { TaskPosition } from './utils/taskUtils';
import { useTaskDisplay } from './hook/useTaskDisplay';
import './TaskCell.css';
import { computeNoteLayout } from './Note/utils/noteUtils';
import { NoteIconLayer } from './Note/NoteIconLayer/NoteIconLayer';

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
    const { displayInline } = useTaskDisplay(task, position);

    const layout = computeNoteLayout(task.notes, position.height);

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

                {
                    layout.expanded.length > 0 && layout.expanded.map((n) => <div className='note-expanded-text' key={n.id}>{n.text}</div>)
                }

                {
                    layout.collapsed.length > 0 && layout.expanded.length > 0 && <div className='line-separator' />
                }

                {
                    layout.collapsed.length > 0 && <NoteIconLayer notes={layout.collapsed} />
                }

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