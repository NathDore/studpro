// index.ts
import express from "express";

// Repositories
import { InMemoryTaskRepository } from "./infrastructure/repositories/InMemoryTaskRepository";
import { InMemoryCourseRepository } from "./infrastructure/repositories/InMemoryCourseRepository";
import { InMemoryNoteRepository } from "./infrastructure/repositories/InMemoryNoteRepository";

// Use cases — Task
import { CreateTask } from "./application/task/CreateTask";
import { UpdateTask } from "./application/task/UpdateTask";
import { DeleteTask } from "./application/task/DeleteTask";

// Use cases — Course
import { CreateCourse } from "./application/course/CreateCourse";
import { UpdateCourse } from "./application/course/UpdateCourse";
import { DeleteCourse } from "./application/course/DeleteCourse";

// Use cases — Note
import { CreateNote } from "./application/note/CreateNote";
import { UpdateNote } from "./application/note/UpdateNote";
import { DeleteNote } from "./application/note/DeleteNote";

// Controllers
import { TaskController } from "./infrastructure/http/controllers/TaskController";
import { CourseController } from "./infrastructure/http/controllers/CourseController";
import { NoteController } from "./infrastructure/http/controllers/NoteController";

// Routes
import { taskRoutes } from "./infrastructure/http/routes/task.routes";
import { courseRoutes } from "./infrastructure/http/routes/course.routes";
import { noteRoutes } from "./infrastructure/http/routes/note.routes";

const app = express();
app.use(express.json());

// Repositories
const taskRepository = new InMemoryTaskRepository();
const courseRepository = new InMemoryCourseRepository();
const noteRepository = new InMemoryNoteRepository();

// Use cases — Task
const createTask = new CreateTask(taskRepository, courseRepository);
const updateTask = new UpdateTask(taskRepository, courseRepository);
const deleteTask = new DeleteTask(taskRepository);

// Use cases — Course
const createCourse = new CreateCourse(courseRepository);
const updateCourse = new UpdateCourse(courseRepository);
const deleteCourse = new DeleteCourse(courseRepository);

// Use cases — Note
const createNote = new CreateNote(noteRepository, taskRepository);
const updateNote = new UpdateNote(noteRepository, taskRepository);
const deleteNote = new DeleteNote(noteRepository);

// Controllers
const taskController = new TaskController(createTask, updateTask, deleteTask);
const courseController = new CourseController(createCourse, updateCourse, deleteCourse);
const noteController = new NoteController(createNote, updateNote, deleteNote);

// Routes
app.use("/api", taskRoutes(taskController));
app.use("/api", courseRoutes(courseController));
app.use("/api", noteRoutes(noteController));

app.get("/health", (_req, res) => res.json({ status: "ok" }));

const PORT = 3001;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));