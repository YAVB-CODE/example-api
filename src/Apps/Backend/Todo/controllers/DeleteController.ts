import { Request, Response } from 'express'
import { IController } from './IController'

import { DeleteUseCase } from '../../../../BoundedContext/Todo/application/useCases/DeleteUseCase'
import { MemoryTodoRepository } from '../../../../BoundedContext/Todo/infrastructure/MemoryTodoRepository'
import { NotFoundTodoException } from '../../../../BoundedContext/Todo/domain/exceptions/NotFoundTodoException'
import { DeleteTodoException } from '../../../../BoundedContext/Todo/application/exceptions/DeleteTodoException'
import { InvalidArgumentException } from '../../../../BoundedContext/Common/domain/exceptions/InvalidArgumentException'

import httpStatus from 'http-status'

export class DeleteController implements IController {
    async run(req: Request, res: Response) {
        try {
            await new DeleteUseCase(new MemoryTodoRepository()).run(req.params?.id)
            res.status(httpStatus.OK).send()
        } catch (error) {
            let message: string = 'Unexpected error'
            let code: number = httpStatus.INTERNAL_SERVER_ERROR

            if (error instanceof DeleteTodoException || error instanceof InvalidArgumentException) {
                message = error.message
                code = httpStatus.BAD_REQUEST
            }

            if (error instanceof NotFoundTodoException) {
                message = error.message
                code = httpStatus.NOT_FOUND
            }

            res.status(code).json({ message, code })
        }
    }
}
