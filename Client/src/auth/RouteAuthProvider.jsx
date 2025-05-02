import { Outlet, Navigate } from "react-router-dom";
import React  from "react";
import { useAtomValue} from "jotai";
import { userAtom } from "../atoms/atom";
import { getUserFromLocalStorage } from "./localStorage.user";
function RouteAuthProvider() {
  const atomUser = useAtomValue(userAtom);
  const localUser = getUserFromLocalStorage()

  const user = atomUser || localUser;
  console.log("Atom user " , user)
  console.log("local user " , localUser)

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default RouteAuthProvider;

