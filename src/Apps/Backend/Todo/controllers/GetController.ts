import { Request, Response } from 'express'
import { IController } from './IController'

import { ListUseCase } from '../../../../BoundedContext/Todo/application/ListUseCase'
import { MemoryTodoRepository } from '../../../../BoundedContext/Todo/infrastructure/MemoryTodoRepository'

import httpStatus from 'http-status'
import { ListTodoException } from '../../../../BoundedContext/Todo/application/exceptions/ListTodoException'

export class GetController implements IController {
    async run(req: Request, res: Response) {
        try {
            const todos = await new ListUseCase(new MemoryTodoRepository()).run()
            res.status(httpStatus.OK).send(todos.map(todo => todo.toPrimitives()))
        } catch (error) {
            if (error instanceof ListTodoException) {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                    message: error.message,
                })
            } else {
                throw error
            }
        }
    }
}
