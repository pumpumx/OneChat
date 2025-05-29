import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { createNewRoom, fetchPersonalChatMessage, loadRoomMessages, savePersonalChatMessage, saveRoomMessages, socketAuth } from "../controllers/chat.controller.js";

const chatRouter = Router()

chatRouter.route('/save-room-messages').post(verifyJWT , saveRoomMessages) //Can even integrate these two different save-load api into one.. 
chatRouter.route('/load-room-messages').get(verifyJWT , loadRoomMessages)
chatRouter.route('/create-new-room').post(verifyJWT , createNewRoom)
chatRouter.route('/save-personal-chat').post(verifyJWT , savePersonalChatMessage)
chatRouter.route('/fetch-personal-chat').post(verifyJWT , fetchPersonalChatMessage)
chatRouter.route('/socket-auth').post(verifyJWT , socketAuth)
export default chatRouter