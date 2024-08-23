import { InvalidArgumentException } from '../../../Common/domain/exceptions/InvalidArgumentException'

export class InvalidArgumentTodoStatusException extends InvalidArgumentException {
    constructor() {
        super('The todo status must be a boolean')
    }
}
