import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'

import { ServerBackend } from '../../../../../src/Apps/Backend/ServerBackend'
import { ListUseCase } from '../../../../../src/BoundedContext/Todo/application/ListUseCase'
import { MemoryTodoRepository } from '../../../../../src/BoundedContext/Todo/infrastructure/MemoryTodoRepository'

describe('POST /todo', () => {
    let server: ServerBackend

    beforeEach(async () => {
        server = new ServerBackend(0)
        await server.init()
        server.listen()
    })

    afterEach(() => {
        server?.stop()
    })

    it('should create one todo', async () => {
        const todo = {
            id: '1',
            name: 'Test',
            status: false,
        }
        const response = await request(server?.app).post('/api/v1/todo').send(todo)

        const todos = await new ListUseCase(new MemoryTodoRepository()).run()

        expect(response.status).toBe(201)
        expect(todos).toEqual([todo])
    })

    it('should failed created todo: The param status should be a boolean', async () => {
        const todo = {
            id: '1',
            name: 'Test',
            status: 'false',
        }
        const response = await request(server?.app).post('/api/v1/todo').send(todo)
        expect(response.status).toBe(400)
    })

    it('should failed created todo: The param id should be a string', async () => {
        const todo = {
            id: 1,
            name: 'Test',
            status: 'false',
        }
        const response = await request(server?.app).post('/api/v1/todo').send(todo)
        expect(response.status).toBe(400)
    })

    it('should failed created todo: The param name should be a string', async () => {
        const todo = {
            id: '1',
            name: false,
            status: false,
        }
        const response = await request(server?.app).post('/api/v1/todo').send(todo)
        expect(response.status).toBe(400)
    })

    it('should failed created todo: Empty todo', async () => {
        const todo = {}
        const response = await request(server?.app).post('/api/v1/todo').send(todo)
        expect(response.status).toBe(400)
    })
})
