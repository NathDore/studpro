import type { Note } from "../../../../../../../types/Note";
import {
    NOTE_FONT_SIZE,
    NOTE_LINE_HEIGHT,
    NOTE_PADDING_V,
    NOTE_CHAR_PER_LINE,
    NOTE_MAX_LINES,
    ICON_ROW_HEIGHT,
    TASK_TITLE_HEIGHT,
} from '../../noteConstants';

interface NoteLayout {
    expanded: Note[];
    collapsed: Note[];
}

const LINE_HEIGHT_PX = NOTE_FONT_SIZE * NOTE_LINE_HEIGHT;

export function computeNoteLayout(notes: Note[], containerHeight: number): NoteLayout {
    let remaining = containerHeight - TASK_TITLE_HEIGHT - ICON_ROW_HEIGHT;
    const expanded: Note[] = [];
    const collapsed: Note[] = [];

    for (const note of notes) {
        const lines = Math.min(Math.ceil(note.text.length / NOTE_CHAR_PER_LINE), NOTE_MAX_LINES);
        const needed = lines * LINE_HEIGHT_PX + NOTE_PADDING_V;

        if (needed <= remaining) {
            expanded.push(note);
            remaining -= needed;
        } else {
            collapsed.push(note);
        }
    }

    return { expanded, collapsed };
}