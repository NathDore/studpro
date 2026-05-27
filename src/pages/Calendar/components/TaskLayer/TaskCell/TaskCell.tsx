import type { Task } from '../../../../../types/Task';
import type { TaskPosition } from './utils/taskUtils';
import { useTaskFlexLayout } from './hook/useTaskFlexLayout';
import './TaskCell.css';
import { NoteIconLayer } from './Note/NoteIconLayer/NoteIconLayer';
import { ExpandedNoteLayer } from './Note/ExpandedNoteLayer/ExpandedNoteLayer';
import { useNoteLayout } from './Note/hook/useNoteLayout';
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

    const handleClick = (e: React.MouseEvent) => {
        if (isResizing.current) return;
        onTaskCellClick(task);
    };

    useEffect(() => {
        const unregisterNoteLayout = registerOnMouseUp(refreshNoteLayout);
        const unregisterFlexLayout = registerOnMouseUp(refreshFlexLayout);

        return () => {
            unregisterNoteLayout();
            unregisterFlexLayout();
        }
    }, []);

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
                <p ref={titleRef} className={`task-text task-name user-select-none ${displayInline ? 'task-name-inline' : ''}`}>
                    {task.course.name}
                </p>

                {!measured && task.notes.map((n) => (
                    <div
                        key={n.id}
                        ref={(el) => { if (el) noteRefs.current.set(n.id, el); }}
                        className="note-expanded-text"
                        style={{ visibility: 'hidden', position: 'absolute' }}
                    >
                        {n.text}
                    </div>
                ))}

                {
                    layout.expanded.length > 0 && <ExpandedNoteLayer noteRefs={noteRefs} notes={layout.expanded} />
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