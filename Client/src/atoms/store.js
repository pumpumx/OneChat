import { getDefaultStore } from "jotai";
import { chatHistory } from "./chatAtom";
import { pendingFriendRequestAtom } from "./friendAtom";
import { confirmedFriends } from "./friendAtom";
export const store = getDefaultStore() 