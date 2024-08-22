import { Router } from 'express'
import { PostController } from '../controllers/PostController'
import { GetController } from '../controllers/GetController'
import { DeleteController } from '../controllers/DeleteController'

const API_VERSION = '/api/v1'
const API_PREFIX = `${API_VERSION}/todo`

export function router(router: Router) {
    router.post(API_PREFIX, new PostController().run)
    router.get(API_PREFIX, new GetController().run)
    router.delete(API_PREFIX + '/:id', new DeleteController().run)
}
