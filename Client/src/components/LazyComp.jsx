import { lazy } from "react";

const LazyLogin = lazy(()=>import('./Login/Login'))
const lazyMessage = lazy(()=>import('../components/chat/ChatMessage'))

const lazyMainChat = lazy(() => import("../components/chat/MainChat"))
export {
    LazyLogin,
    lazyMessage,
    lazyMainChat
}