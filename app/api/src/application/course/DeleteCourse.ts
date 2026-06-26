import { CourseRepository } from "../../domain/repositories/CourseRepository";

interface DeleteCourseInput {
    courseId: string;
}

export class DeleteCourse {
    constructor(private readonly courseRepository: CourseRepository) { }

    async execute(input: DeleteCourseInput): Promise<void> {

        const existing = await this.courseRepository.findById(input.courseId);
        if (!existing) throw new Error("course must exist to be deleted");

        await this.courseRepository.delete(input.courseId);
    }
}