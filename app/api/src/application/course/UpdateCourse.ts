// application/course/UpdateCourse.ts
import { Course } from "../../domain/entities/Course";
import { CourseRepository } from "../../domain/repositories/CourseRepository";
import { isValidColor, isValidName, MAX_COURSE_NAME_LENGTH } from "./validator";

interface UpdateCourseInput {
    courseId: string;
    name: string;
    color: string;
}

export class UpdateCourse {
    constructor(private readonly courseRepository: CourseRepository) { }

    async execute(input: UpdateCourseInput): Promise<Course> {
        const existing = await this.courseRepository.findById(input.courseId);
        if (!existing) throw new Error("course must exist to be updated");

        if (!isValidName(input.name)) {
            throw new Error(`name must be between 1 and ${MAX_COURSE_NAME_LENGTH} characters`);
        }

        if (!isValidColor(input.color)) {
            throw new Error("color must be a valid course color");
        }

        return this.courseRepository.update(input.courseId, {
            name: input.name,
            color: input.color,
        });
    }
}