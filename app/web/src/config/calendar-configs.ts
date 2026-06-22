// Time column
export const TIME_CELL_WIDTH = 40; // px — fixed gutter for time labels

// Row
export const CALENDAR_ROW_HEIGHT = 80; // px — controls all row heights

// Layout thresholds (duration in minutes)
export const TASK_LAYOUT_THRESHOLDS = {
    MINIMAL: 15, // duration <= 15min → minimal layout
    INLINE: 30,  // duration <= 30min → inline layout
};

// Task cell inner dimensions (px) — used to compute how many notes fit
export const TASK_CELL_PADDING = 5;        // py-[5px] top + bottom
export const TASK_CELL_TITLE_HEIGHT = 24;  // title (16px) + mb-2 (8px)
export const TASK_CELL_ICONS_HEIGHT = 20;  // approx icons row height
export const TASK_CELL_NOTE_HEIGHT = 23;   // measured expanded note height