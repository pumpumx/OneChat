import { lazy } from "react";

const LazyLogin = lazy(()=>import('./Login/Login'))

export {
    LazyLogin
}