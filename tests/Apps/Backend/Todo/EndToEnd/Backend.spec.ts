import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import httpStatus from 'http-status'

import { ServerBackend } from '../../../../../src/Apps/Backend/ServerBackend'

describe('Backend /todo', () => {
    let server: ServerBackend

    beforeEach(async () => {
        server = new ServerBackend(0)
        await server.init()
        server.listen()
    })

    afterEach(() => {
        server?.stop()
    })

    it('Should create, list and delete todo', async () => {
        const todo = {
            id: '1',
            name: 'Test',
            status: false,
        }
        let response = await request(server?.app).post('/api/v1/todo').send(todo)
        expect(response.status).toBe(httpStatus.CREATED)

        response = await request(server?.app).get('/api/v1/todo')
        expect(response.status).toBe(httpStatus.OK)
        expect(response.body).toEqual([todo])

        response = await request(server?.app).delete('/api/v1/todo/' + todo.id)
        expect(response.status).toBe(httpStatus.OK)

        response = await request(server?.app).get('/api/v1/todo')
        expect(response.status).toBe(httpStatus.OK)
        expect(response.body).toEqual([])
    })
})
