import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import { useCurrentUser } from "../features/users/useCurrentUser";

export default function ProtectedAdminRoute() {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/home" replace />;

  return <Outlet />;
}
