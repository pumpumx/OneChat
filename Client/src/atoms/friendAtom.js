import { atom } from "jotai";

const pendingFriendRequestAtom = atom([])
const confirmedFriends = atom([])
const friendChattingWithData = atom("")
export {
    pendingFriendRequestAtom,
    confirmedFriends,
    friendChattingWithData
}