import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { connectUser } from "../controllers/chat.controller.js";


const chatRouter = Router()

chatRouter.route("/connectuser").post(verifyJWT , connectUser)

export default chatRouter