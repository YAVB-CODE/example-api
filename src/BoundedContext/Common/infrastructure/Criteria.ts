type Operator = 'EQUAL'

interface FilterCriterion<T> {
    value: T
    operator: Operator
}

type Filter<T> = FilterCriterion<T>

function makeFilter<T>(value: T, operator: Operator = 'EQUAL'): FilterCriterion<T> {
    return { value, operator }
}

export class Criteria<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly filters: Record<string, Filter<any>> = {}

    where<K extends keyof T>(field: K, value: T[K]): Criteria<T> {
        const filter = makeFilter(value, 'EQUAL')
        this.filters[field as string] = filter
        return this
    }
}
