export class NotFoundTodoException extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'NotFoundTodoException'
    }
}
