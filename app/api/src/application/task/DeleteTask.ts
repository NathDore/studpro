import { TaskRepository } from "../../domain/repositories/TaskRepository";

interface DeleteTaskInput {
    taskId: string;
}

export class DeleteTask {
    constructor(private readonly taskRepository: TaskRepository) { }

    async execute(input: DeleteTaskInput): Promise<void> {

        const exist = await this.taskRepository.findById(input.taskId);
        if (!exist) throw new Error('task must exist to be deleted');

        await this.taskRepository.delete(input.taskId);
    }
}