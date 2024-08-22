import { TodoId } from '../valueObjects/TodoId'
import { TodoName } from '../valueObjects/TodoName'
import { TodoStatus } from '../valueObjects/TodoStatus'

export class Todo {
    public id: string
    public name: string
    public status: boolean

    constructor(id: string, name: string, status: boolean) {
        this.id = id
        this.name = name
        this.status = status
    }

    static create(id: TodoId, name: TodoName, status: TodoStatus) {
        return new Todo(id.getValue(), name.getValue(), status.getValue())
    }

    toPrimitives() {
        return {
            id: this.id,
            name: this.name,
            status: this.status,
        }
    }
}
