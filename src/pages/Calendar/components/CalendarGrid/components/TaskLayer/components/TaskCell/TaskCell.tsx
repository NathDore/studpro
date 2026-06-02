import type { Task } from '../../../../../../../../types/Task';
import type { TaskPosition } from './TaskCell.types';
import { useTaskFlexLayout } from './hooks/useTaskFlexLayout';
import './TaskCell.css';
import { NoteIconLayer } from './Note/components/NoteIconLayer/NoteIconLayer';
import { ExpandedNoteLayer } from './Note/components/ExpandedNoteLayer/ExpandedNoteLayer';
import { useNoteLayout } from './Note/hooks/useNoteLayout';
import { useEffect } from 'react';

interface TaskCellProps {
    position: TaskPosition;
    task: Task;
    onTaskCellClick: (task: Task) => void;
    isResizing: React.RefObject<boolean>;
    onResizeTop: (e: MouseEvent, task: Task, position: TaskPosition) => void;
    onResizeBottom: (e: MouseEvent, task: Task, position: TaskPosition) => void;
    registerOnMouseUp: (callback: () => void) => () => void;
}

export const TaskCell = ({
    position,
    task,
    onTaskCellClick,
    isResizing,
    onResizeTop,
    onResizeBottom,
    registerOnMouseUp
}: TaskCellProps) => {
    const { titleRef, noteRefs, layout, measured, refreshNoteLayout } = useNoteLayout({ task, position });
    const { displayInline, refreshFlexLayout } = useTaskFlexLayout(task);

    const handleClick = () => {
        if (isResizing.current) return;
        onTaskCellClick(task);
    };

    useEffect(() => {
        const unregisterNoteLayout = registerOnMouseUp(refreshNoteLayout);
        const unregisterFlexLayout = registerOnMouseUp(refreshFlexLayout);

        return () => {
            unregisterNoteLayout();
            unregisterFlexLayout();
        };
    }, []);

    return (
        <div
            className='pointer-events-auto absolute flex justify-center'
            style={{ left: position.left, top: position.top, height: position.height, width: position.width }}
            onMouseUp={handleClick}
        >
            {/* Resize top */}
            <div
                className='task z-10 absolute left-0 w-full h-5 cursor-ns-resize flex items-center justify-center top-[-7px]'
                onMouseDown={(e) => onResizeTop(e.nativeEvent, task, position)}
            >
                <div className='visual-resize-bar w-[40%] h-1 rounded-full bg-[rgba(255,255,255,0.55)] opacity-0' />
            </div>

            {/* Task body */}
            <div
                className={`task rounded-[5px] w-[98%] overflow-hidden relative cursor-pointer
                    ${displayInline
                        ? 'flex flex-row justify-between items-center px-2 py-0'
                        : 'px-2 py-[5px]'
                    }`}
                style={{ backgroundColor: task.course.color }}
            >
                <p
                    ref={titleRef}
                    className={`task-text cursor-pointer text-[14px] overflow-hidden leading-[1.1] text-[#d8d8d8] break-words
                        ${displayInline
                            ? 'font-semibold mb-0 shrink-0 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis max-w-full'
                            : 'font-semibold mb-2'
                        }`}
                >
                    {task.course.name}
                </p>

                {!measured && task.notes.map((n) => (
                    <div
                        key={n.id}
                        ref={(el) => { if (el) noteRefs.current.set(n.id, el); }}
                        className='note-expanded-text invisible absolute'
                    >
                        {n.text}
                    </div>
                ))}

                {displayInline ? (
                    layout.collapsed.length > 0 && (
                        <div className='shrink-0 flex items-center'>
                            <NoteIconLayer notes={layout.collapsed} />
                        </div>
                    )
                ) : (
                    <>
                        {layout.expanded.length > 0 && <ExpandedNoteLayer noteRefs={noteRefs} notes={layout.expanded} />}
                        {layout.collapsed.length > 0 && layout.expanded.length > 0 && (
                            <div className='w-full h-px mb-[5px] border-b border-[rgba(211,211,211,0.274)]' />
                        )}
                        {layout.collapsed.length > 0 && <NoteIconLayer notes={layout.collapsed} />}
                    </>
                )}
            </div>

            {/* Resize bottom */}
            <div
                className='resize-bar z-10 absolute left-0 w-full h-5 cursor-ns-resize flex items-center justify-center bottom-[-7px]'
                onMouseDown={(e) => onResizeBottom(e.nativeEvent, task, position)}
            >
                <div className='visual-resize-bar w-[40%] h-1 rounded-full bg-[rgba(255,255,255,0.55)] opacity-0' />
            </div>
        </div>
    );
};