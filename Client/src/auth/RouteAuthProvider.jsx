import { Outlet, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { authMethod } from '../auth/user.auth.js'
import Spinner from "../components/Utils/Spinner.jsx";
function RouteAuthProvider() {

  const [isAuthenticated, setIsAuthenticated] = useState(null)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authResponse = await authMethod.isAuthenticated()
        setIsAuthenticated(authResponse)
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

