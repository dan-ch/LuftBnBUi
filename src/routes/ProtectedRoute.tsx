import { Navigate, useLocation } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../context/AuthProvider";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const {userState} = useContext(UserContext);

  if (userState.authenticated) {
    return children;
  }

  return <Navigate to="/signin" />;
};
