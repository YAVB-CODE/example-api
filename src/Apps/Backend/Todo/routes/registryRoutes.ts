import { Router } from 'express'
import fs from 'fs'
import path from 'path'

export function registryRoutes(router: Router) {
    return new Promise(async resolve => {
        const files = fs.readdirSync(path.resolve(__dirname, './'))

        const promises: Promise<void>[] = []

        files.forEach(file => {
            if (file.indexOf('.routes.ts') !== -1) {
                promises.push(
                    new Promise(async resolve => {
                        const routeImport = await import(`./${file}`)
                        routeImport.router(router)
                        resolve(void 0)
                    }),
                )
            }
        })
        await Promise.all(promises)

        resolve(void 0)
    })
}
