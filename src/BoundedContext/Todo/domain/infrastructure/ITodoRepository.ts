import { Criteria } from '../../../Common/infrastructure/Criteria'
import { Todo } from '../entities/Todo'
import { TodoId } from '../valueObjects/TodoId'

export interface ITodoRepository {
    save(param: Todo): Promise<void>
    update(param: Todo): Promise<void>
    delete(param: TodoId): Promise<void>
    searchByCriteria(param: Criteria<Todo>): Promise<Todo[]>
}
