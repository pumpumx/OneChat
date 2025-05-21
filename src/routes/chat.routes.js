import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { createNewRoom, loadRoomMessages, saveRoomMessages, socketAuth } from "../controllers/chat.controller.js";

const chatRouter = Router()

chatRouter.route('/save-room-messages').post(verifyJWT , saveRoomMessages)
chatRouter.route('/load-room-messages').get(verifyJWT , loadRoomMessages)
chatRouter.route('/create-new-room').post(verifyJWT , createNewRoom)
chatRouter.route('/socket-auth').post(verifyJWT , socketAuth)
export default chatRouter