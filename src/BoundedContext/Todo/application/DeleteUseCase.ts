import { ITodoRepository } from '../domain/infrastructure/ITodoRepository'
import { Criteria } from '../../Common/infrastructure/Criteria'
import { TodoId } from '../domain/valueObjects/TodoId'
import { NotFoundTodoException } from './exceptions/NotFoundTodoException'
import { DeleteTodoException } from './exceptions/DeleteTodoException'

export class DeleteUseCase {
    constructor(private todoRepository: ITodoRepository) {}

    async run(id: string) {
        try {
            const [todo] = await this.todoRepository.searchByCriteria(new Criteria())

            if (!todo) {
                throw new NotFoundTodoException('Todo not found')
            }
            await this.todoRepository.delete(new TodoId(id))
        } catch (error) {
            if (error instanceof NotFoundTodoException) {
                throw new NotFoundTodoException(error.message)
            }

            throw new DeleteTodoException('Unexpected error occurred')
        }
    }
}
