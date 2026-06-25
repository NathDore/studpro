import { randomUUID } from "crypto";
import { Course } from "../../domain/entities/Course";
import { CourseRepository } from "../../domain/repositories/CourseRepository";

interface CreateCourseInput {
    name: string;
    color: string;
}

const COURSE_COLORS = [
    // Blues
    "#5B8DB8", "#3A6F9F", "#7BAFD4", "#2E5F8A", "#A8C8E8",
    // Oranges & reds
    "#C97A3E", "#E8955A", "#B05C2A", "#D4A574", "#C0392B",
    // Purples
    "#8B6AAF", "#6A4E8F", "#A98CC8", "#4A3470", "#C4A8E0",
    // Greens
    "#4DA57A", "#2E8A5F", "#6FC494", "#1A6B45", "#9ADBB4",
    // Neutrals & others
    "#E8A0B4", "#F0C040", "#7A9E7E", "#D4726A", "#5C7A9F",
];

const MAX_COURSE_NAME_LENGTH = 50;

function isValidColor(color: string): boolean {
    return COURSE_COLORS.includes(color);
}

function isValidName(name: string): boolean {
    const trimmed = name.trim();
    return trimmed.length > 0 && trimmed.length <= MAX_COURSE_NAME_LENGTH;
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