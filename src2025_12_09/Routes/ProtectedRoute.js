import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, requiredAccess  }) => {
  const loginedDetails = JSON.parse(sessionStorage.getItem("loggedInDetails"));
  const reduxRights = useSelector((state) => state?.layout?.rights);
  const reduxRole = useSelector((state) => state?.layout?.role);
  const rights = reduxRights || loginedDetails?.master_rights;
    const role = reduxRole || loginedDetails?.role;

  const getAccessLevel = (contentName) => {
    const right = rights?.find((r) => r?.content === contentName);
    return right?.content_value || "No Access";
  };

  const accessLevel = role == "Sub Admin" ? getAccessLevel(requiredAccess) : null;

  if (accessLevel === "No Access" && role == "Sub Admin" ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
