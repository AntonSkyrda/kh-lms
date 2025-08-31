// ProtectedRoute.tsx
import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import Spinner from "./Spinner";
import { useUser } from "../contexts/user/useUser";
import { UserProvider } from "../contexts/user/UserProvider";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectPath?: string;
}

function ProtectedContent({
  children,
  redirectPath = "/login",
}: ProtectedRouteProps) {
  const location = useLocation();
  const { user, isLoading, error } = useUser();

  if (isLoading) return <Spinner />;

  if (error || !user) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

function ProtectedRoute({ children, redirectPath }: ProtectedRouteProps) {
  return (
    <UserProvider>
      <ProtectedContent redirectPath={redirectPath}>
        {children}
      </ProtectedContent>
    </UserProvider>
  );
}

export default ProtectedRoute;
