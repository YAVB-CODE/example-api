import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'

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
        const responsePost = await request(server?.app).post('/api/v1/todo').send(todo)
        expect(responsePost.status).toBe(201)

        const responseGet = await request(server?.app).get('/api/v1/todo')
        expect(responseGet.status).toBe(200)

        const responseDelete = await request(server?.app).delete('/api/v1/todo/' + todo.id)
        expect(responseDelete.status).toBe(200)
    })
})
