import { randomUUID } from "crypto";
import { Course } from "../../domain/entities/Course";
import { CourseRepository } from "../../domain/repositories/CourseRepository";
import { isValidColor, isValidName, MAX_COURSE_NAME_LENGTH } from "./validator";

interface CreateCourseInput {
    name: string;
    color: string;
}

export class CreateCourse {
    constructor(private readonly courseRepository: CourseRepository) { }

    async execute(input: CreateCourseInput): Promise<Course> {
        if (!isValidName(input.name)) {
            throw new Error(`name must be between 1 and ${MAX_COURSE_NAME_LENGTH} characters`);
        }

        if (!isValidColor(input.color)) {
            throw new Error("color must be a valid course color");
        }

        const existing = await this.courseRepository.findByName(input.name);
        if (existing) {
            throw new Error(`a course named "${input.name}" already exists`);
        }

        const course: Course = {
            id: randomUUID(),
            name: input.name,
            color: input.color,
        };

        return this.courseRepository.create(course);
    }
}