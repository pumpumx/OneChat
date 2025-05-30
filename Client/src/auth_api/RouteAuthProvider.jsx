import { Outlet, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { authMethod } from './user.auth.js'
import Spinner from "../components/Utils/Spinner.jsx";
import { userAtom } from "../atoms/atom.js";
import { useSetAtom } from "jotai";
function RouteAuthProvider() {
  const setUserAtom = useSetAtom(userAtom)
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authResponse = await authMethod.isAuthenticated()
        console.log("authRes" ,authResponse)
        setIsAuthenticated(authResponse.gate)
        setUserAtom(authResponse.user)
      } catch (error) {
        setIsAuthenticated(false)
        console.log("Error validating user" , error)
      }

    }
    checkAuth();
  }, [])


  if (isAuthenticated === null) {
    return <Spinner />
  }
  console.log("isAuth", isAuthenticated)
  1
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default RouteAuthProvider;

