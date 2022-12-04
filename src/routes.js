import { Router } from 'express'
import UserController from './controllers/userController'
import PostController from './controllers/postController'



const router = Router()



router.post('/users', UserController.add)
router.get('/users', UserController.list)
router.get('/users/:id', UserController.find)
router.patch('/users/:id', UserController.update)
router.delete('/users/:id', UserController.delete)

router.post('/posts/user/:id', PostController.add)
router.get('/posts', PostController.list)
router.get('/posts/:id', PostController.find)
router.patch('/posts/:id', PostController.update)
router.delete('/posts/:id', PostController.delete)



export { router }