import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useSearchParams } from "react-router-dom";

interface IuseResource<T> {
  resourceName: string;
  fetchFn: (id: number) => Promise<T>;
  paramName?: string;
  id?: number | string | null;
}

export function useResource<T>({
  resourceName,
  fetchFn,
  paramName = "id",
  id,
}: IuseResource<T>) {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const resourceId =
    id ?? params[paramName] ?? searchParams.get(paramName) ?? 0;

  const {
    isLoading,
    data: resource,
    error,
  } = useQuery({
    queryKey: [resourceName, +resourceId],
    queryFn: () => {
      if (!resourceId) return null;
      return fetchFn(+resourceId);
    },
    enabled: !!resourceId,
    retry: false,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return { isLoading, resource, error };
}
