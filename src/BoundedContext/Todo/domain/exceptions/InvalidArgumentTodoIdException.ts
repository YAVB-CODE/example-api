import { InvalidArgumentException } from '../../../Common/domain/exceptions/InvalidArgumentException'

export class InvalidArgumentTodoIdException extends InvalidArgumentException {
    constructor() {
        super('The todo id must be a string')
    }
}
