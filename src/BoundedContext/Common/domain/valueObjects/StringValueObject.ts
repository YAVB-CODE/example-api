import { InvalidArgumentException } from '../exceptions/InvalidArgumentException'
import { BaseValueObject } from './BaseValueObject'

export class StringValueObject extends BaseValueObject<string> {
    constructor(value: string) {
        super(value)
        this.shouldBeString()
    }

    shouldBeString(): void | InvalidArgumentException {
        if (typeof this.getValue() !== 'string') {
            throw new InvalidArgumentException('The param should be a string')
        }
    }
}
