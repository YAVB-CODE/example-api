import { Request, Response } from 'express'
import { IController } from './IController'

import { DeleteUseCase } from '../../../../BoundedContext/Todo/application/DeleteUseCase'
import { MemoryTodoRepository } from '../../../../BoundedContext/Todo/infrastructure/MemoryTodoRepository'
import { NotFoundTodoException } from '../../../../BoundedContext/Todo/application/exceptions/NotFoundTodoException'

import httpStatus from 'http-status'

export class DeleteController implements IController {
    async run(req: Request, res: Response) {
        try {
            await new DeleteUseCase(new MemoryTodoRepository()).run(req.params?.id)
            res.status(httpStatus.OK).send()
        } catch (error) {
            if (error instanceof NotFoundTodoException) {
                res.status(httpStatus.NOT_FOUND).json({
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
