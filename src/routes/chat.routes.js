import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { socketAuth } from "../controllers/chat.controller.js";

const chatRouter = Router()

chatRouter.route('/socket-auth').post(verifyJWT , socketAuth)

export default chatRouter