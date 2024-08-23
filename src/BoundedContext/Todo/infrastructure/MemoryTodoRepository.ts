import { Criteria } from '../../Common/infrastructure/Criteria'
import { ITodoRepository } from '../domain/infrastructure/ITodoRepository'
import { Todo } from '../domain/entities/Todo'
import { TodoId } from '../domain/valueObjects/TodoId'

export class MemoryTodoRepository implements ITodoRepository {
    static todos: Todo[] = []

    update(param: Todo): Promise<void> {
        return new Promise(resolve => {
            MemoryTodoRepository.todos = MemoryTodoRepository.todos.map(todo => (todo.id === param.id ? param : todo))
            resolve(void 0)
        })
    }
    delete(param: TodoId): Promise<void> {
        return new Promise(resolve => {
            MemoryTodoRepository.todos = MemoryTodoRepository.todos.filter(todo => todo.id !== param.getValue())
            resolve(void 0)
        })
    }
    searchByCriteria(param: Criteria<Todo>): Promise<Todo[]> {
        let result = MemoryTodoRepository.todos
        for (const [field, filter] of Object.entries(param.filters)) {
            if (field === 'id') {
                result = result.filter(todo => {
                    return todo.id === filter.value
                })
            }
        }

        return Promise.resolve(result)
    }

    save(param: Todo): Promise<void> {
        return new Promise(resolve => {
            MemoryTodoRepository.todos.push(param)
            resolve(void 0)
        })
    }
}
