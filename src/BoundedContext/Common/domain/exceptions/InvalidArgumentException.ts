import { BaseException } from './BaseException'

export class InvalidArgumentException extends BaseException {
    constructor(message: string) {
        super(message)
    }
}
