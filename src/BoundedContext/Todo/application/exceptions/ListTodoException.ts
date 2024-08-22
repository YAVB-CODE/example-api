export class ListTodoException extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ListTodoException'
    }
}
