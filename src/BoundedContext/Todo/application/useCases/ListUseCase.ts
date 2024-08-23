import { Criteria } from '../../../Common/infrastructure/Criteria'
import { Todo } from '../../domain/entities/Todo'
import { ITodoRepository } from '../../domain/infrastructure/ITodoRepository'
import { ListTodoException } from '../exceptions/ListTodoException'

export class ListUseCase {
    constructor(private todoRepository: ITodoRepository) {}

    run(): Promise<Todo[]> {
        try {
            return this.todoRepository.searchByCriteria(new Criteria())
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            throw new ListTodoException('Unexpected error occurred')
        }
    }
}
