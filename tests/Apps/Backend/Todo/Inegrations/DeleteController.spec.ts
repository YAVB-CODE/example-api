import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import httpStatus from 'http-status'

import { ServerBackend } from '../../../../../src/Apps/Backend/ServerBackend'
import { CreateUseCase } from '../../../../../src/BoundedContext/Todo/application/useCases/CreateUseCase'
import { MemoryTodoRepository } from '../../../../../src/BoundedContext/Todo/infrastructure/MemoryTodoRepository'

describe('DELETE /todo', () => {
    let server: ServerBackend

    beforeEach(async () => {
        server = new ServerBackend(0)
        await server.init()
        server.listen()
    })

    afterEach(() => {
        server?.stop()
    })

    it('should status code 404 Not found todo', async () => {
        const response = await request(server?.app).delete('/api/v1/todo/1')
        expect(response.status).toBe(httpStatus.NOT_FOUND)
    })

    it('should status code 200, success delete todo', async () => {
        const todo = {
            id: '1',
            name: 'Test',
            status: false,
        }

        await new CreateUseCase(new MemoryTodoRepository()).run(todo.id, todo.name, todo.status)

        const response = await request(server?.app).delete('/api/v1/todo/' + todo.id)

        expect(response.status).toBe(httpStatus.OK)
    })
})
