import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import { useUser } from "../contexts/user/useUser";

export default function ProtectedAdminRoute() {
  const { user, isLoading } = useUser();

  if (isLoading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/home" replace />;

  return <Outlet />;
}
