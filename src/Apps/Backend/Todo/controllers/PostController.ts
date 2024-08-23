import { Request, Response } from 'express'
import { IController } from './IController'

import { CreateUseCase } from '../../../../BoundedContext/Todo/application/useCases/CreateUseCase'
import { MemoryTodoRepository } from '../../../../BoundedContext/Todo/infrastructure/MemoryTodoRepository'

import httpStatus from 'http-status'
import { CreateTodoException } from '../../../../BoundedContext/Todo/application/exceptions/CreateTodoException'
import { InvalidArgumentException } from '../../../../BoundedContext/Common/domain/exceptions/InvalidArgumentException'

export class PostController implements IController {
    async run(req: Request, res: Response) {
        try {
            const { name, id, status } = req.body
            await new CreateUseCase(new MemoryTodoRepository()).run(id, name, status)
            res.status(httpStatus.OK).send()
        } catch (error) {
            let message: string = 'Unexpected error'
            let code: number = httpStatus.INTERNAL_SERVER_ERROR

            if (error instanceof CreateTodoException || error instanceof InvalidArgumentException) {
                message = error.message
                code = httpStatus.BAD_REQUEST
            }

            res.status(code).json({ message, code })
        }
    }
}
