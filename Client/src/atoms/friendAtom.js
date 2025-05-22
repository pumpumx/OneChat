import { atom } from "jotai";

const pendingFriendRequestAtom = atom([])
const confirmedFriends = atom([])

export {
    pendingFriendRequestAtom,
    confirmedFriends
}