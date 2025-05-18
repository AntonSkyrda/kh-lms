import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import apiAuth from "../../lib/services/apiAuth";

export function useLogout() {
  const navigate = useNavigate();
  const {
    mutate: logout,
    isPending,
    error,
  } = useMutation({
    mutationFn: apiAuth.logout,
    onSuccess: () => {
      toast.success("Ви успішно вийшли з системи");
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Щось пішло не так...");
      return;
    },
  });

  return { logout, isPending, error };
}
