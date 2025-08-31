import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import apiAuth from "../../lib/services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const {
    isPending,
    mutate: login,
    error,
  } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      apiAuth.login({ email, password }),
    onSuccess: () => {
      toast.success(`Ви успішно увійши до системи!`);
      navigate("/home");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, login, error };
}
