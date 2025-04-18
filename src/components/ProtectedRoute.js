import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const authState = useSelector((state) => state.auth); // Get auth state
  
    return authState.isAuthenticated ? children : <Navigate to="/login" />;
  };
  
  export default ProtectedRoute;