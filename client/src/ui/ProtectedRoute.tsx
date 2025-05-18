import { type ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import ApiUser from "../lib/services/apiUsers";
import Spinner from "./Spinner";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectPath?: string;
}

function ProtectedRoute({
  children,
  redirectPath = "/login",
}: ProtectedRouteProps) {
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await new Promise((res) => setTimeout(res, 1000));
        await ApiUser.getCurrentUser();
        setIsTokenValid(true);
      } catch (error) {
        if (error instanceof Error) {
          toast.error("Ваша сесія закінчилася. Будь ласка, увійдіть знову.");
        }
        setIsTokenValid(false);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, []);

  if (isVerifying) return <Spinner />;

  if (!isTokenValid) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
