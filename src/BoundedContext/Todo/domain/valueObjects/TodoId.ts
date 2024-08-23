import { StringValueObject } from '../../../Common/domain/valueObjects/StringValueObject'
import { InvalidArgumentTodoIdException } from '../exceptions/InvalidArgumentTodoIdException'

export class TodoId extends StringValueObject {
    shouldBeString(): void | InvalidArgumentTodoIdException {
        if (typeof this.getValue() !== 'string') {
            throw new InvalidArgumentTodoIdException()
        }
    }
}
