export class BaseValueObject<T> {
    constructor(private value: T) {
        this.value = value
    }
    getValue(): T {
        return this.value
    }
}
