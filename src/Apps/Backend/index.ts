import { ServerBackend } from './ServerBackend'

let server: null | ServerBackend = null
const port = Number(process.env.PORT || 3000)

try {
    server = new ServerBackend(port)
    server.init()

    server.listen()
} catch (error) {
    server?.stop()
    console.error(error)
    process.exit(1)
}
