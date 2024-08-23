import { ITodoRepository } from '../../domain/infrastructure/ITodoRepository'
import { Criteria } from '../../../Common/infrastructure/Criteria'
import { TodoId } from '../../domain/valueObjects/TodoId'
import { NotFoundTodoException } from '../../domain/exceptions/NotFoundTodoException'
import { DeleteTodoException } from '../exceptions/DeleteTodoException'
import { InvalidArgumentException } from '../../../Common/domain/exceptions/InvalidArgumentException'
import { Todo } from '../../domain/entities/Todo'

export class DeleteUseCase {
    constructor(private todoRepository: ITodoRepository) {}

    async run(id: string) {
        try {
            const todoCriteria = new Criteria<Todo>().where('id', id)
            const [todo] = await this.todoRepository.searchByCriteria(todoCriteria)

            if (!todo) {
                throw new NotFoundTodoException()
            }
            await this.todoRepository.delete(new TodoId(id))
        } catch (error) {
            if (error instanceof InvalidArgumentException || error instanceof NotFoundTodoException) {
                throw error
            }

            throw new DeleteTodoException('Unexpected error occurred')
        }
    }
}
