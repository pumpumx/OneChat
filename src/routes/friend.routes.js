import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { fetchAcceptedFriendList, fetchPendingRequest, friendRequestAction,  removeFriend, sendFriendRequest } from "../controllers/friendController.js";

const friendRouter = Router()

friendRouter.route('/send-request').post(verifyJWT,sendFriendRequest)
friendRouter.route('/fetch-pending-request').get(verifyJWT,fetchPendingRequest)
friendRouter.route('/friend-request-action').post(verifyJWT,friendRequestAction)
friendRouter.route('/fetch-friend-list').get(verifyJWT,fetchAcceptedFriendList)
friendRouter.route('/remove-friend').delete(verifyJWT,removeFriend)


export default friendRouter