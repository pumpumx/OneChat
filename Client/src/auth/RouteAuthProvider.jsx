import { Outlet , Navigate } from "react-router-dom";
import React from 'react'
import { useAtomValue } from "jotai";
import { userAtom } from "../atoms/atom";

function RouteAuthProvider() {
    const user = useAtomValue(userAtom) //Fetch user details from backend
  return user ? <Outlet/> : <Navigate to={'/login'}/>
}

export default RouteAuthProvider