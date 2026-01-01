import { isAuthenticatedVar, isLoadingVar, userVar } from "@/apollo/apollo-vars";
import { useReactiveVar } from "@apollo/client/react";
import React from "react";
import { LoadingSpinner } from "../layout/LoadingSpinner";
import { Navigate } from "react-router-dom";

type Props = {
  requiredRoles: string[];
  children: React.ReactNode;
};
const ProtectedRoutes = ({ requiredRoles, children }: Props) => {
  const isLoading = useReactiveVar(isLoadingVar);
  const isAuthenticated = useReactiveVar(isAuthenticatedVar);
  const user = useReactiveVar(userVar);

  if (isLoading) {
    return <LoadingSpinner fullscreen={true} />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (requiredRoles && !requiredRoles.some((role: string) => user?.role?.includes(role))) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default ProtectedRoutes;
