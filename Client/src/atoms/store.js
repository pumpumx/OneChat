import { getDefaultStore } from "jotai";
import { chatHistory } from "./chatAtom";
import { personalChatHistory } from "./chatAtom";
import { userAtom } from "./atom";
export const store = getDefaultStore() 