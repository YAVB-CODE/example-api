import { InvalidArgumentException } from '../../../Common/domain/exceptions/InvalidArgumentException'

export class InvalidArgumentTodoNameException extends InvalidArgumentException {
    constructor() {
        super('The todo name must be a string')
    }
}
