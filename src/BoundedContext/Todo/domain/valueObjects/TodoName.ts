import { StringValueObject } from '../../../Common/domain/valueObjects/StringValueObject'
import { InvalidArgumentTodoNameException } from '../exceptions/InvalidArgmentTodoNameException'

export class TodoName extends StringValueObject {
    shouldBeString(): void | InvalidArgumentTodoNameException {
        if (typeof this.getValue() !== 'string') {
            throw new InvalidArgumentTodoNameException()
        }
    }
}
