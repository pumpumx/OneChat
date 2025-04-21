import { Router } from 'express'
import {upload} from '../middlewares/multer.middleware.js'
import { register } from '../controllers/user.controller.js'

const router = Router()

router.route('/register').post(upload.fields([{
        name : 'avatar',
        maxCount : 1    
    }]) ,register
)

export default router