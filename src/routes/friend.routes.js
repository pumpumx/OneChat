import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { fetchPendingRequest, friendRequestStatus, sendFriendRequest } from "../controllers/friendController.js";

const friendRouter = Router()

friendRouter.route('/send-request').post(verifyJWT,sendFriendRequest)
friendRouter.route('/fetch-pending-request').get(verifyJWT,fetchPendingRequest)
friendRouter.route('/friend-request-status').post(verifyJWT,friendRequestStatus)

export default friendRouter