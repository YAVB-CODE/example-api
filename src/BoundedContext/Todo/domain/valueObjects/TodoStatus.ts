import { BooleanValueObject } from '../../../Common/domain/valueObjects/BooleanValueObject'
import { InvalidArgumentTodoStatusException } from '../exceptions/InvalidArgumentTodoStatusException'

export class TodoStatus extends BooleanValueObject {
    shouldBeBoolean(): void | InvalidArgumentTodoStatusException {
        if (typeof this.getValue() !== 'boolean') {
            throw new InvalidArgumentTodoStatusException()
        }
    }
}
