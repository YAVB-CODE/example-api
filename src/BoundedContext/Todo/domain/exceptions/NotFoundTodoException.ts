export class NotFoundTodoException extends Error {
    constructor() {
        super('Todo not found')
    }
}
