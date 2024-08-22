export class DeleteTodoException extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'DeleteTodoException'
    }
}
