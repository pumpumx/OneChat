import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { fetchPendingRequest, sendFriendRequest } from "../controllers/friendController.js";

const friendRouter = Router()

friendRouter.route('/send-request').post(verifyJWT,sendFriendRequest)
friendRouter.route('/fetch-pending-request').get(verifyJWT,fetchPendingRequest)
export default friendRouter