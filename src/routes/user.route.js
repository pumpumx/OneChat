import { Router } from 'express'
import {upload} from '../middlewares/multer.middleware.js'
import { register , loginUser, deleteUser, isUserAuthenticated} from '../controllers/user.controller.js'
import verifyJWT from '../middlewares/auth.middleware.js'

const userRouter = Router()

userRouter.route('/register').post(upload.fields([{
        name :"avatar",
        maxCount : 1,    
    }]) ,register)

userRouter.route('/login').post(loginUser)
userRouter.route('/user-auth').post(verifyJWT , isUserAuthenticated)
//secured Routes   
userRouter.route('/delete-user').post(verifyJWT , deleteUser)

export default userRouter