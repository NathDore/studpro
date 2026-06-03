import type { Task } from '../../../../../../../../types/Task';
import type { TaskPosition } from './TaskCell.types';
import { NoteIconLayer } from './Note/components/NoteIconLayer/NoteIconLayer';
import { ExpandedNoteLayer } from './Note/components/ExpandedNoteLayer/ExpandedNoteLayer';
import { useTaskCell } from './hooks/useTaskCell';
import './TaskCell.css';

const WRAPPER_CLASS = 'group pointer-events-auto absolute flex justify-center';
const EXPANDED_NOTES_CLASS = 'flex flex-col gap-1 flex-1 overflow-hidden';
const RESIZE_BAR_HANDLE_CLASS = 'visual-resize-bar w-[40%] h-1 rounded-full bg-[rgba(255,255,255,0.55)] opacity-0 group-hover:opacity-100 group-hover:w-[60%] transition-[opacity,width] duration-[180ms] ease-in-out';

const RESIZE_BAR_HEIGHT: Record<'minimal' | 'inline' | 'full', string> = {
    minimal: 'h-2',
    inline: 'h-4',
    full: 'h-5'
};

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
    onResizeBottom
}: TaskCellProps) => {
    const { layout, expandedNotes, iconships } = useTaskCell({ task });

    const resizeBarHeight = RESIZE_BAR_HEIGHT[layout];
    const topResizeBarClassName = `z-10 absolute left-0 w-full cursor-ns-resize flex items-center justify-center top-[-7px] ${resizeBarHeight}`;
    const bottomResizeBarClassName = `z-10 absolute left-0 w-full cursor-ns-resize flex items-center justify-center bottom-[-7px] ${resizeBarHeight}`;

    const contentClassName = `task rounded-[5px] w-[98%] overflow-hidden relative cursor-pointer flex
        transition-[filter,box-shadow] duration-[180ms] ease-in-out
        hover:brightness-[1.15] hover:shadow-[inset_0_0_0_1px_rgba(59,59,59,0.5)]
        ${layout === 'inline'
            ? 'flex-row items-center justify-between px-2 py-0'
            : 'flex-col px-2 py-[5px]'
        }`;

    const titleClassName = `task-text text-[14px] overflow-hidden leading-[1.1] text-[#d8d8d8] break-words font-semibold
        ${layout === 'inline'
            ? 'whitespace-nowrap text-ellipsis shrink-0 min-w-0 max-w-full'
            : 'mb-2'
        }`;

    const iconsClassName = `flex items-center
        ${layout === 'inline'
            ? 'shrink-0 gap-1'
            : 'mt-auto pt-1'
        }`;

    const handleClick = () => {
        if (isResizing.current) return;
        onTaskCellClick(task);
    };

    return (
        <div className={WRAPPER_CLASS} style={{ ...position }} onMouseUp={handleClick}>

            {/* Top resize bar */}
            <div className={topResizeBarClassName} onMouseDown={(e) => onResizeTop(e.nativeEvent, task, position)}>
                <div className={RESIZE_BAR_HANDLE_CLASS} />
            </div>

            {/* Task Cell content */}
            <div className={contentClassName} style={{ backgroundColor: task.course.color }}>

                {layout === 'inline' && (
                    <>
                        {/* Title */}
                        <p className={titleClassName}>
                            {task.course.name}
                        </p>

                        {/* Icons */}
                        <div className={iconsClassName}>
                            <NoteIconLayer notes={iconships} />
                        </div>
                    </>
                )}

                {layout === 'full' && (
                    <>
                        {/* Title */}
                        <p className={titleClassName}>
                            {task.course.name}
                        </p>

                        {/* Expanded notes */}
                        <div className={EXPANDED_NOTES_CLASS}>
                            <ExpandedNoteLayer notes={expandedNotes} />
                        </div>

                        {/* Icons */}
                        <div className={iconsClassName}>
                            <NoteIconLayer notes={iconships} />
                        </div>
                    </>
                )}

            </div>

            {/* Bottom resize bar */}
            <div className={bottomResizeBarClassName} onMouseDown={(e) => onResizeBottom(e.nativeEvent, task, position)}>
                <div className={RESIZE_BAR_HANDLE_CLASS} />
            </div>

        </div>
    );
};