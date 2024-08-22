import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'

import { ServerBackend } from '../../../../../src/Apps/Backend/ServerBackend'
import { CreateUseCase } from '../../../../../src/BoundedContext/Todo/application/CreateUseCase'
import { MemoryTodoRepository } from '../../../../../src/BoundedContext/Todo/infrastructure/MemoryTodoRepository'

describe('GET /todo', () => {
    let server: ServerBackend

    beforeEach(async () => {
        server = new ServerBackend(0)
        await server.init()
        server.listen()
    })

    afterEach(() => {
        server?.stop()
    })

    it('should show an empty list', async () => {
        const response = await request(server?.app).get('/api/v1/todo')
        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
    })

    it('should return an item in the list', async () => {
        const todo = {
            id: '1',
            name: 'Test',
            status: false,
        }

        await new CreateUseCase(new MemoryTodoRepository()).run(todo.id, todo.name, todo.status)

        const response = await request(server?.app).get('/api/v1/todo')
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(1)
        expect(response.body).toEqual([todo])
    })
})
