import { ITodoRepository } from '../domain/infrastructure/ITodoRepository'
import { Todo } from '../domain/entities/Todo'
import { TodoId } from '../domain/valueObjects/TodoId'
import { TodoName } from '../domain/valueObjects/TodoName'
import { TodoStatus } from '../domain/valueObjects/TodoStatus'
import { InvalidArgumentException } from '../../Common/domain/exceptions/InvalidArgumentException'
import { CreateTodoException } from './exceptions/CreateTodoException'

export class CreateUseCase {
    constructor(private todoRepository: ITodoRepository) {}

    async run(id: string, name: string, status: boolean) {
        try {
            const todo = Todo.create(new TodoId(id), new TodoName(name), new TodoStatus(status))

            await this.todoRepository.save(todo)
        } catch (error) {
            if (error instanceof InvalidArgumentException) {
                throw new CreateTodoException(error.message)
            }
            throw error
        }
    }
}
