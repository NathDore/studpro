import type { Note } from "../../../../../../../types/Note";
import {
    NOTE_FONT_SIZE,
    NOTE_LINE_HEIGHT,
    NOTE_PADDING_V,
    NOTE_CHAR_WIDTH,
    NOTE_MAX_LINES,
    NOTE_GAP,
    ICON_ROW_HEIGHT,
    TASK_TITLE_HEIGHT,
    ICON_ROW_MARGIN,
} from '../../noteConstants';

interface NoteLayout {
    expanded: Note[];
    collapsed: Note[];
}

const LINE_HEIGHT_PX = NOTE_FONT_SIZE * NOTE_LINE_HEIGHT;

export function computeNoteLayout(
    notes: Note[],
    containerHeight: number,
    containerWidth: number,
): NoteLayout {
    const charsPerLine = Math.floor(containerWidth / NOTE_CHAR_WIDTH);
    let remaining = containerHeight - TASK_TITLE_HEIGHT;
    const expanded: Note[] = [];
    const collapsed: Note[] = [];

    for (const note of notes) {
        const lines = Math.min(Math.ceil(note.text.length / charsPerLine), NOTE_MAX_LINES);
        const gap = expanded.length > 0 ? NOTE_GAP : 0;
        const needed = lines * LINE_HEIGHT_PX + NOTE_PADDING_V + gap;

        console.log('containerHeight:', containerHeight, 'containerWidth:', containerWidth, 'remaining après titre:', remaining);
        console.log('TASK_TITLE_HEIGHT:', TASK_TITLE_HEIGHT, 'soustrait:', containerHeight - remaining);

        if (needed <= remaining) {
            expanded.push(note);
            remaining -= needed;
        } else {
            collapsed.push(note);
        }
    }

    if (collapsed.length > 0) {
        while (expanded.length > 0 && remaining < ICON_ROW_HEIGHT + ICON_ROW_MARGIN) {
            const removed = expanded.pop()!;
            collapsed.unshift(removed);

            const lines = Math.min(Math.ceil(removed.text.length / charsPerLine), NOTE_MAX_LINES);
            const gap = expanded.length > 0 ? NOTE_GAP : 0;
            remaining += lines * LINE_HEIGHT_PX + NOTE_PADDING_V + gap;
        }
    }

    return { expanded, collapsed };
}