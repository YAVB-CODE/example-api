import express, { Express } from 'express'
import http from 'http'
import { registryRoutes } from './Todo/routes/registryRoutes'

export class ServerBackend {
    app: Express
    port: number
    server: http.Server | null = null

    constructor(port: number) {
        this.port = port
        this.app = express()
    }

    init() {
        return new Promise(async resolve => {
            this.app.use(express.json())
            this.app.use(express.urlencoded({ extended: true }))

            const router = express.Router()

            /**
             * Se registran las rutas de los módulos
             */
            await registryRoutes(router)
            this.app.use(router)

            resolve(void 0)
        })
    }

    listen() {
        this.server = this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }

    stop() {
        if (this.server) {
            this.server.close()
        }
    }
}
