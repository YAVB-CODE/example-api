import { InvalidArgumentException } from '../exceptions/InvalidArgumentException'
import { BaseValueObject } from './BaseValueObject'

export class BooleanValueObject extends BaseValueObject<boolean> {
    constructor(value: boolean) {
        super(value)
        this.shouldBeBoolean()
    }

    shouldBeBoolean(): void | InvalidArgumentException {
        if (typeof this.getValue() === 'boolean') return

        throw new InvalidArgumentException('The param should be a boolean')
    }
}
