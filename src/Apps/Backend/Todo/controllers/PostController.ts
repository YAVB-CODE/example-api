import { Request, Response } from 'express'
import { IController } from './IController'

import { CreateUseCase } from '../../../../BoundedContext/Todo/application/CreateUseCase'
import { MemoryTodoRepository } from '../../../../BoundedContext/Todo/infrastructure/MemoryTodoRepository'

import httpStatus from 'http-status'
import { CreateTodoException } from '../../../../BoundedContext/Todo/application/exceptions/CreateTodoException'

export class PostController implements IController {
    async run(req: Request, res: Response) {
        try {
            const { name, id, status } = req.body
            await new CreateUseCase(new MemoryTodoRepository()).run(id, name, status)
            res.status(httpStatus.CREATED).send()
        } catch (error) {
            if (error instanceof CreateTodoException) {
                res.status(httpStatus.BAD_REQUEST).json({
                    message: error.message,
                })
            } else {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                    message: 'Unexpected error occurred',
                })
            }
        }
    }
}
