import { Request, Response } from 'express'
import { IController } from './IController'

import { ListUseCase } from '../../../../BoundedContext/Todo/application/useCases/ListUseCase'
import { MemoryTodoRepository } from '../../../../BoundedContext/Todo/infrastructure/MemoryTodoRepository'

import httpStatus from 'http-status'
import { ListTodoException } from '../../../../BoundedContext/Todo/application/exceptions/ListTodoException'
import { InvalidArgumentException } from '../../../../BoundedContext/Common/domain/exceptions/InvalidArgumentException'

export class GetController implements IController {
    async run(req: Request, res: Response) {
        try {
            const todos = await new ListUseCase(new MemoryTodoRepository()).run()
            res.status(httpStatus.OK).send(todos.map(todo => todo.toPrimitives()))
        } catch (error) {
            let message: string = 'Unexpected error'
            let code: number = httpStatus.INTERNAL_SERVER_ERROR

            if (error instanceof ListTodoException || error instanceof InvalidArgumentException) {
                message = error.message
                code = httpStatus.BAD_REQUEST
            }

            res.status(code).json({ message, code })
        }
    }
}
