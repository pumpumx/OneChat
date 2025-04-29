import { Outlet , Navigate } from "react-router-dom";
import React from 'react'

function RouteAuthProvider() {
    const user = null //Fetch user details from backend
  return user ? <Outlet/> : <Navigate to={'/login'}/>
}

export default RouteAuthProvider