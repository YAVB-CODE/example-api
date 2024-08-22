export class CreateTodoException extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'CreateTodoException'
    }
}
